import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  UseGuards,
  Logger,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/engine/guards/jwt-auth.guard';
import { WorkspaceAuthGuard } from 'src/engine/guards/workspace-auth.guard';
import { AuthWorkspace } from 'src/engine/decorators/auth/auth-workspace.decorator';
import { type WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';
import {
  OpenaiDeviceCodeService,
  DeviceAuthPendingError,
} from 'src/engine/metadata-modules/ai/ai-oauth/openai-device-code.service';

@Controller('rest/ai/oauth/openai')
@UseGuards(JwtAuthGuard, WorkspaceAuthGuard)
export class OpenaiOauthController {
  private readonly logger = new Logger(OpenaiOauthController.name);

  constructor(
    private readonly openaiDeviceCodeService: OpenaiDeviceCodeService,
  ) {}

  @Post('device-code')
  async initiateDeviceCode() {
    const deviceAuth =
      await this.openaiDeviceCodeService.initiateDeviceAuth();

    // The Codex CLI endpoint may return verification_url instead of
    // verification_uri, so handle both. Default to the known Codex device page.
    const verificationUri =
      deviceAuth.verification_uri_complete ??
      deviceAuth.verification_uri ??
      deviceAuth.verification_url ??
      'https://auth.openai.com/codex/device';

    return {
      userCode: deviceAuth.user_code,
      verificationUri,
      deviceCode: deviceAuth.device_code,
      expiresIn: deviceAuth.expires_in,
      interval: deviceAuth.interval ?? 5,
    };
  }

  @Post('exchange')
  async exchangeDeviceCode(
    @Body() body: { deviceCode: string },
    @AuthWorkspace() workspace: WorkspaceEntity,
  ) {
    try {
      const tokenResponse = await this.openaiDeviceCodeService.pollForToken(
        body.deviceCode,
      );

      await this.openaiDeviceCodeService.saveTokens(
        workspace.id,
        tokenResponse,
      );

      return { connected: true };
    } catch (error) {
      if (error instanceof DeviceAuthPendingError) {
        return { connected: false, pending: true, reason: error.reason };
      }

      this.logger.error('Failed to exchange device code', error);
      throw error;
    }
  }

  @Get('status')
  async getStatus(@AuthWorkspace() workspace: WorkspaceEntity) {
    return this.openaiDeviceCodeService.getConnectionStatus(workspace.id);
  }

  @Delete('disconnect')
  async disconnect(@AuthWorkspace() workspace: WorkspaceEntity) {
    await this.openaiDeviceCodeService.disconnect(workspace.id);

    return { disconnected: true };
  }
}
