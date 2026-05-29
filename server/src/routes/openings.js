import { Router } from "express";
import { Chess } from "chess.js";
import { prisma } from "../prisma.js";
const router = Router();
const MIN_GAME_PLY_FOR_OPENING_IDENTIFICATION = 6;
const MIN_MATCHED_PLY_FOR_OPENING_IDENTIFICATION = 5;
const MIN_POSITION_PLY_FOR_OPENING_IDENTIFICATION = 5;
const MIN_FAMILY_SIGNATURE_MATCH_COUNT = 4;
const OPENING_IDENTIFICATION_LOOKUP_PLY_LIMIT = 16;
const OPENING_FAMILY_PATTERNS = [
    {
        slug: "queens-indian-defense",
        id: "family-queens-indian-early-b6",
        title: "Новоиндийская структура с ...b6",
        subtitle: "Ключевые признаки: d4, c4, ...Nf6, ...b6, часто ...Bb7",
        required: ["d4", "Nf6", "c4", "b6"],
        optional: ["Nf3", "Bb7", "g3", "a3", "Bg5"],
        minRequiredMatches: 4,
    },
    {
        slug: "nimzo-indian-defense",
        id: "family-nimzo-indian",
        title: "Нимцо-индийская защита",
        subtitle: "Ключевые признаки: d4, c4, ...Nf6, ...e6, Nc3, ...Bb4",
        required: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4"],
        optional: ["Qc2", "e3", "O-O", "d5", "c5"],
        minRequiredMatches: 5,
    },
    {
        slug: "kings-indian-defense",
        id: "family-kings-indian",
        title: "Староиндийская защита",
        subtitle: "Ключевые признаки: d4, c4, ...Nf6, ...g6, ...Bg7, ...d6",
        required: ["d4", "Nf6", "c4", "g6", "Bg7"],
        optional: ["Nc3", "e4", "d6", "O-O", "e5"],
        minRequiredMatches: 5,
    },
    {
        slug: "grunfeld-defense",
        id: "family-grunfeld",
        title: "Защита Грюнфельда",
        subtitle: "Ключевые признаки: d4, c4, ...Nf6, ...g6, Nc3, ...d5",
        required: ["d4", "Nf6", "c4", "g6", "Nc3", "d5"],
        optional: ["cxd5", "Nxd5", "e4", "Nxc3", "Bg7"],
        minRequiredMatches: 5,
    },
    {
        slug: "catalan-opening",
        id: "family-catalan",
        title: "Каталонское начало",
        subtitle: "Ключевые признаки: d4, c4, g3, Bg2 против ...Nf6/...e6/...d5",
        required: ["d4", "c4", "g3", "Bg2"],
        optional: ["Nf6", "e6", "d5", "Nf3", "O-O"],
        minRequiredMatches: 4,
    },
    {
        slug: "queens-gambit",
        id: "family-queens-gambit",
        title: "Ферзевый гамбит",
        subtitle: "Ключевые признаки: 1.d4 d5 2.c4",
        required: ["d4", "d5", "c4"],
        optional: ["e6", "dxc4", "Nc3", "Nf3", "Bg5"],
        minRequiredMatches: 3,
    },
    {
        slug: "slavic-defense",
        id: "family-slav",
        title: "Славянская защита",
        subtitle: "Ключевые признаки: d4, d5, c4, ...c6",
        required: ["d4", "d5", "c4", "c6"],
        optional: ["Nf3", "Nf6", "Nc3", "dxc4", "Bf5"],
        minRequiredMatches: 4,
    },
    {
        slug: "london-system",
        id: "family-london",
        title: "Лондонская система",
        subtitle: "Ключевые признаки: d4, Bf4, e3, Nf3/c3",
        required: ["d4", "Bf4"],
        optional: ["Nf3", "e3", "c3", "Bd3", "c5"],
        minRequiredMatches: 2,
    },
    {
        slug: "dutch-defense",
        id: "family-dutch",
        title: "Голландская защита",
        subtitle: "Ключевые признаки: 1.d4 ...f5",
        required: ["d4", "f5"],
        optional: ["c4", "Nf6", "g3", "e6", "g6", "Bg7"],
        minRequiredMatches: 2,
    },
    {
        slug: "sicilian-defense",
        id: "family-sicilian",
        title: "Сицилианская защита",
        subtitle: "Ключевые признаки: 1.e4 c5",
        required: ["e4", "c5"],
        optional: ["Nf3", "d6", "d4", "cxd4", "Nc3", "a6"],
        minRequiredMatches: 2,
    },
    {
        slug: "caro-kann-defense",
        id: "family-caro-kann",
        title: "Защита Каро-Канн",
        subtitle: "Ключевые признаки: e4, ...c6, d4, ...d5",
        required: ["e4", "c6", "d4", "d5"],
        optional: ["Nc3", "e5", "exd5", "Bf5", "c5"],
        minRequiredMatches: 4,
    },
    {
        slug: "french-defense",
        id: "family-french",
        title: "Французская защита",
        subtitle: "Ключевые признаки: e4, ...e6, d4, ...d5",
        required: ["e4", "e6", "d4", "d5"],
        optional: ["Nc3", "Nd2", "e5", "c5", "Bb4"],
        minRequiredMatches: 4,
    },
    {
        slug: "scandinavian-defense",
        id: "family-scandinavian",
        title: "Скандинавская защита",
        subtitle: "Ключевые признаки: 1.e4 d5",
        required: ["e4", "d5"],
        optional: ["exd5", "Qxd5", "Nf6", "Nc3"],
        minRequiredMatches: 2,
    },
    {
        slug: "pirc-defense",
        id: "family-pirc",
        title: "Защита Пирца-Уфимцева",
        subtitle: "Ключевые признаки: e4, d4, ...d6, ...Nf6, ...g6",
        required: ["e4", "d4", "d6", "Nf6", "g6"],
        optional: ["Nc3", "Nf3", "Bg7", "f4", "O-O"],
        minRequiredMatches: 5,
    },
    {
        slug: "modern-defense",
        id: "family-modern",
        title: "Современная защита",
        subtitle: "Ключевые признаки: e4, d4, ...g6, ...Bg7",
        required: ["e4", "d4", "g6", "Bg7"],
        optional: ["Nc3", "c4", "d6", "e5"],
        minRequiredMatches: 4,
    },
    {
        slug: "alekhine-defense",
        id: "family-alekhine",
        title: "Защита Алехина",
        subtitle: "Ключевые признаки: 1.e4 Nf6",
        required: ["e4", "Nf6"],
        optional: ["e5", "Nd5", "d4", "d6", "c4"],
        minRequiredMatches: 2,
    },
    {
        slug: "ruy-lopez",
        id: "family-ruy-lopez",
        title: "Испанская партия",
        subtitle: "Ключевые признаки: e4, e5, Nf3, Nc6, Bb5",
        required: ["e4", "e5", "Nf3", "Nc6", "Bb5"],
        optional: ["a6", "Nf6", "O-O", "Bxc6"],
        minRequiredMatches: 5,
    },
    {
        slug: "italian-game",
        id: "family-italian",
        title: "Итальянская партия",
        subtitle: "Ключевые признаки: e4, e5, Nf3, Nc6, Bc4",
        required: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
        optional: ["Bc5", "Nf6", "c3", "d4", "Ng5"],
        minRequiredMatches: 5,
    },
    {
        slug: "scotch-game",
        id: "family-scotch",
        title: "Шотландская партия",
        subtitle: "Ключевые признаки: e4, e5, Nf3, Nc6, d4",
        required: ["e4", "e5", "Nf3", "Nc6", "d4"],
        optional: ["exd4", "Nxd4", "Nf6"],
        minRequiredMatches: 5,
    },
    {
        slug: "petrov-defense",
        id: "family-petrov",
        title: "Русская партия",
        subtitle: "Ключевые признаки: e4, e5, Nf3, ...Nf6",
        required: ["e4", "e5", "Nf3", "Nf6"],
        optional: ["Nxe5", "d6", "Nxe4", "d4"],
        minRequiredMatches: 4,
    },
    {
        slug: "philidor-defense",
        id: "family-philidor",
        title: "Защита Филидора",
        subtitle: "Ключевые признаки: e4, e5, Nf3, ...d6",
        required: ["e4", "e5", "Nf3", "d6"],
        optional: ["d4", "Nf6", "Nc3", "Nbd7"],
        minRequiredMatches: 4,
    },
    {
        slug: "vienna-game",
        id: "family-vienna",
        title: "Венская партия",
        subtitle: "Ключевые признаки: e4, e5, Nc3",
        required: ["e4", "e5", "Nc3"],
        optional: ["Nf6", "Bc4", "f4", "d3"],
        minRequiredMatches: 3,
    },
    {
        slug: "english-opening",
        id: "family-english",
        title: "Английское начало",
        subtitle: "Ключевой признак: 1.c4",
        required: ["c4"],
        optional: ["e5", "c5", "Nc3", "g3", "Bg2", "Nf3"],
        minRequiredMatches: 1,
    },
    {
        slug: "reti-opening",
        id: "family-reti",
        title: "Дебют Рети",
        subtitle: "Ключевые признаки: Nf3 и последующее c4/g3",
        required: ["Nf3"],
        optional: ["c4", "g3", "Bg2", "b3", "Bb2", "d4"],
        minRequiredMatches: 1,
    },
];
function getFenKey(fen) {
    return fen.split(" ").slice(0, 4).join(" ");
}
function buildPositionKeys(moves) {
    const game = new Chess();
    const positions = [];
    for (const move of moves) {
        try {
            game.move(move);
            positions.push(getFenKey(game.fen()));
        }
        catch {
            break;
        }
    }
    return positions;
}
function includesNormalizedMove(moves, move) {
    const normalizedMove = normalizeSan(move);
    return moves.some((item) => normalizeSan(item) === normalizedMove);
}
function findFamilyPatternMatch(moves, openings) {
    const openingSlugs = new Set(openings.map((opening) => opening.slug));
    const lookupMoves = moves.slice(0, OPENING_IDENTIFICATION_LOOKUP_PLY_LIMIT);
    let bestMatch = null;
    for (const pattern of OPENING_FAMILY_PATTERNS) {
        if (!openingSlugs.has(pattern.slug)) {
            continue;
        }
        const patternMoves = lookupMoves.slice(0, pattern.maxPly ?? lookupMoves.length);
        const matchedRequiredCount = pattern.required.filter((move) => includesNormalizedMove(patternMoves, move)).length;
        const minRequired = pattern.minRequiredMatches ?? Math.max(pattern.required.length, 1);
        if (matchedRequiredCount < minRequired ||
            matchedRequiredCount < MIN_FAMILY_SIGNATURE_MATCH_COUNT) {
            continue;
        }
        const matchedOptionalCount = (pattern.optional ?? []).filter((move) => includesNormalizedMove(patternMoves, move)).length;
        const score = matchedRequiredCount * 10 + matchedOptionalCount;
        if (!bestMatch || score > bestMatch.score) {
            bestMatch = {
                pattern,
                matchedRequiredCount,
                matchedOptionalCount,
                score,
            };
        }
    }
    return bestMatch;
}
function asStringArray(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.filter((item) => typeof item === "string");
}
function asArrowArray(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value
        .filter((item) => {
        return Boolean(item) && typeof item === "object" && !Array.isArray(item);
    })
        .map((item) => ({
        from: typeof item.from === "string" ? item.from : "",
        to: typeof item.to === "string" ? item.to : "",
    }))
        .filter((item) => item.from && item.to);
}
function normalizeSan(value) {
    return value
        .replace(/[+#?!]/g, "")
        .replace(/\s+/g, "")
        .trim();
}
function mapOpeningListItem(opening) {
    return {
        id: opening.id,
        slug: opening.slug,
        eco: opening.eco,
        title: opening.title,
        side: opening.side,
        against: opening.against,
        summary: opening.summary,
        variationsCount: opening._count.variations,
    };
}
function mapOpeningDetail(opening) {
    return {
        id: opening.id,
        slug: opening.slug,
        eco: opening.eco,
        title: opening.title,
        side: opening.side,
        against: opening.against,
        summary: opening.summary,
        variations: opening.variations.map((variation) => {
            const steps = [...variation.steps].sort((left, right) => left.moveIndex - right.moveIndex);
            const annotations = steps.reduce((acc, step) => {
                acc[step.moveIndex] = {
                    explanation: step.explanation,
                    arrows: asArrowArray(step.arrows),
                    squares: asStringArray(step.squares),
                };
                return acc;
            }, {});
            return {
                id: variation.key,
                title: variation.title,
                subtitle: variation.subtitle,
                moves: steps.map((step) => step.san),
                explanations: steps.map((step) => step.explanation),
                annotations,
            };
        }),
    };
}
router.get("/", async (_req, res) => {
    try {
        const openings = await prisma.opening.findMany({
            orderBy: [{ title: "asc" }],
            include: {
                _count: {
                    select: {
                        variations: true,
                    },
                },
            },
        });
        res.json(openings.map(mapOpeningListItem));
    }
    catch (error) {
        console.error("Не удалось загрузить дебюты", error);
        res.status(500).json({
            message: "Не удалось загрузить дебюты",
        });
    }
});
router.post("/identify", async (req, res) => {
    try {
        const moves = Array.isArray(req.body?.moves)
            ? req.body.moves
                .map((move) => (typeof move === "string" ? move.trim() : ""))
                .filter(Boolean)
            : [];
        if (moves.length < MIN_GAME_PLY_FOR_OPENING_IDENTIFICATION) {
            res.json({
                opening: null,
                variation: null,
                matchedPlyCount: 0,
                totalPlyCount: 0,
                confidence: 0,
                matchType: "none",
            });
            return;
        }
        const openings = await prisma.opening.findMany({
            include: {
                variations: {
                    orderBy: {
                        orderIndex: "asc",
                    },
                    include: {
                        steps: {
                            orderBy: {
                                moveIndex: "asc",
                            },
                        },
                    },
                },
            },
        });
        let bestMatch = null;
        for (const opening of openings) {
            for (const variation of opening.variations) {
                const steps = [...variation.steps].sort((left, right) => left.moveIndex - right.moveIndex);
                let matchedPlyCount = 0;
                for (let index = 0; index < Math.min(moves.length, steps.length); index += 1) {
                    const moveSan = moves[index];
                    const step = steps[index];
                    if (!moveSan || !step) {
                        break;
                    }
                    if (normalizeSan(moveSan) !== normalizeSan(step.san)) {
                        break;
                    }
                    matchedPlyCount += 1;
                }
                if (!bestMatch ||
                    matchedPlyCount > bestMatch.matchedPlyCount ||
                    (matchedPlyCount === bestMatch.matchedPlyCount &&
                        steps.length > bestMatch.totalPlyCount)) {
                    bestMatch = {
                        opening,
                        variation,
                        matchedPlyCount,
                        totalPlyCount: steps.length,
                        line: steps.map((step) => step.san),
                        matchType: "line",
                    };
                }
            }
        }
        const hasReliableLineMatch = Boolean(bestMatch) &&
            bestMatch.matchedPlyCount >=
                MIN_MATCHED_PLY_FOR_OPENING_IDENTIFICATION;
        if (!hasReliableLineMatch) {
            const playedPositionKeys = buildPositionKeys(moves);
            for (const opening of openings) {
                for (const variation of opening.variations) {
                    const steps = [...variation.steps].sort((left, right) => left.moveIndex - right.moveIndex);
                    const line = steps.map((step) => step.san);
                    const linePositionKeys = buildPositionKeys(line);
                    let matchedPlyCount = 0;
                    for (let index = 0; index < linePositionKeys.length; index += 1) {
                        const linePositionKey = linePositionKeys[index];
                        if (!linePositionKey) {
                            continue;
                        }
                        const playedIndex = playedPositionKeys.indexOf(linePositionKey);
                        if (playedIndex === -1) {
                            continue;
                        }
                        const linePly = index + 1;
                        const playedPly = playedIndex + 1;
                        const currentMatchedPlyCount = Math.min(linePly, playedPly);
                        if (currentMatchedPlyCount > matchedPlyCount) {
                            matchedPlyCount = currentMatchedPlyCount;
                        }
                    }
                    if (matchedPlyCount >= MIN_POSITION_PLY_FOR_OPENING_IDENTIFICATION &&
                        (!bestMatch ||
                            matchedPlyCount > bestMatch.matchedPlyCount ||
                            (matchedPlyCount === bestMatch.matchedPlyCount &&
                                steps.length > bestMatch.totalPlyCount))) {
                        bestMatch = {
                            opening,
                            variation,
                            matchedPlyCount,
                            totalPlyCount: steps.length,
                            line,
                            matchType: "position",
                        };
                    }
                }
            }
        }
        const hasReliableDetailedMatch = Boolean(bestMatch) &&
            bestMatch.matchedPlyCount >=
                MIN_MATCHED_PLY_FOR_OPENING_IDENTIFICATION;
        if (!hasReliableDetailedMatch) {
            const familyMatch = findFamilyPatternMatch(moves, openings);
            if (familyMatch) {
                const opening = openings.find((item) => item.slug === familyMatch.pattern.slug);
                if (opening) {
                    res.json({
                        opening: mapOpeningListItem({
                            ...opening,
                            _count: {
                                variations: opening.variations.length,
                            },
                        }),
                        variation: {
                            id: familyMatch.pattern.id,
                            title: familyMatch.pattern.title,
                            subtitle: familyMatch.pattern.subtitle,
                        },
                        matchedPlyCount: familyMatch.matchedRequiredCount + familyMatch.matchedOptionalCount,
                        totalPlyCount: familyMatch.pattern.required.length +
                            (familyMatch.pattern.optional?.length ?? 0),
                        confidence: Math.min(0.85, (familyMatch.matchedRequiredCount +
                            familyMatch.matchedOptionalCount * 0.5) /
                            Math.max(4, familyMatch.pattern.required.length)),
                        matchType: "family",
                        line: [
                            ...familyMatch.pattern.required,
                            ...(familyMatch.pattern.optional ?? []),
                        ],
                    });
                    return;
                }
            }
        }
        const hasReliableMatch = Boolean(bestMatch) &&
            bestMatch.matchedPlyCount >=
                MIN_MATCHED_PLY_FOR_OPENING_IDENTIFICATION;
        if (!bestMatch || !hasReliableMatch) {
            res.json({
                opening: null,
                variation: null,
                matchedPlyCount: bestMatch?.matchedPlyCount ?? 0,
                totalPlyCount: bestMatch?.totalPlyCount ?? 0,
                confidence: 0,
                matchType: "none",
            });
            return;
        }
        res.json({
            opening: mapOpeningListItem({
                ...bestMatch.opening,
                _count: {
                    variations: bestMatch.opening.variations.length,
                },
            }),
            variation: {
                id: bestMatch.variation.key,
                title: bestMatch.matchType === "position"
                    ? `${bestMatch.variation.title}`
                    : bestMatch.variation.title,
                subtitle: bestMatch.variation.subtitle,
            },
            matchedPlyCount: bestMatch.matchedPlyCount,
            totalPlyCount: bestMatch.totalPlyCount,
            confidence: Math.min(1, bestMatch.matchedPlyCount / Math.max(4, bestMatch.totalPlyCount)),
            matchType: bestMatch.matchType,
            line: bestMatch.line,
        });
    }
    catch (error) {
        console.error("Не удалось определить дебют", error);
        res.status(500).json({
            message: "Не удалось определить дебют",
        });
    }
});
router.get("/:slug", async (req, res) => {
    try {
        const slug = req.params.slug.trim();
        const opening = await prisma.opening.findUnique({
            where: {
                slug,
            },
            include: {
                variations: {
                    orderBy: {
                        orderIndex: "asc",
                    },
                    include: {
                        steps: {
                            orderBy: {
                                moveIndex: "asc",
                            },
                        },
                    },
                },
            },
        });
        if (!opening) {
            res.status(404).json({
                message: "Дебют не найден",
            });
            return;
        }
        res.json(mapOpeningDetail(opening));
    }
    catch (error) {
        console.error("Не удалось загрузить дебют", error);
        res.status(500).json({
            message: "Не удалось загрузить дебют",
        });
    }
});
export default router;
//# sourceMappingURL=openings.js.map