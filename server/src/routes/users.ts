import { Router } from "express";
import type { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";

const require = createRequire(import.meta.url);
const multer = require("multer") as typeof import("multer");

const router = Router();

const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024;

const PUBLIC_PROFILE_GAME_SOURCES = ["online-play", "friend-play", "bot-play"];

type PublicProfileGameSource = {
  id: string;
  createdAt: Date;
  whiteName: string;
  blackName: string;
  result: string;
  resultReason: string | null;
  timeControl: string;
  timeControlCategory: string;
  moveCount: number;
  durationMs: number;
  ratingBefore: number | null;
  ratingAfter: number | null;
  ratingDelta: number | null;
  source: string;
};

function normalizeProfileUsername(username: string) {
  return username.trim().toLowerCase();
}

function getPublicProfileGamesWhere(userId: string): Prisma.GameWhereInput {
  return {
    ownerId: userId,
    source: {
      in: PUBLIC_PROFILE_GAME_SOURCES,
    },
  };
}

function toPublicProfileGame(game: PublicProfileGameSource) {
  return {
    id: game.id,
    createdAt: game.createdAt,
    whiteName: game.whiteName,
    blackName: game.blackName,
    result: game.result,
    resultReason: game.resultReason,
    timeControl: game.timeControl,
    timeControlCategory: game.timeControlCategory,
    moveCount: game.moveCount,
    durationMs: game.durationMs,
    ratingBefore: game.ratingBefore,
    ratingAfter: game.ratingAfter,
    ratingDelta: game.ratingDelta,
    source: game.source,
  };
}

function getProfilePlayerSide(
  game: Pick<PublicProfileGameSource, "whiteName" | "blackName">,
  username: string
) {
  const usernameCanonical = normalizeProfileUsername(username);

  if (normalizeProfileUsername(game.whiteName) === usernameCanonical) {
    return "white" as const;
  }

  if (normalizeProfileUsername(game.blackName) === usernameCanonical) {
    return "black" as const;
  }

  return null;
}

function buildPublicProfileStats(
  games: Array<
    Pick<PublicProfileGameSource, "whiteName" | "blackName" | "result" | "source">
  >,
  username: string
) {
  const stats = games.reduce(
    (acc, game) => {
      const side = getProfilePlayerSide(game, username);

      acc.total += 1;

      if (game.source === "online-play") {
        acc.online += 1;
      }

      if (game.source === "friend-play") {
        acc.friend += 1;
      }

      if (game.source === "bot-play") {
        acc.bot += 1;
      }

      if (game.result === "1/2-1/2") {
        acc.draws += 1;
        return acc;
      }

      if (!side) {
        return acc;
      }

      const won =
        (side === "white" && game.result === "1-0") ||
        (side === "black" && game.result === "0-1");

      if (won) {
        acc.wins += 1;
      } else {
        acc.losses += 1;
      }

      return acc;
    },
    {
      total: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      online: 0,
      friend: 0,
      bot: 0,
    }
  );

  const completedGames = stats.wins + stats.losses + stats.draws;

  return {
    ...stats,
    winRateText:
      completedGames > 0
        ? `${Math.round((stats.wins / completedGames) * 100)}%`
        : "—",
  };
}

function getPublicGamesLimit(value: unknown) {
  const parsedValue =
    typeof value === "string" && value.trim() ? Number(value) : 100;

  if (!Number.isFinite(parsedValue)) {
    return 100;
  }

  return Math.min(Math.max(Math.round(parsedValue), 1), 100);
}


const AVATAR_EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

type UploadedAvatarFile = {
  filename: string;
  path: string;
  mimetype: string;
  size: number;
};

type PublicUserSource = {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  rating?: number | null;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsRoot = path.resolve(__dirname, "../../uploads");
const avatarsDir = path.join(uploadsRoot, "avatars");

function toPublicUser(user: PublicUserSource) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
    emailVerified: Boolean(user.emailVerifiedAt),
    createdAt: user.createdAt,
    rating: user.rating ?? 1000,
  };
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

function isValidUsername(username: string) {
  return /^[a-zA-Z0-9_а-яА-ЯёЁ-]{3,24}$/.test(username);
}

function getAvatarExtension(mimeType: string) {
  return AVATAR_EXT_BY_MIME[mimeType] ?? "jpg";
}

function getUploadedFile(req: Request) {
  return (
    req as Request & {
      file?: UploadedAvatarFile;
    }
  ).file;
}

async function removeFileIfExists(filePath: string) {
  try {
    await unlink(filePath);
  } catch {
    /* ignore */
  }
}

async function removeOldLocalAvatar(avatarUrl: string | null) {
  if (!avatarUrl || !avatarUrl.startsWith("/uploads/avatars/")) {
    return;
  }

  const fileName = path.basename(avatarUrl);
  const filePath = path.join(avatarsDir, fileName);

  await removeFileIfExists(filePath);
}

const avatarUpload = multer({
  storage: multer.diskStorage({
    destination: async (_req, _file, callback) => {
      try {
        await mkdir(avatarsDir, {
          recursive: true,
        });

        callback(null, avatarsDir);
      } catch (error) {
        callback(error as Error, avatarsDir);
      }
    },

    filename: (req, file, callback) => {
      const userId = req.authUser?.id ?? "unknown-user";
      const extension = getAvatarExtension(file.mimetype);
      const safeFileName = `${userId}-${Date.now()}-${randomUUID()}.${extension}`;

      callback(null, safeFileName);
    },
  }),

  limits: {
    fileSize: MAX_AVATAR_SIZE_BYTES,
  },

  fileFilter: (_req, file, callback) => {
    if (!AVATAR_EXT_BY_MIME[file.mimetype]) {
      callback(
        new Error("Можно загрузить только изображение JPG, PNG или WEBP")
      );
      return;
    }

    callback(null, true);
  },
});

function uploadAvatarMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  avatarUpload.single("avatar")(req, res, (error: unknown) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({
          message: "Размер аватарки должен быть не больше 2 МБ",
        });
        return;
      }

      res.status(400).json({
        message: "Не удалось загрузить файл",
      });
      return;
    }

    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Не удалось загрузить аватарку",
    });
  });
}


router.get("/public/:username/games", async (req, res) => {
  try {
    const usernameCanonical = normalizeProfileUsername(req.params.username);
    const limit = getPublicGamesLimit(req.query.limit);

    const user = await prisma.user.findUnique({
      where: {
        usernameCanonical,
      },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        rating: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "Пользователь не найден",
      });
      return;
    }

    const where = getPublicProfileGamesWhere(user.id);

    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
      }),
      prisma.game.count({
        where,
      }),
    ]);

    res.json({
      user,
      games: games.map(toPublicProfileGame),
      total,
      limit,
    });
  } catch (error) {
    console.error("Не удалось загрузить публичную историю партий", error);

    res.status(500).json({
      message: "Не удалось загрузить историю партий игрока",
    });
  }
});

router.get("/public/:username", async (req, res) => {
  try {
    const usernameCanonical = normalizeProfileUsername(req.params.username);

    const user = await prisma.user.findUnique({
      where: {
        usernameCanonical,
      },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        rating: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "Пользователь не найден",
      });
      return;
    }

    const where = getPublicProfileGamesWhere(user.id);

    const [gamesForStats, recentGames] = await Promise.all([
      prisma.game.findMany({
        where,
        select: {
          id: true,
          createdAt: true,
          whiteName: true,
          blackName: true,
          result: true,
          resultReason: true,
          timeControl: true,
          timeControlCategory: true,
          moveCount: true,
          durationMs: true,
          ratingBefore: true,
          ratingAfter: true,
          ratingDelta: true,
          source: true,
        },
      }),
      prisma.game.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]);

    res.json({
      user,
      stats: buildPublicProfileStats(gamesForStats, user.username),
      recentGames: recentGames.map(toPublicProfileGame),
    });
  } catch (error) {
    console.error("Не удалось загрузить публичный профиль", error);

    res.status(500).json({
      message: "Не удалось загрузить профиль игрока",
    });
  }
});

router.patch("/me", requireAuth, async (req, res) => {
  try {
    const { username } = req.body;

    if (typeof username !== "string") {
      res.status(400).json({
        message: "Введи новый ник",
      });
      return;
    }

    const trimmedUsername = username.trim();
    const usernameCanonical = normalizeUsername(trimmedUsername);

    if (!isValidUsername(trimmedUsername)) {
      res.status(400).json({
        message:
          "Ник должен быть от 3 до 24 символов. Можно использовать буквы, цифры, _ и -",
      });
      return;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: req.authUser!.id,
      },
    });

    if (!currentUser) {
      res.status(401).json({
        message: "Пользователь не найден",
      });
      return;
    }

    if (currentUser.usernameCanonical === usernameCanonical) {
      res.json({
        user: toPublicUser(currentUser),
        message: "Ник не изменился",
      });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        usernameCanonical,
      },
    });

    if (existingUser) {
      res.status(409).json({
        message: "Такой ник уже занят",
      });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        username: trimmedUsername,
        usernameCanonical,
      },
    });

    res.json({
      user: toPublicUser(updatedUser),
      message: "Ник обновлён",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Не удалось обновить ник",
    });
  }
});

router.post(
  "/me/avatar",
  requireAuth,
  uploadAvatarMiddleware,
  async (req, res) => {
    try {
      const file = getUploadedFile(req);

      if (!file) {
        res.status(400).json({
          message: "Выбери файл аватарки",
        });
        return;
      }

      const currentUser = await prisma.user.findUnique({
        where: {
          id: req.authUser!.id,
        },
      });

      if (!currentUser) {
        await removeFileIfExists(file.path);

        res.status(401).json({
          message: "Пользователь не найден",
        });
        return;
      }

      const avatarUrl = `/uploads/avatars/${file.filename}`;

      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          avatarUrl,
        },
      });

      await removeOldLocalAvatar(currentUser.avatarUrl);

      res.json({
        user: toPublicUser(updatedUser),
        message: "Аватарка обновлена",
      });
    } catch (error) {
      console.error(error);

      const file = getUploadedFile(req);

      if (file) {
        await removeFileIfExists(file.path);
      }

      res.status(500).json({
        message: "Не удалось обновить аватарку",
      });
    }
  }
);

router.delete("/me/avatar", requireAuth, async (req, res) => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: req.authUser!.id,
      },
    });

    if (!currentUser) {
      res.status(401).json({
        message: "Пользователь не найден",
      });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        avatarUrl: null,
      },
    });

    await removeOldLocalAvatar(currentUser.avatarUrl);

    res.json({
      user: toPublicUser(updatedUser),
      message: "Аватарка удалена",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Не удалось удалить аватарку",
    });
  }
});

export default router;