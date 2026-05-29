-- CreateTable
CREATE TABLE "Opening" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "eco" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "against" TEXT NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Opening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpeningVariation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "openingId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OpeningVariation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpeningStep" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "variationId" TEXT NOT NULL,
    "moveIndex" INTEGER NOT NULL,
    "san" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "arrows" JSONB,
    "squares" JSONB,

    CONSTRAINT "OpeningStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Opening_slug_key" ON "Opening"("slug");

-- CreateIndex
CREATE INDEX "Opening_side_idx" ON "Opening"("side");

-- CreateIndex
CREATE INDEX "Opening_eco_idx" ON "Opening"("eco");

-- CreateIndex
CREATE INDEX "OpeningVariation_openingId_idx" ON "OpeningVariation"("openingId");

-- CreateIndex
CREATE INDEX "OpeningVariation_orderIndex_idx" ON "OpeningVariation"("orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "OpeningVariation_openingId_key_key" ON "OpeningVariation"("openingId", "key");

-- CreateIndex
CREATE INDEX "OpeningStep_variationId_idx" ON "OpeningStep"("variationId");

-- CreateIndex
CREATE INDEX "OpeningStep_moveIndex_idx" ON "OpeningStep"("moveIndex");

-- CreateIndex
CREATE UNIQUE INDEX "OpeningStep_variationId_moveIndex_key" ON "OpeningStep"("variationId", "moveIndex");

-- AddForeignKey
ALTER TABLE "OpeningVariation" ADD CONSTRAINT "OpeningVariation_openingId_fkey" FOREIGN KEY ("openingId") REFERENCES "Opening"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningStep" ADD CONSTRAINT "OpeningStep_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "OpeningVariation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
