import Container from '@components/Container';
import TourList from '@components/TourList';

const Tours = () => {
  return (
    <Container as="main" className="mb-[120px] md:mb-[176px] p-0">
      <TourList />
    </Container>
  );
};

export default Tours;
