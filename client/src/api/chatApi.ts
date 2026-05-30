import { AUTH_TOKEN_STORAGE_KEY } from "./authApi";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export type ChatFriendDto = {
  id: string;
  username: string;
  avatarUrl: string | null;
  rating: number;
};

export type FriendChatMessageDto = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
};

export type FriendChatConversationDto = {
  friend: ChatFriendDto;
  lastMessage: FriendChatMessageDto | null;
  unreadCount: number;
};

type ConversationsResponse = {
  conversations: FriendChatConversationDto[];
  unreadCount: number;
};

type MessagesResponse = {
  messages: FriendChatMessageDto[];
};

type SendMessageResponse = {
  message: FriendChatMessageDto;
};

function getAuthToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

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

async function requestJson<T>(path: string, options: RequestInit = {}) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as T;
}

export function getChatConversations() {
  return requestJson<ConversationsResponse>("/chat/conversations");
}

export function getChatMessages(friendId: string) {
  return requestJson<MessagesResponse>(
    `/chat/messages/${encodeURIComponent(friendId)}`
  );
}

export function sendChatMessage(friendId: string, content: string) {
  return requestJson<SendMessageResponse>(
    `/chat/messages/${encodeURIComponent(friendId)}`,
    {
      method: "POST",
      body: JSON.stringify({
        content,
      }),
    }
  );
}

export function markChatMessagesAsRead(friendId: string) {
  return requestJson<{ updatedCount: number }>(
    `/chat/messages/${encodeURIComponent(friendId)}/read`,
    {
      method: "POST",
    }
  );
}
