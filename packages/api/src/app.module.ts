import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AppsModule } from './modules/apps/apps.module';
import { UsageModule } from './modules/usage/usage.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
          limit: parseInt(process.env.RATE_LIMIT_LIMIT || '60', 10),
        },
      ],
    }),
    PrismaModule,
    AppsModule,
    UsageModule,
  ],
})
export class AppModule {}


