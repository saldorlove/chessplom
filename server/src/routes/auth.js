import { Router } from "express";
import { createHash, randomInt } from "crypto";
import { createRequire } from "module";
import * as bcrypt from "bcryptjs";
import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { sendPasswordResetEmail, sendVerificationEmail } from "../services/emailService.js";
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");
const router = Router();
const EMAIL_CODE_TTL_MINUTES = getNumberEnv("EMAIL_CODE_TTL_MINUTES", 10, 1, 60);
const EMAIL_CODE_RESEND_COOLDOWN_SECONDS = getNumberEnv("EMAIL_CODE_RESEND_COOLDOWN_SECONDS", 60, 10, 3600);
const EMAIL_CODE_MAX_ATTEMPTS = getNumberEnv("EMAIL_CODE_MAX_ATTEMPTS", 5, 1, 20);
const PASSWORD_RESET_CODE_TTL_MINUTES = getNumberEnv("PASSWORD_RESET_CODE_TTL_MINUTES", EMAIL_CODE_TTL_MINUTES, 1, 60);
const PASSWORD_RESET_CODE_RESEND_COOLDOWN_SECONDS = getNumberEnv("PASSWORD_RESET_CODE_RESEND_COOLDOWN_SECONDS", EMAIL_CODE_RESEND_COOLDOWN_SECONDS, 10, 3600);
const PASSWORD_RESET_CODE_MAX_ATTEMPTS = getNumberEnv("PASSWORD_RESET_CODE_MAX_ATTEMPTS", EMAIL_CODE_MAX_ATTEMPTS, 1, 20);
function getNumberEnv(name, fallback, min, max) {
    const raw = process.env[name];
    if (!raw) {
        return fallback;
    }
    const value = Number(raw);
    if (!Number.isFinite(value)) {
        return fallback;
    }
    return Math.min(max, Math.max(min, Math.floor(value)));
}
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not set");
    }
    return secret;
}
function getEmailCodeSecret() {
    return process.env.EMAIL_CODE_SECRET || getJwtSecret();
}
function getPasswordResetCodeSecret() {
    return process.env.PASSWORD_RESET_CODE_SECRET || getEmailCodeSecret();
}
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
function normalizeUsername(username) {
    return username.trim().toLowerCase();
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidUsername(username) {
    return /^[a-zA-Z0-9_а-яА-ЯёЁ-]{3,24}$/.test(username);
}
function validatePassword(password) {
    if (password.length < 8) {
        return "Пароль должен быть не короче 8 символов";
    }
    if (password.length > 128) {
        return "Пароль слишком длинный";
    }
    return null;
}
function getRequestIp(req) {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (typeof forwardedFor === "string" && forwardedFor.trim()) {
        return forwardedFor.split(",")[0]?.trim() || null;
    }
    if (Array.isArray(forwardedFor) && forwardedFor[0]) {
        return forwardedFor[0].split(",")[0]?.trim() || null;
    }
    return req.socket.remoteAddress ?? req.ip ?? null;
}
function getRequestUserAgent(req) {
    const userAgent = req.headers["user-agent"];
    return typeof userAgent === "string" ? userAgent.slice(0, 512) : null;
}
function createEmailCode() {
    return String(randomInt(100000, 1000000));
}
function hashVerificationCode(emailCanonical, code) {
    return createHash("sha256")
        .update(`${emailCanonical}:${code}:${getEmailCodeSecret()}`)
        .digest("hex");
}
function hashPasswordResetCode(emailCanonical, code) {
    return createHash("sha256")
        .update(`password-reset:${emailCanonical}:${code}:${getPasswordResetCodeSecret()}`)
        .digest("hex");
}
function getEmailCodeExpiration() {
    const date = new Date();
    date.setMinutes(date.getMinutes() + EMAIL_CODE_TTL_MINUTES);
    return date;
}
function getPasswordResetCodeExpiration() {
    const date = new Date();
    date.setMinutes(date.getMinutes() + PASSWORD_RESET_CODE_TTL_MINUTES);
    return date;
}
function createAccessToken(userId) {
    return jwt.sign({}, getJwtSecret(), {
        subject: userId,
        expiresIn: "7d",
    });
}
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
function getVerificationSentMessage(provider) {
    if (provider === "console") {
        return "Код подтверждения создан. В DEV-режиме код выведен в консоль сервера.";
    }
    return "Код подтверждения отправлен на email.";
}
function getPasswordResetSentMessage(provider) {
    if (provider === "console") {
        return "Код восстановления создан. В DEV-режиме код выведен в консоль сервера.";
    }
    return "Код восстановления отправлен на email.";
}
async function deliverVerificationCode(user, code) {
    return sendVerificationEmail({
        to: user.email,
        username: user.username,
        code,
        expiresInMinutes: EMAIL_CODE_TTL_MINUTES,
    });
}
async function deliverPasswordResetCode(user, code) {
    return sendPasswordResetEmail({
        to: user.email,
        username: user.username,
        code,
        expiresInMinutes: PASSWORD_RESET_CODE_TTL_MINUTES,
    });
}
router.post("/register", async (req, res) => {
    try {
        const { email, username, password, confirmPassword, acceptedTerms, acceptedPrivacy, acceptedPersonalData, } = req.body;
        if (typeof email !== "string" ||
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof confirmPassword !== "string") {
            res.status(400).json({
                message: "Заполни email, ник и пароль",
            });
            return;
        }
        if (acceptedTerms !== true ||
            acceptedPrivacy !== true ||
            acceptedPersonalData !== true) {
            res.status(400).json({
                message: "Для регистрации нужно принять пользовательское соглашение, ознакомиться с политикой обработки персональных данных и дать согласие на обработку персональных данных",
            });
            return;
        }
        const trimmedEmail = email.trim();
        const trimmedUsername = username.trim();
        const emailCanonical = normalizeEmail(trimmedEmail);
        const usernameCanonical = normalizeUsername(trimmedUsername);
        if (!isValidEmail(trimmedEmail)) {
            res.status(400).json({
                message: "Некорректный email",
            });
            return;
        }
        if (!isValidUsername(trimmedUsername)) {
            res.status(400).json({
                message: "Ник должен быть от 3 до 24 символов. Можно использовать буквы, цифры, _ и -",
            });
            return;
        }
        if (password !== confirmPassword) {
            res.status(400).json({
                message: "Пароли не совпадают",
            });
            return;
        }
        const passwordError = validatePassword(password);
        if (passwordError) {
            res.status(400).json({
                message: passwordError,
            });
            return;
        }
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ emailCanonical }, { usernameCanonical }],
            },
        });
        if (existingUser) {
            res.status(409).json({
                message: "Email или ник уже занят",
            });
            return;
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const code = createEmailCode();
        const now = new Date();
        const user = await prisma.user.create({
            data: {
                email: trimmedEmail,
                emailCanonical,
                username: trimmedUsername,
                usernameCanonical,
                passwordHash,
                emailVerificationCodeHash: hashVerificationCode(emailCanonical, code),
                emailVerificationExpiresAt: getEmailCodeExpiration(),
                emailVerificationLastSentAt: now,
                emailVerificationAttemptCount: 0,
                termsAcceptedAt: now,
                privacyAcceptedAt: now,
                personalDataConsentAcceptedAt: now,
                personalDataConsentIp: getRequestIp(req),
                personalDataConsentUserAgent: getRequestUserAgent(req),
            },
        });
        let message = "Аккаунт создан.";
        try {
            const delivery = await deliverVerificationCode(user, code);
            message = `Аккаунт создан. ${getVerificationSentMessage(delivery.provider)}`;
        }
        catch (emailError) {
            console.error("Не удалось отправить код подтверждения", emailError);
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    emailVerificationLastSentAt: null,
                },
            });
            message =
                "Аккаунт создан, но письмо с кодом не удалось отправить. Нажми “Отправить код повторно” на странице подтверждения.";
        }
        const token = createAccessToken(user.id);
        res.status(201).json({
            token,
            user: toPublicUser(user),
            message,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (typeof identifier !== "string" || typeof password !== "string") {
            res.status(400).json({
                message: "Введи email или ник и пароль",
            });
            return;
        }
        const canonical = identifier.trim().toLowerCase();
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ emailCanonical: canonical }, { usernameCanonical: canonical }],
            },
        });
        if (!user) {
            res.status(401).json({
                message: "Неверный логин или пароль",
            });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Неверный логин или пароль",
            });
            return;
        }
        const token = createAccessToken(user.id);
        res.json({
            token,
            user: toPublicUser(user),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось войти",
        });
    }
});
router.get("/me", requireAuth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.authUser.id,
            },
        });
        if (!user) {
            res.status(401).json({
                message: "Пользователь не найден",
            });
            return;
        }
        res.json({
            user: toPublicUser(user),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось получить пользователя",
        });
    }
});
router.post("/verify-email", requireAuth, async (req, res) => {
    try {
        const { code } = req.body;
        if (typeof code !== "string" || !/^\d{6}$/.test(code.trim())) {
            res.status(400).json({
                message: "Введи 6-значный код",
            });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: req.authUser.id,
            },
        });
        if (!user) {
            res.status(401).json({
                message: "Пользователь не найден",
            });
            return;
        }
        if (user.emailVerifiedAt) {
            res.json({
                user: toPublicUser(user),
                message: "Email уже подтверждён",
            });
            return;
        }
        if (!user.emailVerificationCodeHash ||
            !user.emailVerificationExpiresAt ||
            user.emailVerificationExpiresAt.getTime() < Date.now()) {
            res.status(400).json({
                message: "Код истёк. Запроси новый код подтверждения",
            });
            return;
        }
        if (user.emailVerificationAttemptCount >= EMAIL_CODE_MAX_ATTEMPTS) {
            res.status(429).json({
                message: "Слишком много неверных попыток. Запроси новый код подтверждения",
            });
            return;
        }
        if (hashVerificationCode(user.emailCanonical, code.trim()) !==
            user.emailVerificationCodeHash) {
            const nextAttemptCount = user.emailVerificationAttemptCount + 1;
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerificationAttemptCount: nextAttemptCount,
                },
            });
            const attemptsLeft = Math.max(EMAIL_CODE_MAX_ATTEMPTS - nextAttemptCount, 0);
            res.status(400).json({
                message: attemptsLeft
                    ? `Неверный код подтверждения. Осталось попыток: ${attemptsLeft}`
                    : "Неверный код подтверждения. Запроси новый код",
            });
            return;
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerifiedAt: new Date(),
                emailVerificationCodeHash: null,
                emailVerificationExpiresAt: null,
                emailVerificationLastSentAt: null,
                emailVerificationAttemptCount: 0,
            },
        });
        res.json({
            user: toPublicUser(updatedUser),
            message: "Email подтверждён",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось подтвердить email",
        });
    }
});
router.post("/resend-verification", requireAuth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.authUser.id,
            },
        });
        if (!user) {
            res.status(401).json({
                message: "Пользователь не найден",
            });
            return;
        }
        if (user.emailVerifiedAt) {
            res.json({
                user: toPublicUser(user),
                message: "Email уже подтверждён",
            });
            return;
        }
        if (user.emailVerificationLastSentAt) {
            const elapsedMs = Date.now() - user.emailVerificationLastSentAt.getTime();
            const cooldownMs = EMAIL_CODE_RESEND_COOLDOWN_SECONDS * 1000;
            if (elapsedMs < cooldownMs) {
                const secondsLeft = Math.ceil((cooldownMs - elapsedMs) / 1000);
                res.status(429).json({
                    message: `Повторно отправить код можно через ${secondsLeft} сек.`,
                });
                return;
            }
        }
        const code = createEmailCode();
        const now = new Date();
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerificationCodeHash: hashVerificationCode(user.emailCanonical, code),
                emailVerificationExpiresAt: getEmailCodeExpiration(),
                emailVerificationLastSentAt: now,
                emailVerificationAttemptCount: 0,
            },
        });
        try {
            const delivery = await deliverVerificationCode(updatedUser, code);
            res.json({
                user: toPublicUser(updatedUser),
                message: getVerificationSentMessage(delivery.provider),
            });
        }
        catch (emailError) {
            console.error("Не удалось повторно отправить код подтверждения", emailError);
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerificationLastSentAt: null,
                },
            });
            res.status(502).json({
                message: "Не удалось отправить письмо. Проверь настройки EMAIL_PROVIDER / RESEND_API_KEY / MAIL_FROM и попробуй ещё раз.",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось отправить код повторно",
        });
    }
});
router.post("/request-password-reset", async (req, res) => {
    try {
        const { email } = req.body;
        if (typeof email !== "string" || !isValidEmail(email.trim())) {
            res.status(400).json({
                message: "Введи корректный email",
            });
            return;
        }
        const emailCanonical = normalizeEmail(email);
        const user = await prisma.user.findUnique({
            where: {
                emailCanonical,
            },
        });
        const genericMessage = "Если аккаунт с таким email существует, код восстановления будет отправлен.";
        if (!user) {
            res.json({
                message: genericMessage,
            });
            return;
        }
        if (user.passwordResetLastSentAt) {
            const elapsedMs = Date.now() - user.passwordResetLastSentAt.getTime();
            const cooldownMs = PASSWORD_RESET_CODE_RESEND_COOLDOWN_SECONDS * 1000;
            if (elapsedMs < cooldownMs) {
                const secondsLeft = Math.ceil((cooldownMs - elapsedMs) / 1000);
                res.status(429).json({
                    message: `Повторно отправить код можно через ${secondsLeft} сек.`,
                });
                return;
            }
        }
        const code = createEmailCode();
        const now = new Date();
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                passwordResetCodeHash: hashPasswordResetCode(user.emailCanonical, code),
                passwordResetExpiresAt: getPasswordResetCodeExpiration(),
                passwordResetLastSentAt: now,
                passwordResetAttemptCount: 0,
            },
        });
        try {
            const delivery = await deliverPasswordResetCode(updatedUser, code);
            res.json({
                message: getPasswordResetSentMessage(delivery.provider),
            });
        }
        catch (emailError) {
            console.error("Не удалось отправить код восстановления пароля", emailError);
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    passwordResetLastSentAt: null,
                },
            });
            res.status(502).json({
                message: "Не удалось отправить письмо. Проверь настройки EMAIL_PROVIDER / RESEND_API_KEY / MAIL_FROM и попробуй ещё раз.",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось запросить восстановление пароля",
        });
    }
});
router.post("/verify-password-reset-code", async (req, res) => {
    try {
        const { email, code } = req.body;
        if (typeof email !== "string" || typeof code !== "string") {
            res.status(400).json({
                message: "Введи email и код восстановления",
            });
            return;
        }
        if (!isValidEmail(email.trim())) {
            res.status(400).json({
                message: "Введи корректный email",
            });
            return;
        }
        if (!/^\d{6}$/.test(code.trim())) {
            res.status(400).json({
                message: "Введи 6-значный код",
            });
            return;
        }
        const emailCanonical = normalizeEmail(email);
        const user = await prisma.user.findUnique({
            where: {
                emailCanonical,
            },
        });
        if (!user ||
            !user.passwordResetCodeHash ||
            !user.passwordResetExpiresAt ||
            user.passwordResetExpiresAt.getTime() < Date.now()) {
            res.status(400).json({
                message: "Код восстановления истёк или неверен. Запроси новый код",
            });
            return;
        }
        if (user.passwordResetAttemptCount >= PASSWORD_RESET_CODE_MAX_ATTEMPTS) {
            res.status(429).json({
                message: "Слишком много неверных попыток. Запроси новый код восстановления",
            });
            return;
        }
        if (hashPasswordResetCode(user.emailCanonical, code.trim()) !==
            user.passwordResetCodeHash) {
            const nextAttemptCount = user.passwordResetAttemptCount + 1;
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    passwordResetAttemptCount: nextAttemptCount,
                },
            });
            const attemptsLeft = Math.max(PASSWORD_RESET_CODE_MAX_ATTEMPTS - nextAttemptCount, 0);
            res.status(400).json({
                message: attemptsLeft
                    ? `Неверный код восстановления. Осталось попыток: ${attemptsLeft}`
                    : "Неверный код восстановления. Запроси новый код",
            });
            return;
        }
        res.json({
            message: "Код подтверждён. Теперь можно задать новый пароль.",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось проверить код восстановления",
        });
    }
});
router.post("/reset-password", async (req, res) => {
    try {
        const { email, code, password, confirmPassword } = req.body;
        if (typeof email !== "string" ||
            typeof code !== "string" ||
            typeof password !== "string" ||
            typeof confirmPassword !== "string") {
            res.status(400).json({
                message: "Введи email, код и новый пароль",
            });
            return;
        }
        if (!isValidEmail(email.trim())) {
            res.status(400).json({
                message: "Введи корректный email",
            });
            return;
        }
        if (!/^\d{6}$/.test(code.trim())) {
            res.status(400).json({
                message: "Введи 6-значный код",
            });
            return;
        }
        if (password !== confirmPassword) {
            res.status(400).json({
                message: "Пароли не совпадают",
            });
            return;
        }
        const passwordError = validatePassword(password);
        if (passwordError) {
            res.status(400).json({
                message: passwordError,
            });
            return;
        }
        const emailCanonical = normalizeEmail(email);
        const user = await prisma.user.findUnique({
            where: {
                emailCanonical,
            },
        });
        if (!user ||
            !user.passwordResetCodeHash ||
            !user.passwordResetExpiresAt ||
            user.passwordResetExpiresAt.getTime() < Date.now()) {
            res.status(400).json({
                message: "Код восстановления истёк или неверен. Запроси новый код",
            });
            return;
        }
        if (user.passwordResetAttemptCount >= PASSWORD_RESET_CODE_MAX_ATTEMPTS) {
            res.status(429).json({
                message: "Слишком много неверных попыток. Запроси новый код восстановления",
            });
            return;
        }
        if (hashPasswordResetCode(user.emailCanonical, code.trim()) !==
            user.passwordResetCodeHash) {
            const nextAttemptCount = user.passwordResetAttemptCount + 1;
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    passwordResetAttemptCount: nextAttemptCount,
                },
            });
            const attemptsLeft = Math.max(PASSWORD_RESET_CODE_MAX_ATTEMPTS - nextAttemptCount, 0);
            res.status(400).json({
                message: attemptsLeft
                    ? `Неверный код восстановления. Осталось попыток: ${attemptsLeft}`
                    : "Неверный код восстановления. Запроси новый код",
            });
            return;
        }
        const passwordHash = await bcrypt.hash(password, 12);
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                passwordHash,
                emailVerifiedAt: user.emailVerifiedAt ?? new Date(),
                emailVerificationCodeHash: null,
                emailVerificationExpiresAt: null,
                emailVerificationLastSentAt: null,
                emailVerificationAttemptCount: 0,
                passwordResetCodeHash: null,
                passwordResetExpiresAt: null,
                passwordResetLastSentAt: null,
                passwordResetAttemptCount: 0,
            },
        });
        res.json({
            message: "Пароль обновлён. Теперь можно войти с новым паролем.",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось обновить пароль",
        });
    }
});
export default router;
//# sourceMappingURL=auth.js.map