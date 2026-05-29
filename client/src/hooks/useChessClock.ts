import { useEffect, useMemo, useRef, useState } from "react";

type Side = "w" | "b";

export type ChessClockControl = {
  label: string;
  initialMs: number;
  incrementMs: number;
};

export type ChessClockControlGroup = {
  title: string;
  controls: ChessClockControl[];
};

export type SyncedChessClockState = {
  whiteMs: number;
  blackMs: number;
  initialMs: number;
  incrementMs: number;
  turn: Side;
  lastMoveAt: number | null;
  isRunning: boolean;
  moveTimesMs: number[];
  controlLabel: string;
  serverNow: number;
};

export const CHESS_CLOCK_CONTROL_GROUPS: ChessClockControlGroup[] = [
  {
    title: "Blitz",
    controls: [
      { label: "3+0", initialMs: 3 * 60 * 1000, incrementMs: 0 },
      { label: "3+2", initialMs: 3 * 60 * 1000, incrementMs: 2 * 1000 },
      { label: "5+0", initialMs: 5 * 60 * 1000, incrementMs: 0 },
      { label: "5+3", initialMs: 5 * 60 * 1000, incrementMs: 3 * 1000 },
    ],
  },
  {
    title: "Rapid",
    controls: [
      { label: "10+0", initialMs: 10 * 60 * 1000, incrementMs: 0 },
      { label: "10+5", initialMs: 10 * 60 * 1000, incrementMs: 5 * 1000 },
      { label: "15+0", initialMs: 15 * 60 * 1000, incrementMs: 0 },
      { label: "15+10", initialMs: 15 * 60 * 1000, incrementMs: 10 * 1000 },
    ],
  },
  {
    title: "Classical",
    controls: [
      { label: "30+0", initialMs: 30 * 60 * 1000, incrementMs: 0 },
      { label: "30+20", initialMs: 30 * 60 * 1000, incrementMs: 20 * 1000 },
    ],
  },
];

export const CHESS_CLOCK_CONTROLS = CHESS_CLOCK_CONTROL_GROUPS.flatMap(
  (group) => group.controls
);

export const DEFAULT_CHESS_CLOCK_CONTROL =
  CHESS_CLOCK_CONTROLS.find((control) => control.label === "10+0") ??
  CHESS_CLOCK_CONTROLS[0];

export function getChessClockControlByLabel(
  rawLabel: string | null | undefined
) {
  if (!rawLabel) {
    return DEFAULT_CHESS_CLOCK_CONTROL;
  }

  const normalizedLabel = rawLabel.trim().replace(/\s+/g, "+");

  const presetControl = CHESS_CLOCK_CONTROLS.find(
    (control) => control.label === normalizedLabel
  );

  if (presetControl) {
    return presetControl;
  }

  const customMatch = normalizedLabel.match(/^(\d{1,3})\+(\d{1,2})$/);

  if (!customMatch) {
    return DEFAULT_CHESS_CLOCK_CONTROL;
  }

  const minutes = Number(customMatch[1]);
  const incrementSeconds = Number(customMatch[2]);

  if (
    !Number.isFinite(minutes) ||
    !Number.isFinite(incrementSeconds) ||
    minutes < 1 ||
    minutes > 180 ||
    incrementSeconds < 0 ||
    incrementSeconds > 60
  ) {
    return DEFAULT_CHESS_CLOCK_CONTROL;
  }

  return {
    label: `${minutes}+${incrementSeconds}`,
    initialMs: minutes * 60 * 1000,
    incrementMs: incrementSeconds * 1000,
  };
}

type UseChessClockParams = {
  turn: Side;
  moveCount: number;
  isGameOver: boolean;
  control?: ChessClockControl;
  syncedClock?: SyncedChessClockState | null;
  isWaitingForSyncedClock?: boolean;
};

type SyncedClockBase = SyncedChessClockState & {
  receivedAt: number;
};

function formatClock(ms: number) {
  const safeMs = Math.max(ms, 0);

  if (safeMs < 60_000) {
    const seconds = Math.floor(safeMs / 1000);
    const tenths = Math.floor((safeMs % 1000) / 100);

    return `0:${String(seconds).padStart(2, "0")}.${tenths}`;
  }

  const totalSeconds = Math.floor(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function useChessClock({
  turn,
  moveCount,
  isGameOver,
  control = DEFAULT_CHESS_CLOCK_CONTROL,
  syncedClock = null,
  isWaitingForSyncedClock = false,
}: UseChessClockParams) {
  const [whiteMs, setWhiteMs] = useState(
    syncedClock?.whiteMs ?? control.initialMs
  );
  const [blackMs, setBlackMs] = useState(
    syncedClock?.blackMs ?? control.initialMs
  );
  const [moveTimesMs, setMoveTimesMs] = useState<number[]>(
    syncedClock?.moveTimesMs ?? []
  );

  const prevMoveCountRef = useRef(moveCount);
  const lastTickRef = useRef<number | null>(null);
  const currentMoveStartedAtRef = useRef<number>(Date.now());
  const syncedClockBaseRef = useRef<SyncedClockBase | null>(null);

  const hasSyncedClock = Boolean(syncedClock);

  useEffect(() => {
    if (!syncedClock) {
      syncedClockBaseRef.current = null;
      return;
    }

    syncedClockBaseRef.current = {
      ...syncedClock,
      moveTimesMs: [...syncedClock.moveTimesMs],
      receivedAt: Date.now(),
    };

    setWhiteMs(syncedClock.whiteMs);
    setBlackMs(syncedClock.blackMs);
    setMoveTimesMs([...syncedClock.moveTimesMs]);
    lastTickRef.current = null;
  }, [syncedClock]);

  const isWhiteFlagged = !isWaitingForSyncedClock && whiteMs <= 0;
  const isBlackFlagged = !isWaitingForSyncedClock && blackMs <= 0;
  const isTimeOver = !isWaitingForSyncedClock && (isWhiteFlagged || isBlackFlagged);

  const hasStarted = moveCount > 0;

  const activeSide: Side | null = isWaitingForSyncedClock
    ? null
    : hasSyncedClock
    ? syncedClockBaseRef.current?.isRunning && !isGameOver && !isTimeOver
      ? syncedClockBaseRef.current.turn
      : null
    : hasStarted && !isGameOver && !isTimeOver
    ? turn
    : null;

  useEffect(() => {
    if (hasSyncedClock) {
      return;
    }

    const previousMoveCount = prevMoveCountRef.current;

    if (moveCount === 0 && previousMoveCount > 0) {
      setWhiteMs(control.initialMs);
      setBlackMs(control.initialMs);
      setMoveTimesMs([]);
      lastTickRef.current = null;
      currentMoveStartedAtRef.current = Date.now();
      prevMoveCountRef.current = moveCount;
      return;
    }

    if (moveCount > previousMoveCount) {
      const now = Date.now();
      const isFirstMove = previousMoveCount === 0 && moveCount === 1;
      const spentMs = isFirstMove
        ? -1
        : Math.max(now - currentMoveStartedAtRef.current, 0);

      setMoveTimesMs((prev) => {
        const next = [...prev];

        for (let index = previousMoveCount; index < moveCount; index += 1) {
          next[index] = index === moveCount - 1 ? spentMs : 0;
        }

        return next;
      });

      currentMoveStartedAtRef.current = now;

      if (control.incrementMs > 0) {
        const sideThatMoved: Side = turn === "w" ? "b" : "w";

        if (sideThatMoved === "w") {
          setWhiteMs((prev) => prev + control.incrementMs);
        } else {
          setBlackMs((prev) => prev + control.incrementMs);
        }
      }
    }

    if (moveCount < previousMoveCount) {
      setMoveTimesMs((prev) => prev.slice(0, moveCount));
      currentMoveStartedAtRef.current = Date.now();
    }

    prevMoveCountRef.current = moveCount;
  }, [
    moveCount,
    turn,
    control.initialMs,
    control.incrementMs,
    hasSyncedClock,
  ]);

  useEffect(() => {
    if (!activeSide) {
      lastTickRef.current = null;
      return;
    }

    const intervalId = window.setInterval(() => {
      if (syncedClockBaseRef.current) {
        const base = syncedClockBaseRef.current;
        const elapsedSinceSync = Math.max(Date.now() - base.receivedAt, 0);

        if (base.turn === "w") {
          setWhiteMs(Math.max(base.whiteMs - elapsedSinceSync, 0));
          setBlackMs(base.blackMs);
        } else {
          setWhiteMs(base.whiteMs);
          setBlackMs(Math.max(base.blackMs - elapsedSinceSync, 0));
        }

        return;
      }

      const now = Date.now();
      const last = lastTickRef.current ?? now;
      const diff = now - last;

      lastTickRef.current = now;

      if (activeSide === "w") {
        setWhiteMs((prev) => Math.max(prev - diff, 0));
      } else {
        setBlackMs((prev) => Math.max(prev - diff, 0));
      }
    }, 100);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeSide]);

  const whiteText = useMemo(
    () => (isWaitingForSyncedClock ? "--:--" : formatClock(whiteMs)),
    [isWaitingForSyncedClock, whiteMs]
  );

  const blackText = useMemo(
    () => (isWaitingForSyncedClock ? "--:--" : formatClock(blackMs)),
    [isWaitingForSyncedClock, blackMs]
  );

  return {
    whiteMs,
    blackMs,
    whiteText,
    blackText,
    moveTimesMs,
    isWhiteFlagged,
    isBlackFlagged,
    isTimeOver,
    activeSide,
    controlLabel: syncedClock?.controlLabel ?? control.label,
    isClockLoading: isWaitingForSyncedClock,
  };
}