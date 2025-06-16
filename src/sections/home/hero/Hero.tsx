import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const Hero = async () => {
  const t = await getTranslations('Homepage');

  return (
    <section className="min-h-[130vh] md:min-h-[120vh] relative mb-[120px] md:mb-[80px] pt-[96px] md:pt-[128px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://ben2bqpul6.ufs.sh/f/deRPmiOzHyFenf6rDPtjZx9udliPYAQ6GnbztKcOrEVRJqgC"
          fill
          alt="kajak-cover-image"
          quality={100}
          sizes="100vw"
          className="object-cover object-center md:object-left"
        />
        <div className="absolute inset-0 bg-black-100 opacity-20"></div>
      </div>

      <div className="z-10 relative flex justify-center flex-col items-center text-center px-4">
        <p className="uppercase text-[24px] leading-[30px] md:text-[32px] md:leading-[40px] italic font-light mb-4 md:mb-0 text-[#fff]">
          {t('titleTextOne')}
        </p>
        <h1 className="font-flood md:text-[104px] md:leading-[124px] text-[80px] leading-[56px] md:mb-0 mb-2 text-[#fff]">
          {t('titleTextTwo')}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
