import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../api/authApi";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await requestPasswordReset({
        email,
      });

      setMessage(response.message);
      navigate(`/reset-password?email=${encodeURIComponent(email.trim())}&sent=1`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось отправить код"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page-section auth-page">
      <div className="page-header-block">
        <p className="section-kicker">Аккаунт</p>
        <h2>Восстановление пароля</h2>
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

        {error ? <p className="error-box">{error}</p> : null}
        {message ? <p className="info-box">{message}</p> : null}

        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Отправить код"}
        </button>

        <p className="auth-note">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </form>
    </section>
  );
}
