import nodemailer, { Transporter } from "nodemailer";
import { config } from "dotenv";
import { Resend } from 'resend';
export const resend = new Resend(process.env.EMAIL_PASSWORD);

config();

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async send(params: IMailerServiceParams): Promise<void> {
    const { to, subject, html } = params;

    const mailOptions = {
      from: `LowRacing <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
interface IMailerServiceParams {
  to: string;
  subject: string;
  html: string;
}
export const emailService = new EmailService();