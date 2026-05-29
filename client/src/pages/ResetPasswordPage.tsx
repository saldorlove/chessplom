import { useEffect, useMemo, useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  requestPasswordReset,
  resetPassword,
  verifyPasswordResetCode,
} from "../api/authApi";

const RESEND_COOLDOWN_SECONDS = 60;

type ResetStep = "code" | "password";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialEmail = useMemo(
    () => (searchParams.get("email") ?? "").trim(),
    [searchParams]
  );
  const wasCodeSent = searchParams.get("sent") === "1";

  const [email] = useState(initialEmail);
  const [step, setStep] = useState<ResetStep>("code");

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(
    wasCodeSent ? RESEND_COOLDOWN_SECONDS : 0
  );

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendCooldown((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  async function handleVerifyCode(event: SyntheticEvent) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(code.trim())) {
      setError("Введи 6-значный код восстановления");
      return;
    }

    setIsSubmitting(true);

    try {
      await verifyPasswordResetCode({
        email,
        code,
      });

      setStep("password");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось проверить код");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResetPassword(event: SyntheticEvent) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetPassword({
        email,
        code,
        password,
        confirmPassword,
      });

      setMessage(response.message);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось обновить пароль"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendCode() {
    if (resendCooldown > 0 || isSubmitting || step !== "code") {
      return;
    }

    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      await requestPasswordReset({
        email,
      });

      setResendCooldown(RESEND_COOLDOWN_SECONDS);
      setCode("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось отправить код повторно"
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

      <form
        className="auth-card"
        onSubmit={step === "code" ? handleVerifyCode : handleResetPassword}
      >
        <label className="auth-field">
          <span>Email</span>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              className="text-input"
              type="email"
              value={email}
              readOnly
              disabled
              style={{ paddingRight: 116, width: "100%" }}
            />

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              style={{
                position: "absolute",
                right: 8,
                height: 38,
                padding: "0 16px",
                border: "1px solid rgba(15, 23, 42, 0.12)",
                borderRadius: 14,
                background: "#ffffff",
                color: "#071b45",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
              }}
            >
              Изменить
            </button>
          </div>
        </label>

        <label className="auth-field">
          <span>Код восстановления</span>
          <input
            className="text-input"
            inputMode="numeric"
            value={code}
            onChange={(event) =>
              setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            required
            disabled={step === "password"}
          />
        </label>

        {step === "password" ? (
          <>
            <label className="auth-field">
              <span>Новый пароль</span>
              <input
                className="text-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <label className="auth-field">
              <span>Повтор нового пароля</span>
              <input
                className="text-input"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>
          </>
        ) : null}

        {error ? <p className="error-box">{error}</p> : null}
        {message ? <p className="info-box">{message}</p> : null}

        {step === "code" ? (
          <>
            <button type="submit" className="primary-btn" disabled={isSubmitting}>
              {isSubmitting ? "Проверка..." : "Далее"}
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
        ) : (
          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Сохранение..." : "Сменить пароль"}
          </button>
        )}

        <p className="auth-note">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </form>
    </section>
  );
}
