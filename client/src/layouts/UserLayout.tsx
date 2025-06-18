import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-70vh">
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
