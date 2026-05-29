-- AlterTable
ALTER TABLE "User" ADD COLUMN     "personalDataConsentAcceptedAt" TIMESTAMP(3),
ADD COLUMN     "personalDataConsentIp" TEXT,
ADD COLUMN     "personalDataConsentUserAgent" TEXT,
ADD COLUMN     "privacyAcceptedAt" TIMESTAMP(3),
ADD COLUMN     "termsAcceptedAt" TIMESTAMP(3);
