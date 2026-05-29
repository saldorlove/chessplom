export type ActiveGameMode = "friend" | "online";

export type ActiveFriendGame = {
  roomCode: string;
  mode: ActiveGameMode;
  playerSide: "w" | "b";
  color: "white" | "black";
  timeControl: string;
  opponentName: string;
  opponentAvatarUrl?: string | null;
  status: "playing" | "ended";
  playUrl?: string;
  updatedAt: number;
};

export const ACTIVE_FRIEND_GAME_STORAGE_KEY =
  "zugzwang_active_friend_game_v2";

export const ACTIVE_FRIEND_GAME_EVENT = "zugzwang-active-friend-game";

const ACTIVE_GAME_TTL_MS = 12 * 60 * 60 * 1000;

function notifyActiveFriendGameChanged() {
  window.dispatchEvent(new Event(ACTIVE_FRIEND_GAME_EVENT));
}

function normalizeMode(value: unknown): ActiveGameMode {
  return value === "online" ? "online" : "friend";
}

function isValidActiveFriendGame(value: unknown): value is ActiveFriendGame {
  if (!value || typeof value !== "object") {
    return false;
  }

  const game = value as Partial<ActiveFriendGame>;

  return (
    typeof game.roomCode === "string" &&
    game.roomCode.length > 0 &&
    (game.playerSide === "w" || game.playerSide === "b") &&
    (game.color === "white" || game.color === "black") &&
    typeof game.timeControl === "string" &&
    typeof game.opponentName === "string" &&
    (game.status === "playing" || game.status === "ended") &&
    typeof game.updatedAt === "number"
  );
}

export function saveActiveFriendGame(game: ActiveFriendGame) {
  try {
    localStorage.setItem(
      ACTIVE_FRIEND_GAME_STORAGE_KEY,
      JSON.stringify({
        ...game,
        mode: normalizeMode(game.mode),
        roomCode: game.roomCode.trim().toUpperCase(),
        updatedAt: Date.now(),
      })
    );

    notifyActiveFriendGameChanged();
  } catch {
    /* ignore */
  }
}

export function loadActiveFriendGame() {
  try {
    const rawValue = localStorage.getItem(ACTIVE_FRIEND_GAME_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);

    if (!isValidActiveFriendGame(parsed)) {
      localStorage.removeItem(ACTIVE_FRIEND_GAME_STORAGE_KEY);
      return null;
    }

    if (Date.now() - parsed.updatedAt > ACTIVE_GAME_TTL_MS) {
      localStorage.removeItem(ACTIVE_FRIEND_GAME_STORAGE_KEY);
      return null;
    }

    if (parsed.status !== "playing") {
      localStorage.removeItem(ACTIVE_FRIEND_GAME_STORAGE_KEY);
      return null;
    }

    return {
      ...parsed,
      mode: normalizeMode(parsed.mode),
    };
  } catch {
    return null;
  }
}

export function clearActiveFriendGame() {
  try {
    localStorage.removeItem(ACTIVE_FRIEND_GAME_STORAGE_KEY);
    notifyActiveFriendGameChanged();
  } catch {
    /* ignore */
  }
}

export function buildActiveFriendGamePlayUrl(game: ActiveFriendGame) {
  if (game.playUrl) {
    return game.playUrl;
  }

  const params = new URLSearchParams();

  params.set("mode", normalizeMode(game.mode));
  params.set("room", game.roomCode);
  params.set("color", game.color);
  params.set("time", game.timeControl);

  if (game.opponentName) {
    params.set("opponent", game.opponentName);
  }

  return `/play?${params.toString()}`;
}
