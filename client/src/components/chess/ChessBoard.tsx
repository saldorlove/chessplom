import {
  useEffect,
  useState,
  type DragEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Chess } from "chess.js";
import type { Color, PieceSymbol, Square } from "chess.js";

import {
  BOARD_THEME_CHANGED_EVENT,
  getActiveBoardTheme,
  getBoardThemeClassName,
  type BoardTheme,
} from "../../utils/chessBoardTheme";

import {
  getActivePieceTheme,
  getPieceAltText,
  getPieceImageSrc,
  PIECE_THEME_CHANGED_EVENT,
  type PieceTheme,
} from "../../utils/chessPieceAssets";

const FILES_WHITE = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const FILES_BLACK = ["h", "g", "f", "e", "d", "c", "b", "a"] as const;

const RANKS_WHITE = [8, 7, 6, 5, 4, 3, 2, 1] as const;
const RANKS_BLACK = [1, 2, 3, 4, 5, 6, 7, 8] as const;

type BoardPiece =
  | {
      type: PieceSymbol;
      color: Color;
    }
  | null;

type OverlayArrow = {
  from: Square;
  to: Square;
} | null;

type PremoveMove = {
  from: Square;
  to: Square;
} | null;

type MarkedArrow = {
  from: Square;
  to: Square;
};

type LastMove = {
  from: Square;
  to: Square;
} | null;

type BoardOrientation = "white" | "black";

type ChessBoardProps = {
  board: BoardPiece[][];
  game: Chess;
  orientation?: BoardOrientation;
  selectedSquare: Square | null;
  legalTargets: Square[];
  draggedFromSquare: Square | null;
  dropHoverSquare: Square | null;
  lastMove?: LastMove;
  readOnly?: boolean;
  overlayArrow?: OverlayArrow;
  premoveMove?: PremoveMove;
  premoveFromSquare?: Square | null;
  markedSquares?: Square[];
  markedArrows?: MarkedArrow[];
  draggableSide?: Color | null;
  onSquareClick?: (square: Square) => void;
  onSquareRightMouseDown?: (square: Square) => void;
  onSquareRightMouseUp?: (square: Square) => void;
  onDragStart?: (
    event: DragEvent<HTMLButtonElement>,
    square: Square
  ) => void;
  onDragOver?: (
    event: DragEvent<HTMLButtonElement>,
    square: Square
  ) => void;
  onDragLeave?: (square: Square) => void;
  onDrop?: (event: DragEvent<HTMLButtonElement>, square: Square) => void;
  onDragEnd?: () => void;
};

function getSquareCenter(square: Square, orientation: BoardOrientation) {
  const file = square[0];
  const rank = Number(square[1]);

  const files = orientation === "white" ? FILES_WHITE : FILES_BLACK;
  const ranks = orientation === "white" ? RANKS_WHITE : RANKS_BLACK;

  const fileIndex = files.findIndex((item) => item === file);
  const rankIndex = ranks.findIndex((item) => item === rank);

  const safeFileIndex = fileIndex >= 0 ? fileIndex : 0;
  const safeRankIndex = rankIndex >= 0 ? rankIndex : 0;

  const x = (safeFileIndex + 0.5) * 12.5;
  const y = (safeRankIndex + 0.5) * 12.5;

  return { x, y };
}

function getArrowPolygonPoints(
  from: Square,
  to: Square,
  orientation: BoardOrientation
) {
  const start = getSquareCenter(from, orientation);
  const end = getSquareCenter(to, orientation);

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;

  const ux = dx / length;
  const uy = dy / length;
  const px = -uy;
  const py = ux;

  const startOffset = 0.6;
  const endOffset = 0.8;
  const shaftWidth = 2.05;
  const headWidth = 5.8;
  const headLength = Math.min(5.4, Math.max(3.8, length * 0.42));

  const sx = start.x + ux * startOffset;
  const sy = start.y + uy * startOffset;

  const tx = end.x - ux * endOffset;
  const ty = end.y - uy * endOffset;

  const bx = tx - ux * headLength;
  const by = ty - uy * headLength;

  const startLeft = `${sx + px * (shaftWidth / 2)},${
    sy + py * (shaftWidth / 2)
  }`;

  const startRight = `${sx - px * (shaftWidth / 2)},${
    sy - py * (shaftWidth / 2)
  }`;

  const bodyLeft = `${bx + px * (shaftWidth / 2)},${
    by + py * (shaftWidth / 2)
  }`;

  const bodyRight = `${bx - px * (shaftWidth / 2)},${
    by - py * (shaftWidth / 2)
  }`;

  const headLeft = `${bx + px * (headWidth / 2)},${
    by + py * (headWidth / 2)
  }`;

  const headRight = `${bx - px * (headWidth / 2)},${
    by - py * (headWidth / 2)
  }`;

  const tip = `${tx},${ty}`;

  return [
    startLeft,
    bodyLeft,
    headLeft,
    tip,
    headRight,
    bodyRight,
    startRight,
  ].join(" ");
}

function isLightSquare(square: Square) {
  const fileIndex = square.charCodeAt(0) - 97;
  const rank = Number(square[1]);

  return (fileIndex + rank) % 2 === 0;
}

function renderPiece(piece: BoardPiece, pieceTheme: PieceTheme) {
  if (!piece) {
    return null;
  }

  return (
    <img
      className="board-piece-img"
      src={getPieceImageSrc({
        color: piece.color,
        type: piece.type,
        theme: pieceTheme,
      })}
      alt={getPieceAltText({
        color: piece.color,
        type: piece.type,
      })}
      draggable={false}
    />
  );
}

export default function ChessBoard({
  board,
  game,
  orientation = "white",
  selectedSquare,
  legalTargets,
  draggedFromSquare,
  dropHoverSquare,
  lastMove = null,
  readOnly = false,
  overlayArrow = null,
  premoveMove = null,
  premoveFromSquare = null,
  markedSquares = [],
  markedArrows = [],
  draggableSide = null,
  onSquareClick,
  onSquareRightMouseDown,
  onSquareRightMouseUp,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
}: ChessBoardProps) {
  const [pieceTheme, setPieceTheme] = useState<PieceTheme>(() =>
    getActivePieceTheme()
  );

  const [boardTheme, setBoardTheme] = useState<BoardTheme>(() =>
    getActiveBoardTheme()
  );

  useEffect(() => {
    function syncPieceTheme() {
      setPieceTheme(getActivePieceTheme());
    }

    window.addEventListener(PIECE_THEME_CHANGED_EVENT, syncPieceTheme);
    window.addEventListener("storage", syncPieceTheme);

    return () => {
      window.removeEventListener(PIECE_THEME_CHANGED_EVENT, syncPieceTheme);
      window.removeEventListener("storage", syncPieceTheme);
    };
  }, []);

  useEffect(() => {
    function syncBoardTheme() {
      setBoardTheme(getActiveBoardTheme());
    }

    window.addEventListener(BOARD_THEME_CHANGED_EVENT, syncBoardTheme);
    window.addEventListener("storage", syncBoardTheme);

    return () => {
      window.removeEventListener(BOARD_THEME_CHANGED_EVENT, syncBoardTheme);
      window.removeEventListener("storage", syncBoardTheme);
    };
  }, []);

  const displayBoard =
    orientation === "white"
      ? board.map((row) => [...row])
      : board
          .slice()
          .reverse()
          .map((row) => [...row].reverse());

  const files = orientation === "white" ? FILES_WHITE : FILES_BLACK;
  const ranks = orientation === "white" ? RANKS_WHITE : RANKS_BLACK;

  const arrowPolygons = [
    ...(overlayArrow
      ? [
          {
            key: "overlay-arrow",
            points: getArrowPolygonPoints(
              overlayArrow.from,
              overlayArrow.to,
              orientation
            ),
            className: "board-arrow-overlay",
          },
        ]
      : []),
    ...markedArrows.map((arrow, index) => ({
      key: `marked-arrow-${arrow.from}-${arrow.to}-${index}`,
      points: getArrowPolygonPoints(arrow.from, arrow.to, orientation),
      className: "board-arrow-marked",
    })),
  ];

  function handleSquareMouseDown(
    event: ReactMouseEvent<HTMLButtonElement>,
    square: Square
  ) {
    if (event.button !== 2) {
      return;
    }

    event.preventDefault();
    onSquareRightMouseDown?.(square);
  }

  function handleSquareMouseUp(
    event: ReactMouseEvent<HTMLButtonElement>,
    square: Square
  ) {
    if (event.button !== 2) {
      return;
    }

    event.preventDefault();
    onSquareRightMouseUp?.(square);
  }

  return (
    <div className="board-grid-shell">
      <div className={["board-grid", getBoardThemeClassName(boardTheme)].join(" ")}>
        {displayBoard.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const square = `${files[colIndex]}${ranks[rowIndex]}` as Square;

            const isSelected = selectedSquare === square;
            const isLegalTarget = legalTargets.includes(square);
            const isDragSource = draggedFromSquare === square;
            const isDropHover = dropHoverSquare === square;
            const isLastMoveFrom = lastMove?.from === square;
            const isLastMoveTo = lastMove?.to === square;
            const isPremoveFrom =
              premoveFromSquare === square || premoveMove?.from === square;
            const isPremoveTo = premoveMove?.to === square;
            const isMarkedSquare = markedSquares.includes(square);

            const isCheckKing =
              !!piece &&
              piece.type === "k" &&
              piece.color === game.turn() &&
              game.inCheck();

            const isOwnPiece = piece?.color === game.turn();
            const isDraggablePiece = draggableSide
              ? piece?.color === draggableSide
              : isOwnPiece;

            const isDraggable =
              !readOnly && Boolean(isDraggablePiece) && !game.isGameOver();

            const classNames = [
              "board-square",
              isLightSquare(square) ? "light" : "dark",
              isLastMoveFrom ? "last-move-from" : "",
              isLastMoveTo ? "last-move-to" : "",
              isSelected ? "selected" : "",
              isLegalTarget ? "legal-target" : "",
              piece ? "has-piece" : "",
              isCheckKing ? "check-king" : "",
              isDragSource ? "drag-source" : "",
              isDropHover ? "drop-hover" : "",
              isPremoveFrom ? "premove-from" : "",
              isPremoveTo ? "premove-to" : "",
              isMarkedSquare ? "marked-square" : "",
              readOnly ? "read-only" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={square}
                type="button"
                className={classNames}
                onClick={() => {
                  if (!readOnly) {
                    onSquareClick?.(square);
                  }
                }}
                onContextMenu={(event) => {
                  if (onSquareRightMouseDown || onSquareRightMouseUp) {
                    event.preventDefault();
                  }
                }}
                onMouseDown={(event) => handleSquareMouseDown(event, square)}
                onMouseUp={(event) => handleSquareMouseUp(event, square)}
                draggable={isDraggable}
                onDragStart={(event) => {
                  if (readOnly) {
                    event.preventDefault();
                    return;
                  }

                  const pieceImage = event.currentTarget.querySelector(
                    ".board-piece-img"
                  ) as HTMLImageElement | null;

                  if (pieceImage) {
                    event.dataTransfer.setDragImage(
                      pieceImage,
                      pieceImage.width / 2,
                      pieceImage.height / 2
                    );
                  }

                  onDragStart?.(event, square);
                }}
                onDragOver={(event) => {
                  if (!readOnly) {
                    onDragOver?.(event, square);
                  }
                }}
                onDragLeave={() => {
                  if (!readOnly) {
                    onDragLeave?.(square);
                  }
                }}
                onDrop={(event) => {
                  if (!readOnly) {
                    onDrop?.(event, square);
                  }
                }}
                onDragEnd={() => {
                  if (!readOnly) {
                    onDragEnd?.();
                  }
                }}
              >
                {colIndex === 0 && (
                  <span className="rank-label">{ranks[rowIndex]}</span>
                )}

                {rowIndex === 7 && (
                  <span className="file-label">{files[colIndex]}</span>
                )}

                {renderPiece(piece, pieceTheme)}
              </button>
            );
          })
        )}
      </div>

      {arrowPolygons.length > 0 ? (
        <svg
          className="board-arrow-layer"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {arrowPolygons.map((arrow) => (
            <polygon
              key={arrow.key}
              points={arrow.points}
              className={arrow.className}
            />
          ))}
        </svg>
      ) : null}
    </div>
  );
}