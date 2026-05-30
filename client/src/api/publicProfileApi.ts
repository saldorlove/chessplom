const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export type PublicPlayerDto = {
  id: string;
  username: string;
  avatarUrl: string | null;
  rating: number;
  createdAt: string;
};

export type PublicProfileGameDto = {
  id: string;
  createdAt: string;
  whiteName: string;
  blackName: string;
  result: string;
  resultReason: string | null;
  timeControl: string;
  timeControlCategory: string;
  moveCount: number;
  durationMs: number;
  ratingBefore: number | null;
  ratingAfter: number | null;
  ratingDelta: number | null;
  source: string;
};

export type PublicProfileStatsDto = {
  total: number;
  wins: number;
  losses: number;
  draws: number;
  online: number;
  friend: number;
  bot: number;
  winRateText: string;
};

export type PublicProfileResponse = {
  user: PublicPlayerDto;
  stats: PublicProfileStatsDto;
  recentGames: PublicProfileGameDto[];
};

export type PublicGamesResponse = {
  user: PublicPlayerDto;
  games: PublicProfileGameDto[];
  total: number;
  limit: number;
};

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

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as T;
}

export function getPublicProfile(username: string) {
  return requestJson<PublicProfileResponse>(
    `/users/public/${encodeURIComponent(username)}`
  );
}

export function getPublicProfileGames(username: string, limit = 100) {
  const params = new URLSearchParams();

  params.set("limit", String(limit));

  return requestJson<PublicGamesResponse>(
    `/users/public/${encodeURIComponent(username)}/games?${params.toString()}`
  );
}
