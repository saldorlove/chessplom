import { Router } from "express";
import { Chess } from "chess.js";
import { prisma } from "../prisma.js";
import { optionalAuth } from "../middleware/auth.js";
const router = Router();
router.use(optionalAuth);
const STARTING_RATING = 1000;
const ONLINE_WIN_DELTA = 10;
const ONLINE_LOSS_DELTA = -10;
const ONLINE_DRAW_DELTA = 0;
const MIN_RATING = 100;
function getUsernameKey(value) {
    return value.trim().toLowerCase();
}
function getOwnerSide({ username, whiteName, blackName, }) {
    const usernameKey = getUsernameKey(username);
    if (getUsernameKey(whiteName) === usernameKey) {
        return "white";
    }
    if (getUsernameKey(blackName) === usernameKey) {
        return "black";
    }
    return null;
}
function getRatingDeltaForResult({ result, ownerSide, }) {
    if (result === "1/2-1/2") {
        return ONLINE_DRAW_DELTA;
    }
    const ownerWon = (ownerSide === "white" && result === "1-0") ||
        (ownerSide === "black" && result === "0-1");
    return ownerWon ? ONLINE_WIN_DELTA : ONLINE_LOSS_DELTA;
}
function clampRating(value) {
    return Math.max(MIN_RATING, value);
}
function isString(value) {
    return typeof value === "string" && value.trim().length > 0;
}
function getSingleQueryValue(value) {
    if (Array.isArray(value)) {
        return typeof value[0] === "string" ? value[0] : undefined;
    }
    return typeof value === "string" ? value : undefined;
}
function getNumberQueryValue(value) {
    const raw = getSingleQueryValue(value);
    if (!raw) {
        return undefined;
    }
    const number = Number(raw);
    return Number.isFinite(number) ? number : undefined;
}
function getDateQueryValue(value, endOfDay = false) {
    const raw = getSingleQueryValue(value);
    if (!raw) {
        return undefined;
    }
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
        return undefined;
    }
    if (endOfDay) {
        date.setHours(23, 59, 59, 999);
    }
    else {
        date.setHours(0, 0, 0, 0);
    }
    return date;
}
function normalizeMoveTimes(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value
        .map((item) => Number(item))
        .filter((item) => Number.isFinite(item) && item >= 0);
}
function getMoveCountFromPgn(pgn) {
    try {
        const chess = new Chess();
        chess.loadPgn(pgn);
        return Math.ceil(chess.history().length / 2);
    }
    catch {
        return 0;
    }
}
function getDurationMs(moveTimesMs) {
    return Math.round(moveTimesMs.reduce((sum, value) => {
        if (!Number.isFinite(value) || value < 0) {
            return sum;
        }
        return sum + value;
    }, 0));
}
function getTimeControlCategory(timeControl) {
    const match = timeControl.trim().match(/^(\d+)\s*\+\s*(\d+)$/);
    if (!match) {
        return "unknown";
    }
    const minutes = Number(match[1]);
    const increment = Number(match[2]);
    if (!Number.isFinite(minutes) || !Number.isFinite(increment)) {
        return "unknown";
    }
    const estimatedSeconds = minutes * 60 + increment * 40;
    if (estimatedSeconds < 3 * 60) {
        return "bullet";
    }
    if (estimatedSeconds < 10 * 60) {
        return "blitz";
    }
    if (estimatedSeconds < 30 * 60) {
        return "rapid";
    }
    return "classical";
}
function normalizeGameSource(value) {
    if (typeof value !== "string") {
        return "local-play";
    }
    const normalizedValue = value.trim();
    if (normalizedValue === "friend-play" ||
        normalizedValue === "bot-play" ||
        normalizedValue === "local-play" ||
        normalizedValue === "online-play" ||
        normalizedValue === "online-demo") {
        return normalizedValue === "online-demo" ? "online-play" : normalizedValue;
    }
    return "local-play";
}
function getResultFilter(resultGroup) {
    if (resultGroup === "white-win")
        return "1-0";
    if (resultGroup === "black-win")
        return "0-1";
    if (resultGroup === "draw")
        return "1/2-1/2";
    return undefined;
}
function getOrderBy(sort) {
    if (sort === "oldest") {
        return { createdAt: "asc" };
    }
    if (sort === "moves-desc") {
        return { moveCount: "desc" };
    }
    if (sort === "moves-asc") {
        return { moveCount: "asc" };
    }
    if (sort === "duration-desc") {
        return { durationMs: "desc" };
    }
    if (sort === "duration-asc") {
        return { durationMs: "asc" };
    }
    return { createdAt: "desc" };
}
function getSortValue(value) {
    const raw = getSingleQueryValue(value);
    if (raw === "newest" ||
        raw === "oldest" ||
        raw === "moves-desc" ||
        raw === "moves-asc" ||
        raw === "duration-desc" ||
        raw === "duration-asc") {
        return raw;
    }
    return "newest";
}
router.get("/", async (req, res) => {
    try {
        const resultGroup = getSingleQueryValue(req.query.resultGroup);
        const resultReason = getSingleQueryValue(req.query.resultReason);
        const timeControl = getSingleQueryValue(req.query.timeControl);
        const timeControlCategory = getSingleQueryValue(req.query.timeControlCategory);
        const source = getSingleQueryValue(req.query.source);
        const dateFrom = getDateQueryValue(req.query.dateFrom);
        const dateTo = getDateQueryValue(req.query.dateTo, true);
        const moveCountFrom = getNumberQueryValue(req.query.moveCountFrom);
        const moveCountTo = getNumberQueryValue(req.query.moveCountTo);
        const durationFromMs = getNumberQueryValue(req.query.durationFromMs);
        const durationToMs = getNumberQueryValue(req.query.durationToMs);
        const sort = getSortValue(req.query.sort);
        const where = {
            ownerId: req.authUser?.id ?? null,
        };
        const result = getResultFilter(resultGroup);
        if (result) {
            where.result = result;
        }
        if (resultReason && resultReason !== "all") {
            where.resultReason = resultReason;
        }
        if (timeControl && timeControl !== "all") {
            where.timeControl = timeControl;
        }
        if (timeControlCategory && timeControlCategory !== "all") {
            where.timeControlCategory = timeControlCategory;
        }
        if (source && source !== "all") {
            where.source = normalizeGameSource(source);
        }
        if (dateFrom || dateTo) {
            where.createdAt = {
                ...(dateFrom ? { gte: dateFrom } : {}),
                ...(dateTo ? { lte: dateTo } : {}),
            };
        }
        if (moveCountFrom !== undefined || moveCountTo !== undefined) {
            where.moveCount = {
                ...(moveCountFrom !== undefined ? { gte: moveCountFrom } : {}),
                ...(moveCountTo !== undefined ? { lte: moveCountTo } : {}),
            };
        }
        if (durationFromMs !== undefined || durationToMs !== undefined) {
            where.durationMs = {
                ...(durationFromMs !== undefined ? { gte: durationFromMs } : {}),
                ...(durationToMs !== undefined ? { lte: durationToMs } : {}),
            };
        }
        const games = await prisma.game.findMany({
            where,
            orderBy: getOrderBy(sort),
        });
        res.json(games);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось получить список партий",
        });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const game = await prisma.game.findFirst({
            where: {
                id: req.params.id,
                ownerId: req.authUser?.id ?? null,
            },
        });
        if (!game) {
            res.status(404).json({
                message: "Партия не найдена",
            });
            return;
        }
        res.json(game);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось получить партию",
        });
    }
});
router.post("/", async (req, res) => {
    try {
        const { whiteName, blackName, result, resultReason, timeControl, pgn, moveTimesMs, source, } = req.body;
        if (!isString(whiteName) ||
            !isString(blackName) ||
            !isString(result) ||
            !isString(timeControl) ||
            !isString(pgn)) {
            res.status(400).json({
                message: "Некорректные данные партии",
            });
            return;
        }
        const normalizedMoveTimes = normalizeMoveTimes(moveTimesMs);
        const normalizedTimeControl = timeControl.trim();
        const normalizedSource = normalizeGameSource(source);
        const normalizedWhiteName = whiteName.trim();
        const normalizedBlackName = blackName.trim();
        const normalizedResult = result.trim();
        const normalizedResultReason = typeof resultReason === "string" && resultReason.trim()
            ? resultReason.trim()
            : null;
        const ownerId = req.authUser?.id ?? null;
        const duplicateCreatedAfter = new Date(Date.now() - 10 * 60 * 1000);
        const existingGame = await prisma.game.findFirst({
            where: {
                ownerId,
                whiteName: normalizedWhiteName,
                blackName: normalizedBlackName,
                result: normalizedResult,
                resultReason: normalizedResultReason,
                timeControl: normalizedTimeControl,
                pgn,
                source: normalizedSource,
                createdAt: {
                    gte: duplicateCreatedAfter,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        if (existingGame) {
            res.status(200).json(existingGame);
            return;
        }
        const owner = ownerId
            ? await prisma.user.findUnique({
                where: {
                    id: ownerId,
                },
                select: {
                    id: true,
                    username: true,
                    rating: true,
                },
            })
            : null;
        const ownerSide = owner
            ? getOwnerSide({
                username: owner.username,
                whiteName: normalizedWhiteName,
                blackName: normalizedBlackName,
            })
            : null;
        const shouldUpdateRating = normalizedSource === "online-play" && Boolean(owner && ownerSide);
        const ratingBefore = shouldUpdateRating
            ? owner?.rating ?? STARTING_RATING
            : null;
        const ratingDelta = shouldUpdateRating && ownerSide
            ? getRatingDeltaForResult({
                result: normalizedResult,
                ownerSide,
            })
            : null;
        const ratingAfter = ratingBefore !== null && ratingDelta !== null
            ? clampRating(ratingBefore + ratingDelta)
            : null;
        const game = await prisma.$transaction(async (tx) => {
            if (shouldUpdateRating && owner && ratingAfter !== null) {
                await tx.user.update({
                    where: {
                        id: owner.id,
                    },
                    data: {
                        rating: ratingAfter,
                    },
                });
            }
            return tx.game.create({
                data: {
                    ownerId,
                    whiteName: normalizedWhiteName,
                    blackName: normalizedBlackName,
                    result: normalizedResult,
                    resultReason: normalizedResultReason,
                    timeControl: normalizedTimeControl,
                    timeControlCategory: getTimeControlCategory(normalizedTimeControl),
                    pgn,
                    moveTimesMs: normalizedMoveTimes,
                    moveCount: getMoveCountFromPgn(pgn),
                    durationMs: getDurationMs(normalizedMoveTimes),
                    ratingBefore,
                    ratingAfter,
                    ratingDelta,
                    source: normalizedSource,
                },
            });
        });
        res.status(201).json(game);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось сохранить партию",
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const result = await prisma.game.deleteMany({
            where: {
                id: req.params.id,
                ownerId: req.authUser?.id ?? null,
            },
        });
        if (result.count === 0) {
            res.status(404).json({
                message: "Партия не найдена",
            });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось удалить партию",
        });
    }
});
export default router;
//# sourceMappingURL=games.js.map