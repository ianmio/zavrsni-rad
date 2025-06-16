import ContactForm from '@components/ContactForm';
import Container from '@components/Container';
import { getTranslations } from 'next-intl/server';

const Contact = async () => {
  const t = await getTranslations('Contact');

  return (
    <Container className="max-w-[700px] mb-[120px] md:mb-[73px]">
      <h2 className="uppercase text-[32px] leading-[40px] md:text-[64px] md:leading-[80px] tracking-[-0.04em] italic text-center">
        <span className="font-flood text-[40px] leading-[48px] md:text-[80px] md:leading-[96px] italic text-blue-100 tracking-normal mb-5">
          {t('titleTextOne')}
        </span>{' '}
        {t('titleTextTwo')}
      </h2>
      <ContactForm />
    </Container>
  );
};

export default Contact;
