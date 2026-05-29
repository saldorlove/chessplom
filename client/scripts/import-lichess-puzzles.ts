/// <reference types="node" />
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

import { adaptLichessPuzzleRow } from "../src/data/lichessPuzzleAdapter";
import type { LichessPuzzleRow } from "../src/data/lichessPuzzleAdapter";
import type { TacticPuzzle } from "../src/data/tacticsTypes";

type ImportOptions = {
  inputPath: string;
  outputPath: string;
  limit: number;
  minRating: number;
  maxRating: number;
  minPopularity: number;
  minPlays: number;
  minSolutionMoves: number;
};

const DEFAULT_OPTIONS: ImportOptions = {
  inputPath: "data/lichess/lichess_db_puzzle.csv",
  outputPath: "src/data/generated/lichessPuzzles.generated.ts",
  limit: 500,
  minRating: 700,
  maxRating: 1800,
  minPopularity: 80,
  minPlays: 100,
  minSolutionMoves: 3,
};

const ALLOWED_THEMES = new Set([
  "mate",
  "matein2",
  "matein3",
  "fork",
  "pin",
  "skewer",
  "xrayattack",
  "hangingpiece",
  "backrankmate",
  "discoveredattack",
  "deflection",
  "decoy",
  "capturingdefender",
  "sacrifice",
]);

const EXCLUDED_THEMES = new Set([
  "matein1",
  "onemove",
]);

function getArgValue(name: string) {
  const index = process.argv.indexOf(name);

  if (index === -1) {
    return null;
  }

  return process.argv[index + 1] ?? null;
}

function getNumberArg(name: string, fallback: number) {
  const value = getArgValue(name);

  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function getOptions(): ImportOptions {
  return {
    inputPath: getArgValue("--input") ?? DEFAULT_OPTIONS.inputPath,
    outputPath: getArgValue("--output") ?? DEFAULT_OPTIONS.outputPath,
    limit: getNumberArg("--limit", DEFAULT_OPTIONS.limit),
    minRating: getNumberArg("--min-rating", DEFAULT_OPTIONS.minRating),
    maxRating: getNumberArg("--max-rating", DEFAULT_OPTIONS.maxRating),
    minPopularity: getNumberArg(
      "--min-popularity",
      DEFAULT_OPTIONS.minPopularity
    ),
    minPlays: getNumberArg("--min-plays", DEFAULT_OPTIONS.minPlays),
    minSolutionMoves: getNumberArg(
      "--min-solution-moves",
      DEFAULT_OPTIONS.minSolutionMoves
    ),
  };
}

function parseCsvLine(line: string) {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current);

  return result;
}

function toNumber(value: string) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

function parseLichessPuzzleRow(line: string): LichessPuzzleRow | null {
  const cells = parseCsvLine(line);

  if (cells.length < 8) {
    return null;
  }

  const [
    puzzleId,
    fen,
    moves,
    rating,
    ratingDeviation,
    popularity,
    nbPlays,
    themes,
    gameUrl,
    openingTags,
  ] = cells;

  if (!puzzleId || !fen || !moves || !rating || !themes) {
    return null;
  }

  return {
    puzzleId,
    fen,
    moves,
    rating: toNumber(rating),
    ratingDeviation: toNumber(ratingDeviation ?? "0"),
    popularity: toNumber(popularity ?? "0"),
    nbPlays: toNumber(nbPlays ?? "0"),
    themes,
    gameUrl,
    openingTags,
  };
}

function getThemeTokens(themes: string) {
  return themes
    .split(/\s+/)
    .map((theme) => theme.trim().toLowerCase())
    .filter(Boolean);
}

function hasAllowedTheme(themes: string) {
  const tokens = getThemeTokens(themes);

  const hasExcluded = tokens.some((theme) => EXCLUDED_THEMES.has(theme));

  if (hasExcluded) {
    return false;
  }

  return tokens.some((theme) => ALLOWED_THEMES.has(theme));
}

function shouldUseRow(row: LichessPuzzleRow, options: ImportOptions) {
  if (row.rating < options.minRating || row.rating > options.maxRating) {
    return false;
  }

  if ((row.popularity ?? 0) < options.minPopularity) {
    return false;
  }

  if ((row.nbPlays ?? 0) < options.minPlays) {
    return false;
  }

  if (!hasAllowedTheme(row.themes)) {
    return false;
  }

  const solutionLength = row.moves.trim().split(/\s+/).filter(Boolean).length;

  if (solutionLength < options.minSolutionMoves) {
    return false;
  }

  return true;
}

function buildOutputFileContent(puzzles: TacticPuzzle[]) {
  return `import type { TacticPuzzle } from "../tacticsTypes";

export const LICHESS_GENERATED_PUZZLES = ${JSON.stringify(
    puzzles,
    null,
    2
  )} satisfies TacticPuzzle[];
`;
}

async function importPuzzles() {
  const options = getOptions();

  const inputPath = path.resolve(process.cwd(), options.inputPath);
  const outputPath = path.resolve(process.cwd(), options.outputPath);

  if (!fs.existsSync(inputPath)) {
    console.error(`[Lichess Import] Файл не найден: ${inputPath}`);
    console.error("");
    console.error("Ожидаемый путь по умолчанию:");
    console.error(`  ${path.resolve(process.cwd(), DEFAULT_OPTIONS.inputPath)}`);
    console.error("");
    console.error("Пример запуска:");
    console.error(
      "  npm run import:lichess-puzzles -- --input data/lichess/lichess_db_puzzle.csv --limit 500"
    );
    process.exit(1);
  }

  const puzzles: TacticPuzzle[] = [];
  let totalRows = 0;
  let acceptedRows = 0;
  let skippedRows = 0;
  let invalidRows = 0;
  let isHeader = true;

  const stream = fs.createReadStream(inputPath, {
    encoding: "utf-8",
  });

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }

    totalRows += 1;

    if (!line.trim()) {
      skippedRows += 1;
      continue;
    }

    const row = parseLichessPuzzleRow(line);

    if (!row) {
      invalidRows += 1;
      continue;
    }

    if (!shouldUseRow(row, options)) {
      skippedRows += 1;
      continue;
    }

    const puzzle = adaptLichessPuzzleRow(row);

    if (!puzzle) {
      invalidRows += 1;
      continue;
    }

    puzzles.push(puzzle);
    acceptedRows += 1;

    if (puzzles.length >= options.limit) {
      break;
    }
  }

  fs.mkdirSync(path.dirname(outputPath), {
    recursive: true,
  });

  fs.writeFileSync(outputPath, buildOutputFileContent(puzzles), "utf-8");

  console.info("[Lichess Import] Готово");
  console.info(`  Файл: ${outputPath}`);
  console.info(`  Сгенерировано задач: ${puzzles.length}`);
  console.info(`  Просмотрено строк: ${totalRows}`);
  console.info(`  Подошло строк: ${acceptedRows}`);
  console.info(`  Пропущено строк: ${skippedRows}`);
  console.info(`  Некорректных строк: ${invalidRows}`);
}

importPuzzles().catch((error) => {
  console.error("[Lichess Import] Ошибка импорта");
  console.error(error);
  process.exit(1);
});