import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const ContactHeroSection = async () => {
  const t = await getTranslations('Contact');

  return (
    <section className="min-h-[71vh] relative flex justify-center items-center mb-[64px] md:mb-[72px]">
      <Image
        src="https://ben2bqpul6.ufs.sh/f/deRPmiOzHyFenf6rDPtjZx9udliPYAQ6GnbztKcOrEVRJqgC"
        fill
        alt="tours-hero-image"
        quality={100}
        sizes="100vw"
        className="object-cover object-center md:object-left"
      />

      <div
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)',
        }}
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black-100 opacity-40" />

      <div className="relative flex flex-col justify-center items-center text-white-100 px-6">
        <p className="text-[24px] leading-[30px] md:text-[32px] font-light md:leading-[40px] text-center mb-4 md:mb-0">
          {t('questions')}
        </p>
        <h1 className="mb-2 md:mb-0 font-flood text-[80px] leading-[56px] md:text-[104px] italic font-normal md:leading-[124.8px] text-center">
          {t('reach-out')}
        </h1>
        <p className="text-[16px] md:text-[20px] leading-[25.6px] md:leading-[32px] font-light tracking-[-0.02em] text-center max-w-[520px] w-full">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
};

export default ContactHeroSection;
