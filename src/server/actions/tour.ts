'use server';

import { revalidatePath } from 'next/cache';

import { Booking, Tour } from '@prisma/client';
import { db } from '@server/db';
import { z } from 'zod';

import { aggregateBookingsByDate } from '@utils/booking';

import { BookedDate } from '@types';

const tourSchema = z.object({
  nameENG: z.string().min(1, 'English name is required'),
  nameCRO: z.string().min(1, 'Croatian name is required'),
  descriptionENG: z.string().min(1, 'English description is required'),
  descriptionCRO: z.string().min(1, 'Croatian description is required'),
  latitude: z
    .number()
    .min(-90, 'Latitude must be ≥ -90')
    .max(90, 'Latitude must be ≤ 90'),
  longitude: z
    .number()
    .min(-180, 'Longitude must be ≥ -180')
    .max(180, 'Longitude must be ≤ 180'),
  address: z.string().min(1, 'Address is required'),
  pricePerPersonInEuro: z.number().positive('Price must be a positive number'),
  maxGuests: z.number().int().positive('Max guests must be a positive integer'),
  durationInMinutes: z
    .number()
    .int()
    .positive('Duration must be a positive integer'),
  startTime: z.string().min(1, 'Start time is required'),
  imageUrl: z.string().url('Image URL must be a valid URL'),
});

export async function getTours() {
  return db.tour.findMany({
    include: {
      booking: true,
    },
  });
}

export async function getTour(
  tourId: number
): Promise<(Tour & { booking: Booking[]; bookedDates: BookedDate }) | null> {
  const tour = await db.tour.findUnique({
    where: {
      id: tourId,
    },
    include: {
      booking: {
        where: {
          bookedDate: {
            gt: new Date(),
          },
        },
      },
    },
  });

  if (!tour) return null;

  return {
    ...tour,
    pricePerPersonInEuro: tour.pricePerPersonInEuro.toNumber() as any,
    bookedDates: aggregateBookingsByDate(tour.booking),
  };
}

export async function createTour(data: unknown) {
  const parsedData = tourSchema.safeParse(data);

  if (!parsedData.success) {
    console.error('Validation errors:', parsedData.error.errors);
    return null;
  }

  const tour = await db.tour.create({
    data: parsedData.data,
  });

  console.log({ tour });

  revalidatePath('/');
  return {
    data: {
      ...tour,
      pricePerPersonInEuro: tour.pricePerPersonInEuro.toNumber(),
    },
    success: true,
  };
}

export async function deleteTour(tourId: number) {
  const tour = await db.tour.findUnique({
    where: {
      id: tourId,
    },
  });

  if (!tour) {
    console.error(`Tour with ID ${tourId} not found`);
    return { success: false, message: 'Tour not found' };
  }

  await db.tour.delete({
    where: {
      id: tourId,
    },
  });

  console.log(`Tour with ID ${tourId} deleted`);

  revalidatePath('/');

  return {
    success: true,
    message: `Tour with ID ${tourId} successfully deleted`,
  };
}

// Edit a tour
export async function editTour(tourId: number, data: unknown) {
  const parsedData = tourSchema.safeParse(data);

  if (!parsedData.success) {
    console.error('Validation errors:', parsedData.error.errors);
    return null;
  }

  // Check if the tour exists before updating
  const existingTour = await db.tour.findUnique({
    where: {
      id: tourId,
    },
  });

  if (!existingTour) {
    console.error(`Tour with ID ${tourId} not found`);
    return { success: false, message: 'Tour not found' };
  }

  // Update the tour
  const updatedTour = await db.tour.update({
    where: {
      id: tourId,
    },
    data: parsedData.data,
  });

  console.log({ updatedTour });

  revalidatePath('/');

  return {
    data: {
      ...updatedTour,
      pricePerPersonInEuro: updatedTour.pricePerPersonInEuro.toNumber(),
    },
    success: true,
  };
}
