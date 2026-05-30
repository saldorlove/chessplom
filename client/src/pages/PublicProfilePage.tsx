import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getPublicProfile,
  type PublicProfileResponse,
} from "../api/publicProfileApi";
import { getApiAssetUrl } from "../api/usersApi";
import PublicGameCard from "../components/profile/PublicGameCard";
import { formatPublicProfileDate } from "../utils/publicProfileGames";

import "../styles/profile.css";
import "../styles/publicProfiles.css";

export default function PublicProfilePage() {
  const { username = "" } = useParams();

  const [profile, setProfile] = useState<PublicProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setLoadError(null);

    getPublicProfile(username)
      .then((response) => {
        if (!cancelled) {
          setProfile(response);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setProfile(null);
          setLoadError(
            error instanceof Error
              ? error.message
              : "Не удалось загрузить профиль игрока"
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (isLoading) {
    return (
      <section className="profile-page">
        <div className="public-profile-state">Загрузка профиля...</div>
      </section>
    );
  }

  if (loadError || !profile) {
    return (
      <section className="profile-page">
        <div className="public-profile-state error">
          {loadError ?? "Профиль не найден"}
        </div>

        <Link className="secondary-link-btn" to="/friends">
          Вернуться к друзьям
        </Link>
      </section>
    );
  }

  const { user, stats, recentGames } = profile;
  const avatarUrl = getApiAssetUrl(user.avatarUrl);
  const avatarLetter = user.username.slice(0, 1).toUpperCase() || "?";

  return (
    <section className="profile-page public-profile-page">
      <div className="profile-hero public-profile-hero">
        <div className="profile-hero-left">
          <div className="profile-avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={user.username} />
            ) : (
              avatarLetter
            )}
          </div>

          <div className="profile-hero-main">
            <p className="section-kicker">Профиль</p>
            <h2>{user.username}</h2>
            <p>Участник платформы с {formatPublicProfileDate(user.createdAt)}</p>
          </div>
        </div>

        <div className="public-profile-rating">
          <span>Рейтинг</span>
          <strong>{user.rating}</strong>
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

        <div className="profile-games-stats-grid">
          <div className="profile-game-stat">
            <span>Всего партий</span>
            <strong>{stats.total}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Победы</span>
            <strong>{stats.wins}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Поражения</span>
            <strong>{stats.losses}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Ничьи</span>
            <strong>{stats.draws}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Процент побед</span>
            <strong>{stats.winRateText}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Онлайн</span>
            <strong>{stats.online}</strong>
          </div>

          <div className="profile-game-stat">
            <span>С другом</span>
            <strong>{stats.friend}</strong>
          </div>

          <div className="profile-game-stat">
            <span>Против бота</span>
            <strong>{stats.bot}</strong>
          </div>
        </div>
      </section>

      <section className="profile-recent-card">
        <div className="profile-recent-head">
          <div>
            <h3>Последние матчи</h3>
          </div>

          <Link
            to={`/profile/${encodeURIComponent(user.username)}/games`}
            className="profile-recent-link"
          >
            Все партии
          </Link>
        </div>

        {recentGames.length > 0 ? (
          <div className="history-v1-list profile-recent-list">
            {recentGames.map((game) => (
              <PublicGameCard
                game={game}
                username={user.username}
                key={game.id}
              />
            ))}
          </div>
        ) : (
          <p className="profile-recent-empty">Нет партий</p>
        )}
      </section>
    </section>
  );
}
