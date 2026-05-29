-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerificationAttemptCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "emailVerificationLastSentAt" TIMESTAMP(3);
