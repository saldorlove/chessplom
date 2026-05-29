-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "durationMs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "moveCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timeControlCategory" TEXT NOT NULL DEFAULT 'unknown';

-- CreateIndex
CREATE INDEX "Game_result_idx" ON "Game"("result");

-- CreateIndex
CREATE INDEX "Game_resultReason_idx" ON "Game"("resultReason");

-- CreateIndex
CREATE INDEX "Game_timeControl_idx" ON "Game"("timeControl");

-- CreateIndex
CREATE INDEX "Game_timeControlCategory_idx" ON "Game"("timeControlCategory");

-- CreateIndex
CREATE INDEX "Game_moveCount_idx" ON "Game"("moveCount");

-- CreateIndex
CREATE INDEX "Game_durationMs_idx" ON "Game"("durationMs");
