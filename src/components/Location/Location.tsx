'use client';

import dynamic from 'next/dynamic';

import Arrow from '@icons/Arrow';
import { useTranslations } from 'next-intl';

type LocationProps = {
  address: string;
  lat: number;
  lng: number;
};

const Location = ({ address, lat, lng }: LocationProps) => {
  const t = useTranslations('Common');
  const handleArrowClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white-100 py-6 px-8 flex justify-between items-center">
        <div>
          <p className="text-[16px] capitalize leading-5 md:text-[20px] md:leading-[24px] font-light tracking-[-0.02em] text-gray-500 mb-1">
            {t('address')}
          </p>
          <p className="text-[16px] leading-5 md:text-[20px] md:leading-[24px] font-light tracking-[-0.02em] mb-1 opacity-50">
            {address}
          </p>
        </div>
        <div
          className="cursor-pointer w-10 h-10 md:w-[50px] md:h-[50px] bg-blue-100 rounded-full flex justify-center items-center"
          onClick={handleArrowClick}
        >
          <Arrow />
        </div>
      </div>
    </div>
  );
};

export default Location;
