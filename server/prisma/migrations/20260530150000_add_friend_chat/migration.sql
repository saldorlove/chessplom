-- CreateTable
CREATE TABLE "FriendMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "FriendMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FriendMessage_senderId_recipientId_createdAt_idx"
ON "FriendMessage"("senderId", "recipientId", "createdAt");

-- CreateIndex
CREATE INDEX "FriendMessage_recipientId_readAt_idx"
ON "FriendMessage"("recipientId", "readAt");

-- CreateIndex
CREATE INDEX "FriendMessage_createdAt_idx"
ON "FriendMessage"("createdAt");

-- AddForeignKey
ALTER TABLE "FriendMessage"
ADD CONSTRAINT "FriendMessage_senderId_fkey"
FOREIGN KEY ("senderId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendMessage"
ADD CONSTRAINT "FriendMessage_recipientId_fkey"
FOREIGN KEY ("recipientId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
