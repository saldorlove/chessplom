import { useChessGame } from "../hooks/useChessGame";
import ChessBoard from "./chess/ChessBoard";
import GameControls from "./chess/GameControls";
import MoveHistoryPanel from "./chess/MoveHistoryPanel";
import "./ChessPracticeBoard.css";

export default function ChessPracticeBoard() {
  const {
    game,
    board,
    moveHistory,
    moveRows,
    currentMoveIndex,
    selectedSquare,
    legalTargets,
    draggedFromSquare,
    dropHoverSquare,
    statusText,
    isViewingPastPosition,
    handleSquareClick,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    handleResetGame,
    handleGoToStart,
    handleStepBack,
    handleStepForward,
    handleGoToEnd,
    handleJumpToMove,
  } = useChessGame();

  return (
    <section className="practice-layout">
      <div className="board-column">
        <ChessBoard
          board={board}
          game={game}
          selectedSquare={selectedSquare}
          legalTargets={legalTargets}
          draggedFromSquare={draggedFromSquare}
          dropHoverSquare={dropHoverSquare}
          onSquareClick={handleSquareClick}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        />

        <GameControls
          currentMoveIndex={currentMoveIndex}
          totalMoves={moveHistory.length}
          statusText={statusText}
          onResetGame={handleResetGame}
          onGoToStart={handleGoToStart}
          onStepBack={handleStepBack}
          onStepForward={handleStepForward}
          onGoToEnd={handleGoToEnd}
        />

        <p className="board-note">
          {isViewingPastPosition
            ? "Сейчас открыта промежуточная позиция. Если сделать новый ход, будущая часть истории будет заменена новой веткой."
            : "Сейчас открыта последняя позиция партии."}
        </p>
      </div>

      <aside className="side-panel">
        <MoveHistoryPanel
          moveRows={moveRows}
          currentMoveIndex={currentMoveIndex}
          onJumpToMove={handleJumpToMove}
        />

        <div className="panel-block">
          <h2>Текущий FEN</h2>
          <pre className="code-box">{game.fen()}</pre>
        </div>

        <div className="panel-block">
          <h2>Текущий PGN</h2>
          <pre className="code-box">{game.pgn() || "PGN пока пустой"}</pre>
        </div>

        <div className="panel-block">
          <h2>Что здесь важно</h2>
          <ul className="explain-list">
            <li>
              <strong>useChessGame()</strong> хранит всю игровую логику.
            </li>
            <li>
              <strong>ChessBoard</strong> отвечает только за доску.
            </li>
            <li>
              <strong>GameControls</strong> отвечает за кнопки и статус партии.
            </li>
            <li>
              <strong>MoveHistoryPanel</strong> отвечает за историю ходов.
            </li>
            <li>
              После такого разделения будет намного проще делать темы, стили и
              новые страницы.
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}