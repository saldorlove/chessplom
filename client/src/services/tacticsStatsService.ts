export type TacticsStats = {
  solved: number;
  attempts: number;
  correct: number;
  wrong: number;
  totalSolveSeconds: number;
  cleanSolved: number;
  currentStreak: number;
  bestStreak: number;
  bestTimeSeconds: number | null;
  lastSolvedDate: string | null;
  solvedPuzzleIds: string[];
};

const TACTICS_STATS_KEY = "zugzwang_tactics_stats_v1";
const TACTICS_ACTIVE_USER_KEY = "zugzwang_tactics_active_user_id_v1";

function normalizeStorageId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}

function getTacticsStatsKey(userId?: string | null) {
  const explicitUserId = userId?.trim();

  if (explicitUserId) {
    return `${TACTICS_STATS_KEY}:${normalizeStorageId(explicitUserId)}`;
  }

  try {
    const activeUserId = localStorage.getItem(TACTICS_ACTIVE_USER_KEY);

    if (activeUserId) {
      return `${TACTICS_STATS_KEY}:${normalizeStorageId(activeUserId)}`;
    }
  } catch {
    /* ignore */
  }

  return `${TACTICS_STATS_KEY}:guest`;
}

export function setActiveTacticsStatsUserId(userId?: string | null) {
  try {
    if (userId) {
      localStorage.setItem(TACTICS_ACTIVE_USER_KEY, userId);
    } else {
      localStorage.removeItem(TACTICS_ACTIVE_USER_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function getSolvedTacticPuzzleIds(userId?: string | null) {
  return loadTacticsStats(userId).solvedPuzzleIds;
}

export function isTacticPuzzleSolved(puzzleId: string, userId?: string | null) {
  return getSolvedTacticPuzzleIds(userId).includes(puzzleId);
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getYesterdayDateKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  return getLocalDateKey(date);
}

export function getDefaultTacticsStats(): TacticsStats {
  return {
    solved: 0,
    attempts: 0,
    correct: 0,
    wrong: 0,
    totalSolveSeconds: 0,
    cleanSolved: 0,
    currentStreak: 0,
    bestStreak: 0,
    bestTimeSeconds: null,
    lastSolvedDate: null,
    solvedPuzzleIds: [],
  };
}

function getNextDailyStreak(previousStats: TacticsStats) {
  const today = getLocalDateKey();
  const yesterday = getYesterdayDateKey();

  if (previousStats.lastSolvedDate === today) {
    return previousStats.currentStreak;
  }

  if (previousStats.lastSolvedDate === yesterday) {
    return previousStats.currentStreak + 1;
  }

  return 1;
}

function normalizeStats(parsed: Partial<TacticsStats>): TacticsStats {
  const solvedPuzzleIds = Array.isArray(parsed.solvedPuzzleIds)
    ? parsed.solvedPuzzleIds.filter((id): id is string => typeof id === "string")
    : [];

  const solved =
    typeof parsed.solved === "number" ? parsed.solved : solvedPuzzleIds.length;

  const correct =
    typeof parsed.correct === "number"
      ? parsed.correct
      : solved;

  const wrong =
    typeof parsed.wrong === "number"
      ? parsed.wrong
      : 0;

  const attempts =
    typeof parsed.attempts === "number"
      ? parsed.attempts
      : correct + wrong;

  const bestTimeSeconds =
    typeof parsed.bestTimeSeconds === "number" && parsed.bestTimeSeconds >= 0
      ? parsed.bestTimeSeconds
      : null;

  const currentStreak =
    typeof parsed.currentStreak === "number" ? parsed.currentStreak : 0;

  return {
    solved,
    attempts,
    correct,
    wrong,
    totalSolveSeconds:
      typeof parsed.totalSolveSeconds === "number"
        ? parsed.totalSolveSeconds
        : bestTimeSeconds !== null && solved > 0
        ? bestTimeSeconds * solved
        : 0,
    cleanSolved:
      typeof parsed.cleanSolved === "number" ? parsed.cleanSolved : 0,
    currentStreak,
    bestStreak:
      typeof parsed.bestStreak === "number"
        ? parsed.bestStreak
        : currentStreak,
    bestTimeSeconds,
    lastSolvedDate:
      typeof parsed.lastSolvedDate === "string"
        ? parsed.lastSolvedDate
        : null,
    solvedPuzzleIds,
  };
}

export function loadTacticsStats(userId?: string | null): TacticsStats {
  try {
    const rawValue = localStorage.getItem(getTacticsStatsKey(userId));

    if (!rawValue) {
      return getDefaultTacticsStats();
    }

    return normalizeStats(JSON.parse(rawValue) as Partial<TacticsStats>);
  } catch {
    return getDefaultTacticsStats();
  }
}

export function saveTacticsStats(stats: TacticsStats, userId?: string | null) {
  try {
    localStorage.setItem(getTacticsStatsKey(userId), JSON.stringify(stats));
  } catch {
    /* ignore */
  }
}

export function recordWrongTacticAttempt({
  puzzleId,
  userId,
}: {
  puzzleId: string;
  userId?: string | null;
}) {
  const previousStats = loadTacticsStats(userId);

  const nextStats: TacticsStats = {
    ...previousStats,
    attempts: previousStats.attempts + 1,
    wrong: previousStats.wrong + 1,
  };

  saveTacticsStats(nextStats, userId);

  return {
    stats: nextStats,
    puzzleId,
  };
}

export function recordSolvedTacticPuzzle({
  puzzleId,
  elapsedSeconds,
  isCleanSolve,
  userId,
}: {
  puzzleId: string;
  elapsedSeconds: number;
  isCleanSolve: boolean;
  userId?: string | null;
}) {
  const previousStats = loadTacticsStats(userId);
  const today = getLocalDateKey();

  const wasNewSolve = !previousStats.solvedPuzzleIds.includes(puzzleId);
  const nextDailyStreak = getNextDailyStreak(previousStats);
  const safeElapsedSeconds = Math.max(elapsedSeconds, 0);

  const nextSolvedPuzzleIds = wasNewSolve
    ? [...previousStats.solvedPuzzleIds, puzzleId]
    : previousStats.solvedPuzzleIds;

  const nextBestTimeSeconds =
    previousStats.bestTimeSeconds === null
      ? safeElapsedSeconds
      : Math.min(previousStats.bestTimeSeconds, safeElapsedSeconds);

  const nextStats: TacticsStats = {
    ...previousStats,
    solved: previousStats.solved + (wasNewSolve ? 1 : 0),
    attempts: previousStats.attempts + 1,
    correct: previousStats.correct + 1,
    totalSolveSeconds:
      previousStats.totalSolveSeconds + (wasNewSolve ? safeElapsedSeconds : 0),
    cleanSolved:
      previousStats.cleanSolved + (wasNewSolve && isCleanSolve ? 1 : 0),
    currentStreak: nextDailyStreak,
    bestStreak: Math.max(previousStats.bestStreak, nextDailyStreak),
    bestTimeSeconds: nextBestTimeSeconds,
    lastSolvedDate: today,
    solvedPuzzleIds: nextSolvedPuzzleIds,
  };

  saveTacticsStats(nextStats, userId);

  return {
    stats: nextStats,
    wasNewSolve,
  };
}

export function getAverageSolveTime(stats: TacticsStats) {
  if (stats.solved === 0) {
    return null;
  }

  return Math.round(stats.totalSolveSeconds / stats.solved);
}

export function getTacticsAccuracyText(stats: TacticsStats) {
  if (stats.attempts <= 0) {
    return "—";
  }

  return `${Math.round((stats.correct / stats.attempts) * 100)}%`;
}

export function getTacticsStreakText(stats: TacticsStats) {
  if (stats.currentStreak <= 0) {
    return "—";
  }

  return `${stats.currentStreak} дн.`;
}

export function formatTacticsTime(totalSeconds: number | null) {
  if (totalSeconds === null) {
    return "—";
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export function resetTacticsStats(userId?: string | null) {
  try {
    localStorage.removeItem(getTacticsStatsKey(userId));
  } catch {
    /* ignore */
  }

  return loadTacticsStats(userId);
}
