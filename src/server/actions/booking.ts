'use server';

import { auth } from '@auth';
import { db } from '@server/db';

export async function getAllBookings() {
  return db.booking.findMany({
    include: {
      tour: true,
      user: true,
    },
  });
}

export async function getMyBookings(userId: string) {
  return db.booking.findMany({
    where: {
      userId,
    },
    include: {
      tour: true,
      user: true,
    },
  });
}
