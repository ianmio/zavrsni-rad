import Image from 'next/image';
import Link from 'next/link';

import Arrow from '@icons/Arrow';
import Clock from '@icons/Clock';
import Money from '@icons/Money';
import Start from '@icons/Start';
import Users from '@icons/Users';

import { formatToEuro } from '@utils/currencyFormatter';
import { formatDuration } from '@utils/time';

type TourCardProps = {
  href: string;
  image: string;
  name: string;
  pricePerPersonInEuro: number;
  durationInMinutes: number;
  maxGuests: number;
  startTime: string;
};

const TourCard = ({
  href,
  image,
  name,
  pricePerPersonInEuro,
  durationInMinutes,
  maxGuests,
  startTime,
}: TourCardProps) => {
  return (
    <li className="bg-white-100 p-4 pb-6 group">
      <Link href={href} aria-label={name}>
        <div className="w-full relative mb-6">
          <div className="w-full aspect-square relative overflow-hidden">
            <Image
              src={image}
              alt={`Cover image for ${name}`}
              fill
              loading="lazy"
              className="object-cover md:group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="absolute w-[50px] h-[50px] bg-blue-100 rounded-full flex justify-center items-center bottom-0 translate-y-1/2 right-[20px] z-40">
            <Arrow />
          </div>
        </div>
        <p className="uppercase text-[20px] leading-[28px] tracking-[-0.04em] mb-3">
          {name}
        </p>
        <ul className="flex gap-2 md:gap-4 items-center justify-start uppercase text-[16px] leading-[20px] text-pink-500 flex-wrap">
          <li className="flex gap-1.5 items-center">
            <Clock />
            <p>{formatDuration(durationInMinutes)}</p>
          </li>
          <li className="flex gap-1.5 items-center">
            <Money />
            <p>{formatToEuro(pricePerPersonInEuro)}</p>
          </li>
          <li className="flex gap-1.5 items-center">
            <Users />
            <p>{maxGuests}</p>
          </li>
          <li className="flex gap-1.5 items-center">
            <Start />
            <p>{startTime}</p>
          </li>
        </ul>
      </Link>
    </li>
  );
};

export default TourCard;
