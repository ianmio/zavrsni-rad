import ContactDetailsSection from '@sections/contact/ContactDetailsSection';
import ContactHeroSection from '@sections/contact/ContactHeroSection';
import ReachOutForm from '@sections/contact/ReachOutForm';

const ContactPage = () => {
  return (
    <main>
      <ContactHeroSection />
      <ContactDetailsSection />
      <ReachOutForm />
    </main>
  );
};

export default ContactPage;
