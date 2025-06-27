import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router';
import { useAppStore } from '../../contexts/useAppStore';
import { fetchUser, logout } from '../../api/user-api';
import { adminSidebarItems } from '../../assets/assets';
import Icon from '../common/Icon';

const Sidebar = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  //user logout
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await fetchUser();
      toast.success('Logged Out!');
      navigate('/');
      scrollTo(0, 0);
    },
    onError: (error: Error) => {
      toast.error((error as Error).message);
    },
  });
  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <section className="flex flex-col h-full  pt-12 lg:pt-10">
      {/* Logo */}
      <Link to="/" className="pb-8 px-4 md:px-8 border-b border-light-100">
        <h2 className=" text-primary text-2xl lg:text-4xl font-bold">EDITY</h2>
      </Link>

      <div className="flex flex-col gap-2 h-full md:w-64 w-16 text-base">
        {adminSidebarItems.map((item) => (
          <NavLink
            to={item.href}
            key={item.id}
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center py-3 px-4 md:px-8 gap-3 ${
                isActive
                  ? 'border-r-4 md:border-r-[6px] bg-blue-600/10 text-primary border-primary'
                  : 'hover:bg-blue-400/10 border-white text-gray-700'
              }`
            }
          >
            <Icon
              src={item.icon}
              className="min-h-6 min-w-6"
              alt={item.label}
            />
            <p className="hidden md:block text-center">{item.label}</p>
          </NavLink>
        ))}
      </div>

      <footer className="flex pl-4 md:pl-8 items-center gap-3 pb-8">
        <div className="hidden md:flex gap-2">
          <img
            src={user?.profilePicture || user?.name[0].toUpperCase()}
            alt="profile picture"
            className="size-10 rounded-full aspect-square"
            referrerPolicy="no-referrer"
          />
          <article className="mflex flex-col max-w-[115px]">
            <h2 className="text-sm md:text-base font-semibold text-dark-200 truncate">
              {user?.name}
            </h2>
            <p className="text-gray-100 text-xs md:text-sm font-normal truncate">
              {user?.email}
            </p>
          </article>
        </div>

        <LogOut
          onClick={handleLogout}
          className="size-6 cursor-pointer text-gray-500"
        />
      </footer>
    </section>
  );
};

export default Sidebar;
