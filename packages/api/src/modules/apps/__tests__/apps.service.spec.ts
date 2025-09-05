jest.mock('crypto', () => {
  const actual = jest.requireActual('crypto');
  return { ...actual, randomBytes: jest.fn() };
});
import { AppsService } from '../../apps/apps.service';
import { PrismaService } from '../../../prisma/prisma.service';
import * as crypto from 'crypto';

describe('AppsService.rotateKey', () => {
  const prisma = {
    $transaction: jest.fn(),
  } as unknown as PrismaService;

  let service: AppsService;

  beforeEach(() => {
    jest.resetAllMocks();
    service = new AppsService(prisma as any);
  });

  it('creates new key, revokes old when revokeOld!==false, logs event, lastFour matches', async () => {
    (crypto.randomBytes as unknown as jest.Mock).mockReset();
    (crypto.randomBytes as unknown as jest.Mock)
      .mockImplementationOnce(() => Buffer.from('a'.repeat(32), 'hex') as any)
      .mockImplementationOnce(() => Buffer.from('b'.repeat(48), 'hex') as any);

    const apiKeyUpdate = jest.fn().mockResolvedValue({});
    const apiKeyCreate = jest.fn().mockResolvedValue({ id: 'new-key-id', createdAt: new Date() });
    const usageLogCreate = jest.fn().mockResolvedValue({});

    (prisma.$transaction as any).mockImplementation(async (cb: any) =>
      cb({ apiKey: { update: apiKeyUpdate, create: apiKeyCreate }, usageLog: { create: usageLogCreate } }),
    );

    const res = await service.rotateKey({ accountId: 'acc', appId: 'app', apiKeyId: 'old' }, true);

    expect(apiKeyUpdate).toHaveBeenCalledWith({ where: { id: 'old' }, data: { isActive: false, revokedAt: expect.any(Date) } });
    expect(apiKeyCreate).toHaveBeenCalledWith({
      data: {
        appId: 'app',
        publicId: expect.any(String),
        prefix: 'sk_live',
        secretHash: expect.any(String),
        lastFour: expect.any(String),
        isActive: true,
      },
    });
    expect(usageLogCreate).toHaveBeenCalledWith({ data: { appId: 'app', apiKeyId: 'new-key-id', eventType: 'KEY_ROTATE' } });

    expect(typeof res.apiKey).toBe('string');
    const lastFourFromPlain = (res.apiKey as string).split('_').pop()!.slice(-4);
    const lastFourSaved = (apiKeyCreate.mock.calls[0][0].data as any).lastFour;
    expect(lastFourFromPlain).toBe(lastFourSaved);
  });

  it('does not revoke if revokeOld===false', async () => {
    (crypto.randomBytes as unknown as jest.Mock).mockReset();
    (crypto.randomBytes as unknown as jest.Mock)
      .mockImplementationOnce(() => Buffer.from('c'.repeat(32), 'hex') as any)
      .mockImplementationOnce(() => Buffer.from('d'.repeat(48), 'hex') as any);
    const apiKeyUpdate = jest.fn();
    const apiKeyCreate = jest.fn().mockResolvedValue({ id: 'new-key-id', createdAt: new Date() });
    const usageLogCreate = jest.fn().mockResolvedValue({});
    (prisma.$transaction as any).mockImplementation(async (cb: any) =>
      cb({ apiKey: { update: apiKeyUpdate, create: apiKeyCreate }, usageLog: { create: usageLogCreate } }),
    );

    await service.rotateKey({ accountId: 'acc', appId: 'app', apiKeyId: 'old' }, false);
    expect(apiKeyUpdate).not.toHaveBeenCalled();
    expect(apiKeyCreate).toHaveBeenCalled();
  });

  it('does not revoke when revokeOld=true but no current apiKeyId', async () => {
    (crypto.randomBytes as unknown as jest.Mock).mockReset();
    (crypto.randomBytes as unknown as jest.Mock)
      .mockImplementationOnce(() => Buffer.from('e'.repeat(32), 'hex') as any)
      .mockImplementationOnce(() => Buffer.from('f'.repeat(48), 'hex') as any);

    const apiKeyUpdate = jest.fn();
    const apiKeyCreate = jest.fn().mockResolvedValue({ id: 'new-key-id', createdAt: new Date() });
    const usageLogCreate = jest.fn().mockResolvedValue({});
    (prisma.$transaction as any).mockImplementation(async (cb: any) =>
      cb({ apiKey: { update: apiKeyUpdate, create: apiKeyCreate }, usageLog: { create: usageLogCreate } }),
    );

    await service.rotateKey({ accountId: 'acc', appId: 'app' }, true);
    expect(apiKeyUpdate).not.toHaveBeenCalled();
    expect(apiKeyCreate).toHaveBeenCalled();
  });
});



