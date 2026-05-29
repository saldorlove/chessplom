import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import { getGames, type SavedGameDto } from "../api/gamesApi";
import {
  deleteMyAvatar,
  getApiAssetUrl,
  uploadMyAvatar,
} from "../api/usersApi";
import {
  formatTacticsTime,
  getDefaultTacticsStats,
  getTacticsAccuracyText,
  getTacticsStreakText,
  loadTacticsStats,
  setActiveTacticsStatsUserId,
  type TacticsStats,
} from "../services/tacticsStatsService";

type PlayerSide = "w" | "b" | null;
type GameModeKey = "online" | "friend" | "bot" | "local";

type GameStats = {
  total: number;
  wins: number;
  losses: number;
  draws: number;
  online: number;
  friend: number;
  bot: number;
  local: number;
  winRateText: string;
};

const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Дата неизвестна";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatShortDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Дата неизвестна";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function validateAvatarFile(file: File) {
  if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
    return "Можно загрузить только PNG, JPG или WEBP";
  }

  if (file.size > MAX_AVATAR_SIZE_BYTES) {
    return "Размер аватарки должен быть не больше 2 МБ";
  }

  return null;
}

function normalizeSource(source: string): GameModeKey {
  if (source === "online-play" || source === "online-demo") {
    return "online";
  }

  if (source === "friend-play") {
    return "friend";
  }

  if (source === "bot-play") {
    return "bot";
  }

  return "local";
}

function getSourceLabel(source: string) {
  const mode = normalizeSource(source);

  if (mode === "online") return "Онлайн";
  if (mode === "friend") return "С другом";
  if (mode === "bot") return "Против бота";

  return "Локально";
}

function getResultReasonLabel(reason: string | null) {
  if (reason === "checkmate") return "мат";
  if (reason === "resignation") return "сдача";
  if (reason === "timeout") return "время";
  if (reason === "technical-loss") return "техническое поражение";
  if (reason === "draw-agreed") return "ничья по соглашению";
  if (reason === "stalemate") return "пат";
  if (reason === "threefold-repetition") return "троекратное повторение";
  if (reason === "insufficient-material") return "недостаток материала";
  if (reason === "draw") return "ничья";

  return "результат";
}

function getPlayerSide(game: SavedGameDto, username: string): PlayerSide {
  if (game.whiteName === username) {
    return "w";
  }

  if (game.blackName === username) {
    return "b";
  }

  return null;
}

function getOpponentName(game: SavedGameDto, username: string) {
  const side = getPlayerSide(game, username);

  if (side === "w") {
    return game.blackName;
  }

  if (side === "b") {
    return game.whiteName;
  }

  return `${game.whiteName} — ${game.blackName}`;
}

function getPlayerColorLabel(game: SavedGameDto, username: string) {
  const side = getPlayerSide(game, username);

  if (side === "w") return "Вы играли белыми";
  if (side === "b") return "Вы играли чёрными";

  return "Цвет не определён";
}

function getPersonalResult(game: SavedGameDto, username: string) {
  const side = getPlayerSide(game, username);

  if (game.result === "1/2-1/2") {
    return "draw" as const;
  }

  if (!side) {
    return "unknown" as const;
  }

  if (game.result === "1-0") {
    return side === "w" ? ("win" as const) : ("loss" as const);
  }

  if (game.result === "0-1") {
    return side === "b" ? ("win" as const) : ("loss" as const);
  }

  return "unknown" as const;
}

function getPersonalResultLabel(game: SavedGameDto, username: string) {
  const result = getPersonalResult(game, username);

  if (result === "win") return "Победа";
  if (result === "loss") return "Поражение";
  if (result === "draw") return "Ничья";

  return game.result;
}

function buildGameStats(games: SavedGameDto[], username: string): GameStats {
  const stats = games.reduce(
    (acc, game) => {
      const mode = normalizeSource(game.source);
      const personalResult = getPersonalResult(game, username);

      acc.total += 1;
      acc[mode] += 1;

      if (personalResult === "win") acc.wins += 1;
      else if (personalResult === "loss") acc.losses += 1;
      else if (personalResult === "draw") acc.draws += 1;

      return acc;
    },
    {
      total: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      online: 0,
      friend: 0,
      bot: 0,
      local: 0,
    }
  );

  const ratedGames = stats.wins + stats.losses + stats.draws;
  const winRateText =
    ratedGames > 0 ? `${Math.round((stats.wins / ratedGames) * 100)}%` : "—";

  return {
    ...stats,
    winRateText,
  };
}

export default function ProfilePage() {
  const { user, updateCurrentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [tacticsStats, setTacticsStats] = useState<TacticsStats>(() =>
    getDefaultTacticsStats()
  );

  const [games, setGames] = useState<SavedGameDto[]>([]);
  const [isGamesLoading, setIsGamesLoading] = useState(false);
  const [gamesError, setGamesError] = useState<string | null>(null);

  const [avatarStatus, setAvatarStatus] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  useEffect(() => {
    setActiveTacticsStatsUserId(user?.id ?? null);
    setTacticsStats(user ? loadTacticsStats(user.id) : getDefaultTacticsStats());

    function handleStorageChange() {
      setTacticsStats(
        user ? loadTacticsStats(user.id) : getDefaultTacticsStats()
      );
    }

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, [user?.id]);

  useEffect(() => {
    if (!user) {
      setGames([]);
      return;
    }

    let cancelled = false;

    setIsGamesLoading(true);
    setGamesError(null);

    getGames({ sort: "newest" })
      .then((nextGames) => {
        if (cancelled) return;
        setGames(nextGames);
      })
      .catch((error) => {
        if (cancelled) return;

        setGamesError(
          error instanceof Error
            ? error.message
            : "Не удалось загрузить статистику партий"
        );
      })
      .finally(() => {
        if (cancelled) return;
        setIsGamesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  if (!user) {
    return (
      <section className="page-section auth-page">
        <div className="page-header-block">
          <p className="section-kicker">Профиль</p>
          <h2>Войдите в аккаунт</h2>
          <p className="section-text">Профиль доступен после входа.</p>
        </div>

        <div className="auth-card">
          <Link className="primary-link-btn" to="/login">
            Войти
          </Link>
        </div>
      </section>
    );
  }

  const avatarLetter = user.username.slice(0, 1).toUpperCase() || "?";
  const avatarSrc = getApiAssetUrl(user.avatarUrl);
  const gameStats = buildGameStats(games, user.username);
  const recentGames = games.slice(0, 5);
  const latestOnlineRating = games.find(
    (game) => game.source === "online-play" && typeof game.ratingAfter === "number"
  )?.ratingAfter;
  const currentRating =
    latestOnlineRating ??
    (user as unknown as { rating?: number | null }).rating ??
    1000;

  async function handleAvatarFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    const validationError = validateAvatarFile(file);

    if (validationError) {
      setAvatarStatus(null);
      setAvatarError(validationError);
      return;
    }

    setIsAvatarUploading(true);
    setAvatarError(null);
    setAvatarStatus(null);

    try {
      const response = await uploadMyAvatar(file);

      updateCurrentUser(response.user);
      setAvatarStatus(response.message || "Аватарка обновлена");
    } catch (error) {
      setAvatarError(
        error instanceof Error ? error.message : "Не удалось загрузить аватарку"
      );
    } finally {
      setIsAvatarUploading(false);
    }
  }

  async function handleDeleteAvatar() {
    if (!user || !user.avatarUrl || isAvatarUploading) {
      return;
    }

    setIsAvatarUploading(true);
    setAvatarError(null);
    setAvatarStatus(null);

    try {
      const response = await deleteMyAvatar();

      updateCurrentUser(response.user);
      setAvatarStatus(response.message || "Аватарка удалена");
    } catch (error) {
      setAvatarError(
        error instanceof Error ? error.message : "Не удалось удалить аватарку"
      );
    } finally {
      setIsAvatarUploading(false);
    }
  }

  return (
    <section className="profile-page">
      <div className="profile-hero">
        <div className="profile-hero-left">
          <div className="profile-avatar">
            {avatarSrc ? <img src={avatarSrc} alt={user.username} /> : avatarLetter}
          </div>

          <div className="profile-hero-main">
            <p className="section-kicker">Профиль</p>
            <h2>{user.username}</h2>
            <p>{user.email}</p>

            {avatarStatus ? (
              <p className="profile-avatar-message success">{avatarStatus}</p>
            ) : null}

            {avatarError ? (
              <p className="profile-avatar-message error">{avatarError}</p>
            ) : null}
          </div>
        </div>

        <div className="profile-avatar-actions">
          <input
            ref={fileInputRef}
            className="profile-avatar-input"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleAvatarFileChange}
          />

          <button
            type="button"
            className="profile-avatar-upload-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAvatarUploading}
          >
            {isAvatarUploading ? "Загрузка..." : "Загрузить аватарку"}
          </button>

          {user.avatarUrl ? (
            <button
              type="button"
              className="profile-avatar-delete-btn"
              onClick={handleDeleteAvatar}
              disabled={isAvatarUploading}
            >
              Удалить
            </button>
          ) : null}
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <span>Дата регистрации</span>
          <strong>{formatDate(user.createdAt)}</strong>
        </div>

        <div className="profile-card">
          <span>Email</span>
          <strong>
            {user.emailVerified ? "Подтверждён" : "Не подтверждён"}
          </strong>
        </div>

        <div className="profile-card">
          <span>Рейтинг</span>
          <strong>{currentRating}</strong>
        </div>

        <div className="profile-card">
          <span>История</span>
          <Link to="/history">Мои партии</Link>
        </div>

      </div>

      <section className="profile-games-card">
        <div className="profile-games-head">
          <div>
            <h3>Статистика игр</h3>
          </div>

          <div className="profile-games-actions">
            <Link to="/playchoice" className="profile-games-action primary">
              Играть
            </Link>
          </div>
        </div>

        {gamesError ? <p className="profile-games-error">{gamesError}</p> : null}

        <div className="profile-games-stats-grid">
          <div className="profile-game-stat">
            <span>Всего партий</span>
            <strong>{isGamesLoading ? "..." : gameStats.total}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Победы</span>
            <strong>{isGamesLoading ? "..." : gameStats.wins}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Поражения</span>
            <strong>{isGamesLoading ? "..." : gameStats.losses}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Ничьи</span>
            <strong>{isGamesLoading ? "..." : gameStats.draws}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Процент побед</span>
            <strong>{isGamesLoading ? "..." : gameStats.winRateText}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Онлайн</span>
            <strong>{isGamesLoading ? "..." : gameStats.online}</strong>
          </div>

          <div className="profile-game-stat">
            <span>С другом</span>
            <strong>{isGamesLoading ? "..." : gameStats.friend}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Против бота</span>
            <strong>{isGamesLoading ? "..." : gameStats.bot}</strong>
          </div>
        </div>
      </section>

      <div className="profile-tactics-card">
        <div className="profile-tactics-head">
          <div>
            <h3>Статистика задач</h3>
          </div>

          <div className="profile-tactics-actions">
            <Link to="/tactics" className="profile-tactics-action">
              Решать задачи
            </Link>
          </div>
        </div>

        <div className="profile-tactics-stats">
          <div className="profile-tactics-stat">
            <span>Решено задач</span>
            <strong>{tacticsStats.solved}</strong>
          </div>

          <div className="profile-tactics-stat">
            <span>Лучшее время</span>
            <strong>{formatTacticsTime(tacticsStats.bestTimeSeconds)}</strong>
          </div>

          <div className="profile-tactics-stat">
            <span>Точность</span>
            <strong>{getTacticsAccuracyText(tacticsStats)}</strong>
          </div>

          <div className="profile-tactics-stat">
            <span>Серия</span>
            <strong>{getTacticsStreakText(tacticsStats)}</strong>
          </div>
        </div>
      </div>

      <section className="profile-recent-card">
        <div className="profile-recent-head">
          <div>
            <h3>Последние партии</h3>
          </div>

          <Link to="/history" className="profile-recent-link">
            Все партии
          </Link>
        </div>

        {isGamesLoading ? (
          <p className="profile-recent-empty">Загрузка партий...</p>
        ) : recentGames.length > 0 ? (
          <div className="history-v1-list profile-recent-list">
            {recentGames.map((game) => (
              <article
                key={game.id}
                className="history-v1-card profile-recent-history-card"
              >
                <div className="history-v1-card-main">
                  <div className="history-v1-card-top">
                    <div className="history-v1-title-block">
                      <span
                        className={[
                          "history-v1-source-chip",
                          normalizeSource(game.source),
                        ].join(" ")}
                      >
                        {getSourceLabel(game.source)}
                      </span>

                      <strong>Против {getOpponentName(game, user.username)}</strong>
                    </div>
                  </div>

                  <div className="history-v1-meta">
                    <span>{getPersonalResultLabel(game, user.username)}</span>
                    <span>{getPlayerColorLabel(game, user.username)}</span>
                    <span>{game.result} · {getResultReasonLabel(game.resultReason)}</span>
                    <span>{game.timeControl}</span>
                    <span>{game.moveCount} ходов</span>
                  </div>
                </div>

                <div className="history-v1-actions">
                  <span className="history-v1-card-date">
                    {formatShortDate(game.createdAt)}
                  </span>

                  <Link
                    to={`/analysis?gameId=${game.id}`}
                    className="primary-btn"
                  >
                    Анализ
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="profile-recent-empty">
            Пока нет сохранённых партий. Сыграйте партию, и она появится здесь.
          </p>
        )}
      </section>
    </section>
  );
}
