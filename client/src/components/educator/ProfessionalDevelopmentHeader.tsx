import { NavLink } from 'react-router-dom';

const ProfessionalDevelopmentHeader = () => {
  const navItems = [
    {
      id: 1,
      label: 'Dashboard',
      path: '/educator/professional-development-tracker',
    },
    {
      id: 2,
      label: 'Activities',
      path: '/educator/professional-development-tracker/activities',
    },
    {
      id: 3,
      label: 'Goals',
      path: '/educator/professional-development-tracker/goals-management',
    },
    {
      id: 4,
      label: 'Reports',
      path: '/educator/professional-development-tracker/view-reports',
    },
    {
      id: 5,
      label: 'Profile',
      path: '/educator/professional-development-tracker/profile',
    },
  ];
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <i className="fa-solid fa-book-open-reader text-primary mr-3 text-2xl"></i>
            <h1 className="hidden md:block xl:text-xl lg:text-lg font-bold text-gray-900 font-roboto">
              Professional Development Tracker
            </h1>
          </div>
          <nav className="flex flex-wrap space-x-2 md:space-x-8 text-sm md:text-base">
            {navItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.id}
                end={item.id === 1}
                className={({ isActive }: { isActive: boolean }) =>
                  `${
                    isActive
                      ? 'text-primary font-medium hover:text-primary-100'
                      : 'text-gray-600  hover:text-gray-900'
                  } `
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ProfessionalDevelopmentHeader;
