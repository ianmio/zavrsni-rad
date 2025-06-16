import { auth } from '@auth';
import { getMyBookings } from '@server/actions/booking';
import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

const MyBookings = async () => {
  const session = await auth();
  const locale = await getLocale();
  const t = await getTranslations('Common');

  if (!session?.user.id) {
    redirect('/signin');
  }

  const bookings = await getMyBookings(session.user.id);

  if (!bookings.length) {
    return (
      <div className="max-w-7xl mx-auto p-4 h-screen pt-56">
        {t('no-bookings')}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 h-screen pt-56">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t('my-bookings')}</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">
                {t('tour-name')}
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                {t('booked-date')}
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                {t('number-of-guests')}
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                {t('total-price')}
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                {t('payment-status')}
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">
                  {locale === 'en'
                    ? booking.tour.nameENG
                    : booking.tour.nameCRO}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {new Date(booking.bookedDate).toLocaleString()}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {booking.numberOfGuests}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {Number(booking.totalPriceInEuro).toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {booking.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
