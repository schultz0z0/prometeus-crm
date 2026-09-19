import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OpenaiOauthTokenEntity } from 'src/engine/metadata-modules/ai/ai-oauth/openai-oauth-token.entity';
import { OpenaiDeviceCodeService } from 'src/engine/metadata-modules/ai/ai-oauth/openai-device-code.service';
import { OpenaiOauthController } from 'src/engine/metadata-modules/ai/ai-oauth/openai-oauth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OpenaiOauthTokenEntity])],
  controllers: [OpenaiOauthController],
  providers: [OpenaiDeviceCodeService],
  exports: [OpenaiDeviceCodeService],
})
export class OpenaiOauthModule {}
