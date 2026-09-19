import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenModule } from 'src/engine/core-modules/auth/token/token.module';
import { WorkspaceCacheStorageModule } from 'src/engine/workspace-cache-storage/workspace-cache-storage.module';
import { OpenaiOauthTokenEntity } from 'src/engine/metadata-modules/ai/ai-oauth/openai-oauth-token.entity';
import { OpenaiDeviceCodeService } from 'src/engine/metadata-modules/ai/ai-oauth/openai-device-code.service';
import { OpenaiOauthController } from 'src/engine/metadata-modules/ai/ai-oauth/openai-oauth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpenaiOauthTokenEntity]),
    TokenModule,
    WorkspaceCacheStorageModule,
  ],
  controllers: [OpenaiOauthController],
  providers: [OpenaiDeviceCodeService],
  exports: [OpenaiDeviceCodeService],
})
export class OpenaiOauthModule {}
