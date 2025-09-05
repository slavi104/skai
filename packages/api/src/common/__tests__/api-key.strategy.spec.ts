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
});



