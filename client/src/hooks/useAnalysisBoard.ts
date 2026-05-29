import { useCallback, useMemo, useState } from "react";
import type { DragEvent } from "react";
import { Chess, type Square } from "chess.js";
import type { MoveRow } from "./useChessGame";

const SAMPLE_PGN = "1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qxf7#";
const PLAY_PGN_STORAGE_KEY = "play_last_pgn";

export type AnalysisVariationRow = {
  number: number;
  white: string;
  black: string;
  whiteIndex: number | null;
  blackIndex: number | null;
};

export type AnalysisVariationView = {
  id: string;
  startIndex: number;
  label: string;
  rows: AnalysisVariationRow[];
  isActive: boolean;
};

type AnalysisBranch = {
  id: string;
  startIndex: number;
  moves: string[];
};

type InitialAnalysisData = {
  pgnInput: string;
  originalHistory: string[];
  loadedSourceLabel: string;
};

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

function buildVariationRows(
  startIndex: number,
  moves: string[]
): AnalysisVariationRow[] {
  const rows: AnalysisVariationRow[] = [];

  if (moves.length === 0) return rows;

  if (startIndex % 2 === 0) {
    for (let i = 0; i < moves.length; i += 2) {
      const fullIndex = startIndex + i;

      rows.push({
        number: Math.floor(fullIndex / 2) + 1,
        white: moves[i] ?? "",
        black: moves[i + 1] ?? "",
        whiteIndex: moves[i] ? fullIndex + 1 : null,
        blackIndex: moves[i + 1] ? fullIndex + 2 : null,
      });
    }

    return rows;
  }

  rows.push({
    number: Math.floor(startIndex / 2) + 1,
    white: "",
    black: moves[0] ?? "",
    whiteIndex: null,
    blackIndex: moves[0] ? startIndex + 1 : null,
  });

  for (let i = 1; i < moves.length; i += 2) {
    const fullIndex = startIndex + i;

    rows.push({
      number: Math.floor(fullIndex / 2) + 1,
      white: moves[i] ?? "",
      black: moves[i + 1] ?? "",
      whiteIndex: moves[i] ? fullIndex + 1 : null,
      blackIndex: moves[i + 1] ? fullIndex + 2 : null,
    });
  }

  return rows;
}

function buildReplayGame(history: string[], upto: number) {
  const chess = new Chess();

  for (let i = 0; i < upto; i += 1) {
    chess.move(history[i]);
  }

  return chess;
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

function getSampleHistory() {
  const chess = new Chess();
  chess.loadPgn(SAMPLE_PGN);
  return chess.history();
}

function createBranchId() {
  return `branch_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getBranchLabel(startIndex: number) {
  const moveNumber = Math.floor(startIndex / 2) + 1;

  return startIndex % 2 === 0
    ? `Вариант от ${moveNumber}.`
    : `Вариант от ${moveNumber}...`;
}

function getInitialAnalysisData(): InitialAnalysisData {
  const fallbackHistory = getSampleHistory();

  const fallback: InitialAnalysisData = {
    pgnInput: SAMPLE_PGN,
    originalHistory: fallbackHistory,
    loadedSourceLabel: "Демо-партия загружена",
  };

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const storedPgn = sessionStorage.getItem(PLAY_PGN_STORAGE_KEY)?.trim();

    if (!storedPgn) {
      return fallback;
    }

    const chess = new Chess();
    chess.loadPgn(storedPgn);

    return {
      pgnInput: storedPgn,
      originalHistory: chess.history(),
      loadedSourceLabel: "Партия загружена из режима игры",
    };
  } catch {
    return fallback;
  }
}

export function useAnalysisBoard() {
  const [initialData] = useState<InitialAnalysisData>(() =>
    getInitialAnalysisData()
  );

  const [originalHistory, setOriginalHistory] = useState<string[]>(
    initialData.originalHistory
  );
  const [branches, setBranches] = useState<AnalysisBranch[]>([]);
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(
    initialData.originalHistory.length
  );

  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);
  const [draggedFromSquare, setDraggedFromSquare] = useState<Square | null>(
    null
  );
  const [dropHoverSquare, setDropHoverSquare] = useState<Square | null>(null);

  const [pgnInput, setPgnInput] = useState(initialData.pgnInput);
  const [loadedSourceLabel, setLoadedSourceLabel] = useState(
    initialData.loadedSourceLabel
  );
  const [loadError, setLoadError] = useState("");

  const activeBranch = useMemo(
    () => branches.find((branch) => branch.id === activeBranchId) ?? null,
    [branches, activeBranchId]
  );

  const currentLineHistory = useMemo(() => {
    if (!activeBranch) return originalHistory;

    return [
      ...originalHistory.slice(0, activeBranch.startIndex),
      ...activeBranch.moves,
    ];
  }, [originalHistory, activeBranch]);

  const game = useMemo(
    () => buildReplayGame(currentLineHistory, currentMoveIndex),
    [currentLineHistory, currentMoveIndex]
  );

  const board = useMemo(() => game.board(), [game]);

  const mainLineRows = useMemo(
    () => buildMoveRows(originalHistory),
    [originalHistory]
  );

  const statusText = useMemo(() => getStatusText(game), [game]);

  const variationViews = useMemo<AnalysisVariationView[]>(() => {
    return branches.map((branch) => ({
      id: branch.id,
      startIndex: branch.startIndex,
      label: getBranchLabel(branch.startIndex),
      rows: buildVariationRows(branch.startIndex, branch.moves),
      isActive: branch.id === activeBranchId,
    }));
  }, [branches, activeBranchId]);

  const loadPgnData = useCallback(
    (
      nextPgn: string,
      nextLoadedSourceLabel: string,
      options?: {
        persistToSession?: boolean;
        emptyMessage?: string;
      }
    ) => {
      const trimmed = nextPgn.trim();

      if (!trimmed) {
        setLoadError(
          options?.emptyMessage ?? "Вставь PGN в поле перед загрузкой."
        );
        return false;
      }

      try {
        const chess = new Chess();
        chess.loadPgn(trimmed);

        const history = chess.history();

        setPgnInput(trimmed);
        setOriginalHistory(history);
        setBranches([]);
        setActiveBranchId(null);
        setCurrentMoveIndex(history.length);
        setLoadedSourceLabel(nextLoadedSourceLabel);
        setLoadError("");

        if (options?.persistToSession ?? true) {
          try {
            sessionStorage.setItem(PLAY_PGN_STORAGE_KEY, trimmed);
          } catch {
            /* ignore */
          }
        }

        setSelectedSquare(null);
        setLegalTargets([]);
        setDraggedFromSquare(null);
        setDropHoverSquare(null);

        return true;
      } catch {
        setLoadError(
          "Не удалось разобрать PGN. Используй обычный PGN со стартовой позиции."
        );
        return false;
      }
    },
    []
  );

  function resetSelection() {
    setSelectedSquare(null);
    setLegalTargets([]);
  }

  function resetDragState() {
    setDraggedFromSquare(null);
    setDropHoverSquare(null);
  }

  function updateCurrentMoveIndex(nextIndex: number) {
    const maxIndex = currentLineHistory.length;
    const boundedIndex = Math.max(0, Math.min(nextIndex, maxIndex));

    setCurrentMoveIndex(boundedIndex);
    resetSelection();
    resetDragState();
  }

  function selectSquare(square: Square) {
    const moves = game.moves({ square, verbose: true });

    if (moves.length === 0) {
      resetSelection();
      return;
    }

    setSelectedSquare(square);
    setLegalTargets(moves.map((move) => move.to as Square));
  }

  function applyMoveObject(moveObject: {
    from: Square;
    to: Square;
    promotion?: "q" | "r" | "b" | "n";
  }) {
    const nextGame = buildReplayGame(currentLineHistory, currentMoveIndex);

    try {
      const move = nextGame.move({
        from: moveObject.from,
        to: moveObject.to,
        promotion: moveObject.promotion ?? "q",
      });

      if (!move) return false;

      if (activeBranch) {
        const prefixMoves = currentLineHistory.slice(
          activeBranch.startIndex,
          currentMoveIndex
        );

        const nextBranchMoves = [...prefixMoves, move.san];

        setBranches((prev) =>
          prev.map((branch) =>
            branch.id === activeBranch.id
              ? { ...branch, moves: nextBranchMoves }
              : branch
          )
        );

        setCurrentMoveIndex(activeBranch.startIndex + nextBranchMoves.length);
      } else {
        const newBranch: AnalysisBranch = {
          id: createBranchId(),
          startIndex: currentMoveIndex,
          moves: [move.san],
        };

        setBranches((prev) => [...prev, newBranch]);
        setActiveBranchId(newBranch.id);
        setCurrentMoveIndex(currentMoveIndex + 1);
      }

      resetSelection();
      resetDragState();
      return true;
    } catch {
      return false;
    }
  }

  function tryMove(from: Square, to: Square) {
    return applyMoveObject({ from, to, promotion: "q" });
  }

  function handleApplyEngineLine(uci: string) {
    if (!/^[a-h][1-8][a-h][1-8][nbrq]?$/i.test(uci)) return false;

    const from = uci.slice(0, 2) as Square;
    const to = uci.slice(2, 4) as Square;
    const promotion = uci[4] as "q" | "r" | "b" | "n" | undefined;

    return applyMoveObject({ from, to, promotion });
  }

  function handleSquareClick(square: Square) {
    const piece = game.get(square);
    const isOwnPiece = piece?.color === game.turn();

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

    const moved = tryMove(selectedSquare, square);
    if (moved) return;

    if (isOwnPiece) {
      selectSquare(square);
      return;
    }

    resetSelection();
  }

  function handleDragStart(event: DragEvent<HTMLButtonElement>, square: Square) {
    const piece = game.get(square);
    const isOwnPiece = piece?.color === game.turn();

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
    event.preventDefault();

    const transferredSquare = event.dataTransfer.getData("text/plain");
    const from = draggedFromSquare || (transferredSquare as Square | "");

    if (!from) {
      resetDragState();
      return;
    }

    const moved = tryMove(from as Square, square);

    if (!moved) {
      const piece = game.get(square);
      const isOwnPiece = piece?.color === game.turn();

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
    updateCurrentMoveIndex(currentLineHistory.length);
  }

  function handleJumpToMainLine(targetIndex: number | null) {
    if (targetIndex === null) return;

    setActiveBranchId(null);

    const boundedIndex = Math.max(
      0,
      Math.min(targetIndex, originalHistory.length)
    );

    setCurrentMoveIndex(boundedIndex);
    resetSelection();
    resetDragState();
  }

  function handleJumpToVariationMove(
    branchId: string,
    targetIndex: number | null
  ) {
    if (targetIndex === null) return;

    const branch = branches.find((item) => item.id === branchId);
    if (!branch) return;

    const branchLineLength = branch.startIndex + branch.moves.length;
    const boundedIndex = Math.max(0, Math.min(targetIndex, branchLineLength));

    setActiveBranchId(branchId);
    setCurrentMoveIndex(boundedIndex);
    resetSelection();
    resetDragState();
  }

  function handleSelectVariation(branchId: string) {
    const branch = branches.find((item) => item.id === branchId);
    if (!branch) return;

    setActiveBranchId(branchId);
    setCurrentMoveIndex(branch.startIndex + branch.moves.length);
    resetSelection();
    resetDragState();
  }

  function handleLoadPgn() {
    loadPgnData(pgnInput, "PGN успешно загружен", {
      persistToSession: true,
      emptyMessage: "Вставь PGN в поле перед загрузкой.",
    });
  }

  const handleLoadExternalPgn = useCallback(
    (pgn: string, sourceLabel: string) => {
      return loadPgnData(pgn, sourceLabel, {
        persistToSession: false,
        emptyMessage: "PGN партии из истории пустой.",
      });
    },
    [loadPgnData]
  );

  function handleLoadDemoPgn() {
    const history = getSampleHistory();

    setPgnInput(SAMPLE_PGN);
    setOriginalHistory(history);
    setBranches([]);
    setActiveBranchId(null);
    setCurrentMoveIndex(history.length);
    setLoadedSourceLabel("Демо-партия загружена");
    setLoadError("");

    try {
      sessionStorage.removeItem(PLAY_PGN_STORAGE_KEY);
    } catch {
      /* ignore */
    }

    resetSelection();
    resetDragState();
  }

  function handleReturnToMainLine() {
    const targetIndex = activeBranch
      ? Math.min(activeBranch.startIndex, originalHistory.length)
      : Math.min(currentMoveIndex, originalHistory.length);

    setActiveBranchId(null);
    setCurrentMoveIndex(targetIndex);
    resetSelection();
    resetDragState();
  }

  return {
    game,
    board,
    currentMoveIndex,
    currentLineLength: currentLineHistory.length,
    selectedSquare,
    legalTargets,
    draggedFromSquare,
    dropHoverSquare,
    statusText,
    pgnInput,
    loadedSourceLabel,
    loadError,
    isVariationMode: activeBranchId !== null,
    activeBranchId,
    activeBranch,
    mainLineRows,
    variationViews,
    setPgnInput,
    handleLoadPgn,
    handleLoadExternalPgn,
    handleLoadDemoPgn,
    handleReturnToMainLine,
    handleApplyEngineLine,
    handleSquareClick,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    handleGoToStart,
    handleStepBack,
    handleStepForward,
    handleGoToEnd,
    handleJumpToMainLine,
    handleJumpToVariationMove,
    handleSelectVariation,
  };
}