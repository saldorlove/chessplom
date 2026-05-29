import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import { updateMyProfile } from "../api/usersApi";
import {
  isSoundEnabled,
  setSoundEnabled as saveSoundEnabled,
  subscribeToSoundSettings,
  playTestSound,
} from "../services/soundService";

import {
  BOARD_THEMES,
  getActiveBoardTheme,
  setActiveBoardTheme,
  type BoardTheme,
} from "../utils/chessBoardTheme";

import {
  getActivePieceTheme,
  PIECE_THEMES,
  setActivePieceTheme,
  type PieceTheme,
} from "../utils/chessPieceAssets";

const BOARD_PREVIEW_CELLS = Array.from({ length: 16 }, (_, index) => index);

export default function SettingsPage() {
  const { user, updateCurrentUser } = useAuth();

  const [pieceTheme, setPieceTheme] = useState<PieceTheme>(() =>
    getActivePieceTheme()
  );

  const [boardTheme, setBoardTheme] = useState<BoardTheme>(() =>
    getActiveBoardTheme()
  );

  const [soundEnabled, setSoundEnabledState] = useState(() =>
    isSoundEnabled()
  );

  const [usernameDraft, setUsernameDraft] = useState(user?.username ?? "");
  const [usernameStatus, setUsernameStatus] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [isUsernameSaving, setIsUsernameSaving] = useState(false);

  useEffect(() => {
    setUsernameDraft(user?.username ?? "");
  }, [user?.username]);

  useEffect(() => {
    const unsubscribe = subscribeToSoundSettings(setSoundEnabledState);

    return () => {
      unsubscribe();
    };
  }, []);

  function handleSoundToggle() {
    const nextSoundEnabled = !soundEnabled;

    setSoundEnabledState(nextSoundEnabled);
    saveSoundEnabled(nextSoundEnabled);

    if (nextSoundEnabled) {
      playTestSound();
    }
  }

  function handlePieceThemeChange(theme: PieceTheme) {
    setPieceTheme(theme);
    setActivePieceTheme(theme);
  }

  function handleBoardThemeChange(theme: BoardTheme) {
    setBoardTheme(theme);
    setActiveBoardTheme(theme);
  }

  async function handleUsernameSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user || isUsernameSaving) {
      return;
    }

    const nextUsername = usernameDraft.trim();

    setUsernameStatus(null);
    setUsernameError(null);

    if (!nextUsername) {
      setUsernameError("Введи новый ник");
      return;
    }

    if (nextUsername === user.username) {
      setUsernameStatus("Ник не изменился");
      return;
    }

    setIsUsernameSaving(true);

    try {
      const response = await updateMyProfile({
        username: nextUsername,
      });

      updateCurrentUser(response.user);
      setUsernameStatus(response.message || "Ник обновлён");
    } catch (error) {
      setUsernameError(
        error instanceof Error ? error.message : "Не удалось обновить ник"
      );
    } finally {
      setIsUsernameSaving(false);
    }
  }

  return (
    <section className="settings-page">
      <div className="page-header-block">
        <p className="section-kicker">Настройки</p>
        <h2>Оформление</h2>
      </div>

      <section className="settings-card settings-account-card">
        <div className="settings-card-head">
          <div>
            <p className="settings-kicker">Аккаунт</p>
            <h3>Ник</h3>
          </div>
        </div>

        {user ? (
          <form className="settings-username-form" onSubmit={handleUsernameSubmit}>
            <label className="settings-username-field">
              <span>Сменить никнейм</span>

              <input
                className="text-input"
                value={usernameDraft}
                onChange={(event) => {
                  setUsernameDraft(event.target.value);
                  setUsernameStatus(null);
                  setUsernameError(null);
                }}
                maxLength={24}
                placeholder="Введите ник"
              />
            </label>

            <button
              type="submit"
              className="settings-save-btn"
              disabled={isUsernameSaving}
            >
              {isUsernameSaving ? "Сохранение..." : "Сохранить"}
            </button>

            {usernameStatus ? (
              <p className="settings-username-message success">
                {usernameStatus}
              </p>
            ) : null}

            {usernameError ? (
              <p className="settings-username-message error">
                {usernameError}
              </p>
            ) : null}
          </form>
        ) : (
          <div className="settings-login-box">
            <p>Для изменения ника нужно войти в аккаунт.</p>
            <Link to="/login" className="primary-link-btn">
              Войти
            </Link>
          </div>
        )}
      </section>

      <section className="settings-card settings-sound-card">
        <div className="settings-card-head">
          <div>
            <p className="settings-kicker">Интерфейс</p>
            <h3>Звуки</h3>
            <p>Звуковые эффекты ходов, шаха, завершения партии и задач.</p>
          </div>
        </div>

        <div className="settings-sound-row">
          <div>
            <strong>{soundEnabled ? "Включены" : "Выключены"}</strong>
            <span>
              {soundEnabled
                ? "Ходы и важные события будут сопровождаться звуком."
                : "Приложение не будет проигрывать звуковые эффекты."}
            </span>
          </div>

          <button
            type="button"
            className={["settings-sound-toggle", soundEnabled ? "active" : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={handleSoundToggle}
            aria-pressed={soundEnabled}
          >
            <span className="settings-sound-toggle-thumb" />
          </button>
        </div>
      </section>

      <section className="settings-card settings-piece-card">
        <div className="settings-card-head">
          <div>
            <p className="settings-kicker">Внешний вид</p>
            <h3>Фигуры</h3>
          </div>
        </div>

        <div className="settings-piece-grid">
          {PIECE_THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className={[
                "settings-piece-option",
                pieceTheme === theme.id ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handlePieceThemeChange(theme.id)}
            >
              <span className="settings-piece-preview">
                <img
                  src={`/assets/pieces/${theme.id}/wK.svg`}
                  alt=""
                  draggable={false}
                />

                <img
                  src={`/assets/pieces/${theme.id}/bQ.svg`}
                  alt=""
                  draggable={false}
                />

                <img
                  src={`/assets/pieces/${theme.id}/wN.svg`}
                  alt=""
                  draggable={false}
                />
              </span>

              <strong>{theme.label}</strong>
              <small>{theme.description}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="settings-card settings-piece-card">
        <div className="settings-card-head">
          <div>
            <p className="settings-kicker">Доска</p>
            <h3>Темы доски</h3>
          </div>
        </div>

        <div className="settings-board-grid">
          {BOARD_THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className={[
                "settings-board-option",
                boardTheme === theme.id ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleBoardThemeChange(theme.id)}
            >
              <span
                className={[
                  "settings-board-preview",
                  `board-theme-${theme.id}`,
                ].join(" ")}
              >
                {BOARD_PREVIEW_CELLS.map((cell) => (
                  <span
                    key={cell}
                    className={
                      (Math.floor(cell / 4) + cell) % 2 === 0
                        ? "light"
                        : "dark"
                    }
                  />
                ))}
              </span>

              <strong>{theme.label}</strong>
              <small>{theme.description}</small>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}