import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AppsService } from './apps.service';
import { ApiKeyGuard } from '../../common/api-key.guard';
import { ApiKeyThrottlerGuard } from '../../common/api-key-throttler.guard';
import { Tenant, TenantContext } from '../../common/tenant.decorator';

class RotateKeyBodyDto {
  revokeOld?: boolean = true;
}

@ApiTags('apps')
@ApiSecurity('ApiKeyAuth')
@UseGuards(ApiKeyGuard, ApiKeyThrottlerGuard)
@Controller('/v1/apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post('/keys:rotate')
  async rotateKey(
    @Tenant() tenant: TenantContext,
    @Body() body: RotateKeyBodyDto,
  ) {
    const revokeOld = body?.revokeOld !== false;
    return this.appsService.rotateKey(tenant, revokeOld);
  }
}


