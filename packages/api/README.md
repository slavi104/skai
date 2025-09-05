# @sb/api

- Start dev: `pnpm --filter @sb/api run start:dev`
- Prisma generate: `pnpm --filter @sb/api run prisma:generate`
- Prisma migrate: `pnpm --filter @sb/api run prisma:migrate`
- Seed: `pnpm --filter @sb/api run prisma:db:seed`
- E2E: `pnpm --filter @sb/api run test:e2e`

Env:

- DATABASE_URL
- RATE_LIMIT_TTL, RATE_LIMIT_LIMIT
