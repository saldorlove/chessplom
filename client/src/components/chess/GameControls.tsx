type GameControlsProps = {
  currentMoveIndex: number;
  totalMoves: number;
  statusText: string;
  onResetGame: () => void;
  onGoToStart: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onGoToEnd: () => void;
};

export default function GameControls({
  currentMoveIndex,
  totalMoves,
  statusText,
  onResetGame,
  onGoToStart,
  onStepBack,
  onStepForward,
  onGoToEnd,
}: GameControlsProps) {
  return (
    <div className="board-actions">
      <button type="button" className="primary-btn" onClick={onResetGame}>
        Новая партия
      </button>

      <div className="navigation-group">
        <button
          type="button"
          className="secondary-btn"
          onClick={onGoToStart}
          disabled={currentMoveIndex === 0}
          title="В начало партии"
        >
          {"<<"}
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={onStepBack}
          disabled={currentMoveIndex === 0}
          title="На ход назад"
        >
          {"<"}
        </button>

        <span className="move-counter">
          {currentMoveIndex} / {totalMoves}
        </span>

        <button
          type="button"
          className="secondary-btn"
          onClick={onStepForward}
          disabled={currentMoveIndex === totalMoves}
          title="На ход вперёд"
        >
          {">"}
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={onGoToEnd}
          disabled={currentMoveIndex === totalMoves}
          title="В конец партии"
        >
          {">>"}
        </button>
      </div>

      <span className="status-badge">{statusText}</span>
    </div>
  );
}