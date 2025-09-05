import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiKeyStrategy } from './api-key.strategy';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly strategy: ApiKeyStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const header = (req.headers['x-api-key'] || req.headers['authorization']) as
      | string
      | undefined;

    let token: string | undefined;
    if (header?.toLowerCase().startsWith('bearer ')) token = header.slice(7).trim();
    else token = header as string | undefined;

    if (!token) throw new UnauthorizedException('Missing API key');
    const { accountId, appId, apiKeyId } = await this.strategy.validateApiKey(token);
    req.tenant = { accountId, appId, apiKeyId };
    return true;
  }
}


