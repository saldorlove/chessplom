import { Router } from "express";

import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const CHAT_MESSAGE_MAX_LENGTH = 1000;
const CHAT_MESSAGE_RATE_LIMIT_WINDOW_MS = 5000;
const CHAT_MESSAGE_RATE_LIMIT_MAX = 10;

const recentMessageTimesByUserId = new Map<string, number[]>();

function getFriendshipPair(firstUserId: string, secondUserId: string) {
  return [firstUserId, secondUserId].sort() as [string, string];
}

async function areFriends(firstUserId: string, secondUserId: string) {
  const [userAId, userBId] = getFriendshipPair(firstUserId, secondUserId);

  const friendship = await prisma.friendship.findUnique({
    where: {
      userAId_userBId: {
        userAId,
        userBId,
      },
    },
  });

  return Boolean(friendship);
}

function normalizeMessageContent(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isRateLimited(userId: string) {
  const now = Date.now();
  const minTimestamp = now - CHAT_MESSAGE_RATE_LIMIT_WINDOW_MS;
  const recentTimes = (recentMessageTimesByUserId.get(userId) ?? []).filter(
    (timestamp) => timestamp >= minTimestamp
  );

  if (recentTimes.length >= CHAT_MESSAGE_RATE_LIMIT_MAX) {
    recentMessageTimesByUserId.set(userId, recentTimes);
    return true;
  }

  recentTimes.push(now);
  recentMessageTimesByUserId.set(userId, recentTimes);

  return false;
}

function toMessageDto(message: {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: Date;
  readAt: Date | null;
}) {
  return {
    id: message.id,
    senderId: message.senderId,
    recipientId: message.recipientId,
    content: message.content,
    createdAt: message.createdAt,
    readAt: message.readAt,
  };
}

router.get("/conversations", requireAuth, async (req, res) => {
  try {
    const userId = req.authUser!.id;

    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            userAId: userId,
          },
          {
            userBId: userId,
          },
        ],
      },
      include: {
        userA: true,
        userB: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const friends = friendships.map((friendship) =>
      friendship.userAId === userId ? friendship.userB : friendship.userA
    );

    const conversations = await Promise.all(
      friends.map(async (friend) => {
        const [lastMessage, unreadCount] = await Promise.all([
          prisma.friendMessage.findFirst({
            where: {
              OR: [
                {
                  senderId: userId,
                  recipientId: friend.id,
                },
                {
                  senderId: friend.id,
                  recipientId: userId,
                },
              ],
            },
            orderBy: {
              createdAt: "desc",
            },
          }),
          prisma.friendMessage.count({
            where: {
              senderId: friend.id,
              recipientId: userId,
              readAt: null,
            },
          }),
        ]);

        return {
          friend: {
            id: friend.id,
            username: friend.username,
            avatarUrl: friend.avatarUrl,
            rating: friend.rating ?? 1000,
          },
          lastMessage: lastMessage ? toMessageDto(lastMessage) : null,
          unreadCount,
        };
      })
    );

    conversations.sort((first, second) => {
      const firstTime = first.lastMessage?.createdAt
        ? new Date(first.lastMessage.createdAt).getTime()
        : 0;
      const secondTime = second.lastMessage?.createdAt
        ? new Date(second.lastMessage.createdAt).getTime()
        : 0;

      return secondTime - firstTime;
    });

    res.json({
      conversations,
      unreadCount: conversations.reduce(
        (total, conversation) => total + conversation.unreadCount,
        0
      ),
    });
  } catch (error) {
    console.error("Не удалось загрузить чаты", error);

    res.status(500).json({
      message: "Не удалось загрузить чаты",
    });
  }
});

router.get("/messages/:friendId", requireAuth, async (req, res) => {
  try {
    const userId = req.authUser!.id;
    const friendId = req.params.friendId;

    if (!friendId || !(await areFriends(userId, friendId))) {
      res.status(404).json({
        message: "Друг не найден",
      });
      return;
    }

    const messages = await prisma.friendMessage.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId: friendId,
          },
          {
            senderId: friendId,
            recipientId: userId,
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    res.json({
      messages: messages.reverse().map(toMessageDto),
    });
  } catch (error) {
    console.error("Не удалось загрузить сообщения", error);

    res.status(500).json({
      message: "Не удалось загрузить сообщения",
    });
  }
});

router.post("/messages/:friendId", requireAuth, async (req, res) => {
  try {
    const userId = req.authUser!.id;
    const friendId = req.params.friendId;
    const content = normalizeMessageContent(req.body.content);

    if (!friendId || !(await areFriends(userId, friendId))) {
      res.status(404).json({
        message: "Друг не найден",
      });
      return;
    }

    if (!content) {
      res.status(400).json({
        message: "Введите сообщение",
      });
      return;
    }

    if (content.length > CHAT_MESSAGE_MAX_LENGTH) {
      res.status(400).json({
        message: `Сообщение должно быть не длиннее ${CHAT_MESSAGE_MAX_LENGTH} символов`,
      });
      return;
    }

    if (isRateLimited(userId)) {
      res.status(429).json({
        message: "Слишком много сообщений. Подождите несколько секунд.",
      });
      return;
    }

    const message = await prisma.friendMessage.create({
      data: {
        senderId: userId,
        recipientId: friendId,
        content,
      },
    });

    res.status(201).json({
      message: toMessageDto(message),
    });
  } catch (error) {
    console.error("Не удалось отправить сообщение", error);

    res.status(500).json({
      message: "Не удалось отправить сообщение",
    });
  }
});

router.post("/messages/:friendId/read", requireAuth, async (req, res) => {
  try {
    const userId = req.authUser!.id;
    const friendId = req.params.friendId;

    if (!friendId || !(await areFriends(userId, friendId))) {
      res.status(404).json({
        message: "Друг не найден",
      });
      return;
    }

    const result = await prisma.friendMessage.updateMany({
      where: {
        senderId: friendId,
        recipientId: userId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });

    res.json({
      updatedCount: result.count,
    });
  } catch (error) {
    console.error("Не удалось отметить сообщения прочитанными", error);

    res.status(500).json({
      message: "Не удалось отметить сообщения прочитанными",
    });
  }
});

export default router;
