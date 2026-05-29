import { AUTH_TOKEN_STORAGE_KEY } from "./authApi";

export type SavedGameDto = {
  id: string;
  createdAt: string;
  updatedAt: string;

  ownerId?: string | null;

  whiteName: string;
  blackName: string;

  result: string;
  resultReason: string | null;

  timeControl: string;
  timeControlCategory: string;

  pgn: string;

  moveTimesMs: number[] | null;
  moveCount: number;
  durationMs: number;

  ratingBefore?: number | null;
  ratingAfter?: number | null;
  ratingDelta?: number | null;

  source: string;
};

export type CreateGamePayload = {
  whiteName: string;
  blackName: string;
  result: string;
  resultReason?: string | null;
  timeControl: string;
  pgn: string;
  moveTimesMs?: number[];
  source?: string;
};

export type GamesSourceFilter =
  | "all"
  | "friend-play"
  | "bot-play"
  | "local-play"
  | "online-play"
  | "online-demo";

export type GamesSortValue =
  | "newest"
  | "oldest"
  | "moves-desc"
  | "moves-asc"
  | "duration-desc"
  | "duration-asc";

export type GamesFilters = {
  resultGroup?: "all" | "white-win" | "black-win" | "draw";
  resultReason?: string;
  timeControl?: string;
  timeControlCategory?: "all" | "bullet" | "blitz" | "rapid" | "classical";
  source?: GamesSourceFilter;
  dateFrom?: string;
  dateTo?: string;
  moveCountFrom?: string;
  moveCountTo?: string;
  durationFromMinutes?: string;
  durationToMinutes?: string;
  sort?: GamesSortValue;
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function parseApiError(response: Response) {
  try {
    const data = await response.json();

    if (typeof data?.message === "string") {
      return data.message;
    }

    return "Ошибка сервера";
  } catch {
    return "Ошибка сервера";
  }
}

function getAuthHeaders(): Record<string, string> {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  } catch {
    return {};
  }
}

function appendIfPresent(params: URLSearchParams, key: string, value?: string) {
  if (!value || value === "all") {
    return;
  }

  params.set(key, value);
}

function minutesToMs(value?: string) {
  if (!value) {
    return undefined;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return undefined;
  }

  return String(Math.round(number * 60_000));
}

function buildGamesQuery(filters: GamesFilters = {}) {
  const params = new URLSearchParams();

  appendIfPresent(params, "resultGroup", filters.resultGroup);
  appendIfPresent(params, "resultReason", filters.resultReason);
  appendIfPresent(params, "timeControl", filters.timeControl);
  appendIfPresent(params, "timeControlCategory", filters.timeControlCategory);
  appendIfPresent(params, "source", filters.source);
  appendIfPresent(params, "dateFrom", filters.dateFrom);
  appendIfPresent(params, "dateTo", filters.dateTo);
  appendIfPresent(params, "moveCountFrom", filters.moveCountFrom);
  appendIfPresent(params, "moveCountTo", filters.moveCountTo);

  const durationFromMs = minutesToMs(filters.durationFromMinutes);
  const durationToMs = minutesToMs(filters.durationToMinutes);

  appendIfPresent(params, "durationFromMs", durationFromMs);
  appendIfPresent(params, "durationToMs", durationToMs);
  appendIfPresent(params, "sort", filters.sort ?? "newest");

  const query = params.toString();

  return query ? `?${query}` : "";
}

export async function createGame(payload: CreateGamePayload) {
  const response = await fetch(`${API_BASE_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as SavedGameDto;
}

export async function getGames(filters: GamesFilters = {}) {
  const response = await fetch(
    `${API_BASE_URL}/games${buildGamesQuery(filters)}`,
    {
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as SavedGameDto[];
}

export async function getGameById(id: string) {
  const response = await fetch(`${API_BASE_URL}/games/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as SavedGameDto;
}

export async function deleteGame(id: string) {
  const response = await fetch(`${API_BASE_URL}/games/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }
}
