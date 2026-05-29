import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { ensureFriendSocketConnected } from "../realtime/socketClient";

import {
  ApiError,
  AUTH_TOKEN_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
  getCurrentUser,
  loginUser,
  registerUser,
  resendVerificationCode,
  verifyEmail,
  type LoginPayload,
  type PublicUser,
  type RegisterPayload,
} from "../api/authApi";

type AuthContextValue = {
  user: PublicUser | null;
  token: string | null;
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  register: (payload: RegisterPayload) => Promise<string | undefined>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  verifyEmailCode: (code: string) => Promise<string>;
  resendEmailCode: () => Promise<string>;
  updateCurrentUser: (nextUser: PublicUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function readStoredToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function readStoredUser() {
  try {
    const rawValue = localStorage.getItem(AUTH_USER_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as PublicUser;
  } catch {
    return null;
  }
}

function storeUser(nextUser: PublicUser | null) {
  try {
    if (!nextUser) {
      localStorage.removeItem(AUTH_USER_STORAGE_KEY);
      return;
    }

    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(nextUser));
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => readStoredToken());
  const [user, setUser] = useState<PublicUser | null>(() => readStoredUser());
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(token));

  function saveToken(nextToken: string) {
    setToken(nextToken);

    try {
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, nextToken);
    } catch {
      /* ignore */
    }
  }

  function saveUser(nextUser: PublicUser) {
    setUser(nextUser);
    storeUser(nextUser);
  }

  function clearToken() {
    setToken(null);
    setUser(null);
    storeUser(null);

    try {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  function updateCurrentUser(nextUser: PublicUser) {
    saveUser(nextUser);
  }

  useEffect(() => {
    const socket = ensureFriendSocketConnected();

    function registerPresence() {
      socket.emit("friend-presence:register", {
        userId: user?.id ?? null,
      });
    }

    registerPresence();
    socket.on("connect", registerPresence);

    return () => {
      socket.off("connect", registerPresence);
      socket.emit("friend-presence:register", {
        userId: null,
      });
    };
  }, [user?.id]);

  useEffect(() => {
    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    let cancelled = false;

    setIsAuthLoading(true);

    getCurrentUser(token)
      .then((response) => {
        if (cancelled) return;
        saveUser(response.user);
      })
      .catch((error) => {
        if (cancelled) return;

        // Выходим из аккаунта только если сервер точно сказал,
        // что токен недействителен. При обычном сетевом сбое
        // оставляем локального пользователя и токен.
        if (error instanceof ApiError && error.status === 401) {
          clearToken();
        }
      })
      .finally(() => {
        if (cancelled) return;
        setIsAuthLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function register(payload: RegisterPayload) {
    const response = await registerUser(payload);

    saveToken(response.token);
    saveUser(response.user);

    return response.message;
  }

  async function login(payload: LoginPayload) {
    const response = await loginUser(payload);

    saveToken(response.token);
    saveUser(response.user);
  }

  function logout() {
    clearToken();
  }

  async function verifyEmailCode(code: string) {
    if (!token) {
      throw new Error("Сначала войди в аккаунт");
    }

    const response = await verifyEmail(token, code);

    saveUser(response.user);

    return response.message;
  }

  async function resendEmailCode() {
    if (!token) {
      throw new Error("Сначала войди в аккаунт");
    }

    const response = await resendVerificationCode(token);

    saveUser(response.user);

    return response.message;
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthLoading,
      isAuthenticated: Boolean(user && token),
      register,
      login,
      logout,
      verifyEmailCode,
      resendEmailCode,
      updateCurrentUser,
    }),
    [user, token, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }

  return value;
}
