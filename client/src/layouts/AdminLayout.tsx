import { Navigate, Outlet } from 'react-router';
import { useAppStore } from '../contexts/useAppStore';
import Loader from '../components/common/Loader';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
  const { user, isAuthLoading } = useAppStore();

  if (isAuthLoading) return <Loader />;

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-16 md:w-64 h-screen fixed left-0 top-0 z-10 bg-white border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1 ml-16 md:ml-64 h-full overflow-y-auto bg-light-background-color px-4 md:px-10 pt-12 lg:pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
