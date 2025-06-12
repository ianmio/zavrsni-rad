import Footer from '@components/Footer';
import Navigation from '@components/Navigation';

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
