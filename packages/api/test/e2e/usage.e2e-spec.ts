import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

describe('Usage E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let demoKey: string;

  beforeAll(async () => {
    process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ai_saas_test';
    process.env.RATE_LIMIT_TTL = '2';
    process.env.RATE_LIMIT_LIMIT = '3';

    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);

    // Reset DB and seed via Prisma API directly to avoid external processes
    await prisma.$executeRawUnsafe('TRUNCATE "UsageLog", "ApiKey", "Field", "Entity", "Job", "App", "CreditBalance", "Account" RESTART IDENTITY CASCADE');

    // Run seed logic inline by importing seed script would require ts-node; instead mimic minimal seed
    const account = await prisma.account.create({ data: { name: 'DemoTenant' } });
    await prisma.creditBalance.create({ data: { accountId: account.id, available: 10000, reserved: 0 } });
    const appRow = await prisma.app.create({ data: { accountId: account.id, name: 'demo-app', status: 'ACTIVE' } });
    const seed = require('../../prisma/seed.ts');
    // Fallback to reading file if seed printed key there
    const tmpFile = path.join(process.cwd(), 'packages/api/tmp/demo_api_key.txt');
    demoKey = fs.existsSync(tmpFile) ? fs.readFileSync(tmpFile, 'utf8').trim() : '';
    if (!demoKey) {
      // Create a key if not present via rotate endpoint bypass by direct insert is complex; use service
      const pub = 'pub' + Date.now().toString(36);
      const sec = 'sec' + Date.now().toString(36) + 'abcd';
      const argon2 = require('argon2');
      const secretHash = await argon2.hash(sec);
      await prisma.apiKey.create({ data: { appId: appRow.id, publicId: pub, prefix: 'sk_live', secretHash, lastFour: sec.slice(-4), isActive: true } });
      demoKey = `sk_live_${pub}_${sec}`;
    }

    await prisma.entity.create({ data: { appId: appRow.id, name: 'Document' } });
    await prisma.usageLog.create({ data: { appId: appRow.id, eventType: 'OTHER' } });
  });

  afterAll(async () => {
    await app.close();
  });

  it('Auth happy path: GET /v1/usage/balance', async () => {
    const res = await request(app.getHttpServer()).get('/v1/usage/balance').set('x-api-key', demoKey).expect(200);
    expect(typeof res.body.available).toBe('number');
    expect(typeof res.body.reserved).toBe('number');
  });

  it('Logs pagination and limit cap', async () => {
    const first = await request(app.getHttpServer()).get('/v1/usage/logs?limit=3').set('x-api-key', demoKey).expect(200);
    expect(Array.isArray(first.body.items)).toBe(true);
    const cursor = first.body.nextCursor;
    if (cursor) {
      const second = await request(app.getHttpServer()).get(`/v1/usage/logs?limit=9999&cursor=${cursor}`).set('x-api-key', demoKey).expect(200);
      expect(second.body.items.length).toBeLessThanOrEqual(200);
    }
  });

  it('Auth failures return 401', async () => {
    await request(app.getHttpServer()).get('/v1/usage/balance').expect(401);
    await request(app.getHttpServer()).get('/v1/usage/balance').set('x-api-key', 'garbled').expect(401);
  });

  it('Swagger JSON is available', async () => {
    const res = await request(app.getHttpServer()).get('/docs-json').expect(200);
    expect(res.body.components?.securitySchemes?.ApiKeyAuth).toBeDefined();
  });

  it('Rate limit per key and bucket isolation after rotate', async () => {
    // hit limit 3
    await request(app.getHttpServer()).get('/v1/usage/balance').set('x-api-key', demoKey).expect(200);
    await request(app.getHttpServer()).get('/v1/usage/balance').set('x-api-key', demoKey).expect(200);
    await request(app.getHttpServer()).get('/v1/usage/balance').set('x-api-key', demoKey).expect(200);
    await request(app.getHttpServer()).get('/v1/usage/balance').set('x-api-key', demoKey).expect(429);

    const rotate = await request(app.getHttpServer()).post('/v1/apps/keys:rotate').set('x-api-key', demoKey).send({ revokeOld: true }).expect(201);
    const newKey = rotate.body.apiKey as string;
    await request(app.getHttpServer()).get('/v1/usage/balance').set('x-api-key', newKey).expect(200);

    // Verify KEY_ROTATE log appears
    const logs = await request(app.getHttpServer()).get('/v1/usage/logs?limit=10').set('x-api-key', newKey).expect(200);
    const hasRotate = (logs.body.items || []).some((i: any) => i.eventType === 'KEY_ROTATE');
    expect(hasRotate).toBe(true);
  });
});



