import Image from 'next/image';

import Container from '@components/Container';
import { getTranslations } from 'next-intl/server';

const About = async () => {
  const t = await getTranslations('About');

  return (
    <Container className="mb-[120px] md:mb-[133px] min-h-[562px] grid md:grid-cols-2 gap-8 md:gap-6 items-center justify-between md:pl-12 md:pr-12">
      <div className="md:max-w-[520px] w-full">
        <h2 className="text-[32px] leading-[40px] md:text-[64px] md:leading-[80px] tracking-[-0.04em] italic uppercase">
          {t('titleTextOne')}{' '}
          <span className="text-[40px] leading-[48px] md:text-[80px] md:leading-[96px] font-flood text-blue-100">
            {t('titleTextTwo')}
          </span>
        </h2>
        <p className="text-base md:text-[20px] md:leading-[32px] tracking-[-0.02em] font-light">
          {t('description')}
        </p>
      </div>

      <div className="relative max-w-[327px] mx-auto md:mx-0 md:max-w-[562px] w-full md:h-full h-[326px]">
        <div className="absolute w-[217px] h-[217px] md:w-[373px] md:h-[373px] top-0 left-0">
          <Image
            src="https://utfs.io/f/j8jpgJGaMTY1OXvcq8DarjngSY6FJu0hteW7p3BbR29qlEoy"
            fill
            alt=" image 1"
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 217px, 373px"
          />
        </div>
        <div className="absolute w-[147px] h-[147px] md:w-[254px] md:h-[254px] bottom-0 left-[70px] z-10">
          <Image
            src="https://ben2bqpul6.ufs.sh/f/deRPmiOzHyFeLE64mkcArjT13Lm2ulgDQ9eFa7JhScdpwqtn"
            fill
            alt=" image 2"
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 147px, 254px"
          />
        </div>
        <div className="absolute w-[164px] h-[164px]  md:w-[283px] md:h-[283px] bottom-[83px] right-0">
          <Image
            src="https://ben2bqpul6.ufs.sh/f/deRPmiOzHyFemJRDe4ngni8dUw0AtEPrYN94TyCZ1KR5OIVS"
            fill
            alt=" image 3"
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 164px, 283px"
          />
        </div>
      </div>
    </Container>
  );
};

export default About;
