import { createTransport } from "nodemailer";
import logger from "../startup/logger";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default {
  sendMail: async (data: {
    to: string;
    subject: string;
    text?: string;
    attachments?: any[];
    html?: string;
  }) => {
    const { to, subject, text, attachments, html } = data;

    let mailOptions = {
      from: process.env.EMAIL_FROM as string,
      to,
      subject,
      text,
      html,
      attachments,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (info) {
        logger.info(info);
      } else if (error) {
        logger.error(error);
      }
    });
  },
};
