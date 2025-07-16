import EducatorToolsBanner from '@/components/common/EducatorToolsBanner';
import Loader from '@/components/common/Loader';
import Navbar from '@/components/common/Navbar';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import { useAppStore } from '@/contexts/useAppStore';
import { Navigate, Outlet } from 'react-router-dom';

const EducatorLayout = () => {
  const { user, isAuthLoading } = useAppStore();

  if (isAuthLoading) return <Loader />;

  if (
    !user ||
    user.role !== 'educator' ||
    user.applicationStatus !== 'approved'
  ) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar />
      <EducatorToolsBanner />
      <div className="min-h-70vh">
        <Outlet />
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default EducatorLayout;
