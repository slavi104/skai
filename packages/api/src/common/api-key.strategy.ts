import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

export interface ParsedApiKey {
  prefix: string;
  publicId: string;
  secret: string;
}

function parseApiKey(raw: string): ParsedApiKey | null {
  // Expected: sk_live_<publicId>_<secret>
  const parts = raw?.trim()?.split('_');
  if (!parts || parts.length < 3) return null;
  const [prefix, publicId, ...rest] = parts;
  const secret = rest.join('_');
  if (!prefix || !publicId || !secret) return null;
  return { prefix, publicId, secret };
}

@Injectable()
export class ApiKeyStrategy {
  constructor(private readonly prisma: PrismaService) {}

  async validateApiKey(providedKey: string) {
    const parsed = parseApiKey(providedKey);
    if (!parsed) throw new UnauthorizedException('Invalid API key format');

    const key = await this.prisma.apiKey.findUnique({
      where: { publicId: parsed.publicId },
      include: { app: { include: { account: true } } },
    });

    if (!key || !key.isActive) throw new UnauthorizedException('API key not active');
    if (key.app.status !== 'ACTIVE') throw new UnauthorizedException('App is not active');

    const ok = await argon2.verify(key.secretHash, parsed.secret);
    if (!ok) throw new UnauthorizedException('Invalid API key');

    return {
      accountId: key.app.accountId,
      appId: key.appId,
      apiKeyId: key.id,
      key,
      parsed,
    } as const;
  }
}

export { parseApiKey };


