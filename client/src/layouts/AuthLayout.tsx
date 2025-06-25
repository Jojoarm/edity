import { Navigate, Outlet } from 'react-router';
import CircularShape from '../components/common/CircularShape';
import { useAppStore } from '../contexts/useAppStore';
import Loader from '../components/common/Loader';

const AuthLayout = () => {
  const { isLoggedIn, isAuthLoading } = useAppStore();

  if (isAuthLoading) {
    return <Loader />;
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-light-background-color overflow-hidden">
      <CircularShape
        xPosition="-left-40"
        yPosition="-top-40"
        widthClass="w-[400px]"
        heightClass="h-[400px]"
        borderClass="border-[60px]"
      />
      <CircularShape
        xPosition="-right-50"
        yPosition="bottom-0"
        widthClass="w-[400px]"
        heightClass="h-[400px]"
        borderClass="border-[60px]"
      />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
