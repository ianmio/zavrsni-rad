'use client';

import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import { MouseEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Import next-auth hooks
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { createCheckoutSession } from '@server/actions/stripe';
import { Dayjs } from 'dayjs';

import Spinner from '@components/Spinner';

import { findFirstAvailableDate } from '@utils/booking';
import { DEFAULT_TIMEZONE, TOURS_PAGE_PATH } from '@utils/constants';
import { formatToEuro } from '@utils/currencyFormatter';
import { getErrorMessage } from '@utils/error';
import getStripe from '@utils/get-stripe';
import { cn } from '@utils/tailwind';

import { useCurrentSession } from './useCurrentSession';

type TourBookingFormProps = {
  pricePerPerson: number;
  tourId: number;
  maxGuests: number;
  bookedDates: Record<string, number>;
  startTime: string;
  tourName: string;
  session: Session | null;
};

const TourBookingForm = ({
  pricePerPerson,
  tourId,
  maxGuests,
  bookedDates,
  startTime,
  tourName,
  session,
}: TourBookingFormProps) => {
  const firstAvailableDate = findFirstAvailableDate(
    bookedDates,
    maxGuests,
    startTime
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    firstAvailableDate
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [guestCount, setGuestCount] = useState<number>(1);

  const currentDateBookings =
    bookedDates[selectedDate!.format('YYYY-MM-DD')] || 0;
  const availableSpots = maxGuests - currentDateBookings;
  const totalPrice = guestCount * pricePerPerson;
  const maxDate = firstAvailableDate.add(3, 'months');

  const incrementGuestCount = () => {
    if (guestCount < availableSpots) {
      setGuestCount((prev) => prev + 1);
    }
  };

  const decrementGuestCount = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => prev - 1);
    }
  };

  const handlePayment = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      setIsSubmitting(true);

      const sessionId = await createCheckoutSession({
        tourId,
        bookedDate: selectedDate!.format(),
        numberOfGuests: guestCount,
      });

      if (sessionId) {
        const stripe = await getStripe();
        await stripe?.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      revalidatePath(TOURS_PAGE_PATH);
    }
  };

  useEffect(() => {
    setGuestCount(1);
  }, [selectedDate]);

  return (
    <div className="w-full bg-white-100 p-4 md:p-8 h-fit lg:max-w-[392px]">
      <h2 className="text-[28px] leading-[39.2px] md:text-[36px] md:leading-[50.4px] font-semibold uppercase tracking-[-0.04em] mb-4">
        book now
      </h2>

      <DateCalendar
        sx={{
          '.MuiDateCalendar-root': {
            borderRadius: '0px',
            borderWidth: '0px',
          },
          '.MuiPickersCalendarHeader-root': {
            paddingInline: 0,
            paddingLeft: '15px',
          },
          '.MuiDayCalendar-header': {
            justifyContent: 'space-between',
          },
          '.MuiDayCalendar-weekContainer': {
            justifyContent: 'space-between',
          },
        }}
        className="w-full mb-4"
        disabled={isSubmitting}
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        timezone={DEFAULT_TIMEZONE}
        maxDate={maxDate}
        minDate={firstAvailableDate}
        disablePast
        shouldDisableDate={(date) =>
          bookedDates[date.format('YYYY-MM-DD')] === maxGuests
        }
      />

      <div className="text-base tracking-[-0.02em] text-[#454553] flex items-center gap-2 mb-6 md:mb-8">
        <p className="opacity-50">AVAILABLE SLOTS</p>
        <span className="font-semibold">{availableSpots}</span>
      </div>

      <div className="w-full h-[1px] bg-[#454553] opacity-20 mb-6 md:mb-8" />

      <div className="mb-6 md:mb-8 flex items-center justify-between">
        <p className="text-base text-[#454553] font-semibold">People</p>
        <div className="mt-4 flex items-center gap-4">
          <button
            className={cn(
              'w-6 h-6 border-[1px] border-[#454553] flex items-center justify-center',
              {
                'opacity-50 cursor-not-allowed':
                  isSubmitting || guestCount === 1,
                'hover:border-[#5a5a6b] active:border-[#3a3a49] hover:bg-[#f0f0f0] active:bg-[#e0e0e0] cursor-pointer':
                  !isSubmitting,
              }
            )}
            disabled={isSubmitting || guestCount === 1}
            onClick={decrementGuestCount}
          >
            -
          </button>
          <span className="text-xl font-semibold">{guestCount}</span>
          <button
            className={cn(
              'w-6 h-6 border-[1px] border-[#454553] flex items-center justify-center',
              {
                'opacity-50 cursor-not-allowed':
                  isSubmitting || guestCount === maxGuests,
                'hover:border-[#5a5a6b] active:border-[#3a3a49] hover:bg-[#f0f0f0] active:bg-[#e0e0e0] cursor-pointer':
                  !isSubmitting,
              }
            )}
            disabled={isSubmitting || guestCount === maxGuests}
            onClick={incrementGuestCount}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#454553] opacity-20 mb-6 md:mb-8" />

      <div className="mb-6 md:mb-8">
        <h3 className="mb-2 text-[20px] leading-[32px] md:text-[24px] md:leading-[38px] font-semibold text-[#454553]">
          Summary
        </h3>
        <p className="text-base text-[#454553] font-semibold">{tourName}</p>
        <p className="text-base text-[#A2A2A9] font-semibold">
          People: <span className="text-[#454553]">{guestCount}</span>
        </p>
        <p className="text-base text-[#A2A2A9] font-semibold">
          Date:{' '}
          <span className="text-[#454553]">
            {selectedDate?.format('YYYY/MM/DD h:mm A')}
          </span>
        </p>
        <p className="text-base text-[#A2A2A9] font-semibold">
          Total:{' '}
          <span className="text-[#454553]">{formatToEuro(totalPrice)}</span>
        </p>
      </div>

      <button
        onClick={(e) => {
          if (!session) {
            signIn();
            return;
          }
          handlePayment(e);
        }}
        disabled={isSubmitting}
        className={cn(
          'bg-[#454553] hover:bg-[#5a5a6b] active:bg-[#3a3a49] cursor-pointer h-[50px] w-full text-center flex justify-center items-center text-white-100 text-base tracking-[-0.02em] font-light',
          {
            'opacity-50 cursor-not-allowed hover:bg-[#454553] active:bg-[#454553]':
              isSubmitting,
          }
        )}
      >
        {isSubmitting ? <Spinner className="text-white-100" /> : 'Checkout'}
      </button>
    </div>
  );
};

export default TourBookingForm;
