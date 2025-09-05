import { UsageService } from '../../usage/usage.service';

describe('UsageService', () => {
  const prisma = {
    creditBalance: { findUnique: jest.fn() },
    usageLog: { findMany: jest.fn() },
  } as any;

  let service: UsageService;
  beforeEach(() => {
    jest.resetAllMocks();
    service = new UsageService(prisma);
  });

  it('getBalance returns defaults when missing', async () => {
    prisma.creditBalance.findUnique.mockResolvedValue(null);
    const res = await service.getBalance({ accountId: 'a', appId: 'b' });
    expect(res.available).toBe(0);
    expect(res.reserved).toBe(0);
  });

  it('getLogs paginates and clamps', async () => {
    prisma.usageLog.findMany.mockResolvedValue([{ id: '1', createdAt: new Date() }, { id: '2', createdAt: new Date() }, { id: '3', createdAt: new Date() }]);
    const { items, nextCursor } = await service.getLogs({ accountId: 'a', appId: 'b' }, 200, undefined);
    expect(items.length).toBeGreaterThan(0);
    expect(prisma.usageLog.findMany).toHaveBeenCalledWith({
      where: { appId: 'b' },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: 201,
      cursor: undefined,
      skip: 0,
    });
    expect(nextCursor === undefined || typeof nextCursor === 'string').toBe(true);
  });
});



