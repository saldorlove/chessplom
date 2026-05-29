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
export declare function sendVerificationEmail(params: SendVerificationEmailParams): Promise<SendEmailResult>;
export declare function sendPasswordResetEmail(params: SendPasswordResetEmailParams): Promise<SendEmailResult>;
export {};
//# sourceMappingURL=emailService.d.ts.map