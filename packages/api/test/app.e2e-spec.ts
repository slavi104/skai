import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as argon2 from 'argon2';

describe('E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let apiKey: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);

    // Seed minimal app/key if not present
    const account = await prisma.account.upsert({
      where: { name: 'TestTenant' },
      create: { name: 'TestTenant' },
      update: {},
    });
    await prisma.creditBalance.upsert({
      where: { accountId: account.id },
      update: { available: 500 },
      create: { accountId: account.id, available: 500, reserved: 0 },
    });
    const appRow = await prisma.app.upsert({
      where: { accountId_name: { accountId: account.id, name: 'test-app' } },
      create: { accountId: account.id, name: 'test-app', status: 'ACTIVE' },
      update: {},
    });
    const pub = 'pub' + Date.now().toString(36);
    const sec = 'sec' + Date.now().toString(36) + 'abcd';
    const secretHash = await argon2.hash(sec);
    await prisma.apiKey.create({
      data: {
        appId: appRow.id,
        publicId: pub,
        prefix: 'sk_live',
        secretHash,
        lastFour: sec.slice(-4),
        isActive: true,
      },
    });
    apiKey = `sk_live_${pub}_${sec}`;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /v1/usage/balance returns numbers', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1/usage/balance')
      .set('x-api-key', apiKey)
      .expect(200);
    expect(typeof res.body.available).toBe('number');
    expect(typeof res.body.reserved).toBe('number');
  });

  it('GET /v1/usage/logs returns array and nextCursor', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1/usage/logs?limit=1')
      .set('x-api-key', apiKey)
      .expect(200);
    expect(Array.isArray(res.body.items)).toBe(true);
    expect('nextCursor' in res.body).toBe(true);
  });

  it('POST /v1/apps/keys:rotate invalidates old key; new key works', async () => {
    const rotate = await request(app.getHttpServer())
      .post('/v1/apps/keys:rotate')
      .set('x-api-key', apiKey)
      .send({ revokeOld: true })
      .expect(201);
    const newKey = rotate.body.apiKey as string;
    expect(typeof newKey).toBe('string');

    // Old key should now fail
    await request(app.getHttpServer())
      .get('/v1/usage/balance')
      .set('x-api-key', apiKey)
      .expect(401);

    // New key should work
    await request(app.getHttpServer())
      .get('/v1/usage/balance')
      .set('x-api-key', newKey)
      .expect(200);
  });
});


