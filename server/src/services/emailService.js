import { Resend } from "resend";
function getEmailProvider() {
    const provider = (process.env.EMAIL_PROVIDER ?? "console").trim().toLowerCase();
    if (provider === "resend") {
        return "resend";
    }
    return "console";
}
function getMailFrom() {
    return (process.env.MAIL_FROM?.trim() ||
        "Zugzwang.ai <noreply@localhost>");
}
function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
function buildVerificationEmailText({ username, code, expiresInMinutes, }) {
    return [
        `Здравствуйте, ${username}!`,
        "",
        "Ваш код подтверждения для Zugzwang.ai:",
        code,
        "",
        `Код действует ${expiresInMinutes} минут.`,
        "Если вы не регистрировались на Zugzwang.ai, просто проигнорируйте это письмо.",
    ].join("\n");
}
function buildVerificationEmailHtml({ username, code, expiresInMinutes, }) {
    const safeUsername = escapeHtml(username);
    const safeCode = escapeHtml(code);
    return `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <div style="padding:22px 24px;background:#071b45;color:#ffffff;">
          <div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#f8d77f;">Zugzwang.ai</div>
          <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;">Подтверждение email</h1>
        </div>

        <div style="padding:24px;">
          <p style="margin:0 0 14px;font-size:16px;line-height:1.6;">Здравствуйте, <strong>${safeUsername}</strong>!</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#334155;">
            Введите этот код на странице подтверждения почты:
          </p>

          <div style="margin:20px 0;padding:18px 20px;border-radius:16px;background:#f1f5f9;text-align:center;">
            <div style="font-size:34px;letter-spacing:10px;font-weight:800;color:#071b45;">${safeCode}</div>
          </div>

          <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#475569;">
            Код действует <strong>${expiresInMinutes} минут</strong>.
          </p>
          <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
            Если вы не регистрировались на Zugzwang.ai, просто проигнорируйте это письмо.
          </p>
        </div>
      </div>
    </div>
  `;
}
function buildPasswordResetEmailText({ username, code, expiresInMinutes, }) {
    return [
        `Здравствуйте, ${username}!`,
        "",
        "Ваш код восстановления пароля для Zugzwang.ai:",
        code,
        "",
        `Код действует ${expiresInMinutes} минут.`,
        "Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.",
    ].join("\n");
}
function buildPasswordResetEmailHtml({ username, code, expiresInMinutes, }) {
    const safeUsername = escapeHtml(username);
    const safeCode = escapeHtml(code);
    return `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <div style="padding:22px 24px;background:#071b45;color:#ffffff;">
          <div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#f8d77f;">Zugzwang.ai</div>
          <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;">Восстановление пароля</h1>
        </div>

        <div style="padding:24px;">
          <p style="margin:0 0 14px;font-size:16px;line-height:1.6;">Здравствуйте, <strong>${safeUsername}</strong>!</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#334155;">
            Введите этот код на странице восстановления пароля:
          </p>

          <div style="margin:20px 0;padding:18px 20px;border-radius:16px;background:#f1f5f9;text-align:center;">
            <div style="font-size:34px;letter-spacing:10px;font-weight:800;color:#071b45;">${safeCode}</div>
          </div>

          <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#475569;">
            Код действует <strong>${expiresInMinutes} минут</strong>.
          </p>
          <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
            Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.
          </p>
        </div>
      </div>
    </div>
  `;
}
export async function sendVerificationEmail(params) {
    const provider = getEmailProvider();
    if (provider === "console") {
        console.log(`[DEV EMAIL] Код подтверждения для ${params.to}: ${params.code}`);
        return {
            provider: "console",
        };
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not set");
    }
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
        from: getMailFrom(),
        to: params.to,
        subject: "Код подтверждения Zugzwang.ai",
        text: buildVerificationEmailText(params),
        html: buildVerificationEmailHtml(params),
    });
    if (error) {
        throw new Error(typeof error.message === "string"
            ? error.message
            : "Resend failed to send verification email");
    }
    return {
        provider: "resend",
        messageId: data?.id,
    };
}
export async function sendPasswordResetEmail(params) {
    const provider = getEmailProvider();
    if (provider === "console") {
        console.log(`[DEV EMAIL] Код восстановления пароля для ${params.to}: ${params.code}`);
        return {
            provider: "console",
        };
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not set");
    }
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
        from: getMailFrom(),
        to: params.to,
        subject: "Восстановление пароля Zugzwang.ai",
        text: buildPasswordResetEmailText(params),
        html: buildPasswordResetEmailHtml(params),
    });
    if (error) {
        throw new Error(typeof error.message === "string"
            ? error.message
            : "Resend failed to send password reset email");
    }
    return {
        provider: "resend",
        messageId: data?.id,
    };
}
//# sourceMappingURL=emailService.js.map