import nodemailer from 'nodemailer';

import { getEnvVariable } from '../utilts/getEnvVariable.js';

const transporter = nodemailer.createTransport({
  host: getEnvVariable("SMTP_HOST"),
  port: Number(getEnvVariable("SMTP_PORT")),
  auth: {
    user: getEnvVariable("SMTP_USER"),
    pass: getEnvVariable("SMTP_PASSWORD"),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
