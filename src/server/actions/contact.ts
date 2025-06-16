'use server';

import env from '@env';
import nodemailer from 'nodemailer';
import { z } from 'zod';

import { getErrorMessage } from '@utils/error';

const messageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

type SendMessageProps = z.infer<typeof messageSchema>;

export async function sendMessage(input: SendMessageProps) {
  try {
    const { email, message, name } = messageSchema.parse(input);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: env.TO_GMAIL,
      subject: `New message from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
}
