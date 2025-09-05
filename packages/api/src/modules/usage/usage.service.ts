import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsageService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(tenant: { accountId: string; appId: string }) {
    const balance = await this.prisma.creditBalance.findUnique({
      where: { accountId: tenant.accountId },
    });
    return {
      accountId: tenant.accountId,
      available: balance?.available ?? 0,
      reserved: balance?.reserved ?? 0,
      asOf: balance?.updatedAt ?? new Date(0),
    };
  }

  async getLogs(
    tenant: { accountId: string; appId: string },
    limit: number,
    cursor?: string,
  ) {
    const items = await this.prisma.usageLog.findMany({
      where: { appId: tenant.appId },
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });

    let nextCursor: string | undefined = undefined;
    if (items.length > limit) {
      const next = items.pop();
      nextCursor = next?.id;
    }

    return { items, nextCursor };
  }
}


