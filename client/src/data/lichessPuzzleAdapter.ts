import { Chess, type Square } from "chess.js";
import type {
  TacticDifficulty,
  TacticPuzzle,
  TacticSide,
  TacticTheme,
} from "./tacticsTypes";

export type LichessPuzzleRow = {
  puzzleId: string;
  fen: string;
  moves: string;
  rating: number;
  ratingDeviation?: number;
  popularity?: number;
  nbPlays?: number;
  themes: string;
  gameUrl?: string;
  openingTags?: string;
};

function getDifficultyByRating(rating: number): TacticDifficulty {
  if (rating < 1000) return "Лёгкая";
  if (rating < 1500) return "Средняя";
  return "Сложная";
}

function normalizeLichessTheme(theme: string) {
  return theme.trim().toLowerCase();
}

function getThemeFromLichessThemes(themes: string): TacticTheme {
  const normalizedThemes = themes
    .split(/\s+/)
    .map(normalizeLichessTheme)
    .filter(Boolean);

  if (
    normalizedThemes.includes("backrankmate") ||
    normalizedThemes.includes("backrank")
  ) {
    return "Последняя горизонталь";
  }

  if (
    normalizedThemes.includes("mate") ||
    normalizedThemes.includes("matein1") ||
    normalizedThemes.includes("matein2") ||
    normalizedThemes.includes("matein3") ||
    normalizedThemes.includes("matein4") ||
    normalizedThemes.includes("matein5")
  ) {
    return "Мат";
  }

  if (normalizedThemes.includes("fork")) {
    return "Вилка";
  }

  if (
    normalizedThemes.includes("pin") ||
    normalizedThemes.includes("skewer") ||
    normalizedThemes.includes("xrayattack")
  ) {
    return "Связка";
  }

  if (
    normalizedThemes.includes("kingsideattack") ||
    normalizedThemes.includes("attack") ||
    normalizedThemes.includes("sacrifice")
  ) {
    return "Атака на короля";
  }

  if (
    normalizedThemes.includes("hangingpiece") ||
    normalizedThemes.includes("material") ||
    normalizedThemes.includes("capturingdefender") ||
    normalizedThemes.includes("discoveredattack") ||
    normalizedThemes.includes("deflection") ||
    normalizedThemes.includes("decoy")
  ) {
    return "Выигрыш материала";
  }

  return "Лучший ход";
}

function getReadableTitle(theme: TacticTheme) {
  if (theme === "Мат") return "Найдите матующую идею";
  if (theme === "Последняя горизонталь") return "Мотив последней горизонтали";
  if (theme === "Вилка") return "Тактическая вилка";
  if (theme === "Связка") return "Использование связки";
  if (theme === "Атака на короля") return "Атака на короля";
  if (theme === "Выигрыш материала") return "Выигрыш материала";
  return "Найдите лучший ход";
}

function getReadableDescription(theme: TacticTheme) {
  if (theme === "Мат") {
    return "В позиции есть тактическая возможность завершить атаку на короля.";
  }

  if (theme === "Последняя горизонталь") {
    return "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.";
  }

  if (theme === "Вилка") {
    return "Найдите ход, который создаёт сразу несколько угроз.";
  }

  if (theme === "Связка") {
    return "Используйте связанную фигуру, линию атаки или перегрузку защиты.";
  }

  if (theme === "Атака на короля") {
    return "Найдите самый сильный ход для продолжения атаки на короля.";
  }

  if (theme === "Выигрыш материала") {
    return "В позиции можно выиграть материал точным тактическим ходом.";
  }

  return "В позиции есть сильный ход. Проверьте шахи, взятия и угрозы.";
}

function getSuccessText(theme: TacticTheme) {
  if (theme === "Мат") return "Матовая идея найдена.";
  if (theme === "Последняя горизонталь") return "Мотив последней горизонтали найден.";
  if (theme === "Вилка") return "Вилка найдена, материал выигран.";
  if (theme === "Связка") return "Связка использована правильно.";
  if (theme === "Атака на короля") return "Атака проведена точно.";
  if (theme === "Выигрыш материала") return "Материал выигран.";
  return "Лучший ход найден.";
}

function getHintByTheme(theme: TacticTheme) {
  if (theme === "Мат") {
    return "Сначала проверь все шахи. Часто мат начинается с forcing move.";
  }

  if (theme === "Последняя горизонталь") {
    return "Проверь, ограничен ли король своими фигурами и пешками.";
  }

  if (theme === "Вилка") {
    return "Ищи ход, который атакует сразу две важные фигуры.";
  }

  if (theme === "Связка") {
    return "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.";
  }

  if (theme === "Атака на короля") {
    return "Проверь шахи, жертвы и угрозы около короля.";
  }

  if (theme === "Выигрыш материала") {
    return "Проверь взятия, незащищённые фигуры и перегруженных защитников.";
  }

  return "Попробуй найти forcing move: шах, взятие или угрозу.";
}

function splitSolutionMoves(moves: string) {
  return moves
    .trim()
    .split(/\s+/)
    .map((move) => move.trim())
    .filter(Boolean);
}

function isValidUciMove(value: string) {
  return /^[a-h][1-8][a-h][1-8][qrbn]?$/.test(value);
}

function parseUciMove(uciMove: string) {
  const from = uciMove.slice(0, 2) as Square;
  const to = uciMove.slice(2, 4) as Square;
  const rawPromotion = uciMove.slice(4, 5);

  const promotion =
    rawPromotion === "q" ||
    rawPromotion === "r" ||
    rawPromotion === "b" ||
    rawPromotion === "n"
      ? rawPromotion
      : undefined;

  return {
    from,
    to,
    promotion,
  };
}

function applyUciMove(game: Chess, uciMove: string) {
  if (!isValidUciMove(uciMove)) {
    return null;
  }

  const { from, to, promotion } = parseUciMove(uciMove);

  try {
    return game.move({
      from,
      to,
      promotion,
    });
  } catch {
    return null;
  }
}

function isSolutionLegal(fen: string, solution: string[]) {
  try {
    const game = new Chess(fen);

    for (const uciMove of solution) {
      const move = applyUciMove(game, uciMove);

      if (!move) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

function buildPuzzleId(puzzleId: string) {
  return `lichess-${puzzleId.trim()}`;
}

export function adaptLichessPuzzleRow(
  row: LichessPuzzleRow
): TacticPuzzle | null {
  try {
    const rawMoves = splitSolutionMoves(row.moves);

    if (rawMoves.length < 2) {
      return null;
    }

    /**
     * В Lichess Puzzle Dataset:
     * - row.fen — позиция ДО хода из партии;
     * - rawMoves[0] — ход из партии, после которого начинается задача;
     * - rawMoves.slice(1) — собственно решение задачи.
     */
    const setupGame = new Chess(row.fen);
    const setupMove = applyUciMove(setupGame, rawMoves[0]);

    if (!setupMove) {
      return null;
    }

    const puzzleFen = setupGame.fen();
    const solution = rawMoves.slice(1);

    if (solution.length === 0) {
      return null;
    }

    if (!isSolutionLegal(puzzleFen, solution)) {
      return null;
    }

    const theme = getThemeFromLichessThemes(row.themes);

    const tags = row.themes
      .split(/\s+/)
      .map((tag) => tag.trim())
      .filter(Boolean);

    return {
      id: buildPuzzleId(row.puzzleId),
      title: getReadableTitle(theme),
      description: getReadableDescription(theme),
      source: "Lichess Puzzle Dataset",

      theme,
      difficulty: getDifficultyByRating(row.rating),
      rating: row.rating,
      sideToMove: setupGame.turn() as TacticSide,
      tags,

      fen: puzzleFen,
      solution,

      hint: getHintByTheme(theme),
      successText: getSuccessText(theme),
    };
  } catch {
    return null;
  }
}

export function adaptLichessPuzzleRows(rows: LichessPuzzleRow[]) {
  return rows
    .map(adaptLichessPuzzleRow)
    .filter((puzzle): puzzle is TacticPuzzle => puzzle !== null);
}