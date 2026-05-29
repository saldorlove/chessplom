import { useEffect, useMemo, useState } from "react";
import { Chess } from "chess.js";

type ReviewEvaluationState = {
  evaluationsCp: Array<number | null>;
  isAnalyzing: boolean;
  completed: number;
  total: number;
  error: string | null;
};

function buildFenSequence(moveHistory: string[]) {
  const chess = new Chess();
  const fens: string[] = [chess.fen()];

  for (const san of moveHistory) {
    try {
      chess.move(san);
      fens.push(chess.fen());
    } catch {
      break;
    }
  }

  return fens;
}

function orientScoreToWhiteCp(
  fen: string,
  scoreType: "cp" | "mate",
  rawScoreValue: number
) {
  const sideToMove = fen.split(" ")[1] === "b" ? "b" : "w";
  const whitePerspectiveValue =
    sideToMove === "w" ? rawScoreValue : rawScoreValue * -1;

  if (scoreType === "cp") {
    return whitePerspectiveValue;
  }

  return whitePerspectiveValue >= 0 ? 10_000 : -10_000;
}

export function useGameReviewEvaluations(
  moveHistory: string[],
  enabled = true,
  depth = 8
) {
  const fenSequence = useMemo(
    () => buildFenSequence(moveHistory),
    [moveHistory]
  );

  const [state, setState] = useState<ReviewEvaluationState>({
    evaluationsCp: Array(fenSequence.length).fill(null),
    isAnalyzing: false,
    completed: 0,
    total: fenSequence.length,
    error: null,
  });

  useEffect(() => {
    if (!enabled || fenSequence.length === 0) {
      setState({
        evaluationsCp: Array(fenSequence.length).fill(null),
        isAnalyzing: false,
        completed: 0,
        total: fenSequence.length,
        error: null,
      });

      return;
    }

    let cancelled = false;
    let currentIndex = 0;
    let latestScoreCp: number | null = null;

    const worker = new Worker("/stockfish/stockfish-18-lite-single.js");

    function finishWithError(message: string) {
      if (cancelled) return;

      setState((prev) => ({
        ...prev,
        isAnalyzing: false,
        error: message,
      }));

      try {
        worker.postMessage("quit");
        worker.terminate();
      } catch {
        /* ignore */
      }
    }

    function analyzeNextPosition() {
      if (cancelled) return;

      if (currentIndex >= fenSequence.length) {
        setState((prev) => ({
          ...prev,
          isAnalyzing: false,
          completed: fenSequence.length,
          total: fenSequence.length,
        }));

        try {
          worker.postMessage("quit");
          worker.terminate();
        } catch {
          /* ignore */
        }

        return;
      }

      latestScoreCp = null;

      const fen = fenSequence[currentIndex];

      worker.postMessage("stop");
      worker.postMessage("setoption name MultiPV value 1");
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(`go depth ${depth}`);
    }

    setState({
      evaluationsCp: Array(fenSequence.length).fill(null),
      isAnalyzing: true,
      completed: 0,
      total: fenSequence.length,
      error: null,
    });

    worker.onerror = () => {
      finishWithError("Не удалось рассчитать оценки партии");
    };

    worker.onmessage = (event: MessageEvent<string>) => {
      if (cancelled) return;

      const text = String(event.data ?? "");

      if (text === "uciok") {
        worker.postMessage("setoption name MultiPV value 1");
        worker.postMessage("isready");
        return;
      }

      if (text === "readyok") {
        analyzeNextPosition();
        return;
      }

      if (text.startsWith("info depth")) {
        const scoreMatch = text.match(/\bscore\s+(cp|mate)\s+(-?\d+)/);

        if (!scoreMatch) {
          return;
        }

        const scoreType = scoreMatch[1] as "cp" | "mate";
        const rawScoreValue = Number(scoreMatch[2]);

        if (!Number.isFinite(rawScoreValue)) {
          return;
        }

        const fen = fenSequence[currentIndex];

        latestScoreCp = orientScoreToWhiteCp(
          fen,
          scoreType,
          rawScoreValue
        );

        return;
      }

      if (text.startsWith("bestmove")) {
        const completedIndex = currentIndex;
        const scoreForPosition = latestScoreCp;

        setState((prev) => {
          const nextEvaluations = [...prev.evaluationsCp];
          nextEvaluations[completedIndex] = scoreForPosition;

          return {
            ...prev,
            evaluationsCp: nextEvaluations,
            completed: completedIndex + 1,
            total: fenSequence.length,
          };
        });

        currentIndex += 1;
        analyzeNextPosition();
      }
    };

    worker.postMessage("uci");

    return () => {
      cancelled = true;

      try {
        worker.postMessage("quit");
        worker.terminate();
      } catch {
        /* ignore */
      }
    };
  }, [enabled, depth, fenSequence]);

  const progressLabel =
    state.total > 0 ? `${state.completed} / ${state.total}` : "0 / 0";

  const progressPercent =
    state.total > 0 ? Math.round((state.completed / state.total) * 100) : 0;

  return {
    ...state,
    progressLabel,
    progressPercent,
  };
}