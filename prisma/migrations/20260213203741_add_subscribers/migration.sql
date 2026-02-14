-- CreateEnum
CREATE TYPE "SubscriberStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED', 'BOUNCED');

-- CreateEnum
CREATE TYPE "SubscriberSource" AS ENUM ('WEBSITE', 'N8N', 'IMPORT', 'STRIPE', 'BREVO', 'OTHER');

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "status" "SubscriberStatus" NOT NULL DEFAULT 'ACTIVE',
    "source" "SubscriberSource" NOT NULL DEFAULT 'WEBSITE',
    "firstName" TEXT,
    "lastName" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- CreateIndex
CREATE INDEX "Subscriber_status_subscribedAt_idx" ON "Subscriber"("status", "subscribedAt");

-- CreateIndex
CREATE INDEX "Subscriber_source_subscribedAt_idx" ON "Subscriber"("source", "subscribedAt");
