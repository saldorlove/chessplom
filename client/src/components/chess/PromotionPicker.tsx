import type { CSSProperties } from "react";
import type { Square } from "chess.js";
import type { PromotionPiece } from "../../hooks/useChessGame";
import "../../styles/promotion.css";

type PromotionPickerProps = {
  color: "w" | "b";
  orientation: "white" | "black";
  targetSquare: Square;
  onSelect: (piece: PromotionPiece) => void;
  onCancel: () => void;
};

const FILES_WHITE = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const FILES_BLACK = ["h", "g", "f", "e", "d", "c", "b", "a"] as const;
const RANKS_WHITE = [8, 7, 6, 5, 4, 3, 2, 1] as const;
const RANKS_BLACK = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const PROMOTION_OPTIONS: PromotionPiece[] = ["q", "n", "r", "b"];

const PROMOTION_SYMBOLS = {
  w: {
    q: "♕",
    n: "♘",
    r: "♖",
    b: "♗",
  },
  b: {
    q: "♛",
    n: "♞",
    r: "♜",
    b: "♝",
  },
} as const;

export default function PromotionPicker({
  color,
  orientation,
  targetSquare,
  onSelect,
  onCancel,
}: PromotionPickerProps) {
  const files = orientation === "white" ? FILES_WHITE : FILES_BLACK;
  const ranks = orientation === "white" ? RANKS_WHITE : RANKS_BLACK;

  const file = targetSquare[0];
  const rank = Number(targetSquare[1]);

  const fileIndex = files.indexOf(file as (typeof FILES_WHITE)[number]);
  const rankIndex = ranks.indexOf(rank as (typeof RANKS_WHITE)[number]);

  const attachToTop = rankIndex === 0;

  const style: CSSProperties = {
    left: `${fileIndex * 12.5}%`,
    top: attachToTop ? "0" : "auto",
    bottom: attachToTop ? "auto" : "0",
  };

  return (
    <div className="promotion-menu" style={style}>
      <div className="promotion-menu-inner">
        {PROMOTION_OPTIONS.map((piece) => (
          <button
            key={piece}
            type="button"
            className="promotion-menu-piece"
            onClick={() => onSelect(piece)}
            title="Выбрать фигуру"
          >
            <span className="promotion-menu-symbol">
              {PROMOTION_SYMBOLS[color][piece]}
            </span>
          </button>
        ))}

        <button
          type="button"
          className="promotion-menu-close"
          onClick={onCancel}
          title="Отмена"
        >
          ×
        </button>
      </div>
    </div>
  );
}