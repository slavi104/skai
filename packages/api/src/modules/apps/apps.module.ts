import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { ApiKeyStrategy } from '../../common/api-key.strategy';
import { ApiKeyGuard } from '../../common/api-key.guard';
import { ApiKeyThrottlerGuard } from '../../common/api-key-throttler.guard';

@Module({
  providers: [AppsService, ApiKeyStrategy, ApiKeyGuard, ApiKeyThrottlerGuard],
  controllers: [AppsController],
})
export class AppsModule {}


