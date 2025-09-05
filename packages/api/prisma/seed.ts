 
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as argon2 from 'argon2';

function randomBase62(bytes: number): string {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const raw = new Uint8Array(bytes);
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    crypto.getRandomValues(raw);
  } else {
    // Node
    const nodeCrypto = require('crypto');
    nodeCrypto.randomFillSync(raw);
  }
  // Convert bytes to base62 via BigInt
  let num = BigInt('0x' + Buffer.from(raw).toString('hex'));
  if (num === 0n) return '0';
  const out: string[] = [];
  while (num > 0n) {
    const rem = Number(num % 62n);
    out.push(alphabet[rem]);
    num = num / 62n;
  }
  return out.reverse().join('');
}

async function main() {
  const prisma = new PrismaClient();
  try {
    const account = await prisma.account.upsert({
      where: { name: 'DemoTenant' },
      create: { name: 'DemoTenant' },
      update: {},
    });

    await prisma.creditBalance.upsert({
      where: { accountId: account.id },
      update: { available: 10000 },
      create: { accountId: account.id, available: 10000, reserved: 0 },
    });

    const app = await prisma.app.upsert({
      where: { accountId_name: { accountId: account.id, name: 'demo-app' } },
      create: { accountId: account.id, name: 'demo-app', status: 'ACTIVE' },
      update: {},
    });

    // API key
    const publicId = randomBase62(16);
    const secret = randomBase62(24);
    const prefix = 'sk_live';
    const plaintext = `${prefix}_${publicId}_${secret}`;
    const lastFour = secret.slice(-4);
    const secretHash = await argon2.hash(secret);

    const key = await prisma.apiKey.create({
      data: {
        appId: app.id,
        publicId,
        prefix,
        secretHash,
        lastFour,
        isActive: true,
      },
    });

    // Entity and fields
    const entity = await prisma.entity.upsert({
      where: { appId_name: { appId: app.id, name: 'Document' } },
      create: { appId: app.id, name: 'Document' },
      update: {},
    });
    await prisma.field.upsert({
      where: { entityId_name: { entityId: entity.id, name: 'title' } },
      create: { entityId: entity.id, name: 'title', type: 'STRING', required: true },
      update: {},
    });
    await prisma.field.upsert({
      where: { entityId_name: { entityId: entity.id, name: 'body' } },
      create: { entityId: entity.id, name: 'body', type: 'JSON', required: false },
      update: {},
    });

    await prisma.usageLog.create({
      data: { appId: app.id, apiKeyId: key.id, eventType: 'OTHER' },
    });

    // Print and save key
    console.log('Demo API key:', plaintext);
    const tmpPath = path.join(process.cwd(), 'tmp');
    fs.mkdirSync(tmpPath, { recursive: true });
    fs.writeFileSync(path.join(tmpPath, 'demo_api_key.txt'), plaintext, 'utf8');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


