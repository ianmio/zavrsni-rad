import { getAllBookings } from '@server/actions/booking';
import React from 'react';

const Bookings = async () => {
  const bookings = await getAllBookings();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bookings</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
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
              <th className="px-4 py-2 text-left border border-gray-200">
                Tour Name
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                User Name
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                User Email
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map(booking => (
              <tr key={booking.id} className="hover:bg-gray-50">
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
                <td className="px-4 py-2 border border-gray-200">
                  {booking.tour.name}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {booking.user.name}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {booking.user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
