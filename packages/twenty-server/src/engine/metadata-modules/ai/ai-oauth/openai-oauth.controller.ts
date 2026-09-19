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

    return {
      userCode: deviceAuth.user_code,
      verificationUri: deviceAuth.verification_uri,
      deviceCode: deviceAuth.device_auth_id,
      deviceAuthId: deviceAuth.device_auth_id,
      expiresIn: 900,
      interval: deviceAuth.interval,
    };
  }

  @Post('exchange')
  async exchangeDeviceCode(
    @Body()
    body: {
      deviceCode?: string;
      deviceAuthId?: string;
      userCode?: string;
    },
    @AuthWorkspace() workspace: WorkspaceEntity,
  ) {
    const code = body.deviceAuthId ?? body.deviceCode;

    if (!code) {
      return { connected: false, pending: false, error: 'Missing device code' };
    }

    try {
      const { tokens, email } =
        await this.openaiDeviceCodeService.pollForToken(code, body.userCode);

      await this.openaiDeviceCodeService.saveTokens(
        workspace.id,
        tokens,
        email,
      );

      return { connected: true, email };
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
