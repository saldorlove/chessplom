import { useEffect, useMemo, useState, type DragEvent } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Chess, type Square } from "chess.js";

import ChessBoard from "../components/chess/ChessBoard";
import { getOpenings, getOpeningBySlug, getVariationSteps, type Opening, type OpeningListItemDto, type OpeningStep } from "../api/openingsApi";

type LearnMode = "study" | "repeat";

type LastMove = {
  from: Square;
  to: Square;
} | null;

type MarkedArrow = {
  from: Square;
  to: Square;
};


type PositionSnapshot = {
  game: Chess;
  lastMove: LastMove;
};

function normalizeSan(san: string) {
  return san.replace(/[+#?!]/g, "").trim();
}

function buildPositionFromSanMoves(moves: string[], upto: number): PositionSnapshot {
  const game = new Chess();
  let lastMove: LastMove = null;
  const safeUpto = Math.max(0, Math.min(upto, moves.length));

  for (let index = 0; index < safeUpto; index += 1) {
    const move = game.move(moves[index]);

    if (!move) {
      break;
    }

    lastMove = {
      from: move.from as Square,
      to: move.to as Square,
    };
  }

  return { game, lastMove };
}

function isUserTurn(game: Chess, side: "white" | "black") {
  return game.turn() === (side === "white" ? "w" : "b");
}

function getCurrentStep(
  opening: Opening,
  steps: OpeningStep[],
  currentIndex: number
): OpeningStep {
  if (currentIndex <= 0) {
    return {
      san: "",
      explanation: opening.summary,
      arrows: [],
      squares: [],
    };
  }

  return (
    steps[currentIndex - 1] ?? {
      san: "",
      explanation: opening.summary,
      arrows: [],
      squares: [],
    }
  );
}

function toSquares(values: string[]) {
  return values.filter((value) => /^[a-h][1-8]$/.test(value)) as Square[];
}

function toArrows(values: OpeningStep["arrows"]) {
  return values
    .filter((arrow) => /^[a-h][1-8]$/.test(arrow.from) && /^[a-h][1-8]$/.test(arrow.to))
    .map((arrow) => ({
      from: arrow.from as Square,
      to: arrow.to as Square,
    }));
}

const EMPTY_POSITION = buildPositionFromSanMoves([], 0);

export default function LearnPage() {
  const { openingSlug: routeOpeningSlug } = useParams<{ openingSlug?: string }>();
  const location = useLocation();

  const dashOpeningSlug = location.pathname.startsWith("/learn-")
    ? location.pathname.slice("/learn-".length)
    : "";

  const openingSlug = routeOpeningSlug || dashOpeningSlug || undefined;

  const [selectedVariationId, setSelectedVariationId] = useState("");
  const [mode, setMode] = useState<LearnMode>("study");
  const [studyIndex, setStudyIndex] = useState(0);

  const [markedSquares, setMarkedSquares] = useState<Square[]>([]);
  const [markedArrows, setMarkedArrows] = useState<MarkedArrow[]>([]);
  const [rightMouseFromSquare, setRightMouseFromSquare] = useState<Square | null>(null);

  const [repeatHistory, setRepeatHistory] = useState<string[]>([]);
  const [repeatSelectedSquare, setRepeatSelectedSquare] = useState<Square | null>(null);
  const [repeatLegalTargets, setRepeatLegalTargets] = useState<Square[]>([]);
  const [repeatDraggedFromSquare, setRepeatDraggedFromSquare] = useState<Square | null>(null);
  const [repeatDropHoverSquare, setRepeatDropHoverSquare] = useState<Square | null>(null);
  const [repeatFeedback, setRepeatFeedback] = useState<string | null>(null);

  const [openings, setOpenings] = useState<OpeningListItemDto[]>([]);
  const [opening, setOpening] = useState<Opening | null>(null);
  const [isLearnLoading, setIsLearnLoading] = useState(true);
  const [learnError, setLearnError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadLearnData() {
      setIsLearnLoading(true);
      setLearnError(null);

      try {
        const openingsListPromise = getOpenings();
        const openingPromise = openingSlug
          ? getOpeningBySlug(openingSlug)
          : Promise.resolve(null);

        const [nextOpenings, nextOpening] = await Promise.all([
          openingsListPromise,
          openingPromise,
        ]);

        if (cancelled) {
          return;
        }

        setOpenings(nextOpenings);
        setOpening(nextOpening);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setLearnError(
          error instanceof Error ? error.message : "Не удалось загрузить дебюты"
        );
        setOpening(null);
      } finally {
        if (!cancelled) {
          setIsLearnLoading(false);
        }
      }
    }

    loadLearnData();

    return () => {
      cancelled = true;
    };
  }, [openingSlug]);

  const catalogOpenings = useMemo(
    () => [...openings].sort((left, right) => left.title.localeCompare(right.title, "ru")),
    [openings]
  );

  const activeVariation = useMemo(() => {
    if (!opening || opening.variations.length === 0) {
      return null;
    }

    return (
      opening.variations.find((item) => item.id === selectedVariationId) ??
      opening.variations[0]
    );
  }, [opening, selectedVariationId]);

  const activeSteps = useMemo(
    () => (activeVariation ? getVariationSteps(activeVariation) : []),
    [activeVariation]
  );

  const activeMoves = useMemo(
    () => activeSteps.map((step) => step.san),
    [activeSteps]
  );

  const studyPosition = useMemo(() => {
    if (!activeVariation) {
      return EMPTY_POSITION;
    }

    return buildPositionFromSanMoves(activeMoves, studyIndex);
  }, [activeVariation, activeMoves, studyIndex]);

  const repeatPosition = useMemo(
    () => buildPositionFromSanMoves(repeatHistory, repeatHistory.length),
    [repeatHistory]
  );

  const repeatUserSide = opening?.side ?? "white";
  const repeatCompleted = activeVariation
    ? repeatHistory.length >= activeSteps.length
    : false;

  function resetRepeatSelection() {
    setRepeatSelectedSquare(null);
    setRepeatLegalTargets([]);
  }

  function resetRepeatDragState() {
    setRepeatDraggedFromSquare(null);
    setRepeatDropHoverSquare(null);
  }

  function resetRepeatBoard() {
    if (!activeVariation || !opening) {
      return;
    }

    const nextHistory: string[] = [];
    const game = new Chess();

    while (nextHistory.length < activeSteps.length) {
      if (isUserTurn(game, opening.side)) {
        break;
      }

      const nextSan = activeMoves[nextHistory.length];
      const move = game.move(nextSan);

      if (!move) {
        break;
      }

      nextHistory.push(move.san);
    }

    setRepeatHistory(nextHistory);
    setRepeatFeedback(null);
    resetRepeatSelection();
    resetRepeatDragState();
  }

  useEffect(() => {
    if (!opening || opening.variations.length === 0) {
      return;
    }

    const hasVariation = opening.variations.some(
      (item) => item.id === selectedVariationId
    );

    if (!hasVariation) {
      setSelectedVariationId(opening.variations[0].id);
    }
  }, [opening, selectedVariationId]);

  useEffect(() => {
    if (!opening || !activeVariation) {
      return;
    }

    setStudyIndex(0);
    setMode("study");
    setMarkedSquares([]);
    setMarkedArrows([]);
    setRepeatHistory([]);
    setRepeatFeedback(null);
    resetRepeatSelection();
    resetRepeatDragState();
  }, [opening?.id, activeVariation?.id]);

  useEffect(() => {
    if (mode === "repeat" && opening && activeVariation) {
      resetRepeatBoard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, opening?.id, activeVariation?.id]);

  function setRepeatSelectionFromSquare(square: Square) {
    const moves = repeatPosition.game.moves({ square, verbose: true });

    if (moves.length === 0) {
      resetRepeatSelection();
      return;
    }

    setRepeatSelectedSquare(square);
    setRepeatLegalTargets(moves.map((move) => move.to as Square));
  }

  function playAutomaticReplies(baseHistory: string[]) {
    if (!activeVariation || !opening) {
      return;
    }

    const nextGame = buildPositionFromSanMoves(baseHistory, baseHistory.length).game;
    const nextHistory = [...baseHistory];

    while (nextHistory.length < activeSteps.length) {
      if (isUserTurn(nextGame, opening.side)) {
        break;
      }

      const san = activeMoves[nextHistory.length];
      const move = nextGame.move(san);

      if (!move) {
        break;
      }

      nextHistory.push(move.san);
    }

    setRepeatHistory(nextHistory);
  }

  function tryRepeatMove(from: Square, to: Square) {
    if (!activeVariation || !opening || repeatCompleted) {
      return false;
    }

    const game = buildPositionFromSanMoves(repeatHistory, repeatHistory.length).game;

    if (!isUserTurn(game, opening.side)) {
      return false;
    }

    try {
      const move = game.move({ from, to, promotion: "q" });

      if (!move) {
        return false;
      }

      const expectedSan = activeMoves[repeatHistory.length] ?? "";

      if (normalizeSan(move.san) !== normalizeSan(expectedSan)) {
        setRepeatFeedback(`Сейчас по теории нужен ход: ${expectedSan}`);
        resetRepeatSelection();
        resetRepeatDragState();
        return false;
      }

      const nextHistory = [...repeatHistory, move.san];

      setRepeatFeedback(null);
      setRepeatHistory(nextHistory);
      resetRepeatSelection();
      resetRepeatDragState();
      playAutomaticReplies(nextHistory);
      return true;
    } catch {
      return false;
    }
  }

  function toggleMarkedSquare(square: Square) {
    setMarkedSquares((current) =>
      current.includes(square)
        ? current.filter((item) => item !== square)
        : [...current, square]
    );
  }

  function toggleMarkedArrow(from: Square, to: Square) {
    setMarkedArrows((current) => {
      const exists = current.some((item) => item.from === from && item.to === to);

      if (exists) {
        return current.filter((item) => !(item.from === from && item.to === to));
      }

      return [...current, { from, to }];
    });
  }

  function handleRightMouseDown(square: Square) {
    setRightMouseFromSquare(square);
  }

  function handleRightMouseUp(square: Square) {
    if (!rightMouseFromSquare) {
      return;
    }

    if (rightMouseFromSquare === square) {
      toggleMarkedSquare(square);
    } else {
      toggleMarkedArrow(rightMouseFromSquare, square);
    }

    setRightMouseFromSquare(null);
  }

  function handleRepeatSquareClick(square: Square) {
    if (mode !== "repeat" || repeatCompleted) {
      return;
    }

    const piece = repeatPosition.game.get(square);
    const ownPiece =
      piece?.color === (repeatUserSide === "white" ? "w" : "b") &&
      piece?.color === repeatPosition.game.turn();

    if (!repeatSelectedSquare) {
      if (ownPiece) {
        setRepeatSelectionFromSquare(square);
      }
      return;
    }

    if (repeatSelectedSquare === square) {
      resetRepeatSelection();
      return;
    }

    const moved = tryRepeatMove(repeatSelectedSquare, square);

    if (!moved && ownPiece) {
      setRepeatSelectionFromSquare(square);
      return;
    }

    if (!moved) {
      resetRepeatSelection();
    }
  }

  function handleRepeatDragStart(
    event: DragEvent<HTMLButtonElement>,
    square: Square
  ) {
    if (mode !== "repeat" || repeatCompleted) {
      event.preventDefault();
      return;
    }

    const piece = repeatPosition.game.get(square);
    const ownPiece =
      piece?.color === (repeatUserSide === "white" ? "w" : "b") &&
      piece?.color === repeatPosition.game.turn();

    if (!ownPiece) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData("text/plain", square);
    event.dataTransfer.effectAllowed = "move";
    setRepeatDraggedFromSquare(square);
    setRepeatDropHoverSquare(null);
    setRepeatSelectionFromSquare(square);
  }

  function handleRepeatDragOver(
    event: DragEvent<HTMLButtonElement>,
    square: Square
  ) {
    if (!repeatDraggedFromSquare || mode !== "repeat" || repeatCompleted) {
      return;
    }

    event.preventDefault();

    if (repeatLegalTargets.includes(square)) {
      setRepeatDropHoverSquare(square);
    } else {
      setRepeatDropHoverSquare(null);
    }
  }

  function handleRepeatDragLeave(square: Square) {
    if (repeatDropHoverSquare === square) {
      setRepeatDropHoverSquare(null);
    }
  }

  function handleRepeatDrop(event: DragEvent<HTMLButtonElement>, square: Square) {
    if (mode !== "repeat" || repeatCompleted) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    const raw = event.dataTransfer.getData("text/plain");
    const from = (repeatDraggedFromSquare ?? raw) as Square | "";

    if (!from) {
      resetRepeatDragState();
      return;
    }

    const moved = tryRepeatMove(from as Square, square);

    if (!moved) {
      resetRepeatSelection();
    }

    resetRepeatDragState();
  }

  function handleRepeatDragEnd() {
    resetRepeatDragState();
  }

  function handlePrevStudyMove() {
    if (!activeVariation) {
      return;
    }

    setStudyIndex((value) => Math.max(0, value - 1));
  }

  function handleNextStudyMove() {
    if (!activeVariation) {
      return;
    }

    setStudyIndex((value) => Math.min(activeSteps.length, value + 1));
  }

  if (isLearnLoading) {
    return (
      <section className="page-section">
        <div className="placeholder-card">
          <h2>Загрузка дебютов</h2>
          <p>Получаем обучающие материалы из базы данных.</p>
        </div>
      </section>
    );
  }

  if (learnError) {
    return (
      <section className="page-section">
        <div className="placeholder-card">
          <h2>Не удалось загрузить дебюты</h2>
          <p>{learnError}</p>
          <div className="hero-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={() => window.location.reload()}
            >
              Обновить страницу
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!openingSlug) {
    return (
      <section className="learn-catalog-page">
        <div className="learn-catalog-header page-header-block">
          <p className="section-kicker">Обучение</p>
          <h2>Шахматные дебюты</h2>
          <p className="section-text">
            Выберите дебют, откройте страницу изучения и проходите теорию по ходам
          </p>
        </div>

        <div className="learn-catalog-grid">
          {catalogOpenings.map((item) => (
            <Link
              key={item.id}
              to={`/learn-${item.slug}`}
              className="learn-catalog-card"
            >
              <div className="learn-catalog-eco">{item.eco}</div>
              <div className="learn-catalog-body">
                <strong>{item.title}</strong>
                <span>
                  {item.side === "white" ? "За белых" : "За чёрных"} · против {item.against}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  if (!opening || !activeVariation) {
    return (
      <section className="page-section">
        <div className="placeholder-card">
          <h2>Дебют не найден</h2>
          <p>Вернитесь к списку дебютов и выберите существующий вариант.</p>
          <div className="hero-actions">
            <Link to="/learn" className="primary-link-btn">
              Все дебюты
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const studyStep = getCurrentStep(opening, activeSteps, studyIndex);
  const repeatStep = getCurrentStep(opening, activeSteps, repeatHistory.length);

  const studyExplanation = studyStep.explanation;

  const repeatExplanation = repeatCompleted
    ? "Отлично: вы повторили теоретическую линию до конца. Можете начать заново и закрепить порядок ходов ещё раз."
    : repeatStep.explanation;

  const annotationStep = mode === "study" ? studyStep : repeatStep;
  const annotatedSquares = toSquares(annotationStep.squares);
  const annotatedArrows = toArrows(annotationStep.arrows);

  const boardProps =
    mode === "study"
      ? {
          game: studyPosition.game,
          board: studyPosition.game.board(),
          lastMove: studyPosition.lastMove,
          selectedSquare: null,
          legalTargets: [] as Square[],
          draggedFromSquare: null,
          dropHoverSquare: null,
          readOnly: true,
          overlayArrow: studyPosition.lastMove,
          onSquareClick: undefined,
          onDragStart: undefined,
          onDragOver: undefined,
          onDragLeave: undefined,
          onDrop: undefined,
          onDragEnd: undefined,
        }
      : {
          game: repeatPosition.game,
          board: repeatPosition.game.board(),
          lastMove: repeatPosition.lastMove,
          selectedSquare: repeatSelectedSquare,
          legalTargets: repeatLegalTargets,
          draggedFromSquare: repeatDraggedFromSquare,
          dropHoverSquare: repeatDropHoverSquare,
          readOnly: false,
          overlayArrow: null,
          onSquareClick: handleRepeatSquareClick,
          onDragStart: handleRepeatDragStart,
          onDragOver: handleRepeatDragOver,
          onDragLeave: handleRepeatDragLeave,
          onDrop: handleRepeatDrop,
          onDragEnd: handleRepeatDragEnd,
        };

  return (
    <section className="learn-detail-page">
      <div className="learn-detail-layout">
        <aside className="learn-side learn-side-left">
          <div className="learn-panel learn-opening-panel">
            <p className="learn-panel-kicker">
              {opening.eco} · против {opening.against}
            </p>
            <h2>{opening.title}</h2>
            <p>{opening.summary}</p>
          </div>

          <div className="learn-variation-list">
            {opening.variations.map((variation) => (
              <button
                type="button"
                key={variation.id}
                className={[
                  "learn-variation-card",
                  variation.id === activeVariation.id ? "active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setSelectedVariationId(variation.id)}
              >
                <strong>{variation.title}</strong>
                <span>{variation.subtitle}</span>
                <small>{variation.moves.length} полуходов</small>
              </button>
            ))}
          </div>
        </aside>

        <main className="learn-board-column">
          <div className="learn-board-frame">
            <ChessBoard
              board={boardProps.board}
              game={boardProps.game}
              orientation={opening.side}
              selectedSquare={boardProps.selectedSquare}
              legalTargets={boardProps.legalTargets}
              draggedFromSquare={boardProps.draggedFromSquare}
              dropHoverSquare={boardProps.dropHoverSquare}
              lastMove={boardProps.lastMove}
              readOnly={boardProps.readOnly}
              overlayArrow={boardProps.overlayArrow}
              markedSquares={[...annotatedSquares, ...markedSquares]}
              markedArrows={[...annotatedArrows, ...markedArrows]}
              onSquareRightMouseDown={handleRightMouseDown}
              onSquareRightMouseUp={handleRightMouseUp}
              onSquareClick={boardProps.onSquareClick}
              onDragStart={boardProps.onDragStart}
              onDragOver={boardProps.onDragOver}
              onDragLeave={boardProps.onDragLeave}
              onDrop={boardProps.onDrop}
              onDragEnd={boardProps.onDragEnd}
            />
          </div>
        </main>

        <aside className="learn-side learn-side-right">
          <div className="learn-panel learn-control-panel">
            <div className="learn-mode-switch">
              <button
                type="button"
                className={mode === "study" ? "active" : ""}
                onClick={() => setMode("study")}
              >
                Изучение
              </button>
              <button
                type="button"
                className={mode === "repeat" ? "active" : ""}
                onClick={() => setMode("repeat")}
              >
                Повторить
              </button>
            </div>

            {mode === "repeat" ? (
              <button
                type="button"
                className="learn-button learn-button-dark learn-restart-btn"
                onClick={resetRepeatBoard}
              >
                Начать заново
              </button>
            ) : null}

            <Link to="/learn" className="learn-button learn-button-light">
              Все дебюты
            </Link>
          </div>

          <div className="learn-panel learn-explanation-panel">
            <p className="learn-panel-kicker">Теоретический смысл</p>
            <p className="learn-explanation-text">
              {mode === "study" ? studyExplanation : repeatExplanation}
            </p>
            {repeatFeedback ? (
              <p className="learn-repeat-feedback">{repeatFeedback}</p>
            ) : null}
          </div>

          {mode === "study" ? (
            <div className="learn-panel learn-study-nav-panel">
              <button
                type="button"
                className="learn-button learn-button-light"
                onClick={handlePrevStudyMove}
                disabled={studyIndex === 0}
              >
                Назад
              </button>

              <button
                type="button"
                className="learn-button learn-button-dark"
                onClick={handleNextStudyMove}
                disabled={studyIndex >= activeSteps.length}
              >
                Далее
              </button>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
