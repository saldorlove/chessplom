import { Chess } from "chess.js";
import type { TacticPuzzle } from "../data/tacticsPuzzles";

type TacticValidationResult = {
  puzzleId: string;
  isValid: boolean;
  errors: string[];
};

function isValidUciMove(value: string) {
  return /^[a-h][1-8][a-h][1-8][qrbn]?$/.test(value);
}

export function validateTacticPuzzle(
  puzzle: TacticPuzzle
): TacticValidationResult {
  const errors: string[] = [];

  let game: Chess;

  try {
    game = new Chess(puzzle.fen);
  } catch {
    return {
      puzzleId: puzzle.id,
      isValid: false,
      errors: ["Некорректный FEN"],
    };
  }

  if (game.turn() !== puzzle.sideToMove) {
    errors.push(
      `sideToMove не совпадает с FEN: указано ${puzzle.sideToMove}, в FEN ход ${game.turn()}`
    );
  }

  if (puzzle.solution.length === 0) {
    errors.push("Пустое решение");
  }

  puzzle.solution.forEach((uciMove, index) => {
    if (!isValidUciMove(uciMove)) {
      errors.push(`Ход ${index + 1}: неверный UCI-формат "${uciMove}"`);
      return;
    }

    const from = uciMove.slice(0, 2);
    const to = uciMove.slice(2, 4);
    const promotion = uciMove.slice(4, 5) || undefined;

    try {
      const move = game.move({
        from,
        to,
        promotion,
      });

      if (!move) {
        errors.push(`Ход ${index + 1}: невозможный ход "${uciMove}"`);
      }
    } catch {
      errors.push(`Ход ${index + 1}: невозможный ход "${uciMove}"`);
    }
  });

  return {
    puzzleId: puzzle.id,
    isValid: errors.length === 0,
    errors,
  };
}

export function validateTacticPuzzles(puzzles: TacticPuzzle[]) {
  return puzzles.map(validateTacticPuzzle);
}