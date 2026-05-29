import { AUTH_TOKEN_STORAGE_KEY } from "./authApi";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export type FriendUserDto = {
  id: string;
  username: string;
  avatarUrl: string | null;
  rating: number;
};

export type FriendRelationStatus =
  | "none"
  | "friend"
  | "request-sent"
  | "request-received";

export type FriendSearchUserDto = FriendUserDto & {
  relationStatus: FriendRelationStatus;
};

export type FriendRequestDto = {
  id: string;
  createdAt: string;
  user: FriendUserDto;
};

export type FriendsDashboardResponse = {
  friends: FriendUserDto[];
  incomingRequests: FriendRequestDto[];
  outgoingRequests: FriendRequestDto[];
};

export type FriendSearchResponse = {
  users: FriendSearchUserDto[];
};

export type FriendActionResponse = {
  message: string;
};

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

function getAuthToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

async function requestJson<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as T;
}

export function getFriendsDashboard() {
  return requestJson<FriendsDashboardResponse>("/friends");
}

export function searchFriendsUsers(query: string) {
  const params = new URLSearchParams();

  params.set("q", query);

  return requestJson<FriendSearchResponse>(`/friends/search?${params.toString()}`);
}

export function sendFriendRequest(userId: string) {
  return requestJson<FriendActionResponse>("/friends/requests", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export function acceptFriendRequest(requestId: string) {
  return requestJson<FriendActionResponse>(
    `/friends/requests/${encodeURIComponent(requestId)}/accept`,
    {
      method: "POST",
    }
  );
}

export function declineFriendRequest(requestId: string) {
  return requestJson<FriendActionResponse>(
    `/friends/requests/${encodeURIComponent(requestId)}/decline`,
    {
      method: "POST",
    }
  );
}

export function cancelFriendRequest(requestId: string) {
  return requestJson<FriendActionResponse>(
    `/friends/requests/${encodeURIComponent(requestId)}`,
    {
      method: "DELETE",
    }
  );
}

export function removeFriend(friendId: string) {
  return requestJson<FriendActionResponse>(
    `/friends/${encodeURIComponent(friendId)}`,
    {
      method: "DELETE",
    }
  );
}
