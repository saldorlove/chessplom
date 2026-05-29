import { useEffect, useRef, useState } from "react";
import type { Chess } from "chess.js";

import { ensureFriendSocketConnected } from "../realtime/socketClient";

type Side = "w" | "b";

type FriendOpponent = {
  username: string;
  avatarUrl: string | null;
};

type FriendMovePayload = {
  roomCode: string;
  side: Side;
  move: {
    from: string;
    to: string;
    promotion?: string;
    san?: string;
    fenAfter?: string;
    moveIndex: number;
  };
    clock?: FriendClockSnapshot;
};

type FriendStoredMove = {
  from: string;
  to: string;
  promotion?: string;
  san?: string;
  fenAfter?: string;
  moveIndex: number;
};

export type FriendClockSnapshot = {
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

type FriendGameEndedPayload = {
  roomCode: string;
  reason: "resignation" | "draw-agreed" | "technical-loss";
  loser?: Side;
  message: string;
};

type FriendDrawOfferPayload = {
  roomCode: string;
  fromSide: Side;
  fromUsername: string;
};

type FriendRematchOfferPayload = {
  roomCode: string;
  fromSide: Side;
  fromUsername: string;
};

type FriendRematchStartedPayload = {
  roomCode: string;
  newRoomCode?: string;
  playUrl?: string;
  side: Side;
  clock?: FriendClockSnapshot;
  opponent?: (FriendOpponent & {
    connected?: boolean;
  }) | null;
};

type FriendDisconnectPayload = {
  roomCode: string;
  side: Side;
  username: string;
  timeoutSeconds: number;
  deadlineAt: number;
};

function moveToUci(move: {
  from: string;
  to: string;
  promotion?: string;
}) {
  return `${move.from}${move.to}${move.promotion ?? ""}`;
}

export function useFriendGameSync({
  enabled,
  userId,
  roomCode,
  playerSide,
  username,
  avatarUrl,
  liveGame,
  moveHistoryLength,
  handleEngineMove,
  onRestoreMoves,
  onOpponentChange,
  onRemoteResignation,
  onRemoteDrawAgreed,
  onRemoteRematchStarted,
}: {
  enabled: boolean;
  userId?: string | null;
  roomCode: string;
  playerSide: Side;
  username: string;
  avatarUrl?: string | null;
  liveGame: Chess;
  moveHistoryLength: number;
  handleEngineMove: (uciMove: string) => boolean;
  onRestoreMoves: (moves: FriendStoredMove[]) => boolean;
  onOpponentChange: (opponent: FriendOpponent | null) => void;
  onRemoteResignation: (
    loser: Side,
    reason?: "resignation" | "technical-loss",
    message?: string
  ) => void;
  onRemoteDrawAgreed: (message?: string) => void;
  onRemoteRematchStarted: (side: Side, playUrl?: string) => void;
}) {
  const [isReady, setIsReady] = useState(!enabled);

  const [status, setStatus] = useState<string | null>(
    enabled ? "Подключение к комнате..." : null
  );

  const [error, setError] = useState<string | null>(null);
  const [opponentConnected, setOpponentConnected] = useState(true);
  const [disconnectSecondsLeft, setDisconnectSecondsLeft] = useState<
    number | null
  >(null);
  const [drawOffer, setDrawOffer] = useState<FriendDrawOfferPayload | null>(
    null
  );
  const [rematchOffer, setRematchOffer] =
    useState<FriendRematchOfferPayload | null>(null);
  const [clock, setClock] = useState<FriendClockSnapshot | null>(null);

  const disconnectDeadlineAtRef = useRef<number | null>(null);
  const handleEngineMoveRef = useRef(handleEngineMove);
  const onOpponentChangeRef = useRef(onOpponentChange);
  const onRemoteResignationRef = useRef(onRemoteResignation);
  const onRemoteDrawAgreedRef = useRef(onRemoteDrawAgreed);
  const onRemoteRematchStartedRef = useRef(onRemoteRematchStarted);

  const onRestoreMovesRef = useRef(onRestoreMoves);
  const restoredRoomKeyRef = useRef<string | null>(null);

  const lastEmittedMoveIndexRef = useRef(0);
  const lastAppliedRemoteMoveIndexRef = useRef(0);
  const joinedRoomKeyRef = useRef<string | null>(null);

  useEffect(() => {
    handleEngineMoveRef.current = handleEngineMove;
  }, [handleEngineMove]);

  useEffect(() => {
    onOpponentChangeRef.current = onOpponentChange;
  }, [onOpponentChange]);

  useEffect(() => {
    onRemoteResignationRef.current = onRemoteResignation;
  }, [onRemoteResignation]);

  useEffect(() => {
    onRemoteDrawAgreedRef.current = onRemoteDrawAgreed;
  }, [onRemoteDrawAgreed]);

  useEffect(() => {
    onRestoreMovesRef.current = onRestoreMoves;
  }, [onRestoreMoves]);

  useEffect(() => {
    onRemoteRematchStartedRef.current = onRemoteRematchStarted;
  }, [onRemoteRematchStarted]);

  useEffect(() => {
    if (disconnectDeadlineAtRef.current === null) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (disconnectDeadlineAtRef.current === null) {
        setDisconnectSecondsLeft(null);
        window.clearInterval(intervalId);
        return;
      }

      const secondsLeft = Math.max(
        0,
        Math.ceil((disconnectDeadlineAtRef.current - Date.now()) / 1000)
      );

      setDisconnectSecondsLeft(secondsLeft);

      if (secondsLeft <= 0) {
        window.clearInterval(intervalId);
      }
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [opponentConnected]);

  useEffect(() => {
    if (!enabled || !roomCode) {
      joinedRoomKeyRef.current = null;
      setIsReady(!enabled);
      setStatus(enabled ? "Нет кода комнаты" : null);
      setError(null);
      return;
    }

    const joinKey = `${roomCode}:${playerSide}`;

    if (joinedRoomKeyRef.current === joinKey) {
      return;
    }

    joinedRoomKeyRef.current = joinKey;

    const socket = ensureFriendSocketConnected();

    setIsReady(false);
    setStatus("Подключение к комнате...");
    setError(null);

    function handleOpponentMove(payload: FriendMovePayload) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      const moveIndex = payload.move.moveIndex;

      if (moveIndex <= lastAppliedRemoteMoveIndexRef.current) {
        return;
      }

      const uciMove = moveToUci(payload.move);
      const applied = handleEngineMoveRef.current(uciMove);

      if (applied) {
        lastAppliedRemoteMoveIndexRef.current = moveIndex;

        if (payload.clock) {
          setClock(payload.clock);
        }
        setStatus("Ход соперника получен");
        setError(null);
      } else {
        setError("Не удалось применить ход соперника");
      }
    }

    function handleGameEnded(payload: FriendGameEndedPayload) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      setStatus(payload.message);
      setError(null);
      setDrawOffer(null);
      setRematchOffer(null);
      setOpponentConnected(true);
      setDisconnectSecondsLeft(null);
      disconnectDeadlineAtRef.current = null;

      if (payload.reason === "draw-agreed") {
        onRemoteDrawAgreedRef.current(payload.message);
        return;
      }

      if (payload.loser) {
        onRemoteResignationRef.current(payload.loser, payload.reason, payload.message);
      }
    }

    function handleDrawOffer(payload: FriendDrawOfferPayload) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      setDrawOffer(payload);
      setStatus(`${payload.fromUsername} предлагает ничью`);
    }

    function handleDrawDeclined(payload: { roomCode: string; message: string }) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      setStatus(payload.message);
      setDrawOffer(null);
    }

    function handleRematchOffer(payload: FriendRematchOfferPayload) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      setRematchOffer(payload);
      setStatus(`${payload.fromUsername} предлагает реванш`);
    }

    function handleRematchDeclined(payload: {
      roomCode: string;
      message: string;
    }) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      setStatus(payload.message);
      setRematchOffer(null);
    }

    function handleRematchStarted(payload: FriendRematchStartedPayload) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      lastEmittedMoveIndexRef.current = 0;
      lastAppliedRemoteMoveIndexRef.current = 0;
      restoredRoomKeyRef.current = null;

      setDrawOffer(null);
      setRematchOffer(null);
      setError(null);
      setStatus("Реванш начался");
      setOpponentConnected(payload.opponent?.connected !== false);
      setDisconnectSecondsLeft(null);
      disconnectDeadlineAtRef.current = null;

      if (payload.clock) {
        setClock(payload.clock);
      }

      if (payload.opponent) {
        onOpponentChangeRef.current(payload.opponent);
      }

      onRemoteRematchStartedRef.current(payload.side, payload.playUrl);
    }

    function handleOpponentDisconnected(payload: FriendDisconnectPayload) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      setOpponentConnected(false);
      disconnectDeadlineAtRef.current = payload.deadlineAt;
      setDisconnectSecondsLeft(payload.timeoutSeconds);
      setStatus(`Соперник отключился. Ожидание: ${payload.timeoutSeconds} сек.`);
    }

    function handleOpponentReconnected(payload: {
      roomCode: string;
      username: string;
    }) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      setOpponentConnected(true);
      disconnectDeadlineAtRef.current = null;
      setDisconnectSecondsLeft(null);
      setStatus("Соперник вернулся в партию");
    }

    socket.off("friend:opponent-move");
    socket.off("friend:game-ended");
    socket.off("friend:draw-offer");
    socket.off("friend:draw-declined");
    socket.off("friend:opponent-disconnected");
    socket.off("friend:opponent-reconnected");
    socket.off("friend:rematch-offer");
    socket.off("friend:rematch-declined");
    socket.off("friend:rematch-started");

    socket.on("friend:opponent-move", handleOpponentMove);
    socket.on("friend:game-ended", handleGameEnded);
    socket.on("friend:draw-offer", handleDrawOffer);
    socket.on("friend:draw-declined", handleDrawDeclined);
    socket.on("friend:opponent-disconnected", handleOpponentDisconnected);
    socket.on("friend:opponent-reconnected", handleOpponentReconnected);
    socket.on("friend:rematch-offer", handleRematchOffer);
    socket.on("friend:rematch-declined", handleRematchDeclined);
    socket.on("friend:rematch-started", handleRematchStarted);

    socket.emit(
      "friend:join-play",
      {
        userId: userId ?? null,
        roomCode,
        username,
        avatarUrl: avatarUrl ?? null,
        side: playerSide,
      },
      (response: {
        ok: boolean;
        message?: string;
        moveCount?: number;
        moves?: FriendStoredMove[];
        clock?: FriendClockSnapshot;
        opponent?: (FriendOpponent & {
          connected?: boolean;
          reconnectDeadlineAt?: number | null;
        }) | null;
      }) => {
        if (!response?.ok) {
          joinedRoomKeyRef.current = null;
          setIsReady(false);
          setStatus(null);
          setError(response?.message ?? "Не удалось подключиться к комнате");

          if (response.clock) {
            setClock(response.clock);
          }
          return;
        }

        lastEmittedMoveIndexRef.current = response.moveCount ?? 0;
        lastAppliedRemoteMoveIndexRef.current = response.moveCount ?? 0;

        const restoreKey = `${roomCode}:${response.moveCount ?? 0}`;

        if (
          response.moves &&
          response.moves.length > 0 &&
          restoredRoomKeyRef.current !== restoreKey
        ) {
          const restored = onRestoreMovesRef.current(response.moves);

          if (restored) {
            restoredRoomKeyRef.current = restoreKey;
          }
        }

        if (response.clock) {
          setClock(response.clock);
        }

        setIsReady(true);
        setStatus("Соперник подключён");
        setError(null);

        if (response.opponent) {
          onOpponentChangeRef.current(response.opponent);
          setOpponentConnected(response.opponent.connected !== false);

          if (response.opponent.reconnectDeadlineAt) {
            disconnectDeadlineAtRef.current =
              response.opponent.reconnectDeadlineAt;

            setDisconnectSecondsLeft(
              Math.max(
                0,
                Math.ceil(
                  (response.opponent.reconnectDeadlineAt - Date.now()) / 1000
                )
              )
            );
          }
        }
      }
    );

    return () => {
      socket.off("friend:opponent-move", handleOpponentMove);
      socket.off("friend:game-ended", handleGameEnded);
      socket.off("friend:draw-offer", handleDrawOffer);
      socket.off("friend:draw-declined", handleDrawDeclined);
      socket.off("friend:opponent-disconnected", handleOpponentDisconnected);
      socket.off("friend:opponent-reconnected", handleOpponentReconnected);
      socket.off("friend:rematch-offer", handleRematchOffer);
      socket.off("friend:rematch-declined", handleRematchDeclined);
      socket.off("friend:rematch-started", handleRematchStarted);

      if (joinedRoomKeyRef.current === joinKey) {
        joinedRoomKeyRef.current = null;
      }
    };
  }, [enabled, userId, roomCode, playerSide, username, avatarUrl]);

  useEffect(() => {
    if (!enabled || !roomCode || !isReady) {
      return;
    }

    if (moveHistoryLength === 0) {
      return;
    }

    if (moveHistoryLength <= lastEmittedMoveIndexRef.current) {
      return;
    }

    const verboseHistory = liveGame.history({
      verbose: true,
    });

    const lastMove = verboseHistory.at(-1);

    if (!lastMove) {
      return;
    }

    if (lastMove.color !== playerSide) {
      return;
    }

    const moveIndex = moveHistoryLength;

    lastEmittedMoveIndexRef.current = moveIndex;

    const socket = ensureFriendSocketConnected();

    socket.emit(
      "friend:move",
      {
        roomCode,
        side: playerSide,
        move: {
          from: lastMove.from,
          to: lastMove.to,
          promotion: lastMove.promotion,
          san: lastMove.san,
          fenAfter: liveGame.fen(),
          moveIndex,
        },
      },
        (response: {
          ok: boolean;
          message?: string;
          clock?: FriendClockSnapshot;
        }) => {
          if (!response?.ok) {
            setError(response?.message ?? "Не удалось отправить ход");

            if (response.clock) {
              setClock(response.clock);
            }

            return;
          }

          if (response.clock) {
            setClock(response.clock);
          }

          setStatus("Ход отправлен сопернику");
          setError(null);
          setDrawOffer(null);
        }
    );
  }, [enabled, roomCode, isReady, moveHistoryLength, liveGame, playerSide]);

  function emitFriendAction(
    eventName:
      | "friend:resign"
      | "friend:draw-offer"
      | "friend:draw-accept"
      | "friend:draw-decline"
      | "friend:rematch-offer"
      | "friend:rematch-accept"
      | "friend:rematch-decline",
    fallbackError: string
  ) {
    const socket = ensureFriendSocketConnected();

    socket.emit(
      eventName,
      {
        roomCode,
        side: playerSide,
      },
      (response: { ok: boolean; message?: string }) => {
        if (!response?.ok) {
          setError(response?.message ?? fallbackError);
          return;
        }

        if (response.message) {
          setStatus(response.message);
        }

        setError(null);
      }
    );
  }

  function resign() {
    emitFriendAction("friend:resign", "Не удалось сдаться");
  }

  function offerDraw() {
    emitFriendAction("friend:draw-offer", "Не удалось предложить ничью");
  }

  function acceptDraw() {
    emitFriendAction("friend:draw-accept", "Не удалось принять ничью");
    setDrawOffer(null);
  }

  function declineDraw() {
    emitFriendAction("friend:draw-decline", "Не удалось отклонить ничью");
    setDrawOffer(null);
    setStatus("Предложение ничьей отклонено");
  }

  function offerRematch() {
    emitFriendAction("friend:rematch-offer", "Не удалось предложить реванш");
  }

  function acceptRematch() {
    emitFriendAction("friend:rematch-accept", "Не удалось принять реванш");
    setRematchOffer(null);
  }

  function declineRematch() {
    emitFriendAction("friend:rematch-decline", "Не удалось отклонить реванш");
    setRematchOffer(null);
    setStatus("Предложение реванша отклонено");
  }

  return {
    isReady,
    status,
    error,
    opponentConnected,
    disconnectSecondsLeft,
    drawOffer,
    rematchOffer,
    clock,
    resign,
    offerDraw,
    acceptDraw,
    declineDraw,
    offerRematch,
    acceptRematch,
    declineRematch,
  };
}