import ContactForm from '@components/ContactForm';
import Container from '@components/Container';

const ReachOutForm = () => {
  return (
    <Container className="max-w-[450px] mb-[64px] md:mb-[72px]">
      <h2 className="uppercase text-[28px] leading-[39.2px] mb-5 md:text-[36px] md:leading-[54px] tracking-[-0.04em] font-semibold text-center">
        contact via e-mail
      </h2>
      <ContactForm />
    </Container>
  );
};

export default ReachOutForm;
