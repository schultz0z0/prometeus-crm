import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { isDefined } from 'twenty-shared/utils';

import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';
import { OpenaiOauthTokenEntity } from 'src/engine/metadata-modules/ai/ai-oauth/openai-oauth-token.entity';

// Device Authorization response shape
// The Codex CLI endpoint may return different field names than RFC 8628:
//   verification_url vs verification_uri, etc.
type DeviceAuthResponse = {
  device_code: string;
  user_code: string;
  verification_uri?: string;
  verification_url?: string;
  verification_uri_complete?: string;
  expires_in: number;
  interval: number;
};

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  token_type: string;
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

@Injectable()
export class OpenaiDeviceCodeService implements OnModuleInit {
  private readonly logger = new Logger(OpenaiDeviceCodeService.name);

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

    return response.json() as Promise<DeviceAuthResponse>;
  }

  // Step 2: Poll for the token after user authorizes (Codex CLI endpoint)
  async pollForToken(deviceCode: string): Promise<TokenResponse> {
    const response = await fetch(OPENAI_DEVICE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': CODEX_USER_AGENT,
      },
      body: JSON.stringify({
        device_code: deviceCode,
        client_id: this.getClientId(),
      }),
    });

    if (!response.ok) {
      let errorBody: { error?: string; status?: string } = {};

      try {
        errorBody = (await response.json()) as {
          error?: string;
          status?: string;
        };
      } catch {
        const text = await response.text().catch(() => '');

        this.logger.warn(
          `Device token poll returned non-JSON ${response.status}: ${text.substring(0, 200)}`,
        );
        throw new DeviceAuthPendingError('authorization_pending');
      }

      const errorCode = errorBody.error ?? errorBody.status ?? '';

      // authorization_pending and slow_down are expected during polling
      if (
        errorCode === 'authorization_pending' ||
        errorCode === 'pending' ||
        errorCode === 'slow_down'
      ) {
        throw new DeviceAuthPendingError(errorCode);
      }

      throw new Error(
        `Token exchange failed: ${errorCode || response.status}`,
      );
    }

    return response.json() as Promise<TokenResponse>;
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

    const expiresAt = new Date(Date.now() + tokenResponse.expires_in * 1000);

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
