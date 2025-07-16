import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import RegisterBanner from '../components/common/RegisterBanner';
import Footer from '@/components/common/Footer';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <RegisterBanner />
      <div className="min-h-70vh">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default UserLayout;
