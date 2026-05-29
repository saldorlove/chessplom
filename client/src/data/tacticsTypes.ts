export type TacticDifficulty = "Лёгкая" | "Средняя" | "Сложная";

  export type TacticTheme =
  | "Мат"
  | "Выигрыш материала"
  | "Вилка"
  | "Связка"
  | "Атака на короля"
  | "Последняя горизонталь"
  | "Лучший ход";

export type TacticSide = "w" | "b";

export type TacticPuzzle = {
  id: string;
  title: string;
  description: string;
  source: string;

  theme: TacticTheme;
  difficulty: TacticDifficulty;
  rating: number;
  sideToMove: TacticSide;
  tags: string[];

  fen: string;
  solution: string[];

  hint: string;
  successText: string;
};