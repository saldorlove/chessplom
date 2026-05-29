import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chess } from "chess.js";

export type BotLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BotMoveTimingContext = {
  timeLeftMs: number;
  incrementMs: number;
  moveCount: number;
  timeControlLabel: string;
};

type BotLevelConfig = {
  skillLevel: number;
  limitStrength: boolean;
  elo: number;

  minThinkMs: number;
  maxThinkMs: number;
  hardMaxThinkMs: number;

  randomMoveChance: number;
  complexityWeight: number;
};

type PendingRequest = {
  resolve: (bestMove: string | null) => void;
  timeoutId: number;
};

const BOT_LEVEL_CONFIG: Record<BotLevel, BotLevelConfig> = {
  1: {
    skillLevel: 0,
    limitStrength: true,
    elo: 1320,
    minThinkMs: 900,
    maxThinkMs: 1800,
    hardMaxThinkMs: 2600,
    randomMoveChance: 0.38,
    complexityWeight: 1,
  },
  2: {
    skillLevel: 2,
    limitStrength: true,
    elo: 1450,
    minThinkMs: 1000,
    maxThinkMs: 2200,
    hardMaxThinkMs: 3200,
    randomMoveChance: 0.28,
    complexityWeight: 1,
  },
  3: {
    skillLevel: 5,
    limitStrength: true,
    elo: 1600,
    minThinkMs: 1300,
    maxThinkMs: 2800,
    hardMaxThinkMs: 4200,
    randomMoveChance: 0.18,
    complexityWeight: 1,
  },
  4: {
    skillLevel: 8,
    limitStrength: true,
    elo: 1800,
    minThinkMs: 1600,
    maxThinkMs: 3500,
    hardMaxThinkMs: 5200,
    randomMoveChance: 0.09,
    complexityWeight: 1,
  },
  5: {
    skillLevel: 11,
    limitStrength: true,
    elo: 2050,
    minThinkMs: 2400,
    maxThinkMs: 5200,
    hardMaxThinkMs: 7500,
    randomMoveChance: 0.03,
    complexityWeight: 1,
  },
  6: {
    skillLevel: 14,
    limitStrength: true,
    elo: 2300,
    minThinkMs: 3000,
    maxThinkMs: 6500,
    hardMaxThinkMs: 9000,
    randomMoveChance: 0,
    complexityWeight: 1,
  },
  7: {
    skillLevel: 18,
    limitStrength: false,
    elo: 2700,
    minThinkMs: 1300,
    maxThinkMs: 2800,
    hardMaxThinkMs: 4200,
    randomMoveChance: 0,
    complexityWeight: 0.55,
  },
  8: {
    skillLevel: 20,
    limitStrength: false,
    elo: 3190,
    minThinkMs: 500,
    maxThinkMs: 1300,
    hardMaxThinkMs: 2200,
    randomMoveChance: 0,
    complexityWeight: 0.25,
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFullMoveNumber(moveCount: number) {
  return Math.floor(moveCount / 2) + 1;
}

function getLegalMoves(fen: string) {
  try {
    const chess = new Chess(fen);
    return chess.moves({ verbose: true });
  } catch {
    return [];
  }
}

function getLegalMoveCount(fen: string) {
  return getLegalMoves(fen).length || 20;
}

function getRandomLegalMoveUci(fen: string) {
  const moves = getLegalMoves(fen);

  if (moves.length === 0) {
    return null;
  }

  const move = moves[getRandomInt(0, moves.length - 1)];
  return `${move.from}${move.to}${move.promotion ?? ""}`;
}

function getStageFactor(moveCount: number) {
  const fullMoveNumber = getFullMoveNumber(moveCount);

  if (fullMoveNumber <= 12) {
    return 0.9;
  }

  if (fullMoveNumber <= 40) {
    return 1.25;
  }

  return 0.85;
}

function getComplexityFactor(fen: string, level: BotLevel) {
  const config = BOT_LEVEL_CONFIG[level];
  const legalMoveCount = getLegalMoveCount(fen);

  let rawFactor = 1;

  if (legalMoveCount <= 1) {
    rawFactor = 0.55;
  } else if (legalMoveCount <= 6) {
    rawFactor = 0.8;
  } else if (legalMoveCount >= 36) {
    rawFactor = 1.35;
  } else if (legalMoveCount >= 21) {
    rawFactor = 1.15;
  }

  return 1 + (rawFactor - 1) * config.complexityWeight;
}

function getControlFactor(label: string) {
  const minutes = Number(label.split("+")[0]);

  if (!Number.isFinite(minutes)) {
    return 1;
  }

  if (minutes <= 2) {
    return 0.55;
  }

  if (minutes <= 5) {
    return 0.8;
  }

  if (minutes <= 15) {
    return 1.1;
  }

  return 1.35;
}

function getTimePressureFactor(timeLeftMs: number) {
  if (timeLeftMs < 5_000) {
    return 0.2;
  }

  if (timeLeftMs < 15_000) {
    return 0.35;
  }

  if (timeLeftMs < 30_000) {
    return 0.55;
  }

  if (timeLeftMs < 60_000) {
    return 0.75;
  }

  return 1;
}

function getThinkTimeMs(
  fen: string,
  level: BotLevel,
  context: BotMoveTimingContext
) {
  const config = BOT_LEVEL_CONFIG[level];

  if (context.timeLeftMs < 5_000) {
    return getRandomInt(120, 500);
  }

  const baseMs = getRandomInt(config.minThinkMs, config.maxThinkMs);

  const calculatedMs = Math.round(
    baseMs *
      getStageFactor(context.moveCount) *
      getComplexityFactor(fen, level) *
      getControlFactor(context.timeControlLabel) *
      getTimePressureFactor(context.timeLeftMs)
  );

  const maxByClock = Math.max(150, Math.floor(context.timeLeftMs * 0.25));
  const maxAllowedMs = Math.min(config.hardMaxThinkMs, maxByClock);

  return clamp(calculatedMs, 120, maxAllowedMs);
}

export function getBotLevel(rawLevel: string | null | undefined): BotLevel {
  const parsed = Number(rawLevel);

  if (
    parsed === 1 ||
    parsed === 2 ||
    parsed === 3 ||
    parsed === 4 ||
    parsed === 5 ||
    parsed === 6 ||
    parsed === 7 ||
    parsed === 8
  ) {
    return parsed;
  }

  return 4;
}

export function getBotName(level: BotLevel) {
  return `Stockfish ${level}`;
}

export function useStockfishBot() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRequestRef = useRef<PendingRequest | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let worker: Worker | null = null;

    try {
      worker = new Worker("/stockfish/stockfish-18-lite-single.js");
      workerRef.current = worker;
    } catch (workerError) {
      console.error("[Stockfish bot] Worker create error:", workerError);
      setError("Не удалось создать Stockfish worker");
      setIsReady(false);
      setIsThinking(false);
      return;
    }

    worker.onerror = (event) => {
      console.error("[Stockfish bot] Worker error:", event);
      setError("Ошибка загрузки Stockfish worker");
      setIsReady(false);
      setIsThinking(false);

      const pendingRequest = pendingRequestRef.current;

      if (pendingRequest) {
        window.clearTimeout(pendingRequest.timeoutId);
        pendingRequest.resolve(null);
        pendingRequestRef.current = null;
      }
    };

    worker.onmessage = (event: MessageEvent<string>) => {
      const text = String(event.data ?? "");

      if (text === "uciok") {
        worker?.postMessage("isready");
        return;
      }

      if (text === "readyok") {
        setError(null);
        setIsReady(true);
        return;
      }

      if (text.startsWith("bestmove")) {
        const bestMove = text.split(/\s+/)[1] ?? null;
        const pendingRequest = pendingRequestRef.current;

        if (!pendingRequest) {
          return;
        }

        window.clearTimeout(pendingRequest.timeoutId);

        pendingRequest.resolve(
          bestMove && bestMove !== "(none)" ? bestMove : null
        );

        pendingRequestRef.current = null;
        setIsThinking(false);
      }
    };

    worker.postMessage("uci");

    return () => {
      const pendingRequest = pendingRequestRef.current;

      if (pendingRequest) {
        window.clearTimeout(pendingRequest.timeoutId);
        pendingRequest.resolve(null);
        pendingRequestRef.current = null;
      }

      try {
        worker?.postMessage("quit");
        worker?.terminate();
      } catch {
        /* ignore */
      }

      workerRef.current = null;
      setIsReady(false);
      setIsThinking(false);
    };
  }, []);

  const requestBestMove = useCallback(
    (fen: string, level: BotLevel, timingContext: BotMoveTimingContext) => {
      return new Promise<string | null>((resolve) => {
        const worker = workerRef.current;

        if (!worker || !isReady || !fen) {
          resolve(null);
          return;
        }

        const config = BOT_LEVEL_CONFIG[level];
        const thinkTimeMs = getThinkTimeMs(fen, level, timingContext);

        const previousRequest = pendingRequestRef.current;

        if (previousRequest) {
          window.clearTimeout(previousRequest.timeoutId);
          previousRequest.resolve(null);
          pendingRequestRef.current = null;
        }

        setIsThinking(true);

        if (
          config.randomMoveChance > 0 &&
          Math.random() < config.randomMoveChance
        ) {
          const randomMove = getRandomLegalMoveUci(fen);

          const timeoutId = window.setTimeout(() => {
            pendingRequestRef.current = null;
            setIsThinking(false);
            resolve(randomMove);
          }, thinkTimeMs);

          pendingRequestRef.current = {
            resolve,
            timeoutId,
          };

          return;
        }

        const timeoutId = window.setTimeout(() => {
          worker.postMessage("stop");

          const pendingRequest = pendingRequestRef.current;

          if (pendingRequest) {
            pendingRequest.resolve(null);
            pendingRequestRef.current = null;
          }

          setIsThinking(false);
        }, thinkTimeMs + 2_000);

        pendingRequestRef.current = {
          resolve,
          timeoutId,
        };

        worker.postMessage("stop");
        worker.postMessage("ucinewgame");
        worker.postMessage("setoption name MultiPV value 1");
        worker.postMessage(
          `setoption name UCI_LimitStrength value ${
            config.limitStrength ? "true" : "false"
          }`
        );

        if (config.limitStrength) {
          worker.postMessage(`setoption name UCI_Elo value ${config.elo}`);
        }

        worker.postMessage(`setoption name Skill Level value ${config.skillLevel}`);
        worker.postMessage(`position fen ${fen}`);
        worker.postMessage(`go movetime ${thinkTimeMs}`);
      });
    },
    [isReady]
  );

  return useMemo(
    () => ({
      isReady,
      isThinking,
      error,
      requestBestMove,
    }),
    [isReady, isThinking, error, requestBestMove]
  );
}