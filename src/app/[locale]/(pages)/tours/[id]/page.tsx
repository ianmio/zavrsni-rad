import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { auth } from '@auth';
import TourBookingForm from '@features/booking/TourBookingForm';
import { getTour, getTours } from '@server/actions/tour';

import Container from '@components/Container';
import Location from '@components/Location';

import TourHeroSection from '@sections/tour/TourHeroSection';
import { getLocale, getTranslations } from 'next-intl/server';

type TourDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const tours = await getTours();

  return tours!.map(tour => ({
    id: String(tour.id),
  }));
}

const TourDetailPage = async ({ params }: TourDetailPageProps) => {
  const tourId = Number((await params).id);
  const session = await auth();
  const locale = await getLocale();
  const t = await getTranslations('Common');

  if (isNaN(tourId)) notFound();

  const tour = await getTour(tourId);

  if (!tour) notFound();

  return (
    <main>
      <TourHeroSection
        heroImageSrc={tour.imageUrl}
        tourName={locale === 'en' ? tour.nameENG : tour.nameCRO}
        maxGuests={tour.maxGuests}
        pricePerPersonInEuro={tour.pricePerPersonInEuro as any}
        startTime={tour.startTime}
        durationInMinutes={tour.durationInMinutes}
      />

      <Container
        as="section"
        className="mb-[72px] flex flex-col lg:flex-row gap-16 lg:gap-10"
      >
        <div className="flex flex-col gap-16 flex-1">
          <div className="flex flex-col gap-4">
            <h2 className="text-[28px] leading-[39.2px] md:text-[36px] md:leading-[50.4px] font-semibold uppercase tracking-[-0.04em]">
              {t('explore')}
            </h2>
            <p className="text-[#454553] text-[16px] leading-[25.6px] md:text-[20px] md:leading-[32px] tracking-[-0.02em] font-light">
              {locale === 'en' ? tour.descriptionENG : tour.descriptionCRO}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[28px] leading-[39.2px] md:text-[36px] md:leading-[50.4px] font-semibold uppercase tracking-[-0.04em]">
              {t('location')}
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
          pricePerPerson={tour.pricePerPersonInEuro as any}
          tourName={locale === 'en' ? tour.nameENG : tour.nameCRO}
          session={session}
        />
      </Container>
    </main>
  );
};

export default TourDetailPage;
