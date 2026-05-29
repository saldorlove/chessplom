import { buildGameReviewSummary } from "../../utils/gameReview";
import "../../styles/gameReview.css";

type GamePhaseSummaryProps = {
  moveHistory: string[];
  evaluationsCp: Array<number | null>;
  moveTimesMs?: number[];
};

function formatAverageTime(ms: number | null) {
  if (ms === null) return "—";

  if (ms < 10_000) {
    return `${(ms / 1000).toFixed(1)} сек`;
  }

  if (ms < 60_000) {
    return `${Math.round(ms / 1000)} сек`;
  }

  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function GamePhaseSummary({
  moveHistory,
  evaluationsCp,
  moveTimesMs = [],
}: GamePhaseSummaryProps) {
  const review = buildGameReviewSummary({
    moveHistory,
    evaluationsCp,
    moveTimesMs,
  });

  return (
    <section className="game-review-phase-panel">
      <div className="game-review-block-head compact">
        <div>
          <h3>Этапы партии</h3>
        </div>
      </div>

      <div className="game-review-phase-summary vertical">
        {review.phases.map((phase) => (
          <div className="game-review-phase-card" key={phase.phase}>
            <span>{phase.label}</span>

            <strong>
              {phase.moveCount > 0
                ? phase.startMoveNumber === phase.endMoveNumber
                  ? `${phase.startMoveNumber} ход`
                  : `${phase.startMoveNumber}–${phase.endMoveNumber} ход`
                : "0 ход."}
            </strong>

            <small>
              Среднее время: {formatAverageTime(phase.averageTimeMs)}
            </small>

            <small>
              Средняя потеря:{" "}
              {phase.averageLossCp === null ? "—" : `${phase.averageLossCp} cp`}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}