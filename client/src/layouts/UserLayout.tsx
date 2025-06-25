import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import RegisterBanner from '../components/common/RegisterBanner';

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <RegisterBanner />
      <div className="min-h-70vh">
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
