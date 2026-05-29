import type { Color, PieceSymbol } from "chess.js";

export type PieceTheme =
  | "kiwen-suwi"
  | "original-figures"
  | "ship-figures"
  | "wooden-figures"
  | "anime_fantasy"
  | "samurai_anime"
  | "cyber_anime";

export const PIECE_THEME_STORAGE_KEY = "zugzwang_piece_theme";
export const PIECE_THEME_CHANGED_EVENT = "zugzwang_piece_theme_changed";

export const PIECE_THEMES: {
  id: PieceTheme;
  label: string;
  description: string;
}[] = [
  {
    id: "kiwen-suwi",
    label: "Kiwen Suwi",
    description: "Мягкие современные фигуры",
  },
  {
    id: "original-figures",
    label: "Классические",
    description: "Привычный шахматный стиль",
  },
  {
    id: "ship-figures",
    label: "Корабли",
    description: "Необычный декоративный набор",
  },
  {
    id: "wooden-figures",
    label: "Деревянные",
    description: "Тёплый объёмный стиль",
  },
  {
    id: "anime_fantasy",
    label: "Anime Fantasy",
    description: "Яркий фэнтези-набор в аниме-стиле",
  },
  {
    id: "samurai_anime",
    label: "Samurai Anime",
    description: "Самурайский набор с восточным настроением",
  },
  {
    id: "cyber_anime",
    label: "Cyber Anime",
    description: "Неоновый киберпанк-набор для тёмной доски",
  },
];

const DEFAULT_PIECE_THEME: PieceTheme = "wooden-figures";

const PIECE_FILE_BY_TYPE: Record<PieceSymbol, string> = {
  k: "K",
  q: "Q",
  r: "R",
  b: "B",
  n: "N",
  p: "P",
};

const PIECE_NAME_BY_TYPE: Record<PieceSymbol, string> = {
  k: "король",
  q: "ферзь",
  r: "ладья",
  b: "слон",
  n: "конь",
  p: "пешка",
};

export function isPieceTheme(value: string | null): value is PieceTheme {
  return PIECE_THEMES.some((theme) => theme.id === value);
}

export function getActivePieceTheme(): PieceTheme {
  try {
    const savedTheme = localStorage.getItem(PIECE_THEME_STORAGE_KEY);

    if (isPieceTheme(savedTheme)) {
      return savedTheme;
    }

    return DEFAULT_PIECE_THEME;
  } catch {
    return DEFAULT_PIECE_THEME;
  }
}

export function setActivePieceTheme(theme: PieceTheme) {
  try {
    localStorage.setItem(PIECE_THEME_STORAGE_KEY, theme);

    window.dispatchEvent(
      new CustomEvent(PIECE_THEME_CHANGED_EVENT, {
        detail: {
          theme,
        },
      })
    );
  } catch {
    /* ignore */
  }
}

export function getPieceImageSrc({
  color,
  type,
  theme = getActivePieceTheme(),
}: {
  color: Color;
  type: PieceSymbol;
  theme?: PieceTheme;
}) {
  const colorPrefix = color === "w" ? "w" : "b";
  const pieceName = PIECE_FILE_BY_TYPE[type];

  return `/assets/pieces/${theme}/${colorPrefix}${pieceName}.svg`;
}

export function getPieceAltText({
  color,
  type,
}: {
  color: Color;
  type: PieceSymbol;
}) {
  const colorName = color === "w" ? "Белые" : "Чёрные";

  return `${colorName}: ${PIECE_NAME_BY_TYPE[type]}`;
}
