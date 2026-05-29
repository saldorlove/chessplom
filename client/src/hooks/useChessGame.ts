import { useEffect, useMemo, useState } from "react";
import type { DragEvent } from "react";
import { Chess, type Square } from "chess.js";

const FIRST_MOVE_ABORT_MS = 20_000;

export type MoveRow = {
  number: number;
  white: string;
  black: string;
  whiteIndex: number | null;
  blackIndex: number | null;
};

export type PromotionPiece = "q" | "r" | "b" | "n";

export type PendingPromotion = {
  from: Square;
  to: Square;
  color: "w" | "b";
};

export type LastMoveSquares = {
  from: Square;
  to: Square;
} | null;

export type ManualGameResult =
  | {
      type: "aborted";
      reason: "manual" | "no-first-move";
    }
  | {
      type: "resignation";
      loser: "w" | "b";
      reason?: "resignation" | "technical-loss" | "timeout";
    }
  | {
      type: "draw-agreed";
    };

export type RestoreUciMove = {
  from: string;
  to: string;
  promotion?: string;
};

type MoveAttemptResult = "moved" | "pending-promotion" | "invalid";

function buildGameFromHistory(history: string[], upto: number) {
  const chess = new Chess();

  for (let i = 0; i < upto; i += 1) {
    chess.move(history[i]);
  }

  return chess;
}

function getLastMoveFromHistory(
  history: string[],
  upto: number
): LastMoveSquares {
  if (upto <= 0) {
    return null;
  }

  const chess = new Chess();
  let lastMove: LastMoveSquares = null;

  for (let index = 0; index < upto; index += 1) {
    const move = chess.move(history[index]);

    if (move) {
      lastMove = {
        from: move.from as Square,
        to: move.to as Square,
      };
    }
  }

  return lastMove;
}

function getStatusText(game: Chess) {
  if (game.isCheckmate()) {
    const winner = game.turn() === "w" ? "чёрные" : "белые";
    return `Мат. Победили ${winner}.`;
  }

  if (game.isStalemate()) {
    return "Пат. Ничья.";
  }

  if (game.isThreefoldRepetition()) {
    return "Ничья по троекратному повторению.";
  }

  if (game.isInsufficientMaterial()) {
    return "Ничья из-за недостатка материала.";
  }

  if (game.isDraw()) {
    return "Ничья.";
  }

  const side = game.turn() === "w" ? "белых" : "чёрных";
  return game.inCheck() ? `Ход ${side}. Шах.` : `Ход ${side}.`;
}

function buildMoveRows(history: string[]): MoveRow[] {
  const rows: MoveRow[] = [];

  for (let i = 0; i < history.length; i += 2) {
    rows.push({
      number: i / 2 + 1,
      white: history[i] ?? "",
      black: history[i + 1] ?? "",
      whiteIndex: history[i] ? i + 1 : null,
      blackIndex: history[i + 1] ? i + 2 : null,
    });
  }

  return rows;
}

function getPendingPromotion(
  game: Chess,
  from: Square,
  to: Square
): PendingPromotion | null {
  const piece = game.get(from);

  if (!piece || piece.type !== "p") {
    return null;
  }

  const legalMove = game
    .moves({ square: from, verbose: true })
    .find((move) => move.to === to);

  if (!legalMove) {
    return null;
  }

  if (piece.color === "w" && to[1] === "8") {
    return { from, to, color: "w" };
  }

  if (piece.color === "b" && to[1] === "1") {
    return { from, to, color: "b" };
  }

  return null;
}

function normalizePromotion(value: string | undefined): PromotionPiece {
  if (value === "q" || value === "r" || value === "b" || value === "n") {
    return value;
  }

  return "q";
}

export function useChessGame({
  disableFirstMoveAbort = false,
}: {
  disableFirstMoveAbort?: boolean;
} = {}) {
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);
  const [draggedFromSquare, setDraggedFromSquare] = useState<Square | null>(
    null
  );
  const [dropHoverSquare, setDropHoverSquare] = useState<Square | null>(null);
  const [pendingPromotion, setPendingPromotion] =
    useState<PendingPromotion | null>(null);
  const [gameResult, setGameResult] = useState<ManualGameResult | null>(null);

  const [firstMoveAbortRemainingMs, setFirstMoveAbortRemainingMs] =
    useState(FIRST_MOVE_ABORT_MS);

  const liveGame = useMemo(
    () => buildGameFromHistory(moveHistory, moveHistory.length),
    [moveHistory]
  );

  const game = useMemo(
    () => buildGameFromHistory(moveHistory, currentMoveIndex),
    [moveHistory, currentMoveIndex]
  );

  const board = useMemo(() => game.board(), [game]);
  const moveRows = useMemo(() => buildMoveRows(moveHistory), [moveHistory]);

  const lastMove = useMemo(
    () => getLastMoveFromHistory(moveHistory, currentMoveIndex),
    [moveHistory, currentMoveIndex]
  );

  const statusText = useMemo(() => getStatusText(game), [game]);
  const liveStatusText = useMemo(() => getStatusText(liveGame), [liveGame]);

  const isLiveGameOver = liveGame.isGameOver();
  const isViewingPastPosition = currentMoveIndex < moveHistory.length;
  const canMakeLiveMove =
    !isViewingPastPosition && !isLiveGameOver && !gameResult;

  useEffect(() => {
    if (disableFirstMoveAbort) {
      setFirstMoveAbortRemainingMs(FIRST_MOVE_ABORT_MS);
      return;
    }

    if (moveHistory.length > 0 || gameResult || isLiveGameOver) {
      setFirstMoveAbortRemainingMs(FIRST_MOVE_ABORT_MS);
      return;
    }

    const startedAt = Date.now();
    setFirstMoveAbortRemainingMs(FIRST_MOVE_ABORT_MS);

    const intervalId = window.setInterval(() => {
      const elapsedMs = Date.now() - startedAt;
      const remainingMs = Math.max(FIRST_MOVE_ABORT_MS - elapsedMs, 0);

      setFirstMoveAbortRemainingMs(remainingMs);

      if (remainingMs <= 0) {
        window.clearInterval(intervalId);

        setGameResult({
          type: "aborted",
          reason: "no-first-move",
        });

        setSelectedSquare(null);
        setLegalTargets([]);
        setDraggedFromSquare(null);
        setDropHoverSquare(null);
        setPendingPromotion(null);
      }
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [moveHistory.length, gameResult, isLiveGameOver, disableFirstMoveAbort]);

  function resetSelection() {
    setSelectedSquare(null);
    setLegalTargets([]);
  }

  function resetDragState() {
    setDraggedFromSquare(null);
    setDropHoverSquare(null);
  }

  function clearPendingPromotion() {
    setPendingPromotion(null);
  }

  function updateCurrentMoveIndex(nextIndex: number) {
    const boundedIndex = Math.max(0, Math.min(nextIndex, moveHistory.length));

    setCurrentMoveIndex(boundedIndex);
    resetSelection();
    resetDragState();
    clearPendingPromotion();
  }

  function selectSquare(square: Square) {
    if (!canMakeLiveMove) {
      resetSelection();
      return;
    }

    const moves = liveGame.moves({ square, verbose: true });

    if (moves.length === 0) {
      resetSelection();
      return;
    }

    setSelectedSquare(square);
    setLegalTargets(moves.map((move) => move.to as Square));
  }

  function commitMove(
    from: Square,
    to: Square,
    promotion: PromotionPiece = "q"
  ) {
    if (!canMakeLiveMove) {
      return false;
    }

    const nextGame = buildGameFromHistory(moveHistory, moveHistory.length);

    try {
      const move = nextGame.move({
        from,
        to,
        promotion,
      });

      if (!move) return false;

      const nextHistory = [...moveHistory, move.san];

      setMoveHistory(nextHistory);
      setCurrentMoveIndex(nextHistory.length);
      resetSelection();
      resetDragState();
      clearPendingPromotion();

      return true;
    } catch {
      return false;
    }
  }

  function tryMove(from: Square, to: Square): MoveAttemptResult {
    if (!canMakeLiveMove) {
      return "invalid";
    }

    const nextGame = buildGameFromHistory(moveHistory, moveHistory.length);
    const promotionState = getPendingPromotion(nextGame, from, to);

    if (promotionState) {
      setPendingPromotion(promotionState);
      resetDragState();
      return "pending-promotion";
    }

    const moved = commitMove(from, to, "q");
    return moved ? "moved" : "invalid";
  }

  function handleConfirmPromotion(piece: PromotionPiece) {
    if (!pendingPromotion) return false;

    return commitMove(pendingPromotion.from, pendingPromotion.to, piece);
  }

  function handleEngineMove(uciMove: string) {
    if (uciMove.length < 4) {
      return false;
    }

    const from = uciMove.slice(0, 2) as Square;
    const to = uciMove.slice(2, 4) as Square;
    const promotion = normalizePromotion(uciMove.slice(4, 5));

    return commitMove(from, to, promotion);
  }

  function handleRestoreFromUciMoves(moves: RestoreUciMove[]) {
    const restoredGame = new Chess();
    const restoredHistory: string[] = [];

    try {
      for (const moveData of moves) {
        const move = restoredGame.move({
          from: moveData.from,
          to: moveData.to,
          promotion: normalizePromotion(moveData.promotion),
        });

        if (!move) {
          return false;
        }

        restoredHistory.push(move.san);
      }

      setMoveHistory(restoredHistory);
      setCurrentMoveIndex(restoredHistory.length);
      setGameResult(null);
      setFirstMoveAbortRemainingMs(FIRST_MOVE_ABORT_MS);
      resetSelection();
      resetDragState();
      clearPendingPromotion();

      return true;
    } catch {
      return false;
    }
  }

  function handleCancelPromotion() {
    clearPendingPromotion();
    resetSelection();
    resetDragState();
  }

  function handleSquareClick(square: Square) {
    if (pendingPromotion) return;
    if (!canMakeLiveMove) return;

    const piece = liveGame.get(square);
    const isOwnPiece = piece?.color === liveGame.turn();

    if (!selectedSquare) {
      if (isOwnPiece) {
        selectSquare(square);
      }
      return;
    }

    if (selectedSquare === square) {
      resetSelection();
      return;
    }

    const result = tryMove(selectedSquare, square);
    if (result !== "invalid") return;

    if (isOwnPiece) {
      selectSquare(square);
      return;
    }

    resetSelection();
  }

  function handleDragStart(event: DragEvent<HTMLButtonElement>, square: Square) {
    if (pendingPromotion || !canMakeLiveMove) {
      event.preventDefault();
      return;
    }

    const piece = liveGame.get(square);
    const isOwnPiece = piece?.color === liveGame.turn();

    if (!isOwnPiece) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData("text/plain", square);
    event.dataTransfer.effectAllowed = "move";

    setDraggedFromSquare(square);
    setDropHoverSquare(null);
    selectSquare(square);
  }

  function handleDragOver(event: DragEvent<HTMLButtonElement>, square: Square) {
    if (!draggedFromSquare) return;
    if (pendingPromotion || !canMakeLiveMove) return;

    event.preventDefault();

    if (legalTargets.includes(square)) {
      setDropHoverSquare(square);
    } else {
      setDropHoverSquare(null);
    }
  }

  function handleDragLeave(square: Square) {
    if (dropHoverSquare === square) {
      setDropHoverSquare(null);
    }
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>, square: Square) {
    if (pendingPromotion || !canMakeLiveMove) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    const transferredSquare = event.dataTransfer.getData("text/plain");
    const from = draggedFromSquare || (transferredSquare as Square | "");

    if (!from) {
      resetDragState();
      return;
    }

    const result = tryMove(from as Square, square);

    if (result === "invalid") {
      const piece = liveGame.get(square);
      const isOwnPiece = piece?.color === liveGame.turn();

      if (isOwnPiece) {
        selectSquare(square);
      } else {
        resetSelection();
      }
    }

    resetDragState();
  }

  function handleDragEnd() {
    resetDragState();
  }

  function handleAbortGame() {
    if (moveHistory.length > 0 || gameResult) {
      return false;
    }

    setGameResult({
      type: "aborted",
      reason: "manual",
    });

    resetSelection();
    resetDragState();
    clearPendingPromotion();

    return true;
  }

  function handleResignGame() {
    if (moveHistory.length === 0 || gameResult || isLiveGameOver) {
      return false;
    }

    setGameResult({
      type: "resignation",
      loser: liveGame.turn(),
    });

    resetSelection();
    resetDragState();
    clearPendingPromotion();

    return true;
  }

  function handleAgreeDraw() {
    if (moveHistory.length === 0 || gameResult || isLiveGameOver) {
      return false;
    }

    setGameResult({
      type: "draw-agreed",
    });

    resetSelection();
    resetDragState();
    clearPendingPromotion();

    return true;
  }

  function handleSetManualResult(nextResult: ManualGameResult) {
    if (gameResult || isLiveGameOver) {
      return false;
    }

    setGameResult(nextResult);
    resetSelection();
    resetDragState();
    clearPendingPromotion();

    return true;
  }

  function handleResetGame() {
    setMoveHistory([]);
    setCurrentMoveIndex(0);
    setGameResult(null);
    setFirstMoveAbortRemainingMs(FIRST_MOVE_ABORT_MS);
    resetSelection();
    resetDragState();
    clearPendingPromotion();
  }

  function handleGoToStart() {
    updateCurrentMoveIndex(0);
  }

  function handleStepBack() {
    updateCurrentMoveIndex(currentMoveIndex - 1);
  }

  function handleStepForward() {
    updateCurrentMoveIndex(currentMoveIndex + 1);
  }

  function handleGoToEnd() {
    updateCurrentMoveIndex(moveHistory.length);
  }

  function handleJumpToMove(targetIndex: number | null) {
    if (targetIndex === null) return;
    updateCurrentMoveIndex(targetIndex);
  }

  return {
    game,
    liveGame,
    board,
    moveHistory,
    moveRows,
    lastMove,
    currentMoveIndex,
    selectedSquare,
    legalTargets,
    draggedFromSquare,
    dropHoverSquare,
    pendingPromotion,
    gameResult,
    firstMoveAbortRemainingMs,
    statusText,
    liveStatusText,
    isViewingPastPosition,
    canMakeLiveMove,
    handleConfirmPromotion,
    handleEngineMove,
    handleRestoreFromUciMoves,
    handleCancelPromotion,
    handleSquareClick,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    handleAbortGame,
    handleResignGame,
    handleAgreeDraw,
    handleSetManualResult,
    handleResetGame,
    handleGoToStart,
    handleStepBack,
    handleStepForward,
    handleGoToEnd,
    handleJumpToMove,
  };
}