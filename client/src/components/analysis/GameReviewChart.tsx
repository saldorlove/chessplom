import type { MouseEvent } from "react";
import { buildGameReviewSummary } from "../../utils/gameReview";
import { getPhaseLabel, type GamePhase } from "../../utils/gamePhase";
import "../../styles/gameReview.css";

type GameReviewChartProps = {
  moveHistory: string[];
  evaluationsCp: Array<number | null>;
  moveTimesMs?: number[];
  isAnalyzing?: boolean;
  statusText?: string;
  currentMoveIndex?: number;
  onJumpToMove?: (targetIndex: number | null) => void;
};

const PHASE_CLASS: Record<GamePhase, string> = {
  opening: "opening",
  middlegame: "middlegame",
  endgame: "endgame",
};

type ChartPoint = {
  ply: number;
  moveNumber: number;
  phase: GamePhase;
  evaluationCp: number | null;
};

type PhaseSegment = {
  phase: GamePhase;
  startIndex: number;
  endIndex: number;
};

function getPhaseSegments(chartPoints: ChartPoint[]) {
  if (chartPoints.length === 0) {
    return [];
  }

  const segments: PhaseSegment[] = [];

  let currentPhase = chartPoints[0].phase;
  let startIndex = 0;

  for (let index = 1; index < chartPoints.length; index += 1) {
    if (chartPoints[index].phase !== currentPhase) {
      segments.push({
        phase: currentPhase,
        startIndex,
        endIndex: index - 1,
      });

      currentPhase = chartPoints[index].phase;
      startIndex = index;
    }
  }

  segments.push({
    phase: currentPhase,
    startIndex,
    endIndex: chartPoints.length - 1,
  });

  return segments;
}

function getPercent(index: number, chartWidth: number) {
  return (index / chartWidth) * 100;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getPhaseSegmentVisuals(
  segments: PhaseSegment[],
  chartWidth: number
) {
  const minLabelWidthPercent = 8;

  return segments.map((segment, index) => {
    const nextSegment = segments[index + 1];
    const startPercent = getPercent(segment.startIndex, chartWidth);
    const endPercent = nextSegment
      ? getPercent(nextSegment.startIndex, chartWidth)
      : 100;
    const widthPercent = Math.max(0, endPercent - startPercent);
    const centerPercent = clamp(startPercent + widthPercent / 2, 8, 92);

    return {
      ...segment,
      startPercent,
      endPercent,
      widthPercent,
      centerPercent,
      showLabel: widthPercent >= minLabelWidthPercent || segments.length === 1,
    };
  });
}

export default function GameReviewChart({
  moveHistory,
  evaluationsCp,
  moveTimesMs = [],
  isAnalyzing = false,
  statusText,
  currentMoveIndex = 0,
  onJumpToMove,
}: GameReviewChartProps) {
  const review = buildGameReviewSummary({
    moveHistory,
    evaluationsCp,
    moveTimesMs,
  });

  const hasRealEvaluation = evaluationsCp.some((value) => value !== null);

  const badgeText =
    statusText ??
    (isAnalyzing
      ? "Расчёт оценок..."
      : hasRealEvaluation
      ? "Готово"
      : "Оценки ещё не рассчитаны");

  const chartWidth = Math.max(review.chartPoints.length - 1, 1);

  const chartPath = review.chartPoints
    .map((point, index) => {
      const cp = point.evaluationCp ?? 0;
      const clampedCp = Math.max(-800, Math.min(800, cp));

      const x = getPercent(index, chartWidth);
      const y = 50 - (clampedCp / 800) * 45;

      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  const visiblePhaseSegments = getPhaseSegments(review.chartPoints).filter(
    (segment) => segment.endIndex >= segment.startIndex
  );

  const phaseSegmentVisuals = getPhaseSegmentVisuals(
    visiblePhaseSegments,
    chartWidth
  );

  const boundedCurrentMoveIndex = clamp(
    currentMoveIndex,
    0,
    Math.max(review.chartPoints.length - 1, 0)
  );

  const currentMoveX = getPercent(boundedCurrentMoveIndex, chartWidth);

  function handleChartClick(event: MouseEvent<HTMLDivElement>) {
    if (!onJumpToMove || review.chartPoints.length === 0) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
    const pointIndex = clamp(
      Math.round(ratio * chartWidth),
      0,
      review.chartPoints.length - 1
    );
    const point = review.chartPoints[pointIndex];

    onJumpToMove(point?.ply ?? pointIndex);
  }

  return (
    <section className="game-review-chart-panel">
      <div className="game-review-block-head">
        <div>
          <p className="section-kicker">Отчёт по партии</p>
          <h3>График оценки</h3>
        </div>

        <span
          className={[
            "game-review-badge",
            !hasRealEvaluation || isAnalyzing ? "muted-badge" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {badgeText}
        </span>
      </div>

      <div className="game-review-chart-card">
        <div
          className={[
            "game-review-chart",
            onJumpToMove ? "is-clickable" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={handleChartClick}
          title={
            onJumpToMove
              ? "Кликните по графику, чтобы перейти к позиции"
              : undefined
          }
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              className="game-review-zero-line"
            />

            {visiblePhaseSegments.slice(1).map((segment) => {
              const x = getPercent(segment.startIndex, chartWidth);

              return (
                <line
                  key={`${segment.phase}-${segment.startIndex}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="100"
                  className="game-review-phase-divider"
                />
              );
            })}

            <path d={chartPath} className="game-review-chart-line" />

            <line
              x1={currentMoveX}
              y1="0"
              x2={currentMoveX}
              y2="100"
              className="game-review-current-divider"
            />
          </svg>

          <div className="game-review-chart-label game-review-chart-label-top">
            Белым лучше
          </div>

          <div className="game-review-chart-label game-review-chart-label-bottom">
            Чёрным лучше
          </div>
        </div>

        <div className="game-review-phase-track">
          {phaseSegmentVisuals.slice(1).map((segment) => (
            <span
              key={`divider-${segment.phase}-${segment.startIndex}`}
              className="game-review-phase-track-divider"
              style={{ left: `${segment.startPercent}%` }}
            />
          ))}

          {phaseSegmentVisuals
            .filter((segment) => segment.showLabel)
            .map((segment) => (
              <span
                key={`${segment.phase}-${segment.startIndex}-${segment.endIndex}`}
                className={[
                  "game-review-phase-chip",
                  PHASE_CLASS[segment.phase],
                ].join(" ")}
                style={{ left: `${segment.centerPercent}%` }}
              >
                {getPhaseLabel(segment.phase)}
              </span>
            ))}
        </div>

        {onJumpToMove ? (
          <p className="game-review-chart-hint">
            Клик по графику переносит доску к выбранному ходу
          </p>
        ) : null}
      </div>
    </section>
  );
}