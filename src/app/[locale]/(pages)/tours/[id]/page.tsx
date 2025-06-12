import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { auth } from '@auth';
import TourBookingForm from '@features/booking/TourBookingForm';
import { getTour, getTours } from '@server/actions/tour';

import Container from '@components/Container';
import Location from '@components/Location';

import TourHeroSection from '@sections/tour/TourHeroSection';

type TourDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: TourDetailPageProps): Promise<Metadata> {
  const tourId = Number((await params).id);

  if (isNaN(tourId)) return {};

  const tour = await getTour(tourId);

  if (!tour) return {};

  return {
    title: `${tour.name}`,
  };
}

export async function generateStaticParams() {
  const tours = await getTours();

  return tours!.map(tour => ({
    id: String(tour.id),
  }));
}

const TourDetailPage = async ({ params }: TourDetailPageProps) => {
  const tourId = Number((await params).id);
  const session = await auth();
  console.log({ serverSession: session });

  if (isNaN(tourId)) notFound();

  const tour = await getTour(tourId);

  if (!tour) notFound();

  return (
    <main>
      <TourHeroSection
        heroImageSrc={tour.imageUrl}
        tourName={tour.name}
        maxGuests={tour.maxGuests}
        pricePerPersonInEuro={tour.pricePerPersonInEuro.toNumber()}
        startTime={tour.startTime}
        durationInMinutes={tour.durationInMinutes}
      />

      <Container
        as="section"
        className="mb-[72px] flex flex-col lg:flex-row gap-16 lg:gap-10"
      >
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-[28px] leading-[39.2px] md:text-[36px] md:leading-[50.4px] font-semibold uppercase tracking-[-0.04em]">
              explore
            </h2>
            <p className="text-[#454553] text-[16px] leading-[25.6px] md:text-[20px] md:leading-[32px] tracking-[-0.02em] font-light">
              {tour.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[28px] leading-[39.2px] md:text-[36px] md:leading-[50.4px] font-semibold uppercase tracking-[-0.04em]">
              tour location
            </h2>

            <Location
              address={tour.address}
              lat={tour.latitude}
              lng={tour.longitude}
            />
          </div>
        </div>
        <TourBookingForm
          bookedDates={tour.bookedDates}
          maxGuests={tour.maxGuests}
          startTime={tour.startTime}
          tourId={tour.id}
          pricePerPerson={tour.pricePerPersonInEuro.toNumber()}
          tourName={tour.name}
          session={session}
        />
      </Container>
    </main>
  );
};

export default TourDetailPage;
