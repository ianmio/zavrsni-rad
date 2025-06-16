import Image from 'next/image';

import Clock from '@icons/Clock';
import Money from '@icons/Money';
import Start from '@icons/Start';
import Users from '@icons/Users';

import Container from '@components/Container';

import { formatToEuro } from '@utils/currencyFormatter';
import { formatDuration } from '@utils/time';

type TourHeroSectionProps = {
  heroImageSrc: string;
  tourName: string;
  durationInMinutes: number;
  pricePerPersonInEuro: number;
  maxGuests: number;
  startTime: string;
};

const TourHeroSection = ({
  heroImageSrc,
  tourName,
  durationInMinutes,
  maxGuests,
  pricePerPersonInEuro,
  startTime,
}: TourHeroSectionProps) => {
  return (
    <section className="min-h-[71vh] relative mb-12 md:mb-[72px]">
      <Image
        src={heroImageSrc}
        fill
        alt={tourName}
        quality={100}
        sizes="100vw"
        className="object-cover object-center md:object-left"
      />
      <Container className="absolute bottom-6 z-10 text-[#E4EBEE] left-1/2 -translate-x-1/2 flex items justify-between tracking-[-0.04em] md:flex-row flex-col gap-4 flex-wrap">
        <h1 className="text-[28px] leading-[39.2px] md:text-[36px] md:leading-[50.4px] font-semibold uppercase">
          {tourName}
        </h1>
        <ul className="text-[16px] leading-[20px] md:text-[20px] md:leading-[24px] tracking-[-0.04em] font-normal flex md:gap-10 md:gap-y-0 flex-wrap gap-x-12 gap-y-3 uppercase">
          <li className="flex items-center gap-2 md:gap-1">
            <Clock color="#E4EBEE" className="w-6 h-6 md:w-8 md:h-8" />
            <p>{formatDuration(durationInMinutes)}</p>
          </li>
          <li className="flex items-center gap-2 md:gap-1">
            <Money color="#E4EBEE" className="w-6 h-6 md:w-8 md:h-8" />
            <p>{formatToEuro(pricePerPersonInEuro)}</p>
          </li>
          <li className="flex items-center gap-2 md:gap-1">
            <Users color="#E4EBEE" className="w-6 h-6 md:w-8 md:h-8" />
            <p>{maxGuests}</p>
          </li>
          <li className="flex items-center gap-2 md:gap-1">
            <Start color="#E4EBEE" className="w-6 h-6 md:w-8 md:h-8" />
            <p>{startTime}</p>
          </li>
        </ul>
      </Container>
      <div
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)',
        }}
        className="absolute top-0 left-0 w-full h-full"
      />
    </section>
  );
};

export default TourHeroSection;
