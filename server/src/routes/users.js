import { Router } from "express";
import { randomUUID } from "node:crypto";
import { mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";
const require = createRequire(import.meta.url);
const multer = require("multer");
const router = Router();
const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024;
const AVATAR_EXT_BY_MIME = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.resolve(__dirname, "../../uploads");
const avatarsDir = path.join(uploadsRoot, "avatars");
function toPublicUser(user) {
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
function normalizeUsername(username) {
    return username.trim().toLowerCase();
}
function isValidUsername(username) {
    return /^[a-zA-Z0-9_а-яА-ЯёЁ-]{3,24}$/.test(username);
}
function getAvatarExtension(mimeType) {
    return AVATAR_EXT_BY_MIME[mimeType] ?? "jpg";
}
function getUploadedFile(req) {
    return req.file;
}
async function removeFileIfExists(filePath) {
    try {
        await unlink(filePath);
    }
    catch {
        /* ignore */
    }
}
async function removeOldLocalAvatar(avatarUrl) {
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
            }
            catch (error) {
                callback(error, avatarsDir);
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
            callback(new Error("Можно загрузить только изображение JPG, PNG или WEBP"));
            return;
        }
        callback(null, true);
    },
});
function uploadAvatarMiddleware(req, res, next) {
    avatarUpload.single("avatar")(req, res, (error) => {
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
            message: error instanceof Error
                ? error.message
                : "Не удалось загрузить аватарку",
        });
    });
}
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
                message: "Ник должен быть от 3 до 24 символов. Можно использовать буквы, цифры, _ и -",
            });
            return;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                id: req.authUser.id,
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось обновить ник",
        });
    }
});
router.post("/me/avatar", requireAuth, uploadAvatarMiddleware, async (req, res) => {
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
                id: req.authUser.id,
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
    }
    catch (error) {
        console.error(error);
        const file = getUploadedFile(req);
        if (file) {
            await removeFileIfExists(file.path);
        }
        res.status(500).json({
            message: "Не удалось обновить аватарку",
        });
    }
});
router.delete("/me/avatar", requireAuth, async (req, res) => {
    try {
        const currentUser = await prisma.user.findUnique({
            where: {
                id: req.authUser.id,
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось удалить аватарку",
        });
    }
});
export default router;
//# sourceMappingURL=users.js.map