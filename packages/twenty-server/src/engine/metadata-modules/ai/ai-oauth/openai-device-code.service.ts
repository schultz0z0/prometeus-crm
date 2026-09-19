import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { isDefined } from 'twenty-shared/utils';

import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';
import { OpenaiOauthTokenEntity } from 'src/engine/metadata-modules/ai/ai-oauth/openai-oauth-token.entity';

// Device Authorization response shape
export type DeviceAuthResponse = {
  device_auth_id: string;
  user_code: string;
  verification_uri: string;
  interval: number;
  expires_at?: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  token_type?: string;
  expires_in: number;
};

// OpenAI Codex CLI device-auth endpoints
// NOTE: The Auth0 endpoints (/oauth/device/code, /oauth/token) are protected by
// Cloudflare WAF with JavaScript challenges that block server-side requests.
// The Codex CLI uses these internal device-auth endpoints instead, which are
// designed for non-browser clients and don't trigger Cloudflare challenges.
const OPENAI_DEVICE_USERCODE_URL =
  'https://auth.openai.com/api/accounts/deviceauth/usercode';
const OPENAI_DEVICE_TOKEN_URL =
  'https://auth.openai.com/api/accounts/deviceauth/token';
const OPENAI_TOKEN_URL = 'https://auth.openai.com/oauth/token';
const DEFAULT_CLIENT_ID = 'app_EMoamEEZ73f0CkXaXp7hrann';
const CODEX_USER_AGENT =
  'codex-cli/1.0 (Twenty CRM; +https://twenty.com)';
const CODEX_REDIRECT_URI = 'https://auth.openai.com/deviceauth/callback';
const CODEX_DEVICE_VERIFY_URL = 'https://auth.openai.com/codex/device';

@Injectable()
export class OpenaiDeviceCodeService implements OnModuleInit {
  private readonly logger = new Logger(OpenaiDeviceCodeService.name);

  // In-memory cache mapping device_auth_id to user_code and timestamp
  private readonly pendingAuths = new Map<
    string,
    { userCode: string; createdAt: number }
  >();

  constructor(
    private readonly twentyConfigService: TwentyConfigService,
    @InjectRepository(OpenaiOauthTokenEntity)
    private readonly tokenRepository: Repository<OpenaiOauthTokenEntity>,
  ) {}

  async onModuleInit() {
    await this.ensureTableExists();
  }

  private async ensureTableExists(): Promise<void> {
    try {
      await this.tokenRepository.query(`
        CREATE TABLE IF NOT EXISTS "core"."openai_oauth_token" (
          "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          "workspaceId" uuid NOT NULL,
          "userId" uuid,
          "accessToken" text NOT NULL,
          "refreshToken" text,
          "expiresAt" timestamptz NOT NULL,
          "accountEmail" character varying(255),
          "createdAt" timestamptz NOT NULL DEFAULT now(),
          "updatedAt" timestamptz NOT NULL DEFAULT now()
        );
        CREATE INDEX IF NOT EXISTS "IDX_openai_oauth_token_workspaceId" ON "core"."openai_oauth_token" ("workspaceId");
      `);
    } catch (error: any) {
      this.logger.warn(
        'Could not ensure table openai_oauth_token: ' + (error?.message ?? ''),
      );
    }
  }

  private getClientId(): string {
    try {
      return (
        this.twentyConfigService.get('OPENAI_OAUTH_CLIENT_ID') ||
        DEFAULT_CLIENT_ID
      );
    } catch {
      return DEFAULT_CLIENT_ID;
    }
  }

  // Step 1: Request a device code from OpenAI (Codex CLI endpoint)
  async initiateDeviceAuth(): Promise<DeviceAuthResponse> {
    const clientId = this.getClientId();

    const response = await fetch(OPENAI_DEVICE_USERCODE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': CODEX_USER_AGENT,
      },
      body: JSON.stringify({
        client_id: clientId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      this.logger.error(
        `Device code request failed: ${response.status} ${errorText}`,
      );
      throw new Error(`Failed to initiate device auth: ${response.status}`);
    }

    const data = (await response.json()) as {
      device_auth_id: string;
      user_code: string;
      interval?: string | number;
      expires_at?: string;
    };

    // Store user_code mapped to device_auth_id for polling
    this.pendingAuths.set(data.device_auth_id, {
      userCode: data.user_code,
      createdAt: Date.now(),
    });

    // Prune entries older than 20 minutes
    const now = Date.now();
    for (const [key, val] of this.pendingAuths.entries()) {
      if (now - val.createdAt > 20 * 60 * 1000) {
        this.pendingAuths.delete(key);
      }
    }

    return {
      device_auth_id: data.device_auth_id,
      user_code: data.user_code,
      verification_uri: CODEX_DEVICE_VERIFY_URL,
      interval: data.interval ? Number(data.interval) : 5,
      expires_at: data.expires_at,
    };
  }

  // Step 2: Poll for the token after user authorizes (Codex CLI endpoint)
  async pollForToken(
    deviceAuthId: string,
    userCodeHint?: string,
  ): Promise<{ tokens: TokenResponse; email?: string }> {
    const pending = this.pendingAuths.get(deviceAuthId);
    const userCode = userCodeHint || pending?.userCode;

    if (!userCode) {
      this.logger.warn(
        `No user_code found for device_auth_id ${deviceAuthId}`,
      );
      throw new Error('Missing user_code for device token poll');
    }

    const response = await fetch(OPENAI_DEVICE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': CODEX_USER_AGENT,
      },
      body: JSON.stringify({
        device_auth_id: deviceAuthId,
        user_code: userCode,
      }),
    });

    if (!response.ok) {
      // 403 / 404 indicates user has not yet authorized the code in browser
      if (response.status === 403 || response.status === 404) {
        throw new DeviceAuthPendingError('authorization_pending');
      }

      let errorText = '';
      try {
        const errorJson = await response.json();
        errorText = JSON.stringify(errorJson);
      } catch {
        errorText = await response.text().catch(() => '');
      }

      this.logger.warn(
        `Device token poll returned HTTP ${response.status}: ${errorText.substring(0, 200)}`,
      );
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    // Status 200 OK: the user approved in the browser!
    // Response contains authorization_code and code_verifier
    const codeData = (await response.json()) as {
      authorization_code?: string;
      code_verifier?: string;
    };

    if (!codeData.authorization_code || !codeData.code_verifier) {
      this.logger.error(
        `Device auth response missing authorization_code or code_verifier: ${JSON.stringify(codeData)}`,
      );
      throw new Error('Missing authorization_code or code_verifier');
    }

    // Step 2b: Exchange authorization_code + code_verifier for final tokens
    const tokens = await this.exchangeAuthorizationCode(
      codeData.authorization_code,
      codeData.code_verifier,
    );

    // Extract email from id_token JWT if present
    let email: string | undefined;
    if (tokens.id_token) {
      try {
        const payloadBase64 = tokens.id_token.split('.')[1];
        if (payloadBase64) {
          const decoded = JSON.parse(
            Buffer.from(payloadBase64, 'base64').toString('utf-8'),
          );
          email = decoded.email;
        }
      } catch (err) {
        this.logger.warn(`Failed to parse id_token for email: ${err}`);
      }
    }

    // Finished successfully, remove from pending map
    this.pendingAuths.delete(deviceAuthId);

    return { tokens, email };
  }

  private async exchangeAuthorizationCode(
    authorizationCode: string,
    codeVerifier: string,
  ): Promise<TokenResponse> {
    const clientId = this.getClientId();

    const response = await fetch(OPENAI_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': CODEX_USER_AGENT,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: CODEX_REDIRECT_URI,
        client_id: clientId,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(
        `Token exchange failed: ${response.status} ${errorText}`,
      );
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    const data = (await response.json()) as TokenResponse;

    if (!data.access_token) {
      throw new Error('Token exchange response did not contain access_token');
    }

    return data;
  }

  // Step 3: Refresh an expired access token
  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch(OPENAI_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': CODEX_USER_AGENT,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.getClientId(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      this.logger.error(`Token refresh failed: ${response.status} ${errorText}`);
      throw new Error(`Failed to refresh token: ${response.status}`);
    }

    return response.json() as Promise<TokenResponse>;
  }

  // Save or update tokens for a workspace
  async saveTokens(
    workspaceId: string,
    tokenResponse: TokenResponse,
    email?: string,
  ): Promise<OpenaiOauthTokenEntity> {
    const existing = await this.tokenRepository.findOne({
      where: { workspaceId },
    });

    const expiresInSeconds = Number(tokenResponse.expires_in) || 86400;
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    if (isDefined(existing)) {
      existing.accessToken = tokenResponse.access_token;
      existing.refreshToken =
        tokenResponse.refresh_token ?? existing.refreshToken;
      existing.expiresAt = expiresAt;

      if (isDefined(email)) {
        existing.accountEmail = email;
      }

      return this.tokenRepository.save(existing);
    }

    return this.tokenRepository.save(
      this.tokenRepository.create({
        workspaceId,
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token ?? null,
        expiresAt,
        accountEmail: email ?? null,
      }),
    );
  }

  // Get a valid access token for a workspace, refreshing if needed
  async getAccessToken(workspaceId?: string): Promise<string | undefined> {
    const token = workspaceId
      ? (await this.tokenRepository.findOne({ where: { workspaceId } })) ??
        (await this.tokenRepository.findOne({ order: { updatedAt: 'DESC' } }))
      : await this.tokenRepository.findOne({ order: { updatedAt: 'DESC' } });

    if (!isDefined(token)) {
      return undefined;
    }

    const BUFFER_MS = 5 * 60 * 1000;
    const isExpired = token.expiresAt.getTime() - BUFFER_MS < Date.now();

    if (!isExpired) {
      return token.accessToken;
    }

    if (!isDefined(token.refreshToken)) {
      this.logger.warn(
        `OAuth token expired and no refresh token for workspace ${token.workspaceId}`,
      );

      return undefined;
    }

    try {
      const refreshed = await this.refreshAccessToken(token.refreshToken);

      await this.saveTokens(token.workspaceId, refreshed);

      return refreshed.access_token;
    } catch (error) {
      this.logger.error(
        `Failed to refresh OpenAI OAuth token for workspace ${token.workspaceId}`,
        error,
      );

      return undefined;
    }
  }

  async getConnectionStatus(
    workspaceId?: string,
  ): Promise<{ connected: boolean; email?: string; expiresAt?: Date }> {
    const token = workspaceId
      ? (await this.tokenRepository.findOne({ where: { workspaceId } })) ??
        (await this.tokenRepository.findOne({ order: { updatedAt: 'DESC' } }))
      : await this.tokenRepository.findOne({ order: { updatedAt: 'DESC' } });

    if (!isDefined(token)) {
      return { connected: false };
    }

    return {
      connected: true,
      email: token.accountEmail ?? undefined,
      expiresAt: token.expiresAt,
    };
  }

  async disconnect(workspaceId: string): Promise<void> {
    await this.tokenRepository.delete({ workspaceId });
  }
}

export class DeviceAuthPendingError extends Error {
  constructor(public readonly reason: string) {
    super(`Device auth pending: ${reason}`);
    this.name = 'DeviceAuthPendingError';
  }
}
