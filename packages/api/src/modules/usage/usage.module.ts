import { Module } from '@nestjs/common';
import { UsageController } from './usage.controller';
import { UsageService } from './usage.service';
import { ApiKeyStrategy } from '../../common/api-key.strategy';
import { ApiKeyGuard } from '../../common/api-key.guard';
import { ApiKeyThrottlerGuard } from '../../common/api-key-throttler.guard';

@Module({
  controllers: [UsageController],
  providers: [UsageService, ApiKeyStrategy, ApiKeyGuard, ApiKeyThrottlerGuard],
})
export class UsageModule {}


