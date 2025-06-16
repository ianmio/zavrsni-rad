import { Booking } from '@prisma/client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { BookedDate } from '@types';

import { DEFAULT_TIMEZONE } from './constants';

dayjs.extend(utc);
dayjs.extend(timezone);

export function aggregateBookingsByDate(bookings: Booking[]) {
  return bookings.reduce((acc, booking) => {
    const formattedDate = dayjs(booking.bookedDate)
      .tz(DEFAULT_TIMEZONE)
      .format('YYYY-MM-DD');

    acc[formattedDate] = (acc[formattedDate] || 0) + booking.numberOfGuests;
    return acc;
  }, {} as BookedDate);
}

export function findFirstAvailableDate(
  bookedDates: Record<string, number>,
  maxGuests: number,
  startTime: string
) {
  const [hour, minute] = startTime.split(':');
  let currentAvailableTourDate = dayjs
    .tz(dayjs(), DEFAULT_TIMEZONE)
    .hour(Number(hour))
    .minute(Number(minute))
    .second(0)
    .millisecond(0);

  const today = dayjs.tz(dayjs(), DEFAULT_TIMEZONE);

  while (true) {
    const formattedDate = currentAvailableTourDate.format('YYYY-MM-DD');

    if (
      (!bookedDates[formattedDate] || bookedDates[formattedDate] < maxGuests) &&
      currentAvailableTourDate.isAfter(today)
    ) {
      return currentAvailableTourDate;
    }

    currentAvailableTourDate = currentAvailableTourDate.add(1, 'day');
  }
}
