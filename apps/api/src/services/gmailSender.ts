import nodemailer from 'nodemailer';
import type { SendMail } from './contactMail.ts';

/** Fail fast instead of holding requests open for minutes when Gmail is slow or unreachable. */
const SMTP_TIMEOUT_MS = 10_000;

/** Sends through Gmail SMTP (TLS) with an app password; the account itself is the sender. */
export function gmailSender(user: string, pass: string): SendMail {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  });
  return async (mail) => {
    await transport.sendMail({ from: user, ...mail });
  };
}
