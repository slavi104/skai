-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Enums
CREATE TYPE "AppStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'ARCHIVED');
CREATE TYPE "FieldType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'JSON', 'DATETIME');
CREATE TYPE "JobStatus" AS ENUM ('QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELED');
CREATE TYPE "UsageEvent" AS ENUM ('REQUEST', 'CREDIT_DEBIT', 'KEY_ROTATE', 'OTHER');

-- Tables
CREATE TABLE "Account" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "Account_name_key" ON "Account" ("name");

CREATE TABLE "App" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "accountId" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "status" "AppStatus" NOT NULL DEFAULT 'ACTIVE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "App_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "App_accountId_name_key" ON "App" ("accountId", "name");

CREATE TABLE "ApiKey" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "appId" UUID NOT NULL,
  "publicId" TEXT NOT NULL,
  "prefix" TEXT NOT NULL DEFAULT 'sk_live',
  "secretHash" TEXT NOT NULL,
  "lastFour" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "revokedAt" TIMESTAMP(3),
  CONSTRAINT "ApiKey_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "ApiKey_publicId_key" ON "ApiKey" ("publicId");

CREATE TABLE "Entity" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "appId" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "note" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Entity_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "Entity_appId_name_key" ON "Entity" ("appId", "name");

CREATE TABLE "Field" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "entityId" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "type" "FieldType" NOT NULL,
  "required" BOOLEAN NOT NULL DEFAULT FALSE,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Field_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "Field_entityId_name_key" ON "Field" ("entityId", "name");

CREATE TABLE "Job" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "appId" UUID NOT NULL,
  "type" TEXT NOT NULL,
  "status" "JobStatus" NOT NULL DEFAULT 'QUEUED',
  "input" JSONB,
  "output" JSONB,
  "error" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "startedAt" TIMESTAMP(3),
  "finishedAt" TIMESTAMP(3),
  CONSTRAINT "Job_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "UsageLog" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "appId" UUID NOT NULL,
  "apiKeyId" UUID,
  "eventType" "UsageEvent" NOT NULL,
  "endpoint" TEXT,
  "statusCode" INTEGER,
  "credits" INTEGER NOT NULL DEFAULT 0,
  "meta" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UsageLog_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "UsageLog_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "ApiKey"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE "CreditBalance" (
  "accountId" UUID PRIMARY KEY,
  "available" INTEGER NOT NULL DEFAULT 0,
  "reserved" INTEGER NOT NULL DEFAULT 0,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CreditBalance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);


