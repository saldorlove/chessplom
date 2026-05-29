import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import { ensureFriendSocketConnected } from "../realtime/socketClient";

import "../styles/play-search.css";

type SearchStage = "searching" | "queued" | "found" | "starting" | "error";

type OnlineMatchFoundPayload = {
  roomCode: string;
  playUrl: string;
  side: "w" | "b";
  opponent?: {
    username: string;
    avatarUrl: string | null;
  };
};

function getColorText(color: string | null) {
  if (color === "white") return "Белые";
  if (color === "black") return "Чёрные";
  return "Случайный";
}

function formatSearchTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default function PlaySearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [stage, setStage] = useState<SearchStage>("searching");
  const [error, setError] = useState<string | null>(null);
  const [opponentName, setOpponentName] = useState("Соперник");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const matchedRef = useRef(false);
  const navigateTimerRef = useRef<number | null>(null);

  const time = searchParams.get("time") ?? "10+0";
  const color = searchParams.get("color") ?? "random";

  const username = user?.username ?? "Гость";
  const avatarUrl = user?.avatarUrl ?? null;

  const colorText = useMemo(() => getColorText(color), [color]);
  const searchTimeText = useMemo(
    () => formatSearchTime(elapsedSeconds),
    [elapsedSeconds]
  );

  useEffect(() => {
    matchedRef.current = false;
    setElapsedSeconds(0);

    const socket = ensureFriendSocketConnected();

    function handleMatchFound(payload: OnlineMatchFoundPayload) {
      matchedRef.current = true;

      setOpponentName(payload.opponent?.username ?? "Соперник");
      setStage("found");
      setError(null);

      if (navigateTimerRef.current) {
        window.clearTimeout(navigateTimerRef.current);
      }

      navigateTimerRef.current = window.setTimeout(() => {
        setStage("starting");
        navigate(payload.playUrl);
      }, 850);
    }

    socket.on("online:match-found", handleMatchFound);

    socket.emit(
      "online:find-game",
      {
        username,
        avatarUrl,
        time,
        color,
      },
      (response: {
        ok: boolean;
        status?: "queued" | "matched";
        message?: string;
        playUrl?: string;
      }) => {
        if (!response?.ok) {
          setStage("error");
          setError(response?.message ?? "Не удалось начать поиск");
          return;
        }

        if (response.status === "queued") {
          setStage("queued");
        }

        if (response.status === "matched" && response.playUrl) {
          matchedRef.current = true;
        }
      }
    );

    return () => {
      socket.off("online:match-found", handleMatchFound);

      if (navigateTimerRef.current) {
        window.clearTimeout(navigateTimerRef.current);
      }

      if (!matchedRef.current) {
        socket.emit("online:cancel-search", {});
      }
    };
  }, [navigate, username, avatarUrl, time, color]);

  useEffect(() => {
    if (stage !== "searching" && stage !== "queued") {
      return;
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [stage]);

  const titleText =
    stage === "error"
      ? "Ошибка поиска"
      : stage === "found"
      ? "Оппонент найден"
      : stage === "starting"
      ? "Подготовка партии..."
      : "Ожидание оппонента...";

  return (
    <section className="play-search-page">
      <div className="play-search-card">
        <div className="play-search-pattern" />
        <div className="play-search-glow" />

        <div className="play-search-icon-wrap">
          <div className="play-search-icon">♞</div>
          {stage === "searching" || stage === "queued" ? (
            <div className="play-search-pulse" />
          ) : null}
        </div>

        <p className="play-search-kicker">Онлайн-партия</p>

        <h2>{titleText}</h2>

        <div className="play-search-info-grid compact">
          <div className="play-search-info-card">
            <span>Контроль</span>
            <strong>{time}</strong>
          </div>

          <div className="play-search-info-card">
            <span>Цвет</span>
            <strong>{colorText}</strong>
          </div>

          <div className="play-search-info-card">
            <span>Время поиска</span>
            <strong>{searchTimeText}</strong>
          </div>
        </div>

        {error ? <div className="play-search-error-box">{error}</div> : null}

        {stage === "found" || stage === "starting" ? (
          <div className="play-search-opponent">
            <div className="play-search-opponent-avatar">
              {opponentName.slice(0, 1).toUpperCase()}
            </div>

            <div>
              <span>Ваш оппонент</span>
              <strong>{opponentName}</strong>
            </div>
          </div>
        ) : null}

        <div className="play-search-actions">
          <Link to="/playchoice" className="secondary-link-btn">
            Отменить поиск
          </Link>
        </div>
      </div>
    </section>
  );
}