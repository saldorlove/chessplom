import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { ensureFriendSocketConnected } from "../../realtime/socketClient";
import {
  ACTIVE_FRIEND_GAME_EVENT,
  buildActiveFriendGamePlayUrl,
  clearActiveFriendGame,
  loadActiveFriendGame,
  saveActiveFriendGame,
  type ActiveFriendGame,
} from "../../utils/activeFriendGame";

type ActiveGameResponse = {
  ok: boolean;
  activeGame?: ActiveFriendGame | null;
  message?: string;
};

function getModeLabel(mode: ActiveFriendGame["mode"]) {
  return mode === "online" ? "Онлайн-партия" : "Игра с другом";
}

export default function ActiveFriendGameBanner() {
  const { user } = useAuth();
  const [activeGame, setActiveGame] = useState<ActiveFriendGame | null>(() =>
    loadActiveFriendGame()
  );

  useEffect(() => {
    function refreshActiveGame() {
      setActiveGame(loadActiveFriendGame());
    }

    window.addEventListener(ACTIVE_FRIEND_GAME_EVENT, refreshActiveGame);
    window.addEventListener("storage", refreshActiveGame);

    return () => {
      window.removeEventListener(ACTIVE_FRIEND_GAME_EVENT, refreshActiveGame);
      window.removeEventListener("storage", refreshActiveGame);
    };
  }, []);

  useEffect(() => {
    if (!user?.id) {
      setActiveGame(loadActiveFriendGame());
      return;
    }

    const socket = ensureFriendSocketConnected();

    socket.emit(
      "active-game:get",
      {
        userId: user.id,
        mode: "all",
        includeEnded: false,
      },
      (response: ActiveGameResponse) => {
        if (!response?.ok) {
          {
          const localGame = loadActiveFriendGame();
          setActiveGame(localGame?.status === "playing" ? localGame : null);
        }
          return;
        }

        if (response.activeGame) {
          saveActiveFriendGame(response.activeGame);
          setActiveGame(response.activeGame);
          return;
        }

        {
          const localGame = loadActiveFriendGame();
          setActiveGame(localGame?.status === "playing" ? localGame : null);
        }
      }
    );
  }, [user?.id]);

  if (!activeGame) {
    return null;
  }

  return (
    <div className="active-friend-game-banner">
      <div>
        <span>{getModeLabel(activeGame.mode)}</span>
        <strong>
          {activeGame.opponentName
            ? `Против ${activeGame.opponentName}`
            : `Комната ${activeGame.roomCode}`}
        </strong>
        <p>
          {activeGame.timeControl} ·{" "}
          {activeGame.status === "ended"
            ? "партия завершена, доступен реванш"
            : "партия идёт"}
        </p>
      </div>

      <div className="active-friend-game-actions">
        <Link
          className="primary-btn"
          to={buildActiveFriendGamePlayUrl(activeGame)}
        >
          Вернуться
        </Link>

        <button
          type="button"
          className="secondary-btn"
          onClick={clearActiveFriendGame}
        >
          Скрыть
        </button>
      </div>
    </div>
  );
}
