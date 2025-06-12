import About from '@sections/home/about';
import Contact from '@sections/home/contact';
import Hero from '@sections/home/hero';
import Tours from '@sections/home/tours';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Tours />
      <About />
      <Contact />
    </main>
  );
};

export default HomePage;
