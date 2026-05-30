import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Chess } from "chess.js";
import type { Square } from "chess.js";

import ChessBoard from "../components/chess/ChessBoard";
import MoveHistoryPanel from "../components/chess/MoveHistoryPanel";
import GameReviewChart from "../components/analysis/GameReviewChart";
import GameReviewMetrics from "../components/analysis/GameReviewMetrics";
import GamePhaseSummary from "../components/analysis/GamePhaseSummary";

import { getGameById, type SavedGameDto } from "../api/gamesApi";
import {
  identifyOpening,
  type OpeningIdentificationResultDto,
} from "../api/openingsApi";
import { useAnalysisBoard } from "../hooks/useAnalysisBoard";
import { useStockfishEval } from "../hooks/useStockfishEval";
import { useAnalysisKeyboardNavigation } from "../hooks/useAnalysisKeyboardNavigation";
import { useGameReviewEvaluations } from "../hooks/useGameReviewEvaluations";

type Side = "w" | "b";
type MaterialPiece = "p" | "n" | "b" | "r" | "q";
type PieceCountMap = Record<Side, Record<MaterialPiece, number>>;
type BoardOrientation = "white" | "black";

type AnalysisGameMeta = {
  whiteName: string;
  blackName: string;
  timeControl?: string;
  preferredOrientation?: BoardOrientation;
  playerSide?: Side;
  mode?: string;
};

const MATERIAL_VALUES: Record<MaterialPiece, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
};

const WHITE_PIECE_ICONS: Record<MaterialPiece, string> = {
  p: "♙",
  n: "♘",
  b: "♗",
  r: "♖",
  q: "♕",
};

const BLACK_PIECE_ICONS: Record<MaterialPiece, string> = {
  p: "♟",
  n: "♞",
  b: "♝",
  r: "♜",
  q: "♛",
};

function getEvaluationLabel(
  scoreType: "cp" | "mate" | null,
  scoreValue: number | null
) {
  if (!scoreType || scoreValue === null) {
    return "Оценка позиции загружается";
  }

  if (scoreType === "mate") {
    return scoreValue > 0
      ? "У белых решающая атака"
      : "У чёрных решающая атака";
  }

  const abs = Math.abs(scoreValue);

  if (abs < 40) return "Позиция примерно равная";

  if (abs < 120) {
    return scoreValue > 0
      ? "Небольшой перевес у белых"
      : "Небольшой перевес у чёрных";
  }

  if (abs < 300) {
    return scoreValue > 0 ? "Лучше у белых" : "Лучше у чёрных";
  }

  return scoreValue > 0
    ? "Сильный перевес у белых"
    : "Сильный перевес у чёрных";
}

function getMaterialDisplay(game: Chess) {
  const startCounts: PieceCountMap = {
    w: { p: 8, n: 2, b: 2, r: 2, q: 1 },
    b: { p: 8, n: 2, b: 2, r: 2, q: 1 },
  };

  const currentCounts: PieceCountMap = {
    w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    b: { p: 0, n: 0, b: 0, r: 0, q: 0 },
  };

  for (const row of game.board()) {
    for (const piece of row) {
      if (!piece || piece.type === "k") continue;

      const color = piece.color as Side;
      const type = piece.type as MaterialPiece;

      currentCounts[color][type] += 1;
    }
  }

  const whiteLostIcons: string[] = [];
  const blackLostIcons: string[] = [];
  let whiteLostPoints = 0;
  let blackLostPoints = 0;

  for (const type of ["p", "n", "b", "r", "q"] as const) {
    const whiteLost = startCounts.w[type] - currentCounts.w[type];
    const blackLost = startCounts.b[type] - currentCounts.b[type];

    if (whiteLost > 0) {
      whiteLostPoints += whiteLost * MATERIAL_VALUES[type];

      for (let i = 0; i < whiteLost; i += 1) {
        whiteLostIcons.push(WHITE_PIECE_ICONS[type]);
      }
    }

    if (blackLost > 0) {
      blackLostPoints += blackLost * MATERIAL_VALUES[type];

      for (let i = 0; i < blackLost; i += 1) {
        blackLostIcons.push(BLACK_PIECE_ICONS[type]);
      }
    }
  }

  const whiteAdvantage = blackLostPoints - whiteLostPoints;
  const blackAdvantage = whiteLostPoints - blackLostPoints;

  return {
    white: {
      advantage: whiteAdvantage > 0 ? `+${whiteAdvantage}` : "",
      losses: blackLostIcons.join(""),
    },
    black: {
      advantage: blackAdvantage > 0 ? `+${blackAdvantage}` : "",
      losses: whiteLostIcons.join(""),
    },
  };
}

function getArrowFromUci(uci: string) {
  if (!/^[a-h][1-8][a-h][1-8][nbrq]?$/.test(uci)) return null;

  return {
    from: uci.slice(0, 2) as Square,
    to: uci.slice(2, 4) as Square,
  };
}

function normalizeMoveTimes(value: SavedGameDto["moveTimesMs"]) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => Number(item))
    .filter((item) => Number.isFinite(item));
}

function getSessionMoveTimes() {
  try {
    const raw = sessionStorage.getItem("play_last_move_times");

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));
  } catch {
    return [];
  }
}


function normalizeSideValue(value: unknown): Side | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (["w", "white", "белые", "whiteSide"].includes(normalized)) {
    return "w";
  }

  if (["b", "black", "blackSide", "чёрные", "черные"].includes(normalized)) {
    return "b";
  }

  return undefined;
}

function getOrientationForPlayerSide(
  playerSide?: Side
): BoardOrientation | undefined {
  if (playerSide === "w") return "white";
  if (playerSide === "b") return "black";
  return undefined;
}

function normalizeComparableName(value: string) {
  return value.trim().replace(/^@/, "").toLowerCase();
}

function collectNameCandidates(value: unknown, result: Set<string>, depth = 0) {
  if (depth > 2 || value === null || value === undefined) {
    return;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed && trimmed.length <= 80) {
      result.add(normalizeComparableName(trimmed));
    }

    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectNameCandidates(item, result, depth + 1);
    }

    return;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const usefulKeys = [
      "name",
      "nickname",
      "username",
      "displayName",
      "login",
      "handle",
      "email",
    ];

    for (const key of usefulKeys) {
      collectNameCandidates(record[key], result, depth + 1);
    }
  }
}

function getStoredViewerNameCandidates() {
  const result = new Set<string>();

  if (typeof window === "undefined") {
    return result;
  }

  const storages = [window.localStorage, window.sessionStorage];

  for (const storage of storages) {
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);

      if (!key) {
        continue;
      }

      const raw = storage.getItem(key);

      if (!raw) {
        continue;
      }

      const looksUseful = /user|auth|profile|account|viewer|player|session/i.test(
        key
      );

      if (!looksUseful) {
        continue;
      }

      try {
        collectNameCandidates(JSON.parse(raw), result);
      } catch {
        if (raw.length <= 80) {
          result.add(normalizeComparableName(raw));
        }
      }
    }
  }

  return result;
}

function resolveSavedGamePlayerSide(savedGame: SavedGameDto) {
  const record = savedGame as SavedGameDto &
    Record<string, unknown> & {
      playerSide?: unknown;
      userSide?: unknown;
      viewerSide?: unknown;
      ownerSide?: unknown;
      side?: unknown;
      color?: unknown;
      playerColor?: unknown;
      userColor?: unknown;
      viewerColor?: unknown;
      ownerColor?: unknown;
    };

  const directSide =
    normalizeSideValue(record.playerSide) ??
    normalizeSideValue(record.userSide) ??
    normalizeSideValue(record.viewerSide) ??
    normalizeSideValue(record.ownerSide) ??
    normalizeSideValue(record.side) ??
    normalizeSideValue(record.color) ??
    normalizeSideValue(record.playerColor) ??
    normalizeSideValue(record.userColor) ??
    normalizeSideValue(record.viewerColor) ??
    normalizeSideValue(record.ownerColor);

  if (directSide) {
    return directSide;
  }

  const viewerNames = getStoredViewerNameCandidates();

  if (viewerNames.size === 0) {
    return undefined;
  }

  const whiteName = normalizeComparableName(savedGame.whiteName);
  const blackName = normalizeComparableName(savedGame.blackName);

  const isWhiteViewer = viewerNames.has(whiteName);
  const isBlackViewer = viewerNames.has(blackName);

  if (isWhiteViewer && !isBlackViewer) {
    return "w";
  }

  if (isBlackViewer && !isWhiteViewer) {
    return "b";
  }

  return undefined;
}

function getDefaultAnalysisMeta(): AnalysisGameMeta {
  return {
    whiteName: "Белые",
    blackName: "Чёрные",
    preferredOrientation: "white",
  };
}

function getSessionAnalysisMeta(): AnalysisGameMeta | null {
  try {
    const raw = sessionStorage.getItem("play_last_analysis_meta");

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<AnalysisGameMeta>;
    const playerSide = normalizeSideValue(parsed.playerSide);
    const preferredOrientation =
      getOrientationForPlayerSide(playerSide) ??
      (parsed.preferredOrientation === "black" ? "black" : "white");

    return {
      whiteName: parsed.whiteName || "Белые",
      blackName: parsed.blackName || "Чёрные",
      timeControl: parsed.timeControl,
      preferredOrientation,
      playerSide,
      mode: parsed.mode,
    };
  } catch {
    return null;
  }
}

function getInitialAnalysisOrientation(): BoardOrientation {
  return getSessionAnalysisMeta()?.preferredOrientation ?? "white";
}


function getOpeningVariationTitleLines(title: string) {
  return title
    .replace(/^\s*Вариант:\s*/i, "")
    .replace(/^\s*Семейство:\s*/i, "")
    .replace(/\s+Семейство:\s*/i, "\n")
    .replace(/\s+Вариант:\s*/i, "\n")
    .split(/\n|\\n/)
    .map((line) =>
      line
        .replace(/^\s*Вариант:\s*/i, "")
        .replace(/^\s*Семейство:\s*/i, "")
        .trim()
    )
    .filter(Boolean);
}

export default function AnalysisPage() {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");

  const [orientation, setOrientation] = useState<BoardOrientation>(() =>
    getInitialAnalysisOrientation()
  );

  const [analysisMeta, setAnalysisMeta] = useState<AnalysisGameMeta>(() => {
    return getSessionAnalysisMeta() ?? getDefaultAnalysisMeta();
  });

  const [loadedGameMoveTimesMs, setLoadedGameMoveTimesMs] = useState<number[]>(
    []
  );

  const [historyGameLoadError, setHistoryGameLoadError] = useState<
    string | null
  >(null);

  const [openingIdentification, setOpeningIdentification] =
    useState<OpeningIdentificationResultDto | null>(null);
  const [isOpeningIdentificationLoading, setIsOpeningIdentificationLoading] =
    useState(false);
  const [openingIdentificationError, setOpeningIdentificationError] =
    useState<string | null>(null);

  function handleToggleBoard() {
    setOrientation((prev) => (prev === "white" ? "black" : "white"));
  }

  const {
    game,
    board,
    currentMoveIndex,
    currentLineLength,
    selectedSquare,
    legalTargets,
    draggedFromSquare,
    dropHoverSquare,
    pgnInput,
    loadedSourceLabel,
    loadError,
    statusText,
    isVariationMode,
    activeBranchId,
    mainLineRows,
    variationViews,
    setPgnInput,
    handleLoadPgn,
    handleLoadExternalPgn,
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
  } = useAnalysisBoard();

  useEffect(() => {
    if (!gameId) {
      return;
    }

    let cancelled = false;

    setHistoryGameLoadError(null);

    getGameById(gameId)
      .then((savedGame) => {
        if (cancelled) return;

        const savedGameWithMeta = savedGame as SavedGameDto & {
          timeControl?: string;
        };
        const playerSide = resolveSavedGamePlayerSide(savedGame);
        const preferredOrientation =
          getOrientationForPlayerSide(playerSide) ?? "white";

        setAnalysisMeta({
          whiteName: savedGame.whiteName,
          blackName: savedGame.blackName,
          timeControl: savedGameWithMeta.timeControl,
          preferredOrientation,
          playerSide,
        });

        setOrientation(preferredOrientation);

        handleLoadExternalPgn(
          savedGame.pgn,
          `Партия из истории: ${savedGame.whiteName} — ${savedGame.blackName}`
        );

        setLoadedGameMoveTimesMs(normalizeMoveTimes(savedGame.moveTimesMs));
      })
      .catch((error) => {
        if (cancelled) return;

        setHistoryGameLoadError(
          error instanceof Error
            ? error.message
            : "Не удалось загрузить партию из истории"
        );
      });

    return () => {
      cancelled = true;
    };
  }, [gameId, handleLoadExternalPgn]);

  useEffect(() => {
    if (gameId) {
      return;
    }

    const sessionMeta = getSessionAnalysisMeta();

    if (!sessionMeta) {
      return;
    }

    setAnalysisMeta(sessionMeta);
    setOrientation(sessionMeta.preferredOrientation ?? "white");
  }, [gameId]);

  const reviewMoveHistory = useMemo(
    () =>
      mainLineRows.flatMap((row) => {
        const moves: string[] = [];

        if (row.white) {
          moves.push(row.white);
        }

        if (row.black) {
          moves.push(row.black);
        }

        return moves;
      }),
    [mainLineRows]
  );

  useEffect(() => {
    let cancelled = false;

    if (reviewMoveHistory.length === 0) {
      setOpeningIdentification(null);
      setOpeningIdentificationError(null);
      setIsOpeningIdentificationLoading(false);
      return;
    }

    setIsOpeningIdentificationLoading(true);
    setOpeningIdentificationError(null);

    identifyOpening(reviewMoveHistory)
      .then((result) => {
        if (cancelled) {
          return;
        }

        setOpeningIdentification(result);
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        setOpeningIdentification(null);
        setOpeningIdentificationError(
          error instanceof Error ? error.message : "Не удалось определить дебют"
        );
      })
      .finally(() => {
        if (!cancelled) {
          setIsOpeningIdentificationLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [reviewMoveHistory]);

  const {
    evaluationsCp: reviewEvaluationsCp,
    isAnalyzing: isReviewAnalyzing,
    progressLabel: reviewProgressLabel,
    error: reviewEvaluationError,
  } = useGameReviewEvaluations(reviewMoveHistory, true, 8);

  const reviewStatusText = reviewEvaluationError
    ? "Ошибка расчёта"
    : isReviewAnalyzing
    ? `Расчёт ${reviewProgressLabel}`
    : "Готово";

  const sessionMoveTimesMs = useMemo(() => getSessionMoveTimes(), []);

  const reviewMoveTimesMs =
    loadedGameMoveTimesMs.length > 0
      ? loadedGameMoveTimesMs
      : sessionMoveTimesMs;

  const {
    isEngineReady,
    isAnalyzing,
    depth,
    scoreText,
    scoreType,
    scoreValue,
    evaluationPercent,
    lines,
  } = useStockfishEval(game.fen(), true, 12);

  useAnalysisKeyboardNavigation({
    onGoToStart: handleGoToStart,
    onStepBack: handleStepBack,
    onStepForward: handleStepForward,
    onGoToEnd: handleGoToEnd,
  });

  const evaluationLabel = getEvaluationLabel(scoreType, scoreValue);
  const material = getMaterialDisplay(game);
  const mainArrow = selectedSquare
    ? null
    : getArrowFromUci(lines[0]?.firstMoveUci ?? "");
  const cleanStatusText = statusText.replace(/\.$/, "");

  const visualTopSide: Side = orientation === "white" ? "b" : "w";
  const visualBottomSide: Side = orientation === "white" ? "w" : "b";

  const visualTopMaterial =
    visualTopSide === "w" ? material.white : material.black;

  const visualBottomMaterial =
    visualBottomSide === "w" ? material.white : material.black;

  const visualTopName =
    visualTopSide === "w" ? analysisMeta.whiteName : analysisMeta.blackName;

  const visualBottomName =
    visualBottomSide === "w" ? analysisMeta.whiteName : analysisMeta.blackName;

  const visualTopEvalLabel = visualTopSide === "w" ? "Б" : "Ч";
  const visualBottomEvalLabel = visualBottomSide === "w" ? "Б" : "Ч";

  const historyHeaderRight = analysisMeta.timeControl ? (
    <span className="analysis-v4-history-badge">
      {analysisMeta.timeControl}
    </span>
  ) : null;

  return (
    <section className="analysis-v4">
      <div className="analysis-v4-main">
        <aside className="analysis-v4-left">
          <div className="analysis-v4-eval-card">
            <div className="analysis-v4-panel-head">
              <h3>Оценка позиции</h3>

              <div className="analysis-v4-head-meta">
                <span
                  className={[
                    "analysis-v4-engine-chip",
                    isEngineReady ? "ready" : "",
                    isAnalyzing ? "active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {!isEngineReady
                    ? "Запуск..."
                    : isAnalyzing
                    ? "Анализ..."
                    : "Готов"}
                </span>

                <span className="analysis-v4-depth-badge">
                  d{depth || "—"}
                </span>
              </div>
            </div>

            <div className="analysis-v4-score-box">
              <div className="analysis-v4-score">{scoreText}</div>
              <div className="analysis-v4-score-label">{evaluationLabel}</div>
            </div>
          </div>

          <div className="analysis-v4-lines-card">
            <h3>Лучшие продолжения</h3>

            <div className="analysis-v4-lines-list">
              {lines.length === 0 ? (
                <div className="analysis-v4-line-item muted">
                  Движок подбирает лучшие линии...
                </div>
              ) : (
                lines.map((line) => (
                  <button
                    key={line.index}
                    type="button"
                    className="analysis-v4-line-item analysis-v4-line-action"
                    onClick={() => handleApplyEngineLine(line.firstMoveUci)}
                  >
                    <div className="analysis-v4-line-top">
                      <span className="analysis-v4-line-rank">
                        {line.index}.
                      </span>

                      <span className="analysis-v4-line-score">
                        {line.scoreText}
                      </span>

                      <span className="analysis-v4-line-bestmove">
                        {line.firstMoveSan}
                      </span>
                    </div>

                    <div className="analysis-v4-line-pv">{line.sanLine}</div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="analysis-v4-opening-card">
            <div className="analysis-v4-panel-head">
              <h3>Сыгранный дебют</h3>

              <span className="analysis-v4-opening-chip">
                {isOpeningIdentificationLoading
                  ? "Поиск..."
                  : openingIdentification?.opening
                  ? openingIdentification.matchType === "family"
                    ? "Семейство"
                    : openingIdentification.matchType === "position"
                    ? "Транспозиция"
                    : "Найден"
                  : "—"}
              </span>
            </div>

            {isOpeningIdentificationLoading ? (
              <p className="analysis-v4-opening-muted">
                Сравниваем первые ходы партии с базой дебютов...
              </p>
            ) : openingIdentificationError ? (
              <p className="analysis-v4-opening-muted">
                Не удалось определить дебют: {openingIdentificationError}
              </p>
            ) : openingIdentification?.opening ? (
              <div className="analysis-v4-opening-result">
                <div className="analysis-v4-opening-title-row">
                  <span className="analysis-v4-opening-eco">
                    {openingIdentification.opening.eco || "—"}
                  </span>
                  <strong>{openingIdentification.opening.title}</strong>
                </div>

                {openingIdentification.variation ? (
                  <div className="analysis-v4-opening-variation">
                    {getOpeningVariationTitleLines(
                      openingIdentification.variation.title
                    ).map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}

                <p className="analysis-v4-opening-match">
                  Теоретических ходов: {openingIdentification.matchedPlyCount}
                </p>
              </div>
            ) : (
              <p className="analysis-v4-opening-muted">
                {reviewMoveHistory.length < 6
                  ? "Загрузите минимум 3 хода партии, чтобы определить дебют."
                  : "Дебют не определён по текущей базе."}
              </p>
            )}
          </div>

          <div className="analysis-v4-import-card analysis-v4-import-card-left">
            <div className="analysis-v4-import-head">
              <div>
                <h3>PGN партии</h3>
                <p className="analysis-v4-import-subtitle">
                  Загрузка партии для просмотра и анализа
                </p>
              </div>

              <span className="analysis-v4-inline-status">
                {loadedSourceLabel}
              </span>
            </div>

            <textarea
              className="text-area analysis-v4-textarea"
              value={pgnInput}
              onChange={(event) => setPgnInput(event.target.value)}
              placeholder="Вставь PGN партии сюда"
              rows={5}
            />

            <div className="form-actions">
              <button
                type="button"
                className="primary-btn"
                onClick={handleLoadPgn}
              >
                Загрузить PGN
              </button>
            </div>

            {loadError ? <p className="error-box">{loadError}</p> : null}

            {historyGameLoadError ? (
              <p className="error-box">{historyGameLoadError}</p>
            ) : null}
          </div>
        </aside>

        <div className="analysis-v4-center">
          <div className="analysis-v4-player-row analysis-v4-player-top">
            <div className="analysis-v4-player-left">
              <span className="analysis-v4-player-name">{visualTopName}</span>
            </div>

            <div className="analysis-v4-player-right">
              {visualTopMaterial.losses ? (
                <span className="analysis-v4-loss-chip">
                  {visualTopMaterial.losses}
                </span>
              ) : null}

              {visualTopMaterial.advantage ? (
                <span className="analysis-v4-material-chip">
                  {visualTopMaterial.advantage}
                </span>
              ) : null}
            </div>
          </div>

          <div className="analysis-v4-stage-top">
            <div className="analysis-v4-eval-bar-card">
              <div className="analysis-v4-eval-track">
                <div
                  className="analysis-v4-eval-black"
                  style={{ height: `${100 - evaluationPercent}%` }}
                />

                <div
                  className="analysis-v4-eval-white"
                  style={{ height: `${evaluationPercent}%` }}
                />
              </div>

              <div className="analysis-v4-eval-side top">
                {visualTopEvalLabel}
              </div>

              <div className="analysis-v4-eval-side bottom">
                {visualBottomEvalLabel}
              </div>
            </div>

            <div className="analysis-v4-board-shell">
              <ChessBoard
                board={board}
                game={game}
                orientation={orientation}
                selectedSquare={selectedSquare}
                legalTargets={legalTargets}
                draggedFromSquare={draggedFromSquare}
                dropHoverSquare={dropHoverSquare}
                readOnly={false}
                overlayArrow={mainArrow}
                onSquareClick={handleSquareClick}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
              />
            </div>
          </div>

          <div className="analysis-v4-player-row analysis-v4-player-bottom">
            <div className="analysis-v4-player-left">
              <span className="analysis-v4-player-name">
                {visualBottomName}
              </span>
            </div>

            <div className="analysis-v4-player-right">
              {visualBottomMaterial.losses ? (
                <span className="analysis-v4-loss-chip">
                  {visualBottomMaterial.losses}
                </span>
              ) : null}

              {visualBottomMaterial.advantage ? (
                <span className="analysis-v4-material-chip">
                  {visualBottomMaterial.advantage}
                </span>
              ) : null}
            </div>
          </div>

          <div className="analysis-v4-review-center">
            <GameReviewChart
              moveHistory={reviewMoveHistory}
              evaluationsCp={reviewEvaluationsCp}
              moveTimesMs={reviewMoveTimesMs}
              isAnalyzing={isReviewAnalyzing}
              statusText={reviewStatusText}
              currentMoveIndex={currentMoveIndex}
              onJumpToMove={handleJumpToMainLine}
            />
          </div>
        </div>

        <aside className="analysis-v4-right">
          <div className="analysis-v4-history-shell">
            <MoveHistoryPanel
              mainLineRows={mainLineRows}
              currentMoveIndex={currentMoveIndex}
              activeBranchId={activeBranchId}
              variations={variationViews}
              onJumpToMainLine={handleJumpToMainLine}
              onJumpToVariationMove={handleJumpToVariationMove}
              onSelectVariation={handleSelectVariation}
              headerRight={historyHeaderRight}
            />
          </div>

          <div className="analysis-v4-history-nav">
            <button
              type="button"
              className="secondary-btn"
              onClick={handleGoToStart}
              disabled={currentMoveIndex === 0}
              title="В начало"
            >
              {"<<"}
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={handleStepBack}
              disabled={currentMoveIndex === 0}
              title="Назад"
            >
              {"<"}
            </button>

            <span className="move-counter">
              {currentMoveIndex} / {currentLineLength}
            </span>

            <button
              type="button"
              className="secondary-btn"
              onClick={handleStepForward}
              disabled={currentMoveIndex === currentLineLength}
              title="Вперёд"
            >
              {">"}
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={handleGoToEnd}
              disabled={currentMoveIndex === currentLineLength}
              title="В конец"
            >
              {">>"}
            </button>

            <button
              type="button"
              className="secondary-btn analysis-v4-flip-btn"
              onClick={handleToggleBoard}
              title="Перевернуть доску"
              aria-label="Перевернуть доску"
            >
              ⟳
            </button>

            {isVariationMode ? (
              <button
                type="button"
                className="secondary-btn analysis-v4-return-btn"
                onClick={handleReturnToMainLine}
              >
                К основной
              </button>
            ) : null}
          </div>

          <div className="analysis-v4-turn-card">
            <span className="analysis-v4-turn-label">Текущий статус</span>
            <strong>{cleanStatusText}</strong>
          </div>

          <GameReviewMetrics
            moveHistory={reviewMoveHistory}
            evaluationsCp={reviewEvaluationsCp}
            moveTimesMs={reviewMoveTimesMs}
            whiteName={analysisMeta.whiteName}
            blackName={analysisMeta.blackName}
          />

          <GamePhaseSummary
            moveHistory={reviewMoveHistory}
            evaluationsCp={reviewEvaluationsCp}
            moveTimesMs={reviewMoveTimesMs}
          />
        </aside>
      </div>
    </section>
  );
}
