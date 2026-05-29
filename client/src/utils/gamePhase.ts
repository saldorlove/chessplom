import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";

export type GamePhase = "opening" | "middlegame" | "endgame";

export type PhaseMaterial = {
  total: number;
  white: number;
  black: number;
  queens: number;
  minorPieces: number;
};

export type PhaseDevelopment = {
  whiteMinorDeveloped: number;
  blackMinorDeveloped: number;
  whiteCastled: boolean;
  blackCastled: boolean;
  whiteQueenMoved: boolean;
  blackQueenMoved: boolean;
  activeKings: number;
};

export type GamePhasePoint = {
  ply: number;
  moveNumber: number;
  san: string | null;
  fen: string;
  phase: GamePhase;
  material: PhaseMaterial;
  development: PhaseDevelopment;
};

export type GamePhaseRange = {
  phase: GamePhase;
  startPly: number;
  endPly: number;
};

export type GamePhaseTimeline = {
  points: GamePhasePoint[];
  ranges: GamePhaseRange[];
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const PIECE_VALUES: Record<PieceSymbol, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0,
};

const WHITE_MINOR_START_SQUARES: Square[] = ["b1", "g1", "c1", "f1"];
const BLACK_MINOR_START_SQUARES: Square[] = ["b8", "g8", "c8", "f8"];

function getAllSquares(): Square[] {
  const squares: Square[] = [];

  for (const file of FILES) {
    for (const rank of RANKS) {
      squares.push(`${file}${rank}` as Square);
    }
  }

  return squares;
}

const ALL_SQUARES = getAllSquares();

function getMoveNumberFromPly(ply: number) {
  return Math.floor((ply + 1) / 2);
}

function getPieceValue(type: PieceSymbol) {
  return PIECE_VALUES[type] ?? 0;
}

function getMaterial(game: Chess): PhaseMaterial {
  let total = 0;
  let white = 0;
  let black = 0;
  let queens = 0;
  let minorPieces = 0;

  for (const square of ALL_SQUARES) {
    const piece = game.get(square);

    if (!piece || piece.type === "k") {
      continue;
    }

    const value = getPieceValue(piece.type);

    total += value;

    if (piece.color === "w") {
      white += value;
    } else {
      black += value;
    }

    if (piece.type === "q") {
      queens += 1;
    }

    if (piece.type === "n" || piece.type === "b") {
      minorPieces += 1;
    }
  }

  return {
    total,
    white,
    black,
    queens,
    minorPieces,
  };
}

function isOriginalMinorPieceStillOnSquare(
  game: Chess,
  square: Square,
  color: Color
) {
  const piece = game.get(square);

  if (!piece) {
    return false;
  }

  if (piece.color !== color) {
    return false;
  }

  if (piece.type !== "n" && piece.type !== "b") {
    return false;
  }

  return true;
}

function countMinorPiecesDeveloped(game: Chess, color: Color) {
  const startSquares =
    color === "w" ? WHITE_MINOR_START_SQUARES : BLACK_MINOR_START_SQUARES;

  const undeveloped = startSquares.filter((square) =>
    isOriginalMinorPieceStillOnSquare(game, square, color)
  ).length;

  return 4 - undeveloped;
}

function getSideSans(moveHistory: string[], color: Color) {
  return moveHistory.filter((_, index) => {
    const isWhiteMove = index % 2 === 0;
    return color === "w" ? isWhiteMove : !isWhiteMove;
  });
}

function sideHasCastled(moveHistory: string[], color: Color) {
  const sideSans = getSideSans(moveHistory, color);

  return sideSans.some((san) => {
    const cleanSan = san.replace(/[+#?!]/g, "");
    return cleanSan.includes("O-O");
  });
}

function hasQueenMovedFromHome(game: Chess, color: Color) {
  const homeSquare = color === "w" ? "d1" : "d8";
  const piece = game.get(homeSquare);

  return !piece || piece.color !== color || piece.type !== "q";
}

function findKingSquare(game: Chess, color: Color): Square | null {
  for (const square of ALL_SQUARES) {
    const piece = game.get(square);

    if (piece?.type === "k" && piece.color === color) {
      return square;
    }
  }

  return null;
}

function isKingActive(game: Chess, color: Color) {
  const kingSquare = findKingSquare(game, color);

  if (!kingSquare) {
    return false;
  }

  const rank = Number(kingSquare[1]);

  if (color === "w") {
    return rank >= 3;
  }

  return rank <= 6;
}

function getDevelopment(game: Chess, moveHistory: string[]): PhaseDevelopment {
  const whiteMinorDeveloped = countMinorPiecesDeveloped(game, "w");
  const blackMinorDeveloped = countMinorPiecesDeveloped(game, "b");

  const whiteCastled = sideHasCastled(moveHistory, "w");
  const blackCastled = sideHasCastled(moveHistory, "b");

  const whiteQueenMoved = hasQueenMovedFromHome(game, "w");
  const blackQueenMoved = hasQueenMovedFromHome(game, "b");

  const activeKings =
    Number(isKingActive(game, "w")) + Number(isKingActive(game, "b"));

  return {
    whiteMinorDeveloped,
    blackMinorDeveloped,
    whiteCastled,
    blackCastled,
    whiteQueenMoved,
    blackQueenMoved,
    activeKings,
  };
}

function isOpeningComplete(ply: number, development: PhaseDevelopment) {
  const fullMoveNumber = Math.floor(ply / 2);

  const totalMinorDeveloped =
    development.whiteMinorDeveloped + development.blackMinorDeveloped;

  const bothSidesDeveloped =
    development.whiteMinorDeveloped >= 2 &&
    development.blackMinorDeveloped >= 2;

  const enoughMinorDevelopment =
    totalMinorDeveloped >= 5 || (bothSidesDeveloped && totalMinorDeveloped >= 4);

  const anyCastled = development.whiteCastled || development.blackCastled;
  const anyQueenMoved =
    development.whiteQueenMoved || development.blackQueenMoved;

  const hasStructuralProgress = anyCastled || anyQueenMoved;

  if (
    fullMoveNumber >= 8 &&
    enoughMinorDevelopment &&
    hasStructuralProgress
  ) {
    return true;
  }

  if (fullMoveNumber >= 12 && totalMinorDeveloped >= 6) {
    return true;
  }

  /*
    Fallback. Иногда дебют может быть странным:
    без рокировок, с ранними разменами, с нарушением принципов развития.
    Чтобы не держать такую позицию в дебюте бесконечно, после 15 ходов
    переводим её в миттельшпиль.
  */
  if (fullMoveNumber >= 15) {
    return true;
  }

  return false;
}

function isEndgamePosition(
  ply: number,
  material: PhaseMaterial,
  development: PhaseDevelopment
) {
  const fullMoveNumber = Math.floor(ply / 2);

  const noQueens = material.queens === 0;
  const atMostOneQueen = material.queens <= 1;
  const lowMaterial = material.total <= 15;
  const veryLowMaterial = material.total <= 10;
  const activeKingSupport = development.activeKings >= 1;

  /*
    Основное правило:
    ферзей нет или максимум один ферзь, а материала уже мало.
  */
  if (atMostOneQueen && lowMaterial) return true;

  /*
    Когда ферзей нет, можно считать эндшпилем чуть раньше,
    если короли начали выходить из начальных зон.
  */
  if (noQueens && material.total <= 18 && activeKingSupport) return true;
  if (noQueens && material.total <= 24 && material.minorPieces <= 3) return true;
  /*
    Совсем мало материала — почти всегда эндшпиль.
  */
  if (veryLowMaterial && fullMoveNumber >= 8) return true;

  return false;
}

function buildRanges(points: GamePhasePoint[]): GamePhaseRange[] {
  if (points.length === 0) {
    return [];
  }

  const ranges: GamePhaseRange[] = [];

  let currentPhase = points[0].phase;
  let startPly = points[0].ply;

  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];

    if (point.phase !== currentPhase) {
      ranges.push({
        phase: currentPhase,
        startPly,
        endPly: points[index - 1].ply,
      });

      currentPhase = point.phase;
      startPly = point.ply;
    }
  }

  ranges.push({
    phase: currentPhase,
    startPly,
    endPly: points[points.length - 1].ply,
  });

  return ranges;
}

function createPoint(
  game: Chess,
  ply: number,
  san: string | null,
  moveHistory: string[],
  openingAlreadyEnded: boolean,
  endgameAlreadyStarted: boolean
): {
  point: GamePhasePoint;
  openingEnded: boolean;
  endgameStarted: boolean;
} {
  const fen = game.fen();
  const material = getMaterial(game);
  const development = getDevelopment(game, moveHistory);

  const isEndgame =
    endgameAlreadyStarted || isEndgamePosition(ply, material, development);

  const endgameStarted = endgameAlreadyStarted || isEndgame;

  let openingEnded = openingAlreadyEnded;

  if (!openingEnded && !endgameStarted && isOpeningComplete(ply, development)) {
    openingEnded = true;
  }

  const phase: GamePhase = endgameStarted
    ? "endgame"
    : openingEnded
    ? "middlegame"
    : "opening";

  return {
    openingEnded,
    endgameStarted,
    point: {
      ply,
      moveNumber: getMoveNumberFromPly(ply),
      san,
      fen,
      phase,
      material,
      development,
    },
  };
}

export function buildGamePhaseTimeline(moveHistory: string[]): GamePhaseTimeline {
  const game = new Chess();
  const points: GamePhasePoint[] = [];

  let openingEnded = false;
  let endgameStarted = false;
  const appliedMoves: string[] = [];

  const initial = createPoint(
    game,
    0,
    null,
    appliedMoves,
    openingEnded,
    endgameStarted
  );
  openingEnded = initial.openingEnded;
  endgameStarted = initial.endgameStarted;
  points.push(initial.point);

  for (let index = 0; index < moveHistory.length; index += 1) {
    const san = moveHistory[index];

    try {
      game.move(san);
      appliedMoves.push(san);

      const ply = index + 1;
      const result = createPoint(
        game,
        ply,
        san,
        appliedMoves,
        openingEnded,
        endgameStarted
      );

      openingEnded = result.openingEnded;
      endgameStarted = result.endgameStarted;
      points.push(result.point);
    } catch {
      break;
    }
  }

  return {
    points,
    ranges: buildRanges(points),
  };
}

export function getPhaseLabel(phase: GamePhase) {
  if (phase === "opening") return "Дебют";
  if (phase === "middlegame") return "Миттельшпиль";
  return "Эндшпиль";
}