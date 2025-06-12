import ContactForm from '@components/ContactForm';
import Container from '@components/Container';

const Contact = () => {
  return (
    <Container className="max-w-[450px] mb-[120px] md:mb-[73px]">
      <h2 className="uppercase text-[32px] leading-[40px] md:text-[64px] md:leading-[80px] tracking-[-0.04em] italic text-center">
        <span className="font-flood text-[40px] leading-[48px] md:text-[80px] md:leading-[96px] italic text-blue-100 tracking-normal mb-5">
          reach
        </span>{' '}
        out
      </h2>
      <ContactForm />
    </Container>
  );
};

export default Contact;
