import type { PublicUser } from "./authApi";
import { AUTH_TOKEN_STORAGE_KEY } from "./authApi";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export type UserProfileResponse = {
  user: PublicUser;
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

export function getApiAssetUrl(url: string | null | undefined) {
  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${API_ORIGIN}${url}`;
}

export async function uploadMyAvatar(file: File) {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await fetch(`${API_BASE_URL}/users/me/avatar`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as UserProfileResponse;
}

export async function deleteMyAvatar() {
  const response = await fetch(`${API_BASE_URL}/users/me/avatar`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as UserProfileResponse;
}

export async function updateMyProfile(payload: { username: string }) {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as UserProfileResponse;
}