import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '../../common/api-key.guard';
import { ApiKeyThrottlerGuard } from '../../common/api-key-throttler.guard';
import { Tenant, TenantContext } from '../../common/tenant.decorator';
import { UsageService } from './usage.service';

@ApiTags('usage')
@ApiSecurity('ApiKeyAuth')
@UseGuards(ApiKeyGuard, ApiKeyThrottlerGuard)
@Controller('/v1/usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get('/balance')
  async balance(@Tenant() tenant: TenantContext) {
    return this.usageService.getBalance(tenant);
  }

  @Get('/logs')
  async logs(
    @Tenant() tenant: TenantContext,
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
  ) {
    const l = Math.min(Math.max(parseInt(limit || '20', 10), 1), 100);
    return this.usageService.getLogs(tenant, l, cursor);
  }
}


