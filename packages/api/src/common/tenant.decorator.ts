import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface TenantContext {
  accountId: string;
  appId: string;
  apiKeyId?: string;
}

export const Tenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TenantContext | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenant as TenantContext | undefined;
  },
);


