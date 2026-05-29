-- AlterTable
ALTER TABLE "NewsArticle" ADD COLUMN     "author" TEXT,
ADD COLUMN     "externalUrl" TEXT,
ADD COLUMN     "sourceName" TEXT,
ADD COLUMN     "sourceUrl" TEXT;

-- CreateIndex
CREATE INDEX "NewsArticle_sourceName_idx" ON "NewsArticle"("sourceName");

-- CreateIndex
CREATE INDEX "NewsArticle_externalUrl_idx" ON "NewsArticle"("externalUrl");
