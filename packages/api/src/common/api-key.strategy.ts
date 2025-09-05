import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

export interface ParsedApiKey {
  prefix: string;
  publicId: string;
  secret: string;
}

function parseApiKey(raw: string): ParsedApiKey | null {
  // Expected prefixes like "sk_live" or "sk_test"
  if (!raw) return null;
  const trimmed = raw.trim();
  const prefixes = ['sk_live', 'sk_test'];
  const found = prefixes.find((p) => trimmed.startsWith(p + '_'));
  if (!found) return null;
  const remainder = trimmed.slice(found.length + 1); // after prefix + '_'
  const idx = remainder.indexOf('_');
  if (idx <= 0) return null;
  const publicId = remainder.slice(0, idx);
  const secret = remainder.slice(idx + 1);
  if (!publicId || !secret) return null;
  return { prefix: found, publicId, secret };
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


