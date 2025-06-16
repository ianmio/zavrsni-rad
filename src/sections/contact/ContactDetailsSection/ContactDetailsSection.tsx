import Container from '@components/Container';
import Location from '@components/Location';
import { getTranslations } from 'next-intl/server';

const ContactDetailsSection = async () => {
  const t = await getTranslations('Common');
  return (
    <Container className="max-w-[848px]" as="main">
      <p className="max-w-[600px] mx-auto mb-16 text-base font-light tracking-[-0.02em] text-center text-gray-500 md:text-[20px] md:leading-[32px]">
        {t('text')}
      </p>
      <div className="max-w-[397px] mx-auto text-center mb-16">
        <h2 className="uppercase text-[28px] leading-[39.2px] mb-4 md:text-[36px] md:leading-[54px] tracking-[-0.04em] font-semibold text-center">
          {t('whatsapp')}
        </h2>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col justify-start items-start text-4 leading-[19.2px] tracking-[-0.02em] font-light text-gray-500">
            <p>+385 91 444 4444</p>
            <p className="opacity-50">Ian</p>
          </div>
        </div>
      </div>
      <div className="mb-16">
        <h2 className="uppercase text-[28px] leading-[39.2px] mb-4 md:text-[36px] md:leading-[54px] tracking-[-0.04em] font-semibold text-center">
          {t('location')}
        </h2>
        <Location address="Split" lat={43.5147} lng={16.4435} />
      </div>
    </Container>
  );
};

export default ContactDetailsSection;
