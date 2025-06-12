'use client';

import Link from 'next/link';
import { useState } from 'react';

import { deleteTour } from '@server/actions/tour';

const Actions = ({
  tourId,
  hasBookings,
}: {
  tourId: number;
  hasBookings: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to handle the deletion of the tour
  const handleDelete = async () => {
    const result = await deleteTour(tourId);
    if (result.success) {
      // Close the modal on successful deletion
      setIsModalOpen(false);
    }
    // Optionally, show a success message or notification
  };

  return (
    <>
      <Link href={`/admin/tours/edit/${tourId}`}>
        <button className="px-3 py-1 bg-green-500 text-white-100 rounded ">
          Edit
        </button>
      </Link>
      {!hasBookings && (
        <button
          className="px-3 py-1 bg-red-500 text-white-100 rounded "
          onClick={() => setIsModalOpen(true)} // Open the confirmation modal
        >
          Delete
        </button>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white-100 p-5 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this tour?
            </h3>
            <div className="flex justify-between gap-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white-100 rounded flex-1"
                onClick={() => setIsModalOpen(false)} // Close the modal
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white-100 rounded flex-1"
                onClick={handleDelete} // Proceed with the delete action
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Actions;
