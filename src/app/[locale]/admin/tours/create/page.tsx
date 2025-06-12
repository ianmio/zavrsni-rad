'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { createTour } from '@server/actions/tour';

import TourForm from '../TourForm';

export default function CreateTour() {
  const router = useRouter();
  const handleCreateTour = async (data: any) => {
    const res = await createTour(data);

    if (res?.success) {
      router.push('/admin/tours');
    } else {
      alert('Error creating tour');
      toast.error('Error creating tour');
    }
  };

  return <TourForm actionType="create" onSubmit={handleCreateTour} />;
}
