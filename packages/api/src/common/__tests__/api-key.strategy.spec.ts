import { ApiKeyStrategy } from '../../common/api-key.strategy';
import { UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

describe('ApiKeyStrategy', () => {
  const prisma: any = {
    apiKey: {
      findUnique: jest.fn(),
    },
  };

  let strategy: ApiKeyStrategy;
  beforeEach(() => {
    jest.resetAllMocks();
    strategy = new ApiKeyStrategy(prisma);
  });

  it('throws Unauthorized when key inactive or app not ACTIVE', async () => {
    prisma.apiKey.findUnique.mockResolvedValue({ isActive: false, app: { status: 'ACTIVE' } });
    await expect(strategy.validateApiKey('sk_live_pub_secret')).rejects.toBeInstanceOf(UnauthorizedException);

    prisma.apiKey.findUnique.mockResolvedValue({ isActive: true, app: { status: 'SUSPENDED' } });
    await expect(strategy.validateApiKey('sk_live_pub_secret')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('validates correct secret hash', async () => {
    const secret = 'abc123xyz';
    const secretHash = await argon2.hash(secret);
    prisma.apiKey.findUnique.mockResolvedValue({
      id: 'k', isActive: true, appId: 'app', app: { status: 'ACTIVE', accountId: 'acc' }, secretHash,
    });
    const res = await strategy.validateApiKey(`sk_live_pub_${secret}`);
    expect(res.accountId).toBe('acc');
    expect(res.appId).toBe('app');
    expect(res.apiKeyId).toBe('k');
  });

  it('throws Unauthorized on invalid key format', async () => {
    await expect(strategy.validateApiKey('garbled')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('throws Unauthorized when secret does not match hash', async () => {
    const secretHash = await argon2.hash('expected');
    prisma.apiKey.findUnique.mockResolvedValue({
      id: 'k', isActive: true, appId: 'app', app: { status: 'ACTIVE', accountId: 'acc' }, secretHash,
    });
    await expect(strategy.validateApiKey('sk_live_pub_wrong')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('accepts sk_test prefix as valid', async () => {
    const secret = 'sktestsecret';
    const secretHash = await argon2.hash(secret);
    prisma.apiKey.findUnique.mockResolvedValue({
      id: 'k2', isActive: true, appId: 'app2', app: { status: 'ACTIVE', accountId: 'acc2' }, secretHash,
    });
    const res = await strategy.validateApiKey(`sk_test_pub_${secret}`);
    expect(res.accountId).toBe('acc2');
  });

  it('trims and parses key with extra spaces', async () => {
    const secret = 'trimmedSecret';
    const secretHash = await argon2.hash(secret);
    prisma.apiKey.findUnique.mockResolvedValue({
      id: 'k3', isActive: true, appId: 'app3', app: { status: 'ACTIVE', accountId: 'acc3' }, secretHash,
    });
    const res = await strategy.validateApiKey(`  sk_live_pub_${secret}  `);
    expect(res.apiKeyId).toBe('k3');
  });

  it('throws Unauthorized when api key not found in DB', async () => {
    prisma.apiKey.findUnique.mockResolvedValue(null);
    await expect(strategy.validateApiKey('sk_live_pub_secret')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejects when missing second underscore (no secret part)', async () => {
    await expect(strategy.validateApiKey('sk_live_pub')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejects when empty publicId', async () => {
    await expect(strategy.validateApiKey('sk_live__secret')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejects when empty secret', async () => {
    await expect(strategy.validateApiKey('sk_live_pub_')).rejects.toBeInstanceOf(UnauthorizedException);
  });
});



