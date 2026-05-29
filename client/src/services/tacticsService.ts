import { TACTIC_PUZZLES, TACTIC_THEMES } from "../data/tacticsPuzzles";
import { LICHESS_SAMPLE_PUZZLES } from "../data/generated/lichessPuzzles.sample";
import { LICHESS_GENERATED_PUZZLES } from "../data/generated/lichessPuzzles.generated";

import type {
  TacticPuzzle,
  TacticSide,
  TacticTheme,
} from "../data/tacticsTypes";

export type ThemeFilter = "all" | TacticTheme;
export type SideFilter = "all" | TacticSide;

export type RatingFilter = "all" | "beginner" | "amateur" | "advanced";

export type TacticFilters = {
  rating: RatingFilter;
  theme: ThemeFilter;
  side: SideFilter;
};

/**
 * Если импортированные Lichess-задачи есть — используем их как основную базу.
 * Если их нет — используем sample.
 * Если sample тоже пустой — используем локальные учебные задачи.
 */
const ACTIVE_TACTIC_PUZZLES: TacticPuzzle[] =
  LICHESS_GENERATED_PUZZLES.length > 0
    ? LICHESS_GENERATED_PUZZLES
    : LICHESS_SAMPLE_PUZZLES.length > 0
    ? LICHESS_SAMPLE_PUZZLES
    : TACTIC_PUZZLES;

export function getTacticThemes() {
  return TACTIC_THEMES;
}

export function getAllTacticPuzzles() {
  return ACTIVE_TACTIC_PUZZLES;
}

function matchesRatingFilter(puzzle: TacticPuzzle, rating: RatingFilter) {
  if (rating === "all") {
    return true;
  }

  if (rating === "beginner") {
    return puzzle.rating <= 900;
  }

  if (rating === "amateur") {
    return puzzle.rating > 900 && puzzle.rating < 1300;
  }

  return puzzle.rating >= 1300;
}

export function getFilteredTacticPuzzles(filters: TacticFilters) {
  return ACTIVE_TACTIC_PUZZLES.filter((puzzle) => {
    const ratingMatches = matchesRatingFilter(puzzle, filters.rating);

    const themeMatches =
      filters.theme === "all" || puzzle.theme === filters.theme;

    const sideMatches =
      filters.side === "all" || puzzle.sideToMove === filters.side;

    return ratingMatches && themeMatches && sideMatches;
  });
}

export function getDailyTacticPuzzleIndex(puzzles: TacticPuzzle[]) {
  if (puzzles.length === 0) {
    return 0;
  }

  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return dayIndex % puzzles.length;
}

export function getRandomTacticPuzzleIndex(length: number, currentIndex = -1) {
  if (length <= 0) {
    return 0;
  }

  if (length === 1) {
    return 0;
  }

  let nextIndex = Math.floor(Math.random() * length);

  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * length);
  }

  return nextIndex;
}