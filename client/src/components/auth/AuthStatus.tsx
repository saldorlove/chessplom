import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { getApiAssetUrl } from "../../api/usersApi";

export default function AuthStatus() {
  const navigate = useNavigate();
  const { user, isAuthLoading, isAuthenticated, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleDocumentMouseDown(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!menuRef.current?.contains(target)) {
        setIsOpen(false);
      }
    }

    function handleDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [isOpen]);

  function handleLogout() {
    setIsOpen(false);
    logout();
    navigate("/");
  }

  if (isAuthLoading) {
    return (
      <div className="auth-status">
        <span className="auth-status-muted">Проверка...</span>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="auth-status">
        <Link className="secondary-link-btn auth-status-link" to="/login">
          Войти
        </Link>

        <Link className="primary-link-btn auth-status-link" to="/register">
          Регистрация
        </Link>
      </div>
    );
  }

  const avatarLetter = user.username.slice(0, 1).toUpperCase();
  const avatarSrc = getApiAssetUrl(user.avatarUrl);

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="user-menu-avatar">
          {avatarSrc ? (
            <img src={avatarSrc} alt={user.username} />
          ) : (
            avatarLetter
          )}
        </span>

        <span className="user-menu-name">{user.username}</span>
        <span className="user-menu-caret">▾</span>
      </button>

      {isOpen ? (
        <div className="user-menu-dropdown">
          <div className="user-menu-dropdown-head">
            <span>В аккаунте</span>
            <strong>{user.username}</strong>
          </div>

          <Link
            className="user-menu-item"
            to="/profile"
            onClick={() => setIsOpen(false)}
          >
            Профиль
          </Link>

          <Link
            className="user-menu-item"
            to="/history"
            onClick={() => setIsOpen(false)}
          >
            История
          </Link>

          <Link
            className="user-menu-item"
            to="/settings"
            onClick={() => setIsOpen(false)}
          >
            Настройки
          </Link>

          <button
            type="button"
            className="user-menu-item user-menu-button"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      ) : null}
    </div>
  );
}