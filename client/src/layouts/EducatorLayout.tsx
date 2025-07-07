import Loader from '@/components/common/Loader';
import Navbar from '@/components/common/Navbar';
import { useAppStore } from '@/contexts/useAppStore';
import { Navigate, Outlet } from 'react-router-dom';

const EducatorLayout = () => {
  const { user, isAuthLoading } = useAppStore();

  if (isAuthLoading) return <Loader />;

  if (!user || user.role !== 'educator') {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar />
      <div className="min-h-70vh">
        <Outlet />
      </div>
    </>
  );
};

export default EducatorLayout;
