import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import {
  getChatConversations,
  getChatMessages,
  markChatMessagesAsRead,
  sendChatMessage,
  type FriendChatConversationDto,
  type FriendChatMessageDto,
} from "../../api/chatApi";
import { getApiAssetUrl } from "../../api/usersApi";
import { ensureFriendSocketConnected } from "../../realtime/socketClient";

import "../../styles/friendsChatWidget.css"

type FriendPresenceStatus = "offline" | "online" | "in-game";

const CONVERSATIONS_REFRESH_MS = 4000;
const MESSAGES_REFRESH_MS = 2500;
const STATUSES_REFRESH_MS = 15000;

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getStatusLabel(status: FriendPresenceStatus) {
  if (status === "online") return "В сети";
  if (status === "in-game") return "В игре";

  return "Не в сети";
}

function getInitialLetter(username: string) {
  return username.trim().slice(0, 1).toUpperCase() || "?";
}

export default function FriendsChatWidget() {
  const { user, isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [activeFriendId, setActiveFriendId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<
    FriendChatConversationDto[]
  >([]);
  const [messages, setMessages] = useState<FriendChatMessageDto[]>([]);
  const [statuses, setStatuses] = useState<Record<string, FriendPresenceStatus>>(
    {}
  );
  const [draft, setDraft] = useState("");
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.friend.id === activeFriendId
      ) ?? null,
    [activeFriendId, conversations]
  );

  const unreadCount = useMemo(
    () =>
      conversations.reduce(
        (total, conversation) => total + conversation.unreadCount,
        0
      ),
    [conversations]
  );

  const refreshConversations = useCallback(async () => {
    if (!isAuthenticated) {
      setConversations([]);
      return;
    }

    setIsLoadingConversations(true);

    try {
      const response = await getChatConversations();
      setConversations(response.conversations);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Не удалось загрузить чаты"
      );
    } finally {
      setIsLoadingConversations(false);
    }
  }, [isAuthenticated]);

  const refreshMessages = useCallback(
    async (friendId: string, markAsRead = false) => {
      setIsLoadingMessages(true);

      try {
        const response = await getChatMessages(friendId);
        setMessages(response.messages);

        if (markAsRead) {
          await markChatMessagesAsRead(friendId);
          await refreshConversations();
        }
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Не удалось загрузить сообщения"
        );
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [refreshConversations]
  );

  const refreshStatuses = useCallback(
    async (nextConversations = conversations) => {
      if (!user?.id || nextConversations.length === 0) {
        setStatuses({});
        return;
      }

      const socket = ensureFriendSocketConnected();

      socket.emit("friend-presence:register", {
        userId: user.id,
      });

      socket.emit(
        "friend-presence:get",
        {
          userIds: nextConversations.map(
            (conversation) => conversation.friend.id
          ),
        },
        (response: {
          ok: boolean;
          statuses?: Record<string, FriendPresenceStatus>;
        }) => {
          if (response?.ok && response.statuses) {
            setStatuses(response.statuses);
          }
        }
      );
    },
    [conversations, user?.id]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setConversations([]);
      setMessages([]);
      setActiveFriendId(null);
      setIsOpen(false);
      return;
    }

    void refreshConversations();

    const intervalId = window.setInterval(() => {
      void refreshConversations();
    }, CONVERSATIONS_REFRESH_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isAuthenticated, refreshConversations]);

  useEffect(() => {
    void refreshStatuses();

    const intervalId = window.setInterval(() => {
      void refreshStatuses();
    }, STATUSES_REFRESH_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refreshStatuses]);

  useEffect(() => {
    if (!activeFriendId || !isOpen) {
      return;
    }

    void refreshMessages(activeFriendId, true);

    const intervalId = window.setInterval(() => {
      void refreshMessages(activeFriendId, true);
    }, MESSAGES_REFRESH_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeFriendId, isOpen, refreshMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activeFriendId || !draft.trim() || isSending) {
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const response = await sendChatMessage(activeFriendId, draft);
      setDraft("");
      setMessages((currentMessages) => {
        if (
          currentMessages.some((message) => message.id === response.message.id)
        ) {
          return currentMessages;
        }

        return [...currentMessages, response.message];
      });
      await refreshConversations();
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Не удалось отправить сообщение"
      );
    } finally {
      setIsSending(false);
    }
  }

  function openConversation(friendId: string) {
    setActiveFriendId(friendId);
    setError(null);
  }

  function closeWidget() {
    setIsOpen(false);
    setActiveFriendId(null);
    setMessages([]);
    setDraft("");
    setError(null);
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div
      className={["friends-chat-widget", isOpen ? "is-open" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {isOpen ? (
        <section className="friends-chat-panel" aria-label="Чат с друзьями">
          <header className="friends-chat-header">
            {activeConversation ? (
              <button
                type="button"
                className="friends-chat-back"
                onClick={() => {
                  setActiveFriendId(null);
                  setMessages([]);
                  setError(null);
                }}
                aria-label="Вернуться к списку друзей"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15 6l-6 6 6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                  />
                </svg>
              </button>
            ) : null}

            <div className="friends-chat-header-main">
              <strong>
                {activeConversation
                  ? activeConversation.friend.username
                  : "Чаты"}
              </strong>

              <span>
                {activeConversation
                  ? getStatusLabel(
                      statuses[activeConversation.friend.id] ?? "offline"
                    )
                  : unreadCount > 0
                    ? "Есть новые сообщения"
                    : "Друзья и сообщения"}
              </span>
            </div>

            <button
              type="button"
              className="friends-chat-close"
              onClick={closeWidget}
              aria-label="Закрыть чат"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M7 7l10 10M17 7L7 17"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.4"
                />
              </svg>
            </button>
          </header>

          {error ? <p className="friends-chat-error">{error}</p> : null}

          {activeConversation ? (
            <>
              <div className="friends-chat-messages">
                {isLoadingMessages && messages.length === 0 ? (
                  <p className="friends-chat-empty">Загрузка сообщений...</p>
                ) : null}

                {!isLoadingMessages && messages.length === 0 ? (
                  <p className="friends-chat-empty">
                    Напишите первое сообщение.
                  </p>
                ) : null}

                {messages.map((message) => {
                  const isOwnMessage = message.senderId === user.id;

                  return (
                    <article
                      key={message.id}
                      className={[
                        "friends-chat-message",
                        isOwnMessage ? "own" : "incoming",
                      ].join(" ")}
                    >
                      <p>{message.content}</p>
                      <time>{formatTime(message.createdAt)}</time>
                    </article>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              <form className="friends-chat-compose" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={draft}
                  maxLength={1000}
                  placeholder="Написать сообщение..."
                  onChange={(event) => setDraft(event.target.value)}
                />

                <button
                  type="submit"
                  disabled={isSending || !draft.trim()}
                  aria-label="Отправить сообщение"
                >
                  ➤
                </button>
              </form>
            </>
          ) : (
            <div className="friends-chat-conversations">
              {isLoadingConversations && conversations.length === 0 ? (
                <p className="friends-chat-empty">Загрузка друзей...</p>
              ) : null}

              {!isLoadingConversations && conversations.length === 0 ? (
                <div className="friends-chat-empty-card">
                  <p>Список друзей пока пуст.</p>
                  <Link to="/friends" onClick={closeWidget}>
                    Найти друзей
                  </Link>
                </div>
              ) : null}

              {conversations.map((conversation) => {
                const friend = conversation.friend;
                const avatarUrl = getApiAssetUrl(friend.avatarUrl);
                const status = statuses[friend.id] ?? "offline";

                return (
                  <button
                    type="button"
                    className="friends-chat-conversation"
                    key={friend.id}
                    onClick={() => openConversation(friend.id)}
                  >
                    <span className="friends-chat-avatar">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={friend.username} />
                      ) : (
                        getInitialLetter(friend.username)
                      )}
                    </span>

                    <span className="friends-chat-conversation-main">
                      <strong>{friend.username}</strong>
                      <small className={`friends-chat-status ${status}`}>
                        {getStatusLabel(status)}
                      </small>
                    </span>

                    {conversation.unreadCount > 0 ? (
                      <span
                        className="friends-chat-unread"
                        aria-label="Есть непрочитанные сообщения"
                        title="Есть непрочитанные сообщения"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}
        </section>
      ) : null}

      <button
        type="button"
        className={[
          "friends-chat-toggle",
          unreadCount > 0 && !isOpen ? "has-unread" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-label={isOpen ? "Свернуть чат с друзьями" : "Открыть чат с друзьями"}
      >
        <svg
          className="friends-chat-toggle-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M5.75 5.75h12.5a2.5 2.5 0 0 1 2.5 2.5v6.25a2.5 2.5 0 0 1-2.5 2.5h-7.1l-4.42 3.1a.75.75 0 0 1-1.18-.61V17h-.8a2.5 2.5 0 0 1-2.5-2.5V8.25a2.5 2.5 0 0 1 2.5-2.5Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <circle cx="8" cy="11.5" r="1" fill="currentColor" />
          <circle cx="12" cy="11.5" r="1" fill="currentColor" />
          <circle cx="16" cy="11.5" r="1" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
