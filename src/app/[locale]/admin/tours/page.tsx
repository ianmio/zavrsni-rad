import Link from 'next/link';
import React from 'react';

import { getTours } from '@server/actions/tour';

import Actions from './Actions';

const Tours = async () => {
  const tours = await getTours();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tours</h1>
        <Link href="/admin/tours/create">
          <button className="px-4 py-2 bg-blue-500 text-white-100 font-medium rounded hover:bg-blue-600">
            Create New Tour
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-200">
                Name
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Description
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Price (€)
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Max Guests
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Duration (Minutes)
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Start Time
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Created At
              </th>
              <th className="px-4 py-2 border border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tours?.map(tour => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">
                  {tour.name}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {tour.description.length > 50
                    ? `${tour.description.substring(0, 50)}...`
                    : tour.description}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {Number(tour.pricePerPersonInEuro).toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {tour.maxGuests}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {tour.durationInMinutes}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {tour.startTime}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {new Date(tour.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 border border-gray-200 flex gap-2">
                  <Actions
                    tourId={tour.id}
                    hasBookings={!!tour.booking.length}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tours;
