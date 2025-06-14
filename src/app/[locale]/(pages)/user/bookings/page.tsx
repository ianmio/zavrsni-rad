import { auth } from '@auth';
import { getMyBookings } from '@server/actions/booking';
import { redirect } from 'next/navigation';

const MyBookings = async () => {
  const session = await auth();

  if (!session?.user.id) {
    redirect('/sign-in');
  }

  const bookings = await getMyBookings(session.user.id);

  if (!bookings.length) {
    return (
      <div className="max-w-7xl mx-auto p-4 h-screen pt-56">
        You have no bookings yet.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 h-screen pt-56">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Bookings</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">
                Tour Name
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Booked Date
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Number of Guests
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Total Price (€)
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">
                  {booking.tour?.name || 'N/A'}
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
