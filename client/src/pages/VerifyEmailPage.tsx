import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, verifyEmailCode, resendEmailCode } = useAuth();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendCooldown((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const responseMessage = await verifyEmailCode(code);
      setMessage(responseMessage || "Email подтверждён");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось подтвердить email");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendCode() {
    if (isSubmitting || resendCooldown > 0 || user?.emailVerified) {
      return;
    }

    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      await resendEmailCode();
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить код повторно");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isVerified = Boolean(user?.emailVerified);

  return (
    <section className="page-section auth-page">
      <div className="page-header-block">
        <p className="section-kicker">Аккаунт</p>
        <h2>Подтверждение почты</h2>
        <p className="section-text">
          Введите 6-значный код, который был отправлен на вашу почту.
        </p>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span>Email</span>
          <input
            className="text-input"
            type="email"
            value={user?.email ?? ""}
            disabled
            readOnly
          />
        </label>

        {!isVerified ? (
          <label className="auth-field">
            <span>Код подтверждения</span>
            <input
              className="text-input"
              inputMode="numeric"
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="123456"
              required
            />
          </label>
        ) : null}

        {error ? <p className="error-box">{error}</p> : null}
        {message ? <p className="info-box">{message}</p> : null}

        {isVerified ? (
          <Link to="/" className="primary-btn">
            На главную
          </Link>
        ) : (
          <>
            <button type="submit" className="primary-btn" disabled={isSubmitting}>
              {isSubmitting ? "Проверка..." : "Подтвердить"}
            </button>

            <button
              type="button"
              className="secondary-btn"
              disabled={isSubmitting || resendCooldown > 0}
              onClick={handleResendCode}
            >
              {resendCooldown > 0
                ? `Отправить код заново через ${resendCooldown} сек.`
                : "Отправить код заново"}
            </button>
          </>
        )}
      </form>
    </section>
  );
}
