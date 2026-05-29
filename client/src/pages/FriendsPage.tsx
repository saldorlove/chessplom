import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import { getApiAssetUrl } from "../api/usersApi";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  getFriendsDashboard,
  removeFriend,
  searchFriendsUsers,
  sendFriendRequest,
  type FriendRequestDto,
  type FriendSearchUserDto,
  type FriendUserDto,
} from "../api/friendsApi";
import {
  useFriendRoom,
  type FriendPresenceStatus,
} from "../hooks/useFriendRoom";

type FriendInviteColor = "white" | "black" | "random";

const FRIEND_INVITE_TIMES = ["3+0", "5+0", "10+0", "15+10"];
const FRIEND_INVITE_COLORS: Array<{
  value: FriendInviteColor;
  label: string;
}> = [
  {
    value: "random",
    label: "Случайно",
  },
  {
    value: "white",
    label: "Белые",
  },
  {
    value: "black",
    label: "Чёрные",
  },
];

function formatCustomTime(minutes: number, increment: number) {
  return `${minutes}+${increment}`;
}

function getTimeCategoryLabel(minutes: number) {
  if (minutes <= 2) return "Пуля";
  if (minutes <= 5) return "Блиц";
  if (minutes <= 15) return "Рапид";

  return "Классика";
}

function getRangeFillPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

function getRangeBackground(percent: number) {
  return `linear-gradient(90deg, #d6a63d 0%, #d6a63d ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`;
}

function getInitialLetter(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "?";
}

function getFriendStatusLabel(status: FriendPresenceStatus) {
  if (status === "in-game") return "В игре";
  if (status === "online") return "Онлайн";

  return "Не в сети";
}

function FriendAvatar({ user }: { user: FriendUserDto }) {
  const avatarUrl = getApiAssetUrl(user.avatarUrl);

  return (
    <div className="friends-avatar">
      {avatarUrl ? (
        <img src={avatarUrl} alt={user.username} />
      ) : (
        <span>{getInitialLetter(user.username)}</span>
      )}
    </div>
  );
}

function FriendUserCard({
  user,
  action,
  meta,
  status,
}: {
  user: FriendUserDto;
  action?: ReactNode;
  meta?: string;
  status?: FriendPresenceStatus;
}) {
  return (
    <article className="friends-user-card">
      <FriendAvatar user={user} />

      <div className="friends-user-main">
        <div className="friends-user-name-row">
          <strong>{user.username}</strong>

          {status ? (
            <span className={["friends-status-pill", status].join(" ")}>
              {getFriendStatusLabel(status)}
            </span>
          ) : null}
        </div>

        <span>{meta ?? `Рейтинг ${user.rating}`}</span>
      </div>

      {action ? <div className="friends-user-action">{action}</div> : null}
    </article>
  );
}

function RequestCard({
  request,
  type,
  onAccept,
  onDecline,
  onCancel,
}: {
  request: FriendRequestDto;
  type: "incoming" | "outgoing";
  onAccept?: (requestId: string) => void;
  onDecline?: (requestId: string) => void;
  onCancel?: (requestId: string) => void;
}) {
  return (
    <FriendUserCard
      user={request.user}
      meta={type === "incoming" ? "Хочет добавить вас" : "Заявка отправлена"}
      action={
        type === "incoming" ? (
          <>
            <button
              type="button"
              className="friends-mini-btn primary"
              onClick={() => onAccept?.(request.id)}
            >
              Принять
            </button>

            <button
              type="button"
              className="friends-mini-btn secondary"
              onClick={() => onDecline?.(request.id)}
            >
              Отклонить
            </button>
          </>
        ) : (
          <button
            type="button"
            className="friends-mini-btn secondary"
            onClick={() => onCancel?.(request.id)}
          >
            Отменить
          </button>
        )
      }
    />
  );
}

function getSearchActionLabel(user: FriendSearchUserDto) {
  if (user.relationStatus === "friend") return "Уже в друзьях";
  if (user.relationStatus === "request-sent") return "Заявка отправлена";
  if (user.relationStatus === "request-received") return "Принять заявку";

  return "Добавить";
}

export default function FriendsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [friends, setFriends] = useState<FriendUserDto[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<FriendRequestDto[]>(
    []
  );
  const [outgoingRequests, setOutgoingRequests] = useState<FriendRequestDto[]>(
    []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FriendSearchUserDto[]>([]);
  const [inviteTime, setInviteTime] = useState("10+0");
  const [inviteColor, setInviteColor] =
    useState<FriendInviteColor>("random");
  const [isCustomTimeOpen, setIsCustomTimeOpen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(10);
  const [customIncrement, setCustomIncrement] = useState(0);
  const [inviteTarget, setInviteTarget] = useState<FriendUserDto | null>(null);
  const [friendStatuses, setFriendStatuses] = useState<
    Record<string, FriendPresenceStatus>
  >({});

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  const handleRoomReady = useCallback(
    (payload: { playUrl: string }) => {
      navigate(payload.playUrl);
    },
    [navigate]
  );

  const {
    status: inviteStatus,
    error: inviteError,
    isLoading: isInviteLoading,
    inviteFriend,
    registerPresence,
    getFriendStatuses,
  } = useFriendRoom({
    onRoomReady: handleRoomReady,
  });

  const hasRequests = incomingRequests.length > 0 || outgoingRequests.length > 0;

  const friendsCountText = useMemo(() => {
    if (friends.length === 1) return "1 друг";
    if (friends.length > 1 && friends.length < 5) return `${friends.length} друга`;
    return `${friends.length} друзей`;
  }, [friends.length]);

  const customTimeLabel = formatCustomTime(customMinutes, customIncrement);
  const customTimeCategory = getTimeCategoryLabel(customMinutes);
  const isCustomTimeSelected = inviteTime === customTimeLabel;

  async function refreshFriendStatuses(nextFriends = friends) {
    const statuses = await getFriendStatuses(
      nextFriends.map((friend) => friend.id)
    );

    setFriendStatuses(statuses);
  }

  async function loadFriends() {
    if (!isAuthenticated) {
      setFriends([]);
      setIncomingRequests([]);
      setOutgoingRequests([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getFriendsDashboard();

      setFriends(data.friends);
      setIncomingRequests(data.incomingRequests);
      setOutgoingRequests(data.outgoingRequests);
      await refreshFriendStatuses(data.friends);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Не удалось загрузить друзей"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function runSearch(query = searchQuery) {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const data = await searchFriendsUsers(trimmedQuery);

      setSearchResults(data.users);
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Не удалось найти пользователей"
      );
    } finally {
      setIsSearching(false);
    }
  }

  async function runAction(
    actionId: string,
    action: () => Promise<{ message: string }>
  ) {
    setActiveActionId(actionId);
    setActionMessage(null);
    setError(null);

    try {
      const response = await action();

      setActionMessage(response.message);
      await loadFriends();
      await runSearch();
    } catch (actionError) {
      setError(
        actionError instanceof Error ? actionError.message : "Действие не выполнено"
      );
    } finally {
      setActiveActionId(null);
    }
  }

  function openInviteModal(friend: FriendUserDto) {
    setInviteTarget(friend);
    setIsCustomTimeOpen(false);
    setActionMessage(null);
    setError(null);
  }

  function closeInviteModal() {
    if (isInviteLoading) {
      return;
    }

    setInviteTarget(null);
  }

  function handleApplyCustomTime() {
    setInviteTime(customTimeLabel);
    setIsCustomTimeOpen(false);
  }

  function handleConfirmInviteFriend() {
    if (!user || !inviteTarget) {
      setError("Сначала войдите в аккаунт");
      return;
    }

    inviteFriend({
      userId: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      targetUserId: inviteTarget.id,
      time: inviteTime,
      color: inviteColor,
    });

    setInviteTarget(null);
  }


  useEffect(() => {
    loadFriends();
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    registerPresence({
      userId: user.id,
    });
  }, [registerPresence, user?.id]);

  useEffect(() => {
    if (friends.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      refreshFriendStatuses();
    }, 15000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [friends, getFriendStatuses]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      runSearch(searchQuery);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  if (!isAuthenticated) {
    return (
      <section className="page-section auth-page">
        <div className="page-header-block">
          <p className="section-kicker">Друзья</p>
          <h2>Войдите в аккаунт</h2>
          <p className="section-text">
            Список друзей и заявки доступны после входа.
          </p>
        </div>

        <div className="auth-card">
          <Link className="primary-link-btn" to="/login">
            Войти
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="friends-page">
      <div className="friends-hero">
        <div>
          <h2>Друзья</h2>
          <p>
            Добавляй игроков в друзья, принимай заявки и приглашай соперников
            в быстрые партии.
          </p>
        </div>

        <div className="friends-hero-stat">
          <span>Список</span>
          <strong>{isLoading ? "..." : friendsCountText}</strong>
        </div>
      </div>


      {actionMessage ? (
        <p className="friends-message success">{actionMessage}</p>
      ) : null}

      {inviteStatus ? (
        <p className="friends-message success">{inviteStatus}</p>
      ) : null}

      {error || inviteError ? (
        <p className="friends-message error">{error ?? inviteError}</p>
      ) : null}

      <div className="friends-dashboard-layout clean">
        <section className="friends-panel friends-main-panel">
          <div className="friends-panel-head">
            <div>
              <h3>Мои друзья</h3>
              <p>{isLoading ? "Загрузка..." : friendsCountText}</p>
            </div>

            <button
              type="button"
              className="friends-refresh-btn"
              onClick={loadFriends}
              disabled={isLoading}
            >
              Обновить
            </button>
          </div>

          <div className="friends-list friends-list-wide">
            {isLoading ? <p className="friends-empty">Загрузка друзей...</p> : null}

            {!isLoading && friends.length === 0 ? (
              <p className="friends-empty">
                Список друзей пока пуст. Найдите игрока и отправьте заявку.
              </p>
            ) : null}

            {friends.map((friend) => (
              <FriendUserCard
                user={friend}
                key={friend.id}
                status={friendStatuses[friend.id] ?? "offline"}
                action={
                  <>
                    <button
                      type="button"
                      className="friends-mini-btn primary"
                      disabled={isInviteLoading}
                      onClick={() => openInviteModal(friend)}
                    >
                      Играть
                    </button>

                    <button
                      type="button"
                      className="friends-mini-btn secondary"
                      disabled={activeActionId === friend.id}
                      onClick={() =>
                        runAction(friend.id, () => removeFriend(friend.id))
                      }
                    >
                      {activeActionId === friend.id ? "..." : "Удалить"}
                    </button>
                  </>
                }
              />
            ))}
          </div>
        </section>

        <aside className="friends-panel friends-side-panel">
          <section className="friends-side-section">
            <div className="friends-panel-head compact">
              <div>
                <h3>Найти игрока</h3>
                <p>Введи ник или email пользователя</p>
              </div>
            </div>

            <div className="friends-search-box">
              <input
                className="text-input"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Например: saldor"
              />

              <button
                type="button"
                className="friends-search-btn"
                onClick={() => runSearch()}
                disabled={isSearching || searchQuery.trim().length < 2}
              >
                {isSearching ? "Поиск..." : "Найти"}
              </button>
            </div>

            <div className="friends-list friends-search-results">
              {searchQuery.trim().length > 0 && searchQuery.trim().length < 2 ? (
                <p className="friends-empty">Введите минимум 2 символа.</p>
              ) : null}

              {searchQuery.trim().length >= 2 &&
              !isSearching &&
              searchResults.length === 0 ? (
                <p className="friends-empty">Пользователи не найдены.</p>
              ) : null}

              {searchResults.map((searchUser) => (
                <FriendUserCard
                  user={searchUser}
                  key={searchUser.id}
                  meta={`Рейтинг ${searchUser.rating}`}
                  action={
                    <button
                      type="button"
                      className={[
                        "friends-mini-btn",
                        searchUser.relationStatus === "none" ||
                        searchUser.relationStatus === "request-received"
                          ? "primary"
                          : "secondary",
                      ].join(" ")}
                      disabled={
                        activeActionId === searchUser.id ||
                        searchUser.relationStatus === "friend" ||
                        searchUser.relationStatus === "request-sent"
                      }
                      onClick={() =>
                        runAction(searchUser.id, () =>
                          sendFriendRequest(searchUser.id)
                        )
                      }
                    >
                      {activeActionId === searchUser.id
                        ? "..."
                        : getSearchActionLabel(searchUser)}
                    </button>
                  }
                />
              ))}
            </div>
          </section>

          <section className="friends-side-section friends-requests-section">
            <div className="friends-panel-head compact">
              <div>
                <h3>Заявки</h3>
                <p>
                  {hasRequests
                    ? "Входящие и исходящие заявки"
                    : "Новых заявок пока нет"}
                </p>
              </div>
            </div>

            {hasRequests ? (
              <div className="friends-requests-list">
                {incomingRequests.length > 0 ? (
                  <div className="friends-request-group">
                    <h4>Входящие</h4>

                    <div className="friends-list">
                      {incomingRequests.map((request) => (
                        <RequestCard
                          request={request}
                          key={request.id}
                          type="incoming"
                          onAccept={(requestId) =>
                            runAction(requestId, () =>
                              acceptFriendRequest(requestId)
                            )
                          }
                          onDecline={(requestId) =>
                            runAction(requestId, () =>
                              declineFriendRequest(requestId)
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {outgoingRequests.length > 0 ? (
                  <div className="friends-request-group">
                    <h4>Исходящие</h4>

                    <div className="friends-list">
                      {outgoingRequests.map((request) => (
                        <RequestCard
                          request={request}
                          key={request.id}
                          type="outgoing"
                          onCancel={(requestId) =>
                            runAction(requestId, () =>
                              cancelFriendRequest(requestId)
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        </aside>
      </div>

      {inviteTarget ? (
        <div className="play-modal-backdrop" onMouseDown={closeInviteModal}>
          <div
            className="play-modal play-setup-modal friends-play-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="play-modal-close"
              onClick={closeInviteModal}
              aria-label="Закрыть"
            >
              ×
            </button>

            <div className="play-modal-top">
              <h2>Играть с другом</h2>
              <p className="play-modal-subtitle">
                Приглашение для {inviteTarget.username}
              </p>
            </div>

            <div className="play-setup-grid friends-play-modal-grid">
              <section className="play-modal-section play-modal-card-section">
                <div className="play-modal-section-head">
                  <span className="play-modal-label">Контроль времени</span>
                  <span className="play-modal-current">{inviteTime}</span>
                </div>

                <div className="friends-invite-choice-grid modal-style">
                  {FRIEND_INVITE_TIMES.map((time) => (
                    <button
                      type="button"
                      key={time}
                      className={inviteTime === time ? "active" : ""}
                      onClick={() => {
                        setInviteTime(time);
                        setIsCustomTimeOpen(false);
                      }}
                    >
                      {time}
                    </button>
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
                        Выбрать {customTimeLabel}
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
                  {FRIEND_INVITE_COLORS.map((color) => (
                    <button
                      type="button"
                      key={color.value}
                      className={inviteColor === color.value ? "active" : ""}
                      onClick={() => setInviteColor(color.value)}
                    >
                      {color.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <button
              type="button"
              className="play-modal-start"
              onClick={handleConfirmInviteFriend}
              disabled={isInviteLoading}
            >
              {isInviteLoading ? "Отправка..." : "Отправить приглашение"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
