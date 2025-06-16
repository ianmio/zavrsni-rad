import { PaymentStatus, Role } from '@prisma/client';

export type BookedDate = {
  [key: string]: number;
};

export type BookingData = {
  bookedDate: Date;
  email: string;
  name: string;
  numberOfGuests: number;
  paymentStatus: PaymentStatus;
  totalPriceInEuro: number;
  stripeSessionId: string;
  tourId: number;
};

export type SessionMetadata = {
  tourId: string;
  numberOfGuests: string;
  bookedDate: string;
  tourName: string;
  userId: string;
  email: string;
  name: string;
  role: Role;
};
