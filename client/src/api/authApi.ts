export type PublicUser = {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  emailVerified: boolean;
  createdAt: string;
  rating?: number | null;
};

export type AuthResponse = {
  token: string;
  user: PublicUser;
  message?: string;
};

export type MeResponse = {
  user: PublicUser;
};

export type VerifyEmailResponse = {
  user: PublicUser;
  message: string;
};

export type PasswordResetRequestResponse = {
  message: string;
};

export type RequestPasswordResetPayload = {
  email: string;
};

export type VerifyPasswordResetCodePayload = {
  email: string;
  code: string;
};

export type ResetPasswordPayload = {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
};

export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  acceptedPersonalData: boolean;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export const AUTH_TOKEN_STORAGE_KEY = "zugzwang_auth_token";
export const AUTH_USER_STORAGE_KEY = "zugzwang_auth_user";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
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

async function requestJson<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new ApiError(await parseApiError(response), response.status);
  }

  return (await response.json()) as T;
}

function getAuthHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function registerUser(payload: RegisterPayload) {
  return requestJson<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: LoginPayload) {
  return requestJson<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getCurrentUser(token: string) {
  return requestJson<MeResponse>("/auth/me", {
    method: "GET",
    headers: getAuthHeader(token),
  });
}

export function verifyEmail(token: string, code: string) {
  return requestJson<VerifyEmailResponse>("/auth/verify-email", {
    method: "POST",
    headers: getAuthHeader(token),
    body: JSON.stringify({ code }),
  });
}

export function resendVerificationCode(token: string) {
  return requestJson<VerifyEmailResponse>("/auth/resend-verification", {
    method: "POST",
    headers: getAuthHeader(token),
  });
}

export function requestPasswordReset(payload: RequestPasswordResetPayload) {
  return requestJson<PasswordResetRequestResponse>("/auth/request-password-reset", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function resetPassword(payload: ResetPasswordPayload) {
  return requestJson<PasswordResetRequestResponse>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function verifyPasswordResetCode(payload: VerifyPasswordResetCodePayload) {
  return requestJson<PasswordResetRequestResponse>(
    "/auth/verify-password-reset-code",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}
