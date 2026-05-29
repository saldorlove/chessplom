import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chess } from "chess.js";

import ChessBoard from "../components/chess/ChessBoard";
import ActiveFriendGameBanner from "../components/play/ActiveFriendGameBanner";
import { useAuth } from "../auth/AuthContext";
import { CHESS_CLOCK_CONTROL_GROUPS } from "../hooks/useChessClock";
import { getBotName, type BotLevel } from "../hooks/useStockfishBot";
import { getApiAssetUrl } from "../api/usersApi";
import { useFriendRoom } from "../hooks/useFriendRoom";

type PlayMode = "online" | "bot" | "friend";
type PlayerColor = "white" | "random" | "black";

const MODE_TEXT: Record<PlayMode, { title: string; subtitle: string }> = {
  online: {
    title: "Играть по сети",
    subtitle: "",
  },
  bot: {
    title: "Игра против бота",
    subtitle: "",
  },
  friend: {
    title: "Играть с другом",
    subtitle: "",
  },
};

const MODE_NOTES: Record<PlayMode, string> = {
  online: "",
  bot: "",
  friend: "",
};

const TIME_GROUP_TITLES: Record<string, string> = {
  Blitz: "Блиц",
  Rapid: "Рапид",
  Classical: "Классика",
};

const BOT_LEVEL_LABELS: Record<BotLevel, string> = {
  1: "Новичок",
  2: "Начальный",
  3: "Любитель",
  4: "Средний",
  5: "Уверенный",
  6: "Сильный",
  7: "Эксперт",
  8: "Максимум",
};

function ChoicePlayerCard({
  title,
  subtitle,
  avatarText,
  avatarUrl,
}: {
  title: string;
  subtitle: string;
  avatarText: string;
  avatarUrl?: string;
}) {
  return (
    <div className="play-v4-player-card play-choice-player-card">
      <div className="play-v4-player-left">
        <div className="play-v4-avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt={title} className="play-v4-avatar-img" />
          ) : (
            <span className="play-v4-avatar-fallback">{avatarText}</span>
          )}
        </div>

        <div className="play-v4-player-meta">
          <div className="play-v4-player-name">{title}</div>

          <div className="play-v4-player-subline">
            <span className="play-v4-player-status">{subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCustomTime(minutes: number, increment: number) {
  return `${minutes}+${increment}`;
}

function getTimeCategoryLabel(minutes: number) {
  if (minutes <= 2) {
    return "Пуля";
  }

  if (minutes <= 5) {
    return "Блиц";
  }

  if (minutes <= 15) {
    return "Рапид";
  }

  return "Классика";
}

function getRangeFillPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

function getRangeBackground(percent: number) {
  return `linear-gradient(90deg, #d6a63d 0%, #d6a63d ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`;
}

function getFriendColorChoice(color: PlayerColor) {
  return color;
}

export default function PlayChoicePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeMode, setActiveMode] = useState<PlayMode | null>(null);
  const [selectedTime, setSelectedTime] = useState("10+0");
  const [selectedColor, setSelectedColor] = useState<PlayerColor>("random");
  const [selectedBotLevel, setSelectedBotLevel] = useState<BotLevel>(4);

  const [isCustomTimeOpen, setIsCustomTimeOpen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(10);
  const [customIncrement, setCustomIncrement] = useState(0);

  const [friendRoomCode, setFriendRoomCode] = useState("");

  const playerAvatarUrl = getApiAssetUrl(user?.avatarUrl) ?? undefined;
  const playerName = user?.username ?? "Гость";
  const playerLetter = playerName.slice(0, 1).toUpperCase() || "?";

  const handleFriendRoomReady = useCallback(
    (payload: { playUrl: string }) => {
      setActiveMode(null);
      setIsCustomTimeOpen(false);
      navigate(payload.playUrl);
    },
    [navigate]
  );

  const {
    roomCode: createdFriendRoomCode,
    status: friendRoomStatus,
    error: friendRoomError,
    isLoading: isFriendRoomLoading,
    createRoom,
    joinRoom,
    resetRoomState,
  } = useFriendRoom({
    onRoomReady: handleFriendRoomReady,
  });

  const previewGame = useMemo(() => new Chess(), []);
  const previewBoard = useMemo(() => previewGame.board(), [previewGame]);

  const customTimeLabel = formatCustomTime(customMinutes, customIncrement);
  const customTimeCategory = getTimeCategoryLabel(customMinutes);
  const isCustomTimeSelected = selectedTime === customTimeLabel;

  const modalNote = activeMode ? MODE_NOTES[activeMode] : "";
  const modalSubtitle = activeMode ? MODE_TEXT[activeMode].subtitle : "";

  function openModal(mode: PlayMode) {
    setActiveMode(mode);
    setIsCustomTimeOpen(false);
    resetRoomState();
    setFriendRoomCode("");
  }

  function closeModal() {
    setActiveMode(null);
    setIsCustomTimeOpen(false);
    resetRoomState();
    setFriendRoomCode("");
  }

  function handleApplyCustomTime() {
    setSelectedTime(customTimeLabel);
    setIsCustomTimeOpen(false);
  }

  function handleCreateFriendRoom() {
    createRoom({
      userId: user?.id ?? null,
      username: playerName,
      avatarUrl: user?.avatarUrl ?? null,
      time: selectedTime,
      color: getFriendColorChoice(selectedColor),
    });
  }

  function handleJoinFriendRoom() {
    joinRoom({
      userId: user?.id ?? null,
      username: playerName,
      avatarUrl: user?.avatarUrl ?? null,
      roomCode: friendRoomCode.trim().toUpperCase(),
    });
  }

  function handleOpenFriendsInvite() {
    closeModal();
    navigate("/friends");
  }

  function handleStart() {
    if (activeMode === "friend") {
      handleJoinFriendRoom();
      return;
    }

    const params = new URLSearchParams();

    params.set("time", selectedTime);
    params.set("color", selectedColor);

    if (activeMode) {
      params.set("mode", activeMode);
    }

    if (activeMode === "bot") {
      params.set("level", String(selectedBotLevel));
    }

    closeModal();

    if (activeMode === "online") {
      navigate(`/play-search?${params.toString()}`);
      return;
    }

    navigate(`/play?${params.toString()}`);
  }

  return (
    <section className="play-v4 play-choice-v2">
      <ActiveFriendGameBanner />

      <div className="play-v4-main">
        <div className="play-v4-center">
          <ChoicePlayerCard
            title="Противник"
            subtitle="Выберите режим игры справа"
            avatarText="?"
          />

          <div className="play-v4-board-shell">
            <ChessBoard
              board={previewBoard}
              game={previewGame}
              orientation="white"
              selectedSquare={null}
              legalTargets={[]}
              draggedFromSquare={null}
              dropHoverSquare={null}
              readOnly
            />
          </div>

          <ChoicePlayerCard
            title={playerName}
            subtitle={user ? "Ваш аккаунт" : "Гостевой режим"}
            avatarText={playerLetter}
            avatarUrl={playerAvatarUrl}
          />
        </div>

        <aside className="play-v4-right play-choice-v2-right">
          <div className="play-choice-v2-panel">
            <div className="play-choice-v2-head">
              <span className="play-choice-v2-icon">♞</span>

              <div>
                <p className="section-kicker"></p>
                <h2>Играть в шахматы</h2>
              </div>
            </div>

            <button
              type="button"
              className="play-choice-v2-card"
              onClick={() => openModal("online")}
            >
              <span className="play-choice-v2-card-icon">⚡</span>

              <span>
                <strong>Играть по сети</strong>
                <small>Найти соперника и начать партию</small>
              </span>
            </button>

            <button
              type="button"
              className="play-choice-v2-card"
              onClick={() => openModal("bot")}
            >
              <span className="play-choice-v2-card-icon">🤖</span>

              <span>
                <strong>Боты</strong>
                <small>Играть против Stockfish</small>
              </span>
            </button>

            <button
              type="button"
              className="play-choice-v2-card"
              onClick={() => openModal("friend")}
            >
              <span className="play-choice-v2-card-icon">🤝</span>

              <span>
                <strong>Играть с другом</strong>
                <small>Создать комнату или подключиться по коду</small>
              </span>
            </button>
          </div>
        </aside>
      </div>

      {activeMode ? (
        <div className="play-modal-backdrop" onMouseDown={closeModal}>
          <div
            className="play-modal play-setup-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="play-modal-close"
              onClick={closeModal}
              aria-label="Закрыть"
            >
              ×
            </button>

            <div className="play-modal-top">
              <h2>{MODE_TEXT[activeMode].title}</h2>

              {modalSubtitle ? (
                <p className="play-modal-subtitle">{modalSubtitle}</p>
              ) : null}
            </div>

            <div className="play-setup-grid">
              <section className="play-modal-section play-modal-card-section">
                <div className="play-modal-section-head">
                  <span className="play-modal-label">Контроль времени</span>
                  <span className="play-modal-current">{selectedTime}</span>
                </div>

                <div className="time-preset-groups compact-time-groups">
                  {CHESS_CLOCK_CONTROL_GROUPS.map((group) => (
                    <div className="time-preset-group" key={group.title}>
                      <strong>
                        {TIME_GROUP_TITLES[group.title] ?? group.title}
                      </strong>

                      <div className="time-preset-list">
                        {group.controls.map((control) => (
                          <button
                            type="button"
                            key={control.label}
                            className={[
                              "time-preset-btn",
                              selectedTime === control.label ? "active" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => {
                              setSelectedTime(control.label);
                              setIsCustomTimeOpen(false);
                            }}
                          >
                            {control.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className={[
                    "custom-time-toggle",
                    isCustomTimeOpen || isCustomTimeSelected ? "active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setIsCustomTimeOpen((prev) => !prev)}
                >
                  <span>Свой контроль</span>
                  <strong>{customTimeCategory}</strong>
                </button>

                {isCustomTimeOpen ? (
                  <div className="custom-time-panel">
                    <label className="custom-time-field">
                      <span>Основное время</span>

                      <div className="custom-time-row">
                        <input
                          type="range"
                          min={1}
                          max={60}
                          value={customMinutes}
                          style={{
                            background: getRangeBackground(
                              getRangeFillPercent(customMinutes, 1, 60)
                            ),
                          }}
                          onChange={(event) =>
                            setCustomMinutes(Number(event.target.value))
                          }
                        />

                        <strong>{customMinutes} мин</strong>
                      </div>
                    </label>

                    <label className="custom-time-field">
                      <span>Добавление</span>

                      <div className="custom-time-row">
                        <input
                          type="range"
                          min={0}
                          max={30}
                          value={customIncrement}
                          style={{
                            background: getRangeBackground(
                              getRangeFillPercent(customIncrement, 0, 30)
                            ),
                          }}
                          onChange={(event) =>
                            setCustomIncrement(Number(event.target.value))
                          }
                        />

                        <strong>{customIncrement} сек</strong>
                      </div>
                    </label>

                    <div className="custom-time-actions">
                      <button
                        type="button"
                        className="secondary-btn custom-time-apply"
                        onClick={handleApplyCustomTime}
                      >
                        Выбрать
                      </button>
                    </div>
                  </div>
                ) : null}
              </section>

              <section className="play-modal-section play-modal-card-section">
                <div className="play-modal-section-head">
                  <span className="play-modal-label">Ваш цвет</span>
                </div>

                <div className="segmented-control">
                  <button
                    type="button"
                    className={selectedColor === "white" ? "active" : ""}
                    onClick={() => setSelectedColor("white")}
                  >
                    Белые
                  </button>

                  <button
                    type="button"
                    className={selectedColor === "random" ? "active" : ""}
                    onClick={() => setSelectedColor("random")}
                  >
                    Случайно
                  </button>

                  <button
                    type="button"
                    className={selectedColor === "black" ? "active" : ""}
                    onClick={() => setSelectedColor("black")}
                  >
                    Чёрные
                  </button>
                </div>
              </section>

              {activeMode === "bot" ? (
                <section className="play-modal-section play-modal-card-section">
                  <div className="play-modal-section-head">
                    <span className="play-modal-label">Уровень Stockfish</span>
                    <span className="play-modal-current">
                      {getBotName(selectedBotLevel)}
                    </span>
                  </div>

                  <div className="bot-level-grid">
                    {([1, 2, 3, 4, 5, 6, 7, 8] as BotLevel[]).map((level) => (
                      <button
                        type="button"
                        key={level}
                        className={[
                          "bot-level-btn",
                          selectedBotLevel === level ? "active" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => setSelectedBotLevel(level)}
                      >
                        <strong>{level}</strong>
                        <small>{BOT_LEVEL_LABELS[level]}</small>
                      </button>
                    ))}
                  </div>
                </section>
              ) : null}

              {activeMode === "friend" ? (
                <section className="play-modal-section play-modal-card-section">
                  <div className="play-modal-section-head">
                    <span className="play-modal-label">Игра с другом</span>
                  </div>

                  <div className="friend-room-panel friend-room-panel-polished">
                    <div className="friend-room-invite-card">
                      <div>
                        <strong>Пригласить друга</strong>
                        <p>
                          Откройте список друзей и предложите другу играть
                        </p>
                      </div>

                      <button
                        type="button"
                        className="primary-btn friend-room-invite-btn"
                        onClick={handleOpenFriendsInvite}
                      >
                        Выбрать друга
                      </button>
                    </div>

                    <div className="friend-room-create">
                      <div>
                        <strong>Создать комнату</strong>
                        <p>Создайте код и отправьте его другу</p>
                      </div>

                      <button
                        type="button"
                        className="primary-btn friend-room-create-btn"
                        onClick={handleCreateFriendRoom}
                        disabled={
                          isFriendRoomLoading || Boolean(createdFriendRoomCode)
                        }
                      >
                        {isFriendRoomLoading
                          ? "Создание..."
                          : createdFriendRoomCode
                          ? "Комната создана"
                          : "Создать комнату"}
                      </button>
                    </div>

                    {createdFriendRoomCode ? (
                      <div className="friend-room-code-box">
                        <span>Код комнаты</span>

                        <strong>{createdFriendRoomCode}</strong>

                        <button
                          type="button"
                          className="secondary-btn"
                          onClick={() =>
                            navigator.clipboard?.writeText(
                              createdFriendRoomCode
                            )
                          }
                        >
                          Скопировать
                        </button>

                        <p>Ожидание подключения друга...</p>
                      </div>
                    ) : null}

                    <div className="friend-room-divider">или</div>

                    <label className="friend-code-field">
                      <span>Подключиться по коду</span>

                      <input
                        type="text"
                        value={friendRoomCode}
                        onChange={(event) =>
                          setFriendRoomCode(event.target.value.toUpperCase())
                        }
                        placeholder="Например: A7K9Q"
                        maxLength={12}
                      />
                    </label>

                    <div className="friend-code-actions">
                      <button
                        type="button"
                        className="secondary-btn"
                        disabled={!friendRoomCode.trim() || isFriendRoomLoading}
                        onClick={handleJoinFriendRoom}
                      >
                        {isFriendRoomLoading
                          ? "Подключение..."
                          : "Подключиться"}
                      </button>
                    </div>

                    {friendRoomStatus ? (
                      <p className="friend-room-message success">
                        {friendRoomStatus}
                      </p>
                    ) : null}

                    {friendRoomError ? (
                      <p className="friend-room-message error">
                        {friendRoomError}
                      </p>
                    ) : null}
                  </div>
                </section>
              ) : null}
            </div>

            {activeMode !== "friend" ? (
              <button
                type="button"
                className="play-modal-start"
                onClick={handleStart}
              >
                Старт
              </button>
            ) : null}

            {modalNote ? (
              <p className="play-modal-note">{modalNote}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}