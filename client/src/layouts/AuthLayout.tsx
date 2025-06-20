// import { useAppContext } from '@/context/AppContext';
// import { Loader } from 'lucide-react';
import { Navigate, Outlet } from 'react-router';
import CircularShape from '../components/common/CircularShape';

const AuthLayout = () => {
  // const { user, isAuthLoading } = useAppContext();

  // if (isAuthLoading) return <Loader />;

  const user = false;

  if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="relative h-screen bg-light-background-color overflow-hidden">
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
