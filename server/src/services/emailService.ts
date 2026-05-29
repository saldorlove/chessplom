import { Resend } from "resend";
import { createTransport } from "nodemailer";

type EmailProvider = "console" | "resend" | "smtp";

type SendVerificationEmailParams = {
  to: string;
  username: string;
  code: string;
  expiresInMinutes: number;
};

type SendPasswordResetEmailParams = {
  to: string;
  username: string;
  code: string;
  expiresInMinutes: number;
};

type SendEmailResult = {
  provider: EmailProvider;
  messageId?: string;
};

type SendEmailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

function getEmailProvider(): EmailProvider {
  const provider = (process.env.EMAIL_PROVIDER ?? "console").trim().toLowerCase();

  if (provider === "resend") {
    return "resend";
  }

  if (provider === "smtp" || provider === "brevo") {
    return "smtp";
  }

  return "console";
}

function getMailFrom() {
  return process.env.MAIL_FROM?.trim() || "Zugzwang AI <noreply@localhost>";
}

function getSmtpSecure(port: number) {
  const raw = process.env.SMTP_SECURE?.trim().toLowerCase();

  if (raw === "true" || raw === "1" || raw === "yes") {
    return true;
  }

  if (raw === "false" || raw === "0" || raw === "no") {
    return false;
  }

  return port === 465;
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildVerificationEmailText({
  username,
  code,
  expiresInMinutes,
}: SendVerificationEmailParams) {
  return [
    `Здравствуйте, ${username}!`,
    "",
    "Ваш код подтверждения для Zugzwang AI:",
    code,
    "",
    `Код действует ${expiresInMinutes} минут.`,
    "Если вы не регистрировались на Zugzwang AI, просто проигнорируйте это письмо.",
  ].join("\n");
}

function buildVerificationEmailHtml({
  username,
  code,
  expiresInMinutes,
}: SendVerificationEmailParams) {
  const safeUsername = escapeHtml(username);
  const safeCode = escapeHtml(code);

  return `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <div style="padding:22px 24px;background:#071b45;color:#ffffff;">
          <div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#f8d77f;">Zugzwang AI</div>
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
            Если вы не регистрировались на Zugzwang AI, просто проигнорируйте это письмо.
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildPasswordResetEmailText({
  username,
  code,
  expiresInMinutes,
}: SendPasswordResetEmailParams) {
  return [
    `Здравствуйте, ${username}!`,
    "",
    "Ваш код восстановления пароля для Zugzwang AI:",
    code,
    "",
    `Код действует ${expiresInMinutes} минут.`,
    "Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.",
  ].join("\n");
}

function buildPasswordResetEmailHtml({
  username,
  code,
  expiresInMinutes,
}: SendPasswordResetEmailParams) {
  const safeUsername = escapeHtml(username);
  const safeCode = escapeHtml(code);

  return `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <div style="padding:22px 24px;background:#071b45;color:#ffffff;">
          <div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#f8d77f;">Zugzwang AI</div>
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

async function sendConsoleEmail(message: SendEmailMessage): Promise<SendEmailResult> {
  console.log(`[DEV EMAIL] ${message.subject} для ${message.to}`);
  console.log(message.text);

  return {
    provider: "console",
  };
}

async function sendResendEmail(message: SendEmailMessage): Promise<SendEmailResult> {
  const apiKey = getRequiredEnv("RESEND_API_KEY");
  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: getMailFrom(),
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });

  if (error) {
    throw new Error(
      typeof error.message === "string"
        ? error.message
        : "Resend failed to send email"
    );
  }

  return {
    provider: "resend",
    messageId: data?.id,
  };
}

async function sendSmtpEmail(message: SendEmailMessage): Promise<SendEmailResult> {
  const host = getRequiredEnv("SMTP_HOST");
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASSWORD");
  const port = Number(process.env.SMTP_PORT ?? 587);

  if (!Number.isFinite(port)) {
    throw new Error("SMTP_PORT is invalid");
  }

  const transporter = createTransport({
    host,
    port,
    secure: getSmtpSecure(port),
    auth: {
      user,
      pass,
    },
  });

  const info = await transporter.sendMail({
    from: getMailFrom(),
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });

  return {
    provider: "smtp",
    messageId: info.messageId,
  };
}

async function sendEmail(message: SendEmailMessage): Promise<SendEmailResult> {
  const provider = getEmailProvider();

  if (provider === "console") {
    return sendConsoleEmail(message);
  }

  if (provider === "resend") {
    return sendResendEmail(message);
  }

  return sendSmtpEmail(message);
}

export async function sendVerificationEmail(
  params: SendVerificationEmailParams
): Promise<SendEmailResult> {
  return sendEmail({
    to: params.to,
    subject: "Код подтверждения Zugzwang AI",
    text: buildVerificationEmailText(params),
    html: buildVerificationEmailHtml(params),
  });
}

export async function sendPasswordResetEmail(
  params: SendPasswordResetEmailParams
): Promise<SendEmailResult> {
  return sendEmail({
    to: params.to,
    subject: "Восстановление пароля Zugzwang AI",
    text: buildPasswordResetEmailText(params),
    html: buildPasswordResetEmailHtml(params),
  });
}
