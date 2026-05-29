import { useEffect, useMemo, useRef, useState } from "react";
import { Chess } from "chess.js";

type EngineScoreType = "cp" | "mate" | null;

export type EngineLine = {
  index: number;
  scoreType: "cp" | "mate";
  scoreValue: number;
  scoreText: string;
  evaluationPercent: number;
  pvUci: string;
  sanLine: string;
  firstMoveUci: string;
  firstMoveSan: string;
};

type EvaluationState = {
  isEngineReady: boolean;
  isAnalyzing: boolean;
  depth: number;
  bestMove: string;
  scoreText: string;
  pvLine: string;
  scoreType: EngineScoreType;
  scoreValue: number | null;
  evaluationPercent: number;
  lines: EngineLine[];
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function formatScore(scoreType: "cp" | "mate", scoreValue: number) {
  if (scoreType === "mate") {
    return `#${scoreValue}`;
  }

  const pawns = scoreValue / 100;
  return `${pawns > 0 ? "+" : ""}${pawns.toFixed(1)}`;
}

function getEvaluationPercent(
  scoreType: EngineScoreType,
  scoreValue: number | null
) {
  if (!scoreType || scoreValue === null) return 50;

  if (scoreType === "mate") {
    return scoreValue > 0 ? 100 : 0;
  }

  const normalized = 50 + Math.tanh(scoreValue / 400) * 45;
  return clamp(normalized, 2, 98);
}

function parsePvToSan(fen: string, pv: string) {
  try {
    const chess = new Chess(fen);
    const uciMoves = pv.trim().split(/\s+/).slice(0, 10);
    const sanMoves: string[] = [];

    for (const uci of uciMoves) {
      if (!/^[a-h][1-8][a-h][1-8][nbrq]?$/.test(uci)) break;

      const from = uci.slice(0, 2);
      const to = uci.slice(2, 4);
      const promotion = uci[4] as "n" | "b" | "r" | "q" | undefined;

      const move = chess.move({
        from,
        to,
        promotion,
      });

      if (!move) break;
      sanMoves.push(move.san);
    }

    return {
      sanLine: sanMoves.join(" "),
      firstMoveSan: sanMoves[0] ?? "—",
      firstMoveUci: uciMoves[0] ?? "",
    };
  } catch {
    return {
      sanLine: "",
      firstMoveSan: "—",
      firstMoveUci: "",
    };
  }
}

export function useStockfishEval(fen: string, enabled = true, depth = 12) {
  const workerRef = useRef<Worker | null>(null);
  const lastFenRef = useRef("");
  const sideToMoveRef = useRef<"w" | "b">("w");

  const [state, setState] = useState<EvaluationState>({
    isEngineReady: false,
    isAnalyzing: false,
    depth: 0,
    bestMove: "—",
    scoreText: "—",
    pvLine: "—",
    scoreType: null,
    scoreValue: null,
    evaluationPercent: 50,
    lines: [],
  });

  useEffect(() => {
    if (!enabled) return;

    const worker = new Worker("/stockfish/stockfish-18-lite-single.js");
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<string>) => {
      const text = String(event.data ?? "");

      if (text === "uciok") {
        worker.postMessage("setoption name MultiPV value 3");
        worker.postMessage("isready");
        return;
      }

      if (text === "readyok") {
        setState((prev) => ({
          ...prev,
          isEngineReady: true,
        }));
        return;
      }

      if (text.startsWith("info depth")) {
        const depthMatch = text.match(/\bdepth\s+(\d+)/);
        const scoreMatch = text.match(/\bscore\s+(cp|mate)\s+(-?\d+)/);
        const multipvMatch = text.match(/\bmultipv\s+(\d+)/);
        const pvMatch = text.match(/\bpv\s+(.+)$/);

        const parsedDepth = depthMatch ? Number(depthMatch[1]) : 0;
        const rawScoreType = scoreMatch?.[1] as "cp" | "mate" | undefined;
        const rawScoreValue = scoreMatch?.[2]
          ? Number(scoreMatch[2])
          : undefined;
        const multipvIndex = multipvMatch ? Number(multipvMatch[1]) : 1;
        const pvUci = pvMatch?.[1]?.trim() ?? "";

        if (!rawScoreType || rawScoreValue === undefined || !pvUci) {
          return;
        }

        const orientedScoreValue =
          sideToMoveRef.current === "w" ? rawScoreValue : rawScoreValue * -1;

        const parsedPv = parsePvToSan(fen, pvUci);

        const nextLine: EngineLine = {
          index: multipvIndex,
          scoreType: rawScoreType,
          scoreValue: orientedScoreValue,
          scoreText: formatScore(rawScoreType, orientedScoreValue),
          evaluationPercent: getEvaluationPercent(
            rawScoreType,
            orientedScoreValue
          ),
          pvUci,
          sanLine: parsedPv.sanLine || pvUci,
          firstMoveUci: parsedPv.firstMoveUci,
          firstMoveSan: parsedPv.firstMoveSan,
        };

        setState((prev) => {
          const lineMap = new Map(prev.lines.map((line) => [line.index, line]));
          lineMap.set(nextLine.index, nextLine);

          const nextLines = Array.from(lineMap.values())
            .sort((a, b) => a.index - b.index)
            .slice(0, 3);

          const mainLine = nextLines.find((line) => line.index === 1) ?? nextLines[0];

          return {
            ...prev,
            depth: parsedDepth,
            lines: nextLines,
            bestMove: mainLine?.firstMoveSan ?? "—",
            scoreText: mainLine?.scoreText ?? prev.scoreText,
            pvLine: mainLine?.sanLine ?? prev.pvLine,
            scoreType: mainLine?.scoreType ?? prev.scoreType,
            scoreValue: mainLine?.scoreValue ?? prev.scoreValue,
            evaluationPercent:
              mainLine?.evaluationPercent ?? prev.evaluationPercent,
          };
        });

        return;
      }

      if (text.startsWith("bestmove")) {
        setState((prev) => ({
          ...prev,
          isAnalyzing: false,
        }));
      }
    };

    worker.postMessage("uci");

    return () => {
      worker.postMessage("quit");
      worker.terminate();
      workerRef.current = null;
    };
  }, [enabled, fen]);

  useEffect(() => {
    const worker = workerRef.current;
    if (!worker || !enabled || !state.isEngineReady || !fen) return;

    if (lastFenRef.current === fen) return;
    lastFenRef.current = fen;

    const sideToken = fen.split(" ")[1];
    sideToMoveRef.current = sideToken === "b" ? "b" : "w";

    setState((prev) => ({
      ...prev,
      isAnalyzing: true,
      depth: 0,
      bestMove: "—",
      scoreText: "—",
      pvLine: "—",
      scoreType: null,
      scoreValue: null,
      evaluationPercent: 50,
      lines: [],
    }));

    worker.postMessage("stop");
    worker.postMessage("ucinewgame");
    worker.postMessage("setoption name MultiPV value 3");
    worker.postMessage(`position fen ${fen}`);
    worker.postMessage(`go depth ${depth}`);
  }, [fen, enabled, depth, state.isEngineReady]);

  return useMemo(
    () => ({
      ...state,
    }),
    [state]
  );
}