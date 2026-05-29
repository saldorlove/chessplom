import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { DragEvent } from "react";
import { Chess, type Square } from "chess.js";

import { useAuth } from "../auth/AuthContext";
import ChessBoard from "../components/chess/ChessBoard";
import {
  getAllTacticPuzzles,
  getFilteredTacticPuzzles,
  getRandomTacticPuzzleIndex,
  getTacticThemes,
  type RatingFilter,
  type ThemeFilter,
  type SideFilter,
} from "../services/tacticsService";
import {
  getSolvedTacticPuzzleIds,
  recordSolvedTacticPuzzle,
  recordWrongTacticAttempt,
  setActiveTacticsStatsUserId,
} from "../services/tacticsStatsService";
import { validateTacticPuzzles } from "../utils/tacticsValidation";

type LastMove = {
  from: Square;
  to: Square;
};

const OPPONENT_REPLY_DELAY_MS = 450;
const CURRENT_TACTIC_PUZZLE_KEY = "zugzwang_current_tactic_puzzle_id_v1";

const TACTIC_PUZZLES = getAllTacticPuzzles();
const TACTIC_THEMES = getTacticThemes();

function getSideLabel(turn: "w" | "b") {
  return turn === "w" ? "белых" : "чёрных";
}

function parseSolutionMove(solution: string) {
  const from = solution.slice(0, 2) as Square;
  const to = solution.slice(2, 4) as Square;
  const promotion = solution.slice(4, 5);

  return {
    from,
    to,
    promotion:
      promotion === "q" ||
      promotion === "r" ||
      promotion === "b" ||
      promotion === "n"
        ? promotion
        : "q",
  };
}

function applyUciMoveToFen(fen: string, uciMove: string) {
  const game = new Chess(fen);
  const { from, to, promotion } = parseSolutionMove(uciMove);

  try {
    const move = game.move({
      from,
      to,
      promotion,
    });

    if (!move) {
      return null;
    }

    return {
      fen: game.fen(),
      lastMove: {
        from: move.from as Square,
        to: move.to as Square,
      },
    };
  } catch {
    return null;
  }
}

function formatElapsedTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function normalizeStorageId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}

function getCurrentTacticPuzzleStorageKey(userId?: string | null) {
  const normalizedUserId = userId
    ? normalizeStorageId(userId)
    : "guest";

  return `${CURRENT_TACTIC_PUZZLE_KEY}:${normalizedUserId}`;
}

function loadCurrentTacticPuzzleId(userId?: string | null) {
  try {
    return localStorage.getItem(getCurrentTacticPuzzleStorageKey(userId));
  } catch {
    return null;
  }
}

function saveCurrentTacticPuzzleId(
  puzzleId: string,
  userId?: string | null
) {
  try {
    localStorage.setItem(getCurrentTacticPuzzleStorageKey(userId), puzzleId);
  } catch {
    /* ignore */
  }
}

function getInitialPuzzleIndex(
  puzzleId?: string | null,
  userId?: string | null
) {
  if (puzzleId) {
    const exactIndex = TACTIC_PUZZLES.findIndex(
      (puzzle) => puzzle.id === puzzleId
    );

    if (exactIndex >= 0) {
      return exactIndex;
    }
  }

  const savedPuzzleId = loadCurrentTacticPuzzleId(userId);

  if (savedPuzzleId) {
    const savedIndex = TACTIC_PUZZLES.findIndex(
      (puzzle) => puzzle.id === savedPuzzleId
    );

    if (savedIndex >= 0) {
      return savedIndex;
    }
  }

  return getRandomTacticPuzzleIndex(TACTIC_PUZZLES.length);
}

function getPreferredPuzzleIndex(
  puzzles: { id: string }[],
  currentIndex = -1,
  userId?: string | null
) {
  if (puzzles.length <= 0) {
    return 0;
  }

  const solvedIds = getSolvedTacticPuzzleIds(userId);

  const unsolvedIndexes = puzzles
    .map((puzzle, index) => ({
      id: puzzle.id,
      index,
    }))
    .filter((item) => !solvedIds.includes(item.id))
    .map((item) => item.index);

  if (unsolvedIndexes.length === 0) {
    return getRandomTacticPuzzleIndex(puzzles.length, currentIndex);
  }

  if (unsolvedIndexes.length === 1) {
    return unsolvedIndexes[0];
  }

  let nextIndex =
    unsolvedIndexes[Math.floor(Math.random() * unsolvedIndexes.length)];

  while (nextIndex === currentIndex) {
    nextIndex =
      unsolvedIndexes[Math.floor(Math.random() * unsolvedIndexes.length)];
  }

  return nextIndex;
}

export default function TacticsPage() {
  const { user } = useAuth();
  const activeTacticsUserId = user?.id ?? null;

  const [searchParams] = useSearchParams();
  const requestedPuzzleId = searchParams.get("puzzle");

  const initialPuzzleIndex = getInitialPuzzleIndex(requestedPuzzleId, activeTacticsUserId);
  const initialPuzzle = TACTIC_PUZZLES[initialPuzzleIndex];

  useEffect(() => {
    setActiveTacticsStatsUserId(activeTacticsUserId);

    return () => {
      setActiveTacticsStatsUserId(null);
    };
  }, [activeTacticsUserId]);

  useEffect(() => {
    if (initialPuzzle) {
      saveCurrentTacticPuzzleId(initialPuzzle.id, activeTacticsUserId);
    }
    // Сохраняем только стартовую задачу страницы.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    const validationResults = validateTacticPuzzles(TACTIC_PUZZLES);
    const invalidPuzzles = validationResults.filter((result) => !result.isValid);

    if (invalidPuzzles.length === 0) {
      console.info("[Tactics] Все задачи прошли проверку.");
      return;
    }

    console.group("[Tactics] Найдены ошибки в задачах");

    invalidPuzzles.forEach((result) => {
      console.warn(result.puzzleId, result.errors);
    });

    console.groupEnd();
  }, []);

  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>("all");
  const [sideFilter, setSideFilter] = useState<SideFilter>("all");

  const hasActiveFilters =
  ratingFilter !== "all" || themeFilter !== "all" || sideFilter !== "all";

  function handleResetFilters() {
    setRatingFilter("all");
    setThemeFilter("all");
    setSideFilter("all");
  }

  const filteredPuzzles = useMemo(() => {
    return getFilteredTacticPuzzles({
      rating: ratingFilter,
      theme: themeFilter,
      side: sideFilter,
    });
  }, [ratingFilter, themeFilter, sideFilter]);

  const [puzzleIndex, setPuzzleIndex] = useState(initialPuzzleIndex);
  const [currentFen, setCurrentFen] = useState(initialPuzzle.fen);

  const [solutionStep, setSolutionStep] = useState(0);
  const [historyFens, setHistoryFens] = useState<string[]>([initialPuzzle.fen]);
  const [historyMoves, setHistoryMoves] = useState<LastMove[]>([]);
  const [viewIndex, setViewIndex] = useState(0);

  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);
  const [draggedFromSquare, setDraggedFromSquare] = useState<Square | null>(
    null
  );
  const [dropHoverSquare, setDropHoverSquare] = useState<Square | null>(null);

  const [isSolved, setIsSolved] = useState(false);
  const [isOpponentReplying, setIsOpponentReplying] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isZenMode, setIsZenMode] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isZenMistake, setIsZenMistake] = useState(false);
  const [hasMadeMistake, setHasMadeMistake] = useState(false);
  const [hasUsedHint, setHasUsedHint] = useState(false);

  const zenMistakeTimeoutRef = useRef<number | null>(null);
  const opponentReplyTimeoutRef = useRef<number | null>(null);
  const isFirstPuzzleSelectionEffectRef = useRef(true);

  const safePuzzleIndex =
    filteredPuzzles.length === 0
      ? 0
      : Math.min(puzzleIndex, filteredPuzzles.length - 1);

  const puzzle = filteredPuzzles[safePuzzleIndex] ?? null;

  const currentGame = useMemo(() => new Chess(currentFen), [currentFen]);

  const displayFen = historyFens[viewIndex] ?? currentFen;
  const displayGame = useMemo(() => new Chess(displayFen), [displayFen]);
  const board = useMemo(() => displayGame.board(), [displayGame]);

  const latestViewIndex = historyFens.length - 1;
  const viewedLastMove =
    viewIndex > 0 ? historyMoves[viewIndex - 1] ?? null : null;

  const canInteractWithBoard =
    Boolean(puzzle) &&
    !isSolved &&
    !isOpponentReplying &&
    viewIndex === latestViewIndex;

  const sideToMove = currentGame.turn();
  const puzzleSideToMove = puzzle?.sideToMove ?? sideToMove;
  const boardOrientation = puzzleSideToMove === "b" ? "black" : "white";

  function clearOpponentReplyTimer() {
    if (opponentReplyTimeoutRef.current) {
      window.clearTimeout(opponentReplyTimeoutRef.current);
      opponentReplyTimeoutRef.current = null;
    }
  }

  function resetSelection() {
    setSelectedSquare(null);
    setLegalTargets([]);
    setDraggedFromSquare(null);
    setDropHoverSquare(null);
  }

  function recordSolvedPuzzle() {
    if (!puzzle) {
      return;
    }

    recordSolvedTacticPuzzle({
      puzzleId: puzzle.id,
      elapsedSeconds,
      isCleanSolve: !hasMadeMistake && !hasUsedHint,
      userId: activeTacticsUserId,
    });
  }

  function finishPuzzle(showAsSolution = false) {
    if (!puzzle) return;

    setIsSolved(true);
    setIsOpponentReplying(false);

    setFeedbackText(
      showAsSolution
        ? `Решение показано. ${puzzle.successText}`
        : `Задача решена. ${puzzle.successText}`
    );

    if (!showAsSolution) {
      recordSolvedPuzzle();
    }
  }

  function appendMoveResult(result: { fen: string; lastMove: LastMove }) {
    setCurrentFen(result.fen);

    setHistoryFens((prev) => {
      const next = [...prev, result.fen];
      setViewIndex(next.length - 1);
      return next;
    });

    setHistoryMoves((prev) => [...prev, result.lastMove]);
  }

  function flashZenMistake() {
    if (!isZenMode) {
      return;
    }

    if (zenMistakeTimeoutRef.current) {
      window.clearTimeout(zenMistakeTimeoutRef.current);
    }

    setIsZenMistake(false);

    window.setTimeout(() => {
      setIsZenMistake(true);

      zenMistakeTimeoutRef.current = window.setTimeout(() => {
        setIsZenMistake(false);
      }, 850);
    }, 0);
  }

  function resetPuzzleState(nextIndex: number, source = filteredPuzzles) {
    clearOpponentReplyTimer();

    const nextPuzzle = source[nextIndex];

    if (nextPuzzle) {
      saveCurrentTacticPuzzleId(nextPuzzle.id, activeTacticsUserId);
    }

    setPuzzleIndex(nextIndex);
    setSelectedSquare(null);
    setLegalTargets([]);
    setDraggedFromSquare(null);
    setDropHoverSquare(null);
    setHistoryMoves([]);
    setViewIndex(0);
    setSolutionStep(0);

    setIsSolved(false);
    setIsOpponentReplying(false);
    setIsHintVisible(false);
    setFeedbackText("");
    setElapsedSeconds(0);
    setIsZenMistake(false);
    setHasMadeMistake(false);
    setHasUsedHint(false);

    if (!nextPuzzle) {
      return;
    }

    setCurrentFen(nextPuzzle.fen);
    setHistoryFens([nextPuzzle.fen]);
  }

  function handleResetCurrentPuzzle() {
    resetPuzzleState(safePuzzleIndex);
  }

  function handleNextPuzzle() {
    if (!isSolved || filteredPuzzles.length === 0) return;

    const nextIndex = getPreferredPuzzleIndex(
      filteredPuzzles,
      safePuzzleIndex,
      activeTacticsUserId
    );

    resetPuzzleState(nextIndex);
  }

  function handleSkipPuzzle() {
    if (filteredPuzzles.length === 0) {
      return;
    }

    const nextIndex = getPreferredPuzzleIndex(
      filteredPuzzles,
      safePuzzleIndex,
      activeTacticsUserId
    );

    resetPuzzleState(nextIndex);
  }

  function selectSquare(square: Square) {
    if (!canInteractWithBoard) {
      resetSelection();
      return;
    }

    const piece = currentGame.get(square);

    if (!piece || piece.color !== currentGame.turn()) {
      resetSelection();
      return;
    }

    const moves = currentGame.moves({ square, verbose: true });

    if (moves.length === 0) {
      resetSelection();
      return;
    }

    setSelectedSquare(square);
    setLegalTargets(moves.map((move) => move.to as Square));
  }

  function handleCorrectUserMove(expectedMove: string) {
    if (!puzzle) return;

    const result = applyUciMoveToFen(currentFen, expectedMove);

    if (!result) {
      setFeedbackText("Ход найден, но позиция задачи составлена неверно.");
      resetSelection();
      return;
    }

    const nextStep = solutionStep + 1;

    appendMoveResult(result);
    setSolutionStep(nextStep);
    setFeedbackText("");
    resetSelection();

    if (nextStep >= puzzle.solution.length) {
      finishPuzzle(false);
      return;
    }

    scheduleOpponentReply(nextStep, result.fen);
  }

  function scheduleOpponentReply(replyStep: number, fromFen: string) {
    if (!puzzle) return;

    const replyMove = puzzle.solution[replyStep];

    if (!replyMove) {
      return;
    }

    setIsOpponentReplying(true);

    opponentReplyTimeoutRef.current = window.setTimeout(() => {
      const result = applyUciMoveToFen(fromFen, replyMove);

      setIsOpponentReplying(false);

      if (!result) {
        setFeedbackText("Не удалось выполнить ответ соперника в задаче.");
        return;
      }

      const nextStep = replyStep + 1;

      appendMoveResult(result);
      setSolutionStep(nextStep);

      if (nextStep >= puzzle.solution.length) {
        finishPuzzle(false);
      }
    }, OPPONENT_REPLY_DELAY_MS);
  }

  function trySolveMove(from: Square, to: Square) {
    if (!canInteractWithBoard || !puzzle) return;

    const expectedMove = puzzle.solution[solutionStep];

    if (!expectedMove) {
      return;
    }

    const attemptedMove = `${from}${to}`;
    const expectedMoveCore = expectedMove.slice(0, 4);

    if (attemptedMove !== expectedMoveCore) {
      const piece = currentGame.get(to);
      const isOwnPiece = piece?.color === currentGame.turn();

      if (isOwnPiece) {
        selectSquare(to);
        return;
      }

      setHasMadeMistake(true);
      recordWrongTacticAttempt({
        puzzleId: puzzle.id,
        userId: activeTacticsUserId,
      });

      if (isZenMode) {
        flashZenMistake();
      } else {
        setFeedbackText("Пока не то. Попробуй найти лучший ход.");
      }

      resetSelection();
      return;
    }

    handleCorrectUserMove(expectedMove);
  }

  function handleSquareClick(square: Square) {
    if (!canInteractWithBoard) return;

    const piece = currentGame.get(square);
    const isOwnPiece = piece?.color === currentGame.turn();

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

    trySolveMove(selectedSquare, square);
  }

  function handleToggleHint() {
    setIsHintVisible((prev) => {
      const nextValue = !prev;

      if (nextValue) {
        setHasUsedHint(true);
      }

      return nextValue;
    });
  }

  function handleShowSolution() {
    if (!puzzle) return;

    recordWrongTacticAttempt({
      puzzleId: puzzle.id,
      userId: activeTacticsUserId,
    });
    clearOpponentReplyTimer();

    let nextFen = puzzle.fen;
    const nextHistoryFens = [puzzle.fen];
    const nextHistoryMoves: LastMove[] = [];

    for (const move of puzzle.solution) {
      const result = applyUciMoveToFen(nextFen, move);

      if (!result) {
        setFeedbackText(
          "Не удалось показать решение: позиция задачи составлена неверно."
        );
        return;
      }

      nextFen = result.fen;
      nextHistoryFens.push(result.fen);
      nextHistoryMoves.push(result.lastMove);
    }

    setCurrentFen(nextFen);
    setSolutionStep(puzzle.solution.length);
    setHistoryFens(nextHistoryFens);
    setHistoryMoves(nextHistoryMoves);
    setViewIndex(nextHistoryFens.length - 1);
    setIsOpponentReplying(false);
    setIsSolved(true);
    setFeedbackText(`Решение показано. ${puzzle.successText}`);
    resetSelection();
  }

  function handleGoToPrevious() {
    setViewIndex((prev) => Math.max(0, prev - 1));
  }

  function handleGoToNext() {
    setViewIndex((prev) => Math.min(historyFens.length - 1, prev + 1));
  }

  function handleDragStart(event: DragEvent<HTMLButtonElement>, square: Square) {
    if (!canInteractWithBoard) {
      event.preventDefault();
      return;
    }

    const piece = currentGame.get(square);
    const isOwnPiece = piece?.color === currentGame.turn();

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
    if (!canInteractWithBoard || !draggedFromSquare) return;

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
    if (!canInteractWithBoard) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    const transferredSquare = event.dataTransfer.getData("text/plain");
    const from = draggedFromSquare || (transferredSquare as Square | "");

    if (!from) {
      resetSelection();
      return;
    }

    trySolveMove(from as Square, square);
    setDraggedFromSquare(null);
    setDropHoverSquare(null);
  }

  function handleDragEnd() {
    setDraggedFromSquare(null);
    setDropHoverSquare(null);
  }

  useEffect(() => {
    if (isFirstPuzzleSelectionEffectRef.current) {
      isFirstPuzzleSelectionEffectRef.current = false;

      if (!requestedPuzzleId && !hasActiveFilters) {
        return;
      }
    }

    const requestedIndex = requestedPuzzleId
      ? filteredPuzzles.findIndex((puzzle) => puzzle.id === requestedPuzzleId)
      : -1;

    if (requestedPuzzleId) {
      resetPuzzleState(
        requestedIndex >= 0 ? requestedIndex : 0,
        filteredPuzzles
      );
      return;
    }

    if (hasActiveFilters) {
      const savedPuzzleId = loadCurrentTacticPuzzleId(activeTacticsUserId);
      const savedIndex = savedPuzzleId
        ? filteredPuzzles.findIndex((puzzle) => puzzle.id === savedPuzzleId)
        : -1;

      const nextIndex =
        savedIndex >= 0
          ? savedIndex
          : getPreferredPuzzleIndex(
              filteredPuzzles,
              safePuzzleIndex,
              activeTacticsUserId
            );

      resetPuzzleState(nextIndex, filteredPuzzles);
      return;
    }

    const savedPuzzleId = loadCurrentTacticPuzzleId(activeTacticsUserId);
    const savedIndex = savedPuzzleId
      ? filteredPuzzles.findIndex((puzzle) => puzzle.id === savedPuzzleId)
      : -1;

    if (savedIndex >= 0) {
      resetPuzzleState(savedIndex, filteredPuzzles);
      return;
    }

    const nextIndex = getPreferredPuzzleIndex(
      filteredPuzzles,
      safePuzzleIndex,
      activeTacticsUserId
    );

    resetPuzzleState(nextIndex, filteredPuzzles);
    // Важно: activeTacticsUserId не добавляем в зависимости,
    // иначе после загрузки пользователя задача может прыгнуть сама.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedPuzzleId, ratingFilter, themeFilter, sideFilter]);

  useEffect(() => {
    if (isSolved || filteredPuzzles.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [puzzleIndex, isSolved, filteredPuzzles.length]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (historyFens.length <= 1) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleGoToPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleGoToNext();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [historyFens.length]);

  useEffect(() => {
    return () => {
      if (zenMistakeTimeoutRef.current) {
        window.clearTimeout(zenMistakeTimeoutRef.current);
      }

      clearOpponentReplyTimer();
    };
  }, []);

  const shouldShowFeedback = Boolean(feedbackText) && !isZenMode;

  const taskTitle = isOpponentReplying
    ? "Соперник отвечает..."
    : `Найдите лучший ход за ${getSideLabel(sideToMove)}`;

  return (
    <section className="tactics-page">
      <div className="tactics-layout">
        <aside className="tactics-filter-card">
          <div className="tactics-filter-head">
            <div className="tactics-filter-title">
              <span>Тренировка</span>
              <strong>Фильтры</strong>
            </div>

            <button
              type="button"
              className="tactics-filter-reset"
              onClick={handleResetFilters}
              disabled={!hasActiveFilters}
              title="Сбросить фильтры"
            >
              Сброс
            </button>
          </div>

          <label className="tactics-filter-field">
            <span>Уровень задач</span>

            <select
              value={ratingFilter}
              onChange={(event) =>
                setRatingFilter(event.target.value as RatingFilter)
              }
            >
              <option value="all">Любой рейтинг</option>
              <option value="beginner">Новичок · до 900</option>
              <option value="amateur">Любитель · 901–1299</option>
              <option value="advanced">Продвинутый · 1300+</option>
            </select>
          </label>

          <label className="tactics-filter-field">
            <span>Тема</span>

            <select
              value={themeFilter}
              onChange={(event) =>
                setThemeFilter(event.target.value as ThemeFilter)
              }
            >
              <option value="all">Любая тема</option>

              {TACTIC_THEMES.map((theme) => (
                <option value={theme} key={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </label>

          <label className="tactics-filter-field">
            <span>Играть за</span>

            <select
              value={sideFilter}
              onChange={(event) =>
                setSideFilter(event.target.value as SideFilter)
              }
            >
              <option value="all">Любой цвет</option>
              <option value="w">Белых</option>
              <option value="b">Чёрных</option>
            </select>
          </label>
        </aside>

        {puzzle ? (
          <>
            <div
              className={[
                "tactics-board-card",
                isZenMode && isSolved ? "is-zen-solved" : "",
                isZenMode && isZenMistake ? "is-zen-mistake" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <ChessBoard
                board={board}
                game={displayGame}
                orientation={boardOrientation}
                selectedSquare={selectedSquare}
                legalTargets={legalTargets}
                draggedFromSquare={draggedFromSquare}
                dropHoverSquare={dropHoverSquare}
                lastMove={viewedLastMove}
                readOnly={!canInteractWithBoard}
                onSquareClick={handleSquareClick}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
              />
            </div>

            <aside className="tactics-side-card">
              <div className="tactics-top-row">
                {!isZenMode ? (
                  <div className="tactics-timer">
                    <span className="tactics-timer-icon">⏱</span>
                    <strong>{formatElapsedTime(elapsedSeconds)}</strong>
                  </div>
                ) : (
                  <div />
                )}

                <div className="tactics-zen-inline">
                  <span className="tactics-zen-inline-label">Режим Дзен</span>

                  <button
                    type="button"
                    className={["tactics-switch", isZenMode ? "is-on" : ""]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setIsZenMode((prev) => !prev)}
                    aria-pressed={isZenMode}
                    aria-label="Режим Дзен"
                    title="Режим Дзен"
                  >
                    <span className="tactics-switch-thumb" />
                  </button>
                </div>
              </div>

              <div className="tactics-main-text">
                <h3>{taskTitle}</h3>

                {!isZenMode ? (
                  <>
                    <div className="tactics-puzzle-info">
                      <strong>{puzzle.title}</strong>
                      <p>{puzzle.description}</p>
                    </div>

                    <div className="tactics-meta-row">
                      <span>{puzzle.difficulty}</span>
                      <span>{puzzle.theme}</span>
                      <span>{puzzle.rating}</span>
                    </div>
                  </>
                ) : null}
              </div>

              {!isZenMode ? (
                <div className="tactics-non-zen-panel">
                  <div className="tactics-actions">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={handleToggleHint}
                      disabled={isSolved || isOpponentReplying}
                    >
                      {isHintVisible ? "Скрыть подсказку" : "Подсказка"}
                    </button>

                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={handleShowSolution}
                      disabled={isSolved || isOpponentReplying}
                    >
                      Решение
                    </button>
                  </div>

                  {isHintVisible ? (
                    <div className="tactics-hint">
                      <span>Подсказка</span>
                      <p>{puzzle.hint}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {shouldShowFeedback ? (
                <div
                  className={[
                    "tactics-feedback",
                    isSolved ? "success" : "error",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {feedbackText}
                </div>
              ) : null}

              <div className="tactics-mini-controls">
                <button
                  type="button"
                  className="secondary-btn tactics-icon-btn"
                  onClick={handleGoToPrevious}
                  disabled={viewIndex === 0}
                  title="Предыдущая позиция"
                >
                  ←
                </button>

                <button
                  type="button"
                  className="secondary-btn tactics-icon-btn"
                  onClick={handleResetCurrentPuzzle}
                  title="Сбросить задачу"
                >
                  {"≫"}
                </button>

                <button
                  type="button"
                  className="secondary-btn tactics-icon-btn"
                  onClick={handleGoToNext}
                  disabled={viewIndex === latestViewIndex}
                  title="Следующая позиция"
                >
                  →
                </button>
              </div>

              {!isSolved ? (
                <button
                  type="button"
                  className="secondary-btn tactics-skip-btn"
                  onClick={handleSkipPuzzle}
                  disabled={isOpponentReplying}
                >
                  Пропустить
                </button>
              ) : null}

              {isSolved ? (
                <button
                  type="button"
                  className="primary-btn tactics-next-btn"
                  onClick={handleNextPuzzle}
                >
                  Новая задача
                </button>
              ) : null}
            </aside>
          </>
        ) : (
          <div className="tactics-empty-card">
            <h3>Задач по выбранным фильтрам пока нет</h3>

            <p>
              Измени уровень, тему или цвет фигур. Позже сюда можно подключить
              большой датасет задач.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
