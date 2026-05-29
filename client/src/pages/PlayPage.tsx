import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";

import type { ManualGameResult } from "../hooks/useChessGame";

import ChessBoard from "../components/chess/ChessBoard";
import MoveHistoryPanel from "../components/chess/MoveHistoryPanel";
import PromotionPicker from "../components/chess/PromotionPicker";

import { createGame } from "../api/gamesApi";
import { getApiAssetUrl } from "../api/usersApi";
import { clearActiveFriendGame, saveActiveFriendGame } from "../utils/activeFriendGame";
import { useAuth } from "../auth/AuthContext";
import { useChessGame } from "../hooks/useChessGame";
import { useFriendGameSync } from "../hooks/useFriendGameSync";
import { usePlayKeyboardNavigation } from "../hooks/usePlayKeyboardNavigation";
import {
  getChessClockControlByLabel,
  useChessClock,
} from "../hooks/useChessClock";
import {
  getBotLevel,
  getBotName,
  useStockfishBot,
} from "../hooks/useStockfishBot";

import "../styles/play.css";

import { playChessSound } from "../services/soundService";
import { ensureFriendSocketConnected } from "../realtime/socketClient";

type Side = "w" | "b";

type PieceType = "p" | "n" | "b" | "r" | "q";

type PlayerCardProps = {
  nickname: string;
  avatarUrl?: string;
  fallbackLetter: string;
  timeText: string;
  isActive?: boolean;
  isLow?: boolean;
  isFlagged?: boolean;
  isConnected?: boolean;
  subtitle: string;
  material?: ReactNode;
};

type SaveResultInfo = {
  result: string;
  resultReason: string;
};

type CapturedPiecesInfo = {
  whiteCaptured: PieceType[];
  blackCaptured: PieceType[];
  materialBalance: number;
};

type FriendOpponent = {
  username: string;
  avatarUrl: string | null;
};

type PremovePieceSnapshot = {
  color: Color;
  type: PieceSymbol;
};

type PremoveMove = {
  from: Square;
  to: Square;
  promotion?: "q" | "r" | "b" | "n";
  piece: PremovePieceSnapshot;
  expectedCapture?: PremovePieceSnapshot;
} | null;

type MarkedArrow = {
  from: Square;
  to: Square;
};

const BOARD_FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const BOARD_RANKS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

const BOARD_SQUARES = BOARD_FILES.flatMap((file) =>
  BOARD_RANKS.map((rank) => `${file}${rank}` as Square)
);

const PIECE_VALUES: Record<PieceType, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
};

const INITIAL_PIECE_COUNTS: Record<PieceType, number> = {
  p: 8,
  n: 2,
  b: 2,
  r: 2,
  q: 1,
};

const MATERIAL_DISPLAY_ORDER: PieceType[] = ["p", "n", "b", "r", "q"];

const CAPTURED_PIECE_SYMBOLS: Record<Side, Record<PieceType, string>> = {
  w: {
    p: "♟",
    n: "♞",
    b: "♝",
    r: "♜",
    q: "♛",
  },
  b: {
    p: "♙",
    n: "♘",
    b: "♗",
    r: "♖",
    q: "♕",
  },
};

function PlayerCard({
  nickname,
  avatarUrl,
  fallbackLetter,
  timeText,
  isActive,
  isLow,
  isFlagged,
  isConnected,
  subtitle,
  material,
}: PlayerCardProps) {
  return (
    <div
      className={[
        "play-v4-player-card",
        isActive ? "is-active" : "",
        isConnected ? "is-connected" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="play-v4-player-left">
        <div className="play-v4-avatar">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={nickname}
              className="play-v4-avatar-img"
            />
          ) : (
            <span className="play-v4-avatar-fallback">{fallbackLetter}</span>
          )}
        </div>

        <div className="play-v4-player-meta">
          <div className="play-v4-player-name">{nickname}</div>

          <div className="play-v4-player-subline">
            <span className="play-v4-player-status">{subtitle}</span>

            {material ? (
              <span className="play-v4-player-material">{material}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={[
          "play-v4-clock",
          isLow ? "is-low" : "",
          isFlagged ? "is-flagged" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {timeText}
      </div>
    </div>
  );
}

function getManualResultText(gameResult: ManualGameResult | null) {
  if (!gameResult) return "";

  if (gameResult.type === "aborted") {
    return gameResult.reason === "no-first-move"
      ? "Партия прервана: первый ход не сделан за 20 секунд"
      : "Партия отменена";
  }

  if (gameResult.type === "draw-agreed") {
    return "Ничья по соглашению";
  }

  const loser = gameResult.loser === "w" ? "Белые" : "Чёрные";
  const winner = gameResult.loser === "w" ? "чёрные" : "белые";

  if (gameResult.reason === "technical-loss") {
    return `${loser} не вернулись в партию. Техническая победа: ${winner}`;
  }

  if (gameResult.reason === "timeout") {
    return `Время ${gameResult.loser === "w" ? "белых" : "чёрных"} истекло. Победили ${winner}`;
  }

  return `${loser} сдались. Победили ${winner}`;
}

function getResultForSaving({
  liveGame,
  gameResult,
  isWhiteFlagged,
  isBlackFlagged,
}: {
  liveGame: Chess;
  gameResult: ManualGameResult | null;
  isWhiteFlagged: boolean;
  isBlackFlagged: boolean;
}): SaveResultInfo | null {
  if (gameResult?.type === "aborted") {
    return null;
  }

  if (gameResult?.type === "draw-agreed") {
    return {
      result: "1/2-1/2",
      resultReason: "draw-agreed",
    };
  }

  if (gameResult?.type === "resignation") {
    return {
      result: gameResult.loser === "w" ? "0-1" : "1-0",
      resultReason: gameResult.reason ?? "resignation",
    };
  }

  if (isWhiteFlagged) {
    return {
      result: "0-1",
      resultReason: "timeout",
    };
  }

  if (isBlackFlagged) {
    return {
      result: "1-0",
      resultReason: "timeout",
    };
  }

  if (liveGame.isCheckmate()) {
    return {
      result: liveGame.turn() === "w" ? "0-1" : "1-0",
      resultReason: "checkmate",
    };
  }

  if (liveGame.isStalemate()) {
    return {
      result: "1/2-1/2",
      resultReason: "stalemate",
    };
  }

  if (liveGame.isThreefoldRepetition()) {
    return {
      result: "1/2-1/2",
      resultReason: "threefold-repetition",
    };
  }

  if (liveGame.isInsufficientMaterial()) {
    return {
      result: "1/2-1/2",
      resultReason: "insufficient-material",
    };
  }

  if (liveGame.isDraw()) {
    return {
      result: "1/2-1/2",
      resultReason: "draw",
    };
  }

  return null;
}

function getInitialLetter(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "?";
}

function getPlayerSideFromColorParam(rawColor: string | null): Side {
  if (rawColor === "white") {
    return "w";
  }

  if (rawColor === "black") {
    return "b";
  }

  return Math.random() < 0.5 ? "w" : "b";
}

function buildPremoveValidationGame(liveGame: Chess, playerSide: Side) {
  const fenParts = liveGame.fen().split(" ");

  fenParts[1] = playerSide;

  return new Chess(fenParts.join(" "));
}

function getOpponentSide(side: Side): Side {
  return side === "w" ? "b" : "w";
}

function getNormalPremoveLegalTargets({
  liveGame,
  playerSide,
  from,
}: {
  liveGame: Chess;
  playerSide: Side;
  from: Square | null;
}) {
  if (!from) {
    return [];
  }

  try {
    const premoveGame = buildPremoveValidationGame(liveGame, playerSide);
    const piece = premoveGame.get(from);

    if (!piece || piece.color !== playerSide) {
      return [];
    }

    return premoveGame.moves({
      square: from,
      verbose: true,
    });
  } catch {
    return [];
  }
}

function getRecapturePremoveTarget({
  liveGame,
  playerSide,
  from,
  to,
}: {
  liveGame: Chess;
  playerSide: Side;
  from: Square;
  to: Square;
}) {
  try {
    const currentFromPiece = liveGame.get(from);
    const currentTargetPiece = liveGame.get(to);

    if (
      !currentFromPiece ||
      currentFromPiece.color !== playerSide ||
      !currentTargetPiece ||
      currentTargetPiece.color !== playerSide ||
      currentTargetPiece.type === "k"
    ) {
      return null;
    }

    const premoveGame = buildPremoveValidationGame(liveGame, playerSide);

    premoveGame.remove(to);
    premoveGame.put(
      {
        color: getOpponentSide(playerSide),
        type: currentTargetPiece.type,
      },
      to
    );

    return (
      premoveGame
        .moves({
          square: from,
          verbose: true,
        })
        .find((move) => move.to === to) ?? null
    );
  } catch {
    return null;
  }
}

function getPremoveLegalTargets({
  liveGame,
  playerSide,
  from,
}: {
  liveGame: Chess;
  playerSide: Side;
  from: Square | null;
}) {
  if (!from) {
    return [];
  }

  const normalTargets = getNormalPremoveLegalTargets({
    liveGame,
    playerSide,
    from,
  });

  const recaptureTargets = BOARD_SQUARES.reduce<typeof normalTargets>(
    (acc, to) => {
      const move = getRecapturePremoveTarget({
        liveGame,
        playerSide,
        from,
        to,
      });

      if (move) {
        acc.push(move);
      }

      return acc;
    },
    []
  );

  return [...normalTargets, ...recaptureTargets].filter(
    (move, index, moves) =>
      moves.findIndex((item) => item.to === move.to) === index
  );
}

function getPremoveLegalTargetSquares({
  liveGame,
  playerSide,
  from,
}: {
  liveGame: Chess;
  playerSide: Side;
  from: Square | null;
}) {
  return getPremoveLegalTargets({
    liveGame,
    playerSide,
    from,
  }).map((move) => move.to as Square);
}

function getLegalPremoveMove({
  liveGame,
  playerSide,
  from,
  to,
}: {
  liveGame: Chess;
  playerSide: Side;
  from: Square | null;
  to: Square;
}) {
  return (
    getPremoveLegalTargets({
      liveGame,
      playerSide,
      from,
    }).find((move) => move.to === to) ?? null
  );
}

function createPremoveMoveDraft({
  liveGame,
  playerSide,
  from,
  to,
  promotion,
}: {
  liveGame: Chess;
  playerSide: Side;
  from: Square;
  to: Square;
  promotion?: "q" | "r" | "b" | "n";
}): PremoveMove {
  const sourcePiece = liveGame.get(from);

  if (!sourcePiece || sourcePiece.color !== playerSide) {
    return null;
  }

  const targetPiece = liveGame.get(to);
  let expectedCapture: PremovePieceSnapshot | undefined;

  if (targetPiece) {
    expectedCapture =
      targetPiece.color === playerSide
        ? {
            color: getOpponentSide(playerSide),
            type: targetPiece.type,
          }
        : {
            color: targetPiece.color,
            type: targetPiece.type,
          };
  }

  return {
    from,
    to,
    promotion,
    piece: {
      color: sourcePiece.color,
      type: sourcePiece.type,
    },
    expectedCapture,
  };
}

function canExecutePremove({
  liveGame,
  premoveMove,
}: {
  liveGame: Chess;
  premoveMove: Exclude<PremoveMove, null>;
}) {
  const sourcePiece = liveGame.get(premoveMove.from);

  if (
    !sourcePiece ||
    sourcePiece.color !== premoveMove.piece.color ||
    sourcePiece.type !== premoveMove.piece.type
  ) {
    return false;
  }

  if (!premoveMove.expectedCapture) {
    return true;
  }

  const targetPiece = liveGame.get(premoveMove.to);

  return (
    Boolean(targetPiece) &&
    targetPiece?.color === premoveMove.expectedCapture.color &&
    targetPiece?.type === premoveMove.expectedCapture.type
  );
}

function getCapturedPiecesInfo(game: Chess): CapturedPiecesInfo {
  const whiteCounts: Record<PieceType, number> = {
    p: 0,
    n: 0,
    b: 0,
    r: 0,
    q: 0,
  };

  const blackCounts: Record<PieceType, number> = {
    p: 0,
    n: 0,
    b: 0,
    r: 0,
    q: 0,
  };

  for (const row of game.board()) {
    for (const piece of row) {
      if (!piece || piece.type === "k") continue;

      const type = piece.type as PieceType;

      if (piece.color === "w") {
        whiteCounts[type] += 1;
      } else {
        blackCounts[type] += 1;
      }
    }
  }

  const whiteCaptured: PieceType[] = [];
  const blackCaptured: PieceType[] = [];

  let whiteCapturedValue = 0;
  let blackCapturedValue = 0;

  for (const type of MATERIAL_DISPLAY_ORDER) {
    const missingBlackPieces = INITIAL_PIECE_COUNTS[type] - blackCounts[type];
    const missingWhitePieces = INITIAL_PIECE_COUNTS[type] - whiteCounts[type];

    for (let index = 0; index < missingBlackPieces; index += 1) {
      whiteCaptured.push(type);
      whiteCapturedValue += PIECE_VALUES[type];
    }

    for (let index = 0; index < missingWhitePieces; index += 1) {
      blackCaptured.push(type);
      blackCapturedValue += PIECE_VALUES[type];
    }
  }

  return {
    whiteCaptured,
    blackCaptured,
    materialBalance: whiteCapturedValue - blackCapturedValue,
  };
}

function renderMaterialInfo(side: Side, info: CapturedPiecesInfo) {
  const capturedPieces =
    side === "w" ? info.whiteCaptured : info.blackCaptured;

  const advantage =
    side === "w" ? info.materialBalance : -info.materialBalance;

  if (capturedPieces.length === 0 && advantage <= 0) {
    return null;
  }

  return (
    <span className="play-v4-material-detail">
      {capturedPieces.length > 0 ? (
        <span className="play-v4-captured-pieces" aria-hidden="true">
          {capturedPieces.map((piece, index) => (
            <span
              className="play-v4-captured-piece"
              key={`${side}-${piece}-${index}`}
            >
              {CAPTURED_PIECE_SYMBOLS[side][piece]}
            </span>
          ))}
        </span>
      ) : null}

      {advantage > 0 ? (
        <span className="play-v4-material-score">+{advantage}</span>
      ) : null}
    </span>
  );
}

export default function PlayPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const playMode = searchParams.get("mode") ?? "local";
  const isBotMode = playMode === "bot";
  const isOnlineMode = playMode === "online";
  const isFriendMode = playMode === "friend";
  const isNetworkOpponentMode = isOnlineMode || isFriendMode;

  const roomCode = searchParams.get("room")?.trim().toUpperCase() ?? "";
  const opponentNameFromUrl = searchParams.get("opponent") ?? "Соперник";

  const [friendOpponent, setFriendOpponent] = useState<FriendOpponent>({
    username: opponentNameFromUrl,
    avatarUrl: null,
  });

  const opponentName = friendOpponent.username || opponentNameFromUrl;

  const botLevel = useMemo(
    () => getBotLevel(searchParams.get("level")),
    [searchParams]
  );

  const botName = useMemo(() => getBotName(botLevel), [botLevel]);

  const [playerSide, setPlayerSide] = useState<Side>(() =>
    getPlayerSideFromColorParam(searchParams.get("color"))
  );

  const botSide: Side = playerSide === "w" ? "b" : "w";

  const [orientation, setOrientation] = useState<"white" | "black">(() =>
    playerSide === "w" ? "white" : "black"
  );

  const [selectedClockControl] = useState(() =>
    getChessClockControlByLabel(searchParams.get("time"))
  );

  const savedGameRef = useRef(false);
  const lastRequestedBotFenRef = useRef<string | null>(null);
  const botMoveRequestIdRef = useRef(0);
  const latestGameOverRef = useRef(false);
  const reportedNetworkGameEndRef = useRef(false);

  const soundMountedRef = useRef(false);
  const lastSoundMoveCountRef = useRef(0);
  const gameEndSoundPlayedRef = useRef(false);

  const [premoveFromSquare, setPremoveFromSquare] = useState<Square | null>(
    null
  );
  const [premoveMove, setPremoveMove] = useState<PremoveMove>(null);
  const [premoveDropHoverSquare, setPremoveDropHoverSquare] =
    useState<Square | null>(null);
  const [markedSquares, setMarkedSquares] = useState<Square[]>([]);
  const [markedArrows, setMarkedArrows] = useState<MarkedArrow[]>([]);
  const [rightMouseFromSquare, setRightMouseFromSquare] =
    useState<Square | null>(null);

  const stockfishBot = useStockfishBot();

  const {
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
    liveStatusText,
    isViewingPastPosition,
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
  } = useChessGame({
    disableFirstMoveAbort: isNetworkOpponentMode,
  });

  const clearPremove = useCallback(() => {
    setPremoveFromSquare(null);
    setPremoveMove(null);
    setPremoveDropHoverSquare(null);
  }, []);

  const clearMarkedSquares = useCallback(() => {
    setMarkedSquares([]);
    setMarkedArrows([]);
    setRightMouseFromSquare(null);
  }, []);

  const toggleMarkedSquare = useCallback((square: Square) => {
    setMarkedSquares((prev) =>
      prev.includes(square)
        ? prev.filter((item) => item !== square)
        : [...prev, square]
    );
  }, []);

  const toggleMarkedArrow = useCallback((from: Square, to: Square) => {
    setMarkedArrows((prev) => {
      const hasArrow = prev.some(
        (arrow) => arrow.from === from && arrow.to === to
      );

      if (hasArrow) {
        return prev.filter(
          (arrow) => !(arrow.from === from && arrow.to === to)
        );
      }

      return [...prev, { from, to }];
    });
  }, []);

  const isManuallyFinished = Boolean(gameResult);

  usePlayKeyboardNavigation({
    onGoToStart: handleGoToStart,
    onStepBack: handleStepBack,
    onStepForward: handleStepForward,
    onGoToEnd: handleGoToEnd,
  });

  const isWhiteTurn = liveGame.turn() === "w";
  const isBlackTurn = liveGame.turn() === "b";

  const isGameFinishedWithoutClock = liveGame.isGameOver() || isManuallyFinished;

  const hasAnyMove = moveHistory.length > 0;
  const isFlipped = orientation === "black";

  const playerName = user?.username ?? "Гость";
  const playerAvatarUrl = getApiAssetUrl(user?.avatarUrl) ?? undefined;
  const opponentAvatarUrl =
    getApiAssetUrl(friendOpponent.avatarUrl) ?? undefined;

  const handleFriendOpponentChange = useCallback(
    (opponent: FriendOpponent | null) => {
      if (!opponent) return;

      setFriendOpponent(opponent);
    },
    []
  );

  const handleRemoteResignation = useCallback(
    (loser: Side, reason: "resignation" | "technical-loss" = "resignation") => {
      handleSetManualResult({
        type: "resignation",
        loser,
        reason,
      });
    },
    [handleSetManualResult]
  );

const handleRemoteDrawAgreed = useCallback(() => {
  handleSetManualResult({
    type: "draw-agreed",
  });
}, [handleSetManualResult]);

const handleRemoteRematchStarted = useCallback(
  (nextSide: Side, playUrl?: string) => {
    savedGameRef.current = false;
    lastRequestedBotFenRef.current = null;
    botMoveRequestIdRef.current += 1;

    clearActiveFriendGame();
    clearPremove();
    clearMarkedSquares();

    soundMountedRef.current = false;
    lastSoundMoveCountRef.current = 0;
    gameEndSoundPlayedRef.current = false;
    
    handleResetGame();
    setPlayerSide(nextSide);
    setOrientation(nextSide === "w" ? "white" : "black");

    if (playUrl) {
      navigate(playUrl, { replace: true });
    }
  },
  [clearMarkedSquares, clearPremove, handleResetGame, navigate]
);

const friendSync = useFriendGameSync({
  enabled: isNetworkOpponentMode && Boolean(roomCode),
  userId: user?.id ?? null,
  roomCode,
  playerSide,
  username: playerName,
  avatarUrl: user?.avatarUrl ?? null,
  liveGame,
  moveHistoryLength: moveHistory.length,
  handleEngineMove,
  onRestoreMoves: handleRestoreFromUciMoves,
  onOpponentChange: handleFriendOpponentChange,
  onRemoteResignation: handleRemoteResignation,
  onRemoteDrawAgreed: handleRemoteDrawAgreed,
  onRemoteRematchStarted: handleRemoteRematchStarted,
});

  const isWaitingForNetworkClock =
    isNetworkOpponentMode && Boolean(roomCode) && !friendSync.clock;

  const clock = useChessClock({
    turn: liveGame.turn(),
    moveCount: moveHistory.length,
    isGameOver: isGameFinishedWithoutClock,
    control: selectedClockControl,
    syncedClock: isNetworkOpponentMode ? friendSync.clock : null,
    isWaitingForSyncedClock: isWaitingForNetworkClock,
  });

  const isGameOver = isGameFinishedWithoutClock || clock.isTimeOver;

  useEffect(() => {
    latestGameOverRef.current = isGameOver;
  }, [isGameOver]);

  useEffect(() => {
    if (!isBotMode) {
      botMoveRequestIdRef.current += 1;
      lastRequestedBotFenRef.current = null;
      return;
    }

    if (!isGameOver) {
      return;
    }

    botMoveRequestIdRef.current += 1;
    lastRequestedBotFenRef.current = null;
  }, [isBotMode, isGameOver]);

  useEffect(() => {
    if (!isNetworkOpponentMode || !roomCode) {
      reportedNetworkGameEndRef.current = false;
      return;
    }

    if (!isGameOver) {
      reportedNetworkGameEndRef.current = false;
      return;
    }

    if (reportedNetworkGameEndRef.current) {
      return;
    }

    reportedNetworkGameEndRef.current = true;

    ensureFriendSocketConnected().emit("friend:client-game-ended", {
      roomCode,
      side: playerSide,
    });
  }, [isNetworkOpponentMode, roomCode, isGameOver, playerSide]);


  useEffect(() => {
    clearMarkedSquares();
  }, [moveHistory.length, clearMarkedSquares]);

  const canCreatePremove =
    (isBotMode || isNetworkOpponentMode) &&
    !isGameOver &&
    !isViewingPastPosition &&
    !pendingPromotion &&
    liveGame.turn() !== playerSide &&
    !(isNetworkOpponentMode && !friendSync.isReady);

  const premoveLegalTargetSquares = useMemo(
    () =>
      canCreatePremove && !premoveMove
        ? getPremoveLegalTargetSquares({
            liveGame,
            playerSide,
            from: premoveFromSquare,
          })
        : [],
    [canCreatePremove, liveGame, playerSide, premoveFromSquare, premoveMove]
  );

  useEffect(() => {
  if (!soundMountedRef.current) {
    soundMountedRef.current = true;
    lastSoundMoveCountRef.current = moveHistory.length;
    return;
  }

  if (moveHistory.length <= lastSoundMoveCountRef.current) {
    lastSoundMoveCountRef.current = moveHistory.length;
    return;
  }

  if (isViewingPastPosition) {
    return;
  }

  lastSoundMoveCountRef.current = moveHistory.length;

  const verboseHistory = liveGame.history({ verbose: true });
  const lastVerboseMove = verboseHistory[verboseHistory.length - 1];

  if (liveGame.isCheckmate()) {
    playChessSound("checkmate");
    gameEndSoundPlayedRef.current = true;
    return;
  }

  if (liveGame.inCheck()) {
    playChessSound("check");
    return;
  }

  const isCapture =
    Boolean(lastVerboseMove?.captured) ||
    Boolean(lastVerboseMove?.flags?.includes("c")) ||
    Boolean(lastVerboseMove?.flags?.includes("e"));

  playChessSound(isCapture ? "capture" : "move");
}, [moveHistory.length, liveGame, isViewingPastPosition]);

  useEffect(() => {
    if (!isGameOver) {
      gameEndSoundPlayedRef.current = false;
      return;
    }

    if (gameEndSoundPlayedRef.current) {
      return;
    }

    if (moveHistory.length === 0) {
      return;
    }

    const resultInfo = getResultForSaving({
      liveGame,
      gameResult,
      isWhiteFlagged: clock.isWhiteFlagged,
      isBlackFlagged: clock.isBlackFlagged,
    });

    gameEndSoundPlayedRef.current = true;

    if (!resultInfo) {
      playChessSound("gameEnd");
      return;
    }

    if (resultInfo.result === "1/2-1/2") {
      playChessSound("draw");
      return;
    }

    if (!isBotMode && !isNetworkOpponentMode) {
      playChessSound("gameEnd");
      return;
    }

    const playerWon =
      (playerSide === "w" && resultInfo.result === "1-0") ||
      (playerSide === "b" && resultInfo.result === "0-1");

    playChessSound(playerWon ? "win" : "lose");
  }, [
    isGameOver,
    moveHistory.length,
    liveGame,
    gameResult,
    clock.isWhiteFlagged,
    clock.isBlackFlagged,
    isBotMode,
    isNetworkOpponentMode,
    playerSide,
  ]);

  useEffect(() => {
    if (!premoveMove) {
      return;
    }

    if (isGameOver || isViewingPastPosition || pendingPromotion) {
      clearPremove();
      return;
    }

    if (liveGame.turn() !== playerSide) {
      return;
    }

    if (!canExecutePremove({ liveGame, premoveMove })) {
      clearPremove();
      return;
    }

    const legalMove = liveGame
      .moves({
        square: premoveMove.from,
        verbose: true,
      })
      .find((move) => move.to === premoveMove.to);

    if (!legalMove) {
      clearPremove();
      return;
    }

    const promotion = legalMove.promotion
      ? premoveMove.promotion ?? "q"
      : undefined;

    const uciMove = `${premoveMove.from}${premoveMove.to}${promotion ?? ""}`;

    clearPremove();
    handleEngineMove(uciMove);
  }, [
    premoveMove,
    moveHistory.length,
    liveGame,
    playerSide,
    isGameOver,
    isViewingPastPosition,
    pendingPromotion,
    clearPremove,
    handleEngineMove,
  ]);

  useEffect(() => {
    if (!isNetworkOpponentMode || !roomCode) {
      return;
    }

    if (isGameOver) {
      clearActiveFriendGame();
      return;
    }

    saveActiveFriendGame({
      roomCode,
      mode: isOnlineMode ? "online" : "friend",
      playerSide,
      color: playerSide === "w" ? "white" : "black",
      timeControl: clock.controlLabel,
      opponentName,
      opponentAvatarUrl: friendOpponent.avatarUrl,
      status: "playing",
      updatedAt: Date.now(),
    });
  }, [
    isNetworkOpponentMode,
    isOnlineMode,
    roomCode,
    playerSide,
    clock.controlLabel,
    opponentName,
    friendOpponent.avatarUrl,
    isGameOver,
    moveHistory.length,
  ]);

  const capturedPiecesInfo = useMemo(
    () => getCapturedPiecesInfo(game),
    [game]
  );

  const isBotTurn = isBotMode && liveGame.turn() === botSide;

  const isPlayerTurn =
    isBotMode || isNetworkOpponentMode ? liveGame.turn() === playerSide : true;

  const isBoardLockedByBot = isBotMode && (isBotTurn || stockfishBot.isThinking);
  const isBoardLockedByFriend = isNetworkOpponentMode && !friendSync.isReady;

  const botTimeLeftMs = botSide === "w" ? clock.whiteMs : clock.blackMs;

  const isAbortedWithoutMoves =
    gameResult?.type === "aborted" && moveHistory.length === 0;

  const showFirstMoveAbortTimer =
    !hasAnyMove && !isGameOver && !isNetworkOpponentMode;
  const firstMoveAbortSecondsLeft = Math.ceil(
    firstMoveAbortRemainingMs / 1000
  );

  const whiteName = isBotMode
    ? playerSide === "w"
      ? playerName
      : botName
    : isNetworkOpponentMode
    ? playerSide === "w"
      ? playerName
      : opponentName
    : "Белые";

  const blackName = isBotMode
    ? playerSide === "b"
      ? playerName
      : botName
    : isNetworkOpponentMode
    ? playerSide === "b"
      ? playerName
      : opponentName
    : "Чёрные";

  const whiteFallback = isBotMode
    ? playerSide === "w"
      ? getInitialLetter(playerName)
      : "S"
    : isNetworkOpponentMode
    ? playerSide === "w"
      ? getInitialLetter(playerName)
      : getInitialLetter(opponentName)
    : "Б";

  const blackFallback = isBotMode
    ? playerSide === "b"
      ? getInitialLetter(playerName)
      : "S"
    : isNetworkOpponentMode
    ? playerSide === "b"
      ? getInitialLetter(playerName)
      : getInitialLetter(opponentName)
    : "Ч";

  const baseStatusText = isViewingPastPosition
    ? `Просмотр позиции ${currentMoveIndex} / ${moveHistory.length}`
    : gameResult
    ? getManualResultText(gameResult)
    : clock.isWhiteFlagged
    ? "Время белых истекло"
    : clock.isBlackFlagged
    ? "Время чёрных истекло"
    : liveStatusText.replace(/\.$/, "");

  const cleanStatusText =
    isBotMode && stockfishBot.error
      ? stockfishBot.error
      : isNetworkOpponentMode && friendSync.error
      ? friendSync.error
      : isNetworkOpponentMode && !friendSync.isReady
      ? friendSync.status || "Подключение к комнате..."
      : isBotMode && !isGameOver && !isViewingPastPosition
      ? isBotTurn
        ? stockfishBot.isReady
          ? `${botName} думает...`
          : `${botName} загружается...`
        : liveGame.inCheck()
        ? "Ваш ход. Шах"
        : "Ваш ход"
      : isNetworkOpponentMode && !isGameOver && !isViewingPastPosition
      ? liveGame.turn() === playerSide
        ? liveGame.inCheck()
          ? "Ваш ход. Шах"
          : "Ваш ход"
        : liveGame.inCheck()
        ? `Ход соперника: ${opponentName}. Шах`
        : `Ход соперника: ${opponentName}`
      : baseStatusText;

  const historyHeaderRight = useMemo(
    () => <span className="play-v4-history-badge">{clock.controlLabel}</span>,
    [clock.controlLabel]
  );

  useEffect(() => {
    if (!isBotMode) {
      return;
    }

    if (!stockfishBot.isReady) {
      return;
    }

    if (!isBotTurn) {
      return;
    }

    if (stockfishBot.isThinking) {
      return;
    }

    if (isGameOver || isViewingPastPosition || pendingPromotion) {
      return;
    }

    const fen = liveGame.fen();

    if (lastRequestedBotFenRef.current === fen) {
      return;
    }

    lastRequestedBotFenRef.current = fen;

    const currentRequestId = botMoveRequestIdRef.current + 1;
    botMoveRequestIdRef.current = currentRequestId;

    stockfishBot
      .requestBestMove(fen, botLevel, {
        timeLeftMs: botTimeLeftMs,
        incrementMs: selectedClockControl.incrementMs,
        moveCount: moveHistory.length,
        timeControlLabel: selectedClockControl.label,
      })
      .then((bestMove) => {
        if (botMoveRequestIdRef.current !== currentRequestId) {
          return;
        }

        if (latestGameOverRef.current) {
          return;
        }

        if (!bestMove) {
          return;
        }

        handleEngineMove(bestMove);
      });
  }, [
    isBotMode,
    botLevel,
    botTimeLeftMs,
    selectedClockControl.incrementMs,
    selectedClockControl.label,
    moveHistory.length,
    stockfishBot.isReady,
    stockfishBot.isThinking,
    isBotTurn,
    isGameOver,
    isViewingPastPosition,
    pendingPromotion,
    liveGame,
    handleEngineMove,
    stockfishBot,
  ]);

  useEffect(() => {
    if (savedGameRef.current) {
      return;
    }

    if (!isGameOver) {
      return;
    }

    if (moveHistory.length === 0) {
      return;
    }

    if (isNetworkOpponentMode && !friendSync.clock) {
      return;
    }

    const resultInfo = getResultForSaving({
      liveGame,
      gameResult,
      isWhiteFlagged: clock.isWhiteFlagged,
      isBlackFlagged: clock.isBlackFlagged,
    });

    if (!resultInfo) {
      return;
    }

    savedGameRef.current = true;

    createGame({
      whiteName,
      blackName,
      result: resultInfo.result,
      resultReason: resultInfo.resultReason,
      timeControl: clock.controlLabel,
      pgn: liveGame.pgn(),
      moveTimesMs: clock.moveTimesMs,
      source: isBotMode
        ? "bot-play"
        : isFriendMode
        ? "friend-play"
        : isOnlineMode
        ? "online-play"
        : "local-play",
    }).catch((error) => {
      console.error("Не удалось сохранить партию", error);
      savedGameRef.current = false;
    });
  }, [
    isGameOver,
    moveHistory.length,
    liveGame,
    gameResult,
    clock.isWhiteFlagged,
    clock.isBlackFlagged,
    clock.controlLabel,
    clock.moveTimesMs,
    whiteName,
    blackName,
    isBotMode,
    isFriendMode,
    isOnlineMode,
    isNetworkOpponentMode,
    friendSync.clock,
  ]);


  function handleResignClick() {
    if (isGameOver) {
      return;
    }

    botMoveRequestIdRef.current += 1;
    lastRequestedBotFenRef.current = null;
    clearPremove();

    if (isNetworkOpponentMode) {
      friendSync.resign();
      return;
    }

    handleResignGame();
  }

  function handleDrawClick() {
    if (isGameOver) {
      return;
    }

    if (isNetworkOpponentMode) {
      friendSync.offerDraw();
      return;
    }

    handleAgreeDraw();
  }

  function getPlayerSubtitle(side: Side) {
    if (
      isNetworkOpponentMode &&
      side !== playerSide &&
      !friendSync.opponentConnected
    ) {
      return `Соперник отключился. Ожидание: ${
        friendSync.disconnectSecondsLeft ?? "..."
      } сек.`;
    }
    if (isGameOver) {
      return "Партия завершена";
    }

    if (isViewingPastPosition) {
      return "Просмотр";
    }

    if (isBotMode && side === botSide) {
      if (liveGame.turn() === side) {
        return stockfishBot.isReady ? "Думает" : "Загрузка";
      }

      return `Stockfish ${botLevel}`;
    }

    if (isBotMode && side === playerSide) {
      return liveGame.turn() === side ? "Ваш ход" : "Ожидание";
    }

    if (isNetworkOpponentMode && side === playerSide) {
      return liveGame.turn() === side ? "Ваш ход" : "Ожидание";
    }

    if (isNetworkOpponentMode && side !== playerSide) {
      return liveGame.turn() === side ? "Ход соперника" : "Ожидание";
    }

    return liveGame.turn() === side ? "Ход" : "Ожидание";
  }

  function getPlayerCardProps(side: Side): PlayerCardProps {
    const isWhite = side === "w";
    const isSideTurn = isWhite ? isWhiteTurn : isBlackTurn;
    const isSideFlagged = isWhite ? clock.isWhiteFlagged : clock.isBlackFlagged;
    const sideTimeMs = isWhite ? clock.whiteMs : clock.blackMs;

    const isHumanPlayer =
      (isBotMode || isNetworkOpponentMode) && side === playerSide;

    const isNetworkOpponent = isNetworkOpponentMode && side !== playerSide;

    return {
      nickname: isWhite ? whiteName : blackName,
      avatarUrl: isHumanPlayer
        ? playerAvatarUrl
        : isNetworkOpponent
        ? opponentAvatarUrl
        : undefined,
      fallbackLetter: isWhite ? whiteFallback : blackFallback,
      timeText: isWhite ? clock.whiteText : clock.blackText,
      isActive: isSideTurn && !isGameOver && !isViewingPastPosition,
      isLow: sideTimeMs <= 30_000 && !isSideFlagged,
      isFlagged: isSideFlagged,
      subtitle: getPlayerSubtitle(side),
      material: renderMaterialInfo(side, capturedPiecesInfo),
      isConnected: isNetworkOpponentMode
        ? side === playerSide
          ? true
          : friendSync.opponentConnected
        : undefined,
    };
  }

  const topPlayerProps = isFlipped
    ? getPlayerCardProps("w")
    : getPlayerCardProps("b");

  const bottomPlayerProps = isFlipped
    ? getPlayerCardProps("b")
    : getPlayerCardProps("w");

  function handleToggleBoard() {
    setOrientation((prev) => (prev === "white" ? "black" : "white"));
  }

  function handleStartNewGame() {
    clearPremove();
    clearMarkedSquares();

    soundMountedRef.current = false;
    lastSoundMoveCountRef.current = 0;
    gameEndSoundPlayedRef.current = false;

    if (isNetworkOpponentMode) {
      friendSync.offerRematch();
      return;
    }

    savedGameRef.current = false;
    lastRequestedBotFenRef.current = null;
    botMoveRequestIdRef.current += 1;
    handleResetGame();

    if (isBotMode) {
      const nextSide: Side = playerSide === "w" ? "b" : "w";
      setPlayerSide(nextSide);
      setOrientation(nextSide === "w" ? "white" : "black");
      return;
    }

    setOrientation(playerSide === "w" ? "white" : "black");
  }

  function handlePremoveSquareClick(square: Square) {
    if (premoveMove) {
      clearPremove();
      return;
    }

    if (!canCreatePremove) {
      return;
    }

    const piece = liveGame.get(square);
    const isOwnPiece = piece?.color === playerSide;

    if (!premoveFromSquare) {
      if (!isOwnPiece) {
        return;
      }

      const legalTargets = getPremoveLegalTargetSquares({
        liveGame,
        playerSide,
        from: square,
      });

      if (legalTargets.length === 0) {
        return;
      }

      setPremoveFromSquare(square);
      setPremoveDropHoverSquare(null);
      return;
    }

    if (premoveFromSquare === square) {
      clearPremove();
      return;
    }

    if (isOwnPiece) {
      const legalTargets = getPremoveLegalTargetSquares({
        liveGame,
        playerSide,
        from: square,
      });

      if (legalTargets.length === 0) {
        clearPremove();
        return;
      }

      setPremoveFromSquare(square);
      setPremoveDropHoverSquare(null);
      return;
    }

    const legalMove = getLegalPremoveMove({
      liveGame,
      playerSide,
      from: premoveFromSquare,
      to: square,
    });

    if (!legalMove) {
      clearPremove();
      return;
    }

    const premoveDraft = createPremoveMoveDraft({
      liveGame,
      playerSide,
      from: premoveFromSquare,
      to: square,
      promotion: legalMove.promotion ? "q" : undefined,
    });

    if (!premoveDraft) {
      clearPremove();
      return;
    }

    setPremoveMove(premoveDraft);

    setPremoveFromSquare(null);
    setPremoveDropHoverSquare(null);
  }

  function handlePremoveDragStart(
    event: DragEvent<HTMLButtonElement>,
    square: Square
  ) {
    if (premoveMove) {
      clearPremove();
      event.preventDefault();
      return;
    }

    if (!canCreatePremove) {
      event.preventDefault();
      return;
    }

    const piece = liveGame.get(square);

    if (piece?.color !== playerSide) {
      event.preventDefault();
      return;
    }

    const legalTargets = getPremoveLegalTargetSquares({
      liveGame,
      playerSide,
      from: square,
    });

    if (legalTargets.length === 0) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData("text/plain", square);
    event.dataTransfer.effectAllowed = "move";

    setPremoveFromSquare(square);
    setPremoveDropHoverSquare(null);
  }

  function handlePremoveDragOver(
    event: DragEvent<HTMLButtonElement>,
    square: Square
  ) {
    if (!canCreatePremove || !premoveFromSquare || premoveMove) {
      return;
    }

    if (!premoveLegalTargetSquares.includes(square)) {
      setPremoveDropHoverSquare(null);
      return;
    }

    event.preventDefault();
    setPremoveDropHoverSquare(square);
  }

  function handlePremoveDragLeave(square: Square) {
    if (premoveDropHoverSquare === square) {
      setPremoveDropHoverSquare(null);
    }
  }

  function handlePremoveDrop(
    event: DragEvent<HTMLButtonElement>,
    square: Square
  ) {
    if (premoveMove) {
      clearPremove();
      event.preventDefault();
      return;
    }

    if (!canCreatePremove) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    const transferredSquare = event.dataTransfer.getData("text/plain");
    const from = (premoveFromSquare || transferredSquare) as Square | "";

    if (!from || from === square) {
      clearPremove();
      return;
    }

    const legalMove = getLegalPremoveMove({
      liveGame,
      playerSide,
      from,
      to: square,
    });

    if (!legalMove) {
      clearPremove();
      return;
    }

    const premoveDraft = createPremoveMoveDraft({
      liveGame,
      playerSide,
      from,
      to: square,
      promotion: legalMove.promotion ? "q" : undefined,
    });

    if (!premoveDraft) {
      clearPremove();
      return;
    }

    setPremoveMove(premoveDraft);

    setPremoveFromSquare(null);
    setPremoveDropHoverSquare(null);
  }

  function handlePremoveDragEnd() {
    setPremoveDropHoverSquare(null);
  }

  function handleBoardSquareRightMouseDown(square: Square) {
    setRightMouseFromSquare(square);
  }

  function handleBoardSquareRightMouseUp(square: Square) {
    if (!rightMouseFromSquare || rightMouseFromSquare === square) {
      toggleMarkedSquare(square);
      setRightMouseFromSquare(null);
      return;
    }

    toggleMarkedArrow(rightMouseFromSquare, square);
    setRightMouseFromSquare(null);
  }

  function handleOpenAnalysis() {
    try {
      sessionStorage.setItem("play_last_pgn", liveGame.pgn());

      sessionStorage.setItem(
        "play_last_move_times",
        JSON.stringify(clock.moveTimesMs)
      );

      sessionStorage.setItem(
        "play_last_analysis_meta",
        JSON.stringify({
          whiteName,
          blackName,
          timeControl: clock.controlLabel,
          preferredOrientation: orientation,
          playerSide,
          mode: playMode,
        })
      );
    } catch {
      /* ignore */
    }

    navigate("/analysis");
  }

  return (
    <section className="play-v4 play-page">
      <div className="play-v4-main">
        <div className="play-v4-center">
          <PlayerCard {...topPlayerProps} />

          <div className="play-v4-board-shell">
            <div className="play-v4-board-overlay-host">
              <ChessBoard
                board={board}
                game={game}
                orientation={orientation}
                selectedSquare={
                  canCreatePremove
                    ? premoveFromSquare ?? premoveMove?.from ?? null
                    : selectedSquare
                }
                legalTargets={
                  canCreatePremove && !premoveMove
                    ? premoveLegalTargetSquares
                    : legalTargets
                }
                draggedFromSquare={
                  canCreatePremove ? premoveFromSquare : draggedFromSquare
                }
                dropHoverSquare={
                  canCreatePremove ? premoveDropHoverSquare : dropHoverSquare
                }
                lastMove={lastMove}
                premoveMove={premoveMove}
                premoveFromSquare={premoveFromSquare}
                markedSquares={markedSquares}
                markedArrows={markedArrows}
                draggableSide={canCreatePremove ? playerSide : null}
                readOnly={
                  clock.isTimeOver ||
                  Boolean(pendingPromotion) ||
                  isViewingPastPosition ||
                  isGameOver ||
                  (isBoardLockedByBot && !canCreatePremove) ||
                  isBoardLockedByFriend ||
                  (!isPlayerTurn && !canCreatePremove)
                }
                onSquareClick={(square) => {
                  clearMarkedSquares();

                  if (canCreatePremove || premoveMove) {
                    handlePremoveSquareClick(square);
                    return;
                  }

                  if (
                    isBoardLockedByBot ||
                    isBoardLockedByFriend ||
                    !isPlayerTurn
                  ) {
                    return;
                  }

                  clearPremove();
                  handleSquareClick(square);
                }}
                onSquareRightMouseDown={handleBoardSquareRightMouseDown}
                onSquareRightMouseUp={handleBoardSquareRightMouseUp}
                onDragStart={(event, square) => {
                  if (canCreatePremove || premoveMove) {
                    handlePremoveDragStart(event, square);
                    return;
                  }

                  if (
                    isBoardLockedByBot ||
                    isBoardLockedByFriend ||
                    !isPlayerTurn
                  ) {
                    event.preventDefault();
                    return;
                  }

                  clearPremove();
                  handleDragStart(event, square);
                }}
                onDragOver={(event, square) => {
                  if (canCreatePremove || premoveMove) {
                    handlePremoveDragOver(event, square);
                    return;
                  }

                  if (
                    isBoardLockedByBot ||
                    isBoardLockedByFriend ||
                    !isPlayerTurn
                  ) {
                    return;
                  }

                  handleDragOver(event, square);
                }}
                onDragLeave={(square) => {
                  if (canCreatePremove || premoveMove) {
                    handlePremoveDragLeave(square);
                    return;
                  }

                  if (
                    isBoardLockedByBot ||
                    isBoardLockedByFriend ||
                    !isPlayerTurn
                  ) {
                    return;
                  }

                  handleDragLeave(square);
                }}
                onDrop={(event, square) => {
                  if (canCreatePremove || premoveMove) {
                    handlePremoveDrop(event, square);
                    return;
                  }

                  if (
                    isBoardLockedByBot ||
                    isBoardLockedByFriend ||
                    !isPlayerTurn
                  ) {
                    event.preventDefault();
                    return;
                  }

                  clearPremove();
                  handleDrop(event, square);
                }}
                onDragEnd={() => {
                  if (canCreatePremove || premoveMove) {
                    handlePremoveDragEnd();
                    return;
                  }

                  handleDragEnd();
                }}
              />

              {pendingPromotion ? (
                <PromotionPicker
                  color={pendingPromotion.color}
                  orientation={orientation}
                  targetSquare={pendingPromotion.to}
                  onSelect={handleConfirmPromotion}
                  onCancel={handleCancelPromotion}
                />
              ) : null}
            </div>
          </div>

          <PlayerCard {...bottomPlayerProps} />
        </div>

        <aside className="play-v4-right">
          <div className="play-v4-history-shell">
            <MoveHistoryPanel
              moveRows={moveRows}
              currentMoveIndex={currentMoveIndex}
              moveTimesMs={clock.moveTimesMs}
              emptyText={null}
              onJumpToMove={handleJumpToMove}
              headerRight={historyHeaderRight}
            />
          </div>

          <div className="play-v4-controls-card">
            <div className="play-v4-controls-row">
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
                {currentMoveIndex} / {moveHistory.length}
              </span>

              <button
                type="button"
                className="secondary-btn"
                onClick={handleStepForward}
                disabled={currentMoveIndex === moveHistory.length}
                title="Вперёд"
              >
                {">"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={handleGoToEnd}
                disabled={currentMoveIndex === moveHistory.length}
                title="В конец"
              >
                {">>"}
              </button>
            </div>

            {isViewingPastPosition ? (
              <div className="play-v4-review-notice">
                <span>Ты смотришь прошлую позицию. Ходить отсюда нельзя.</span>

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleGoToEnd}
                >
                  К текущей позиции
                </button>
              </div>
            ) : null}

            {isNetworkOpponentMode && friendSync.drawOffer ? (
              <div className="play-v4-draw-offer-card">
                <strong>{friendSync.drawOffer.fromUsername} предлагает ничью</strong>

                <div className="play-v4-draw-offer-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={friendSync.acceptDraw}
                  >
                    Принять
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={friendSync.declineDraw}
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            ) : null}

            {isNetworkOpponentMode && friendSync.rematchOffer ? (
              <div className="play-v4-rematch-offer-card">
                <strong>
                  {friendSync.rematchOffer.fromUsername} предлагает реванш
                </strong>

                <div className="play-v4-rematch-offer-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={friendSync.acceptRematch}
                  >
                    Принять
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={friendSync.declineRematch}
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            ) : null}

            {!isGameOver && !hasAnyMove ? (
              <div className="play-v4-icon-actions">
                <button
                  type="button"
                  className="play-v4-icon-btn"
                  onClick={handleAbortGame}
                  title="Отменить игру"
                  aria-label="Отменить игру"
                >
                  ×
                </button>

                <button
                  type="button"
                  className="play-v4-icon-btn"
                  disabled
                  title="Предложить ничью"
                  aria-label="Предложить ничью"
                >
                  ½
                </button>

                <button
                  type="button"
                  className="play-v4-icon-btn"
                  onClick={handleToggleBoard}
                  title="Перевернуть доску"
                  aria-label="Перевернуть доску"
                >
                  ⟳
                </button>
              </div>
            ) : null}

            {!isGameOver && hasAnyMove ? (
              <div className="play-v4-icon-actions">
                <button
                  type="button"
                  className="play-v4-icon-btn"
                  onClick={handleResignClick}
                  title="Сдаться"
                  aria-label="Сдаться"
                >
                  ⚑
                </button>

                <button
                  type="button"
                  className="play-v4-icon-btn"
                  onClick={handleDrawClick}
                  title="Предложить ничью"
                  aria-label="Предложить ничью"
                >
                  ½
                </button>

                <button
                  type="button"
                  className="play-v4-icon-btn"
                  onClick={handleToggleBoard}
                  title="Перевернуть доску"
                  aria-label="Перевернуть доску"
                >
                  ⟳
                </button>
              </div>
            ) : null}

            {isGameOver ? (
              <div className="play-v4-end-actions">
                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleStartNewGame}
                >
                  {isNetworkOpponentMode || isBotMode ? "Реванш" : "Новая партия"}
                </button>

                {!isAbortedWithoutMoves ? (
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={handleOpenAnalysis}
                  >
                    Анализ партии
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="play-v4-status-card">
            <span className="play-v4-status-label">Статус партии</span>
            <strong className="play-v4-status-value">{cleanStatusText}</strong>
          </div>

          {showFirstMoveAbortTimer ? (
            <div className="play-v4-first-move-card">
              <span className="play-v4-first-move-label">
                20 секунд на первый ход
              </span>

              <strong className="play-v4-first-move-time">
                {firstMoveAbortSecondsLeft} сек.
              </strong>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}