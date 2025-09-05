import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ApiKeyThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return (
      req?.tenant?.apiKeyId || req.ip || (req.ips?.[0] as string) || 'ip:unknown'
    );
  }

  protected getRequestResponse(context: ExecutionContext) {
    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();
    return { req, res } as any;
  }
}


