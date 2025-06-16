'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { editTour, getTour } from '@server/actions/tour';

import TourForm from '../../TourForm';

export default function EditTour() {
  const pathname = usePathname();
  const router = useRouter();
  const [tourData, setTourData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Extract the tourId from the URL or path
  const tourId = Number(pathname.split('/').pop());

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const data = await getTour(tourId);

        if (data) {
          setTourData(data);
        } else {
          toast.error('Tour not found');
          router.push('/admin/tours');
        }
      } catch (error) {
        console.error('Error fetching tour data:', error);
        toast.error('Failed to fetch tour data');
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, [tourId, router]);

  const handleEditTour = async (data: any) => {
    const res = await editTour(tourId, data);

    if (res?.success) {
      router.push('/admin/tours');
    } else {
      toast.error('Error updating tour');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Tour</h1>
      {tourData ? (
        <TourForm
          actionType="edit"
          initialData={tourData}
          onSubmit={handleEditTour}
        />
      ) : (
        <p>Tour not found</p>
      )}
    </div>
  );
}
