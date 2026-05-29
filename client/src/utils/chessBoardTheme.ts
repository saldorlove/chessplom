export type BoardTheme =
  | "classic"
  | "dark"
  | "green"
  | "blue"
  | "gold";

export const BOARD_THEME_STORAGE_KEY = "zugzwang_board_theme";
export const BOARD_THEME_CHANGED_EVENT = "zugzwang_board_theme_changed";

export const BOARD_THEMES: {
  id: BoardTheme;
  label: string;
  description: string;
}[] = [
  {
    id: "classic",
    label: "Классическая",
    description: "Тёплая деревянная доска",
  },
  {
    id: "dark",
    label: "Тёмная",
    description: "Графитовая доска под тёмную тему",
  },
  {
    id: "green",
    label: "Зелёная",
    description: "Спокойная турнирная доска",
  },
  {
    id: "blue",
    label: "Синяя",
    description: "Холодный современный стиль",
  },
  {
    id: "gold",
    label: "Золотая",
    description: "Фирменный стиль Zugzwang.ai",
  },
];

const DEFAULT_BOARD_THEME: BoardTheme = "classic";

export function isBoardTheme(value: string | null): value is BoardTheme {
  return (
    value === "classic" ||
    value === "dark" ||
    value === "green" ||
    value === "blue" ||
    value === "gold"
  );
}

export function getActiveBoardTheme(): BoardTheme {
  try {
    const savedTheme = localStorage.getItem(BOARD_THEME_STORAGE_KEY);

    if (isBoardTheme(savedTheme)) {
      return savedTheme;
    }

    return DEFAULT_BOARD_THEME;
  } catch {
    return DEFAULT_BOARD_THEME;
  }
}

export function setActiveBoardTheme(theme: BoardTheme) {
  try {
    localStorage.setItem(BOARD_THEME_STORAGE_KEY, theme);

    window.dispatchEvent(
      new CustomEvent(BOARD_THEME_CHANGED_EVENT, {
        detail: {
          theme,
        },
      })
    );
  } catch {
    /* ignore */
  }
}

export function getBoardThemeClassName(theme = getActiveBoardTheme()) {
  return `board-theme-${theme}`;
}