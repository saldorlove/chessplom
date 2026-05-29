import {
  buildGameReviewSummary,
  type ReviewSideSummary,
} from "../../utils/gameReview";
import "../../styles/gameReview.css";

type GameReviewMetricsProps = {
  moveHistory: string[];
  evaluationsCp: Array<number | null>;
  moveTimesMs?: number[];
  whiteName?: string;
  blackName?: string;
};

function SideSummaryCard({
  summary,
  name,
}: {
  summary: ReviewSideSummary;
  name: string;
}) {
  return (
    <div className="game-review-side-card">
      <div className="game-review-side-head">
        <span className="game-review-side-dot" />
        <strong>{name}</strong>
      </div>

      <div className="game-review-side-grid">
        <span className="game-review-blue">{summary.inaccuracies}</span>
        <span>Неточности</span>

        <span className="game-review-yellow">{summary.mistakes}</span>
        <span>Ошибки</span>

        <span className="game-review-red">{summary.blunders}</span>
        <span>Зевки</span>

        <span>{summary.averageCentipawnLoss}</span>
        <span>Потери сантипешек в среднем</span>

        <span>{summary.accuracy}%</span>
        <span>Точность</span>
      </div>
    </div>
  );
}

export default function GameReviewMetrics({
  moveHistory,
  evaluationsCp,
  moveTimesMs = [],
  whiteName = "Белые",
  blackName = "Чёрные",
}: GameReviewMetricsProps) {
  const review = buildGameReviewSummary({
    moveHistory,
    evaluationsCp,
    moveTimesMs,
  });

  return (
    <section className="game-review-metrics-panel">
      <div className="game-review-block-head compact">
        <div>
          <h3>Метрики партии</h3>
        </div>
      </div>

      <div className="game-review-sides">
        <SideSummaryCard summary={review.white} name={whiteName || "Белые"} />
        <SideSummaryCard summary={review.black} name={blackName || "Чёрные"} />
      </div>
    </section>
  );
}