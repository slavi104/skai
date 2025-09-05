import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as argon2 from 'argon2';
import * as nodeCrypto from 'crypto';

function toBase62(buffer: Buffer): string {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let num = BigInt('0x' + buffer.toString('hex'));
  if (num === 0n) return '0';
  const chars: string[] = [];
  while (num > 0n) {
    const rem = Number(num % 62n);
    chars.push(alphabet[rem]);
    num = num / 62n;
  }
  return chars.reverse().join('');
}

function generatePublicId(): string {
  const buf = nodeCrypto.randomBytes(16);
  return toBase62(buf);
}

function generateSecret(): string {
  const buf = nodeCrypto.randomBytes(24);
  return toBase62(buf);
}

@Injectable()
export class AppsService {
  constructor(private readonly prisma: PrismaService) {}

  async rotateKey(
    tenant: { accountId: string; appId: string; apiKeyId?: string },
    revokeOld: boolean,
  ) {
    const publicId = generatePublicId();
    const secret = generateSecret();
    const prefix = 'sk_live';
    const plaintext = `${prefix}_${publicId}_${secret}`;
    const secretHash = await argon2.hash(secret);
    const lastFour = secret.slice(-4);

    const result = await this.prisma.$transaction(async (tx) => {
      if (revokeOld && tenant.apiKeyId) {
        await tx.apiKey.update({
          where: { id: tenant.apiKeyId },
          data: { isActive: false, revokedAt: new Date() },
        });
      }

      const newKey = await tx.apiKey.create({
        data: {
          appId: tenant.appId,
          publicId,
          prefix,
          secretHash,
          lastFour,
          isActive: true,
        },
      });

      await tx.usageLog.create({
        data: {
          appId: tenant.appId,
          apiKeyId: newKey.id,
          eventType: 'KEY_ROTATE',
        },
      });

      return newKey;
    });

    return {
      apiKey: plaintext,
      keyId: publicId,
      lastFour,
      createdAt: result.createdAt,
    };
  }
}


