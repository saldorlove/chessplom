import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getPublicProfileGames,
  type PublicGamesResponse,
} from "../api/publicProfileApi";
import PublicGameCard from "../components/profile/PublicGameCard";

import "../styles/profile.css";
import "../styles/publicProfiles.css";

export default function PublicGamesPage() {
  const { username = "" } = useParams();

  const [data, setData] = useState<PublicGamesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setLoadError(null);

    getPublicProfileGames(username)
      .then((response) => {
        if (!cancelled) {
          setData(response);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setData(null);
          setLoadError(
            error instanceof Error
              ? error.message
              : "Не удалось загрузить историю партий"
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
        <div className="public-profile-state">Загрузка истории партий...</div>
      </section>
    );
  }

  if (loadError || !data) {
    return (
      <section className="profile-page">
        <div className="public-profile-state error">
          {loadError ?? "История не найдена"}
        </div>

        <Link className="secondary-link-btn" to="/friends">
          Вернуться к друзьям
        </Link>
      </section>
    );
  }

  return (
    <section className="profile-page public-profile-page">
      <div className="public-games-head">
        <h2>Партии игрока {data.user.username}</h2>

        <Link
          className="secondary-link-btn"
          to={`/profile/${encodeURIComponent(data.user.username)}`}
        >
          Назад в профиль
        </Link>
      </div>

      {data.games.length > 0 ? (
        <>
          <p className="public-games-count">
            Показано {data.games.length} из {data.total} партий
          </p>

          <div className="history-v1-list">
            {data.games.map((game) => (
              <PublicGameCard
                game={game}
                username={data.user.username}
                key={game.id}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="public-profile-state">Нет партий</div>
      )}
    </section>
  );
}
