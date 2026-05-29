import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedPersonalData, setAcceptedPersonalData] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!acceptedTerms || !acceptedPrivacy || !acceptedPersonalData) {
      setError(
        "Для регистрации нужно принять соглашение и дать согласие на обработку персональных данных"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const nextMessage = await register({
        email,
        username,
        password,
        confirmPassword,
        acceptedTerms,
        acceptedPrivacy,
        acceptedPersonalData,
      });

      setMessage(nextMessage ?? "Аккаунт создан");
      navigate("/verify-email");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось зарегистрироваться"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page-section auth-page">
      <div className="page-header-block">
        <p className="section-kicker">Аккаунт</p>
        <h2>Регистрация</h2>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span>Email</span>
          <input
            className="text-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="auth-field">
          <span>Ник</span>
          <input
            className="text-input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>

        <label className="auth-field">
          <span>Пароль</span>
          <input
            className="text-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <label className="auth-field">
          <span>Повтор пароля</span>
          <input
            className="text-input"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </label>

        <div
          style={{
            display: "grid",
            gap: 10,
            padding: "14px",
            borderRadius: 16,
            border: "1px solid rgba(148, 163, 184, 0.24)",
            background: "rgba(248, 250, 252, 0.72)",
          }}
        >
          <label
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              gap: 10,
              alignItems: "start",
              fontSize: 13,
              lineHeight: 1.45,
              color: "#334155",
            }}
          >
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              required
            />
            <span>
              Принимаю{" "}
              <Link to="/terms" target="_blank" rel="noreferrer">
                Пользовательское соглашение
              </Link>
            </span>
          </label>

          <label
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              gap: 10,
              alignItems: "start",
              fontSize: 13,
              lineHeight: 1.45,
              color: "#334155",
            }}
          >
            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={(event) => setAcceptedPrivacy(event.target.checked)}
              required
            />
            <span>
              Ознакомлен(а) с{" "}
              <Link to="/privacy" target="_blank" rel="noreferrer">
                Политикой обработки персональных данных
              </Link>
            </span>
          </label>

          <label
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              gap: 10,
              alignItems: "start",
              fontSize: 13,
              lineHeight: 1.45,
              color: "#334155",
            }}
          >
            <input
              type="checkbox"
              checked={acceptedPersonalData}
              onChange={(event) =>
                setAcceptedPersonalData(event.target.checked)
              }
              required
            />
            <span>
              Даю{" "}
              <Link
                to="/personal-data-consent"
                target="_blank"
                rel="noreferrer"
              >
                согласие на обработку персональных данных
              </Link>
            </span>
          </label>
        </div>

        {error ? <p className="error-box">{error}</p> : null}
        {message ? <p className="info-box">{message}</p> : null}

        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {isSubmitting ? "Создание..." : "Зарегистрироваться"}
        </button>
      </form>
    </section>
  );
}
