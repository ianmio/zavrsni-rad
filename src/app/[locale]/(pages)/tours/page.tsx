import { Suspense } from 'react';

import Spinner from '@components/Spinner';
import TourList from '@components/TourList';

import ToursHeroSection from '@sections/tours/ToursHeroSection';

const ToursPage = () => {
  return (
    <main>
      <ToursHeroSection />
      <Suspense
        fallback={
          <div className="w-full h-[50vh] flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <TourList />
      </Suspense>
    </main>
  );
};

export default ToursPage;
