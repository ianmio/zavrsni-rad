'use server';

import { auth } from '@auth';
import env from '@env';
import dayjs from 'dayjs';
import { z } from 'zod';

import {
  DEFAULT_TIMEZONE,
  MIN_NUMBER_OF_GUESTS,
  TOURS_PAGE_PATH,
} from '@utils/constants';
import { convertEuroToCents } from '@utils/currencyFormatter';
import { getErrorMessage } from '@utils/error';
import stripe from '@utils/stripe';

import { getTour } from './tour';

const createCheckoutSessionSchema = z.object({
  tourId: z.number().int().positive(),
  numberOfGuests: z.number().int().min(MIN_NUMBER_OF_GUESTS),
  bookedDate: z.string(),
});

type CreateCheckoutSessionProps = z.infer<typeof createCheckoutSessionSchema>;

export async function createCheckoutSession(input: CreateCheckoutSessionProps) {
  try {
    const { tourId, numberOfGuests, bookedDate } =
      createCheckoutSessionSchema.parse(input);

    const isInPast = dayjs(bookedDate).isBefore(dayjs());

    if (isInPast) {
      throw new Error('The booked date cannot be in the past.');
    }

    const tour = await getTour(tourId);

    if (!tour) {
      throw new Error(`Tour with ID ${tourId} does not exist!`);
    }

    const formattedBookedDate = dayjs(bookedDate)
      .tz(DEFAULT_TIMEZONE)
      .format('YYYY-MM-DD');

    const availableSpotsForSelectedDate =
      tour.maxGuests - tour.bookedDates[formattedBookedDate];

    if (
      numberOfGuests < MIN_NUMBER_OF_GUESTS ||
      numberOfGuests > availableSpotsForSelectedDate
    ) {
      throw new Error('Invalid amount for number of guests!');
    }

    const authSession = await auth();

    if (!authSession) {
      throw new Error('You need to be logged in to book a tour!');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Tour Booking: ${tour.name}`,
              description: `Booking for ${numberOfGuests} guest${
                numberOfGuests > 1 ? 's' : ''
              } at ${dayjs(bookedDate)
                .tz(DEFAULT_TIMEZONE)
                .format('MMMM D, YYYY h:mm A')}`,
              images: tour.imageUrl ? [tour.imageUrl] : [],
            },
            unit_amount: convertEuroToCents(
              tour.pricePerPersonInEuro.toNumber()
            ),
          },
          quantity: numberOfGuests,
        },
      ],
      mode: 'payment',
      success_url: `${env.NEXT_PUBLIC_SITE_URL}/tours/${tourId}`,
      cancel_url: `${env.NEXT_PUBLIC_SITE_URL}${TOURS_PAGE_PATH}`,
      metadata: {
        tourId,
        numberOfGuests,
        bookedDate,
        tourName: tour.name,
        userId: authSession.user.id!,
        email: authSession.user.email!,
        name: authSession.user.name!,
        role: authSession.user.role!,
      },
    });

    return session.id;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
}
