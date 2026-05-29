-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "whiteName" TEXT NOT NULL,
    "blackName" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "resultReason" TEXT,
    "timeControl" TEXT NOT NULL,
    "pgn" TEXT NOT NULL,
    "moveTimesMs" JSONB,
    "source" TEXT NOT NULL DEFAULT 'local-play',

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Game_createdAt_idx" ON "Game"("createdAt");
