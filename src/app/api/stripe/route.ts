
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import env from '@env';
import { PaymentStatus } from '@prisma/client';
import { db } from '@server/db';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';

import { DEFAULT_TIMEZONE, TOURS_PAGE_PATH } from '@utils/constants';
import stripe from '@utils/stripe';

import { SessionMetadata } from '@types';

dayjs.extend(utc);
dayjs.extend(timezone);

async function sendAdminNotificationEmail(
  customerName: string,
  customerEmail: string,
  tourDetails: string
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.GMAIL_USER,
      pass: env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    to: env.TO_GMAIL,
    subject: 'New Booking Received',
    html: `
      <p>Hello Dario,</p>
      <p>A new booking has been made with the following details:</p>
      <p><strong>Customer Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p>${tourDetails}</p>
      <p>Please check the dashboard for more information.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully.');
  } catch (error) {
    console.error('Error sending admin email:', error);
  }
}

async function sendConfirmationEmail(
  email: string,
  name: string,
  tourDetails: string
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.GMAIL_USER,
      pass: env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    to: email,
    subject: 'Booking Confirmation',
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for booking with us! Here are your booking details:</p>
      <p>${tourDetails}</p>
      <p>We look forward to seeing you soon!</p>
      <p>Best regards,</p>
      <p>The Led Light  Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get('Stripe-Signature') as string;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    if (!sig || !webhookSecret) {
      throw new Error('Missing Stripe signature or webhook secret');
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.log(err);
    return new Response('Invalid stripe webhook request', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const { tourId, numberOfGuests, bookedDate, tourName, userId } =
        session.metadata! as SessionMetadata;

      await db.booking.create({
        data: {
          bookedDate: new Date(bookedDate),
          tourId: parseInt(tourId),
          numberOfGuests: parseInt(numberOfGuests),
          totalPriceInEuro: session.amount_total! / 100,
          paymentStatus: PaymentStatus.COMPLETED,
          stripeSessionId: session.id,
          userId,
        },
      });

      if (session.customer_details?.email) {
        const tourDetails = `
        Tour Name: ${tourName}<br>
        Date: ${dayjs(bookedDate).tz(DEFAULT_TIMEZONE).format('MMMM D, YYYY h:mm A')}<br>
        Number of Guests: ${numberOfGuests}<br>
        Total Price: €${(session.amount_total! / 100).toFixed(2)}
      `;

        await sendConfirmationEmail(
          session.customer_details.email,
          session.customer_details.name || 'Guest',
          tourDetails
        );

        await sendAdminNotificationEmail(
          session.customer_details.name || 'Guest',
          session.customer_details.email,
          tourDetails
        );
      }

      console.log('Booking created successfully for completed session.');
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const booking = await db.booking.findFirst({
        where: { stripeSessionId: paymentIntent.id },
      });

      if (booking) {
        await db.booking.update({
          where: { id: booking.id },
          data: { paymentStatus: PaymentStatus.COMPLETED },
        });
      }
      console.log('Payment succeeded. Status updated.');
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const booking = await db.booking.findFirst({
        where: { stripeSessionId: paymentIntent.id },
      });

      if (booking) {
        await db.booking.update({
          where: { id: booking.id },
          data: { paymentStatus: PaymentStatus.FAILED },
        });
      }
      console.log('Payment failed. Status updated.');
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;

      const booking = await db.booking.findFirst({
        where: { stripeSessionId: charge.payment_intent as string },
      });

      if (booking) {
        await db.booking.update({
          where: { id: booking.id },
          data: { paymentStatus: PaymentStatus.REFUNDED },
        });
      }
      console.log('Payment refunded. Status updated.');
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  revalidatePath(TOURS_PAGE_PATH);

  return new Response('OK', { status: 200 });
}
