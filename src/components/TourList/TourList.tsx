import { getTours } from '@server/actions/tour';

import Container from '@components/Container';
import TourCard from '@components/TourCard';

import { TOURS_PAGE_PATH } from '@utils/constants';

const TourList = async () => {
  const tours = await getTours();

  if (!tours?.length) return <p>No tours yet!</p>;

  return (
    <Container as="section" className="mb-[64px] md:mb-[72px]">
      <h2 className="text-center mb-[32px] md:text-[56px] md:leading-[70px] tracking-[-0.04em] uppercase text-[28px] leading-[35px]">
        explore{' '}
        <span className="font-flood md:text-[68px] md:leading-[81px] text-[34px] leading-[40px] text-blue-100">
          tours
        </span>
      </h2>
      <ul className="grid gap-8 md:gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            durationInMinutes={tour.durationInMinutes}
            href={`${TOURS_PAGE_PATH}/${tour.id}`}
            image={tour.imageUrl}
            maxGuests={tour.maxGuests}
            name={tour.name}
            pricePerPersonInEuro={tour.pricePerPersonInEuro.toNumber()}
            startTime={tour.startTime}
          />
        ))}
      </ul>
    </Container>
  );
};

export default TourList;
