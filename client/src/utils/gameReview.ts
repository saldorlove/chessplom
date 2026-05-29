import { Chess } from "chess.js";
import {
  buildGamePhaseTimeline,
  getPhaseLabel,
  type GamePhase,
} from "./gamePhase";

export type Side = "w" | "b";

export type MoveQuality = "best" | "good" | "inaccuracy" | "mistake" | "blunder";

export type ReviewMovePoint = {
  ply: number;
  moveNumber: number;
  side: Side;
  san: string;
  phase: GamePhase;
  evaluationBeforeCp: number | null;
  evaluationAfterCp: number | null;
  lossCp: number | null;
  quality: MoveQuality;
  timeMs?: number;
};

export type ReviewSideSummary = {
  side: Side;
  inaccuracies: number;
  mistakes: number;
  blunders: number;
  averageCentipawnLoss: number;
  accuracy: number;
};

export type ReviewPhaseSummary = {
  phase: GamePhase;
  label: string;
  plyCount: number;
  moveCount: number;
  startMoveNumber: number | null;
  endMoveNumber: number | null;
  averageTimeMs: number | null;
  averageLossCp: number | null;
};

export type GameReviewSummary = {
  moves: ReviewMovePoint[];
  white: ReviewSideSummary;
  black: ReviewSideSummary;
  phases: ReviewPhaseSummary[];
  chartPoints: {
    ply: number;
    moveNumber: number;
    phase: GamePhase;
    evaluationCp: number | null;
  }[];
};

const DEFAULT_PHASES: GamePhase[] = ["opening", "middlegame", "endgame"];
const CHECKMATE_EVALUATION_CP = 10_000;

function getTerminalAwareEvaluationsCp(
  moveHistory: string[],
  evaluationsCp: Array<number | null>
) {
  const normalizedEvaluationsCp = [...evaluationsCp];

  if (moveHistory.length === 0) {
    return normalizedEvaluationsCp;
  }

  const game = new Chess();

  for (const san of moveHistory) {
    try {
      game.move(san);
    } catch {
      return normalizedEvaluationsCp;
    }
  }

  if (!game.isCheckmate()) {
    return normalizedEvaluationsCp;
  }

  /*
    chess.js возвращает сторону, которая должна ходить.
    Если позиция матовая, именно эта сторона получила мат.

    Оценка графика всегда хранится с точки зрения белых:
    +10000 = белые выиграли матом
    -10000 = чёрные выиграли матом
  */
  const matedSide = game.turn() as Side;

  normalizedEvaluationsCp[moveHistory.length] =
    matedSide === "w" ? -CHECKMATE_EVALUATION_CP : CHECKMATE_EVALUATION_CP;

  return normalizedEvaluationsCp;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getSideByPly(ply: number): Side {
  return ply % 2 === 1 ? "w" : "b";
}

/*
  Оценка в centipawn считается с точки зрения белых:
  +100 = белым лучше на 1 пешку
  -100 = чёрным лучше на 1 пешку

  Для белых хороший ход обычно повышает оценку.
  Для чёрных хороший ход обычно понижает оценку.
*/
function getLossCp(
  side: Side,
  before: number | null,
  after: number | null
): number | null {
  if (before === null || after === null) {
    return null;
  }

  const delta = after - before;

  if (side === "w") {
    return Math.max(0, -delta);
  }

  return Math.max(0, delta);
}

function getMoveQuality(lossCp: number | null): MoveQuality {
  if (lossCp === null) return "good";
  if (lossCp >= 300) return "blunder";
  if (lossCp >= 150) return "mistake";
  if (lossCp >= 70) return "inaccuracy";
  if (lossCp <= 15) return "best";
  return "good";
}

function getAccuracyFromAverageLoss(averageLossCp: number) {
  /*
    Простая MVP-формула.
    Не копирует chess.com/lichess, но даёт понятную шкалу:
    0 cp  -> 100%
    50 cp -> около 90%
    100 cp -> около 82%
    200 cp -> около 67%
    300 cp -> около 55%
  */
  const accuracy = 103 * Math.exp(-averageLossCp / 325) - 3;
  return Math.round(clamp(accuracy, 0, 100));
}

function summarizeSide(side: Side, moves: ReviewMovePoint[]): ReviewSideSummary {
  const sideMoves = moves.filter((move) => move.side === side);
  const losses = sideMoves
    .map((move) => move.lossCp)
    .filter((loss): loss is number => loss !== null);

  const averageCentipawnLoss =
    losses.length > 0
      ? Math.round(losses.reduce((sum, loss) => sum + loss, 0) / losses.length)
      : 0;

  return {
    side,
    inaccuracies: sideMoves.filter((move) => move.quality === "inaccuracy")
      .length,
    mistakes: sideMoves.filter((move) => move.quality === "mistake").length,
    blunders: sideMoves.filter((move) => move.quality === "blunder").length,
    averageCentipawnLoss,
    accuracy: getAccuracyFromAverageLoss(averageCentipawnLoss),
  };
}

function summarizePhase(
  phase: GamePhase,
  moves: ReviewMovePoint[]
): ReviewPhaseSummary {
  const phaseMoves = moves.filter((move) => move.phase === phase);

  const times = phaseMoves
    .map((move) => move.timeMs)
    .filter((time): time is number => time !== undefined && time >= 0);

  const losses = phaseMoves
    .map((move) => move.lossCp)
    .filter((loss): loss is number => loss !== null);

  const moveNumbers = phaseMoves.map((move) => move.moveNumber);

  const startMoveNumber =
    moveNumbers.length > 0 ? Math.min(...moveNumbers) : null;

  const endMoveNumber =
    moveNumbers.length > 0 ? Math.max(...moveNumbers) : null;

  const moveCount =
    startMoveNumber !== null && endMoveNumber !== null
      ? endMoveNumber - startMoveNumber + 1
      : 0;

  return {
    phase,
    label: getPhaseLabel(phase),
    plyCount: phaseMoves.length,
    moveCount,
    startMoveNumber,
    endMoveNumber,
    averageTimeMs:
      times.length > 0
        ? Math.round(times.reduce((sum, time) => sum + time, 0) / times.length)
        : null,
    averageLossCp:
      losses.length > 0
        ? Math.round(losses.reduce((sum, loss) => sum + loss, 0) / losses.length)
        : null,
  };
}

/*
  moveHistory:
    ["e4", "e5", "Nf3", ...]

  evaluationsCp:
    массив оценок позиции по ply:
    index 0 = оценка стартовой позиции
    index 1 = оценка после первого хода
    index 2 = оценка после второго хода
    и т.д.

  moveTimesMs:
    index 0 = время на первый ход
    index 1 = время на второй ход
    и т.д.
*/
export function buildGameReviewSummary({
  moveHistory,
  evaluationsCp,
  moveTimesMs = [],
}: {
  moveHistory: string[];
  evaluationsCp: Array<number | null>;
  moveTimesMs?: number[];
}): GameReviewSummary {
  const phaseTimeline = buildGamePhaseTimeline(moveHistory);
  const normalizedEvaluationsCp = getTerminalAwareEvaluationsCp(
    moveHistory,
    evaluationsCp
  );
  const phaseByPly = new Map(
    phaseTimeline.points.map((point) => [point.ply, point.phase])
  );

  const moves: ReviewMovePoint[] = moveHistory.map((san, index) => {
    const ply = index + 1;
    const side = getSideByPly(ply);
    const evaluationBeforeCp = normalizedEvaluationsCp[ply - 1] ?? null;
    const evaluationAfterCp = normalizedEvaluationsCp[ply] ?? null;
    const lossCp = getLossCp(side, evaluationBeforeCp, evaluationAfterCp);
    const quality = getMoveQuality(lossCp);

    return {
      ply,
      moveNumber: Math.floor((index + 2) / 2),
      side,
      san,
      phase: phaseByPly.get(ply) ?? "middlegame",
      evaluationBeforeCp,
      evaluationAfterCp,
      lossCp,
      quality,
      timeMs: moveTimesMs[index],
    };
  });

  return {
    moves,
    white: summarizeSide("w", moves),
    black: summarizeSide("b", moves),
    phases: DEFAULT_PHASES.map((phase) => summarizePhase(phase, moves)),
    chartPoints: phaseTimeline.points.map((point) => ({
      ply: point.ply,
      moveNumber: point.moveNumber,
      phase: point.phase,
      evaluationCp: normalizedEvaluationsCp[point.ply] ?? null,
    })),
  };
}

export function getMoveQualityLabel(quality: MoveQuality) {
  if (quality === "best") return "Лучший";
  if (quality === "good") return "Хороший";
  if (quality === "inaccuracy") return "Неточность";
  if (quality === "mistake") return "Ошибка";
  return "Зевок";
}