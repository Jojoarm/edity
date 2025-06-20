import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ChevronDown, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { navLinks } from '../../assets/assets';

const Navbar = () => {
  const user = false;
  // const user = {
  //   name: 'Dev Armani',
  //   image: '',
  //   email: 'devarmani33@gmail.com',
  // };
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  //To close user dropdown on clicking the page
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserOpen(false);
      }
    };

    if (isUserOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserOpen]);

  return (
    <nav className="w-full flex items-center justify-between bg-light-background-color py-10 px-4 md:px-16 lg:px-24 xl:px-32 z-50">
      {/* Logo */}
      <Link
        onClick={() => {
          scrollTo({ top: 0, behavior: 'smooth' });
        }}
        to="/"
      >
        <h2 className=" text-primary text-4xl lg:text-5xl font-bold">EDITY</h2>
      </Link>

      {/* Desktop NavLinks */}
      <div className="hidden md:flex items-center justify-start gap-8">
        {navLinks.map((link, i) => (
          <div key={i}>
            {Array.isArray(link.content) ? (
              <div className="group relative ">
                <div className="flex items-start justify-start text-gray-700 gap-1 cursor-pointer">
                  <span className="">{link.name}</span>
                  <ChevronDown className="size-7 transition-['rotate'] lg:group-hover:rotate-[180deg]" />
                </div>
                <div className="bg-gray-700 h-0.5 w-0 group-hover:w-full transition-all duration-300" />

                {/* Dropdown */}
                <div className="absolute left-0 top-full z-50 hidden text-black w-[300px] pt-2 group-hover:block">
                  <div className="mt-2 p-1.5 flex flex-col gap-1 bg-white shadow-lg rounded-sm border border-gray-200 ">
                    {link.content.map((subLink, idx) => (
                      <Link
                        key={idx}
                        to={subLink.path}
                        onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
                        className="block border-b border-solid border-gray-200 last:border-none px-3 hover:bg-[#1900410a] py-3 font-medium"
                      >
                        {subLink.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to={link.path}
                onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex flex-col gap-0.5 text-gray-700 "
              >
                {link.name}
                <div className="bg-gray-700 h-0.5 w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Login / User Menu */}
      <div className="flex gap-1">
        {user ? (
          <div className="relative " ref={userMenuRef}>
            <div
              onClick={() => setIsUserOpen(!isUserOpen)}
              className="size-8 md:size-12 flex justify-center items-center rounded-full bg-gray-600 overflow-hidden cursor-pointer"
            >
              {user.image ? (
                <img
                  src={`${user?.image}`}
                  alt="profile picture"
                  className=" object-cover "
                  referrerPolicy="no-referrer"
                />
              ) : (
                <p className="text-center text-white font-bold text-2xl">
                  {user.name[0]}
                </p>
              )}
            </div>
            {/* User Menu Content */}
            {isUserOpen && (
              <div className="absolute top-12 md:top-15 right-0 w-[300px] md:w-[350px] z-50 bg-white rounded-2xl shadow shadow-black pb-7">
                <div className="flex border-b border-gray-300 gap-5 p-5">
                  <div className="w-14 flex justify-center items-center  overflow-hidden ">
                    {user.image ? (
                      <img
                        src={`${user.name[0]}`}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                        className="size-8 md:size-12 rounded-full object-contain m-auto"
                      />
                    ) : (
                      <p className="text-center text-white bg-gray-600 rounded-full px-3 md:px-4 py-1 md:py-1.5 font-bold text-xl md:text-2xl">
                        {user.name[0]}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="font-normal">{user.email}</p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigate('/user/profile');
                    scrollTo({ top: 0, behavior: 'smooth' });
                    setIsUserOpen(!isUserOpen);
                  }}
                  className="flex border-b border-gray-300 gap-6 py-3 px-5 hover:bg-slate-100 cursor-pointer"
                >
                  <div className="w-14">
                    <Settings className="size-5 text-gray-700 m-auto" />
                  </div>
                  <p className="flex-1 text-gray-700">Manage Account</p>
                </div>

                <div
                  onClick={() => {
                    navigate('/my-bookings');
                    scrollTo({ top: 0, behavior: 'smooth' });
                    setIsUserOpen(!isUserOpen);
                  }}
                  className="flex border-b border-gray-300 gap-6 py-3 px-5 hover:bg-slate-100 cursor-pointer"
                >
                  <div className="w-14">
                    <LayoutDashboard className="size-5 text-gray-700 m-auto" />
                  </div>
                  <p className="flex-1 text-gray-700">My Bookings</p>
                </div>

                <div
                  //   onClick={handleLogout}
                  className="flex border-b border-gray-300 gap-6 py-3 px-5 hover:bg-slate-100 cursor-pointer"
                >
                  <div className="w-14 ">
                    <LogOut className="size-5 text-gray-700 m-auto" />
                  </div>
                  <p className="flex-1 text-gray-700">Sign out</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              navigate('/sign-in');
              scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden md:block bg-primary-500 text-white px-8 py-2.5 rounded-xl transition-all duration-500 cursor-pointer"
          >
            Login
          </button>
        )}

        {/* Mobile Menu */}

        <div className="flex items-center gap-3 md:hidden">
          <img
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            src="/assets/icons/menu.svg"
            className="h-8 "
            alt="menu icon"
          />
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`fixed top-0 left-0 z-50 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-2 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="absolute top-15 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="/assets/icons/closeIcon.svg"
            alt="close-menu"
            className="h-6.5"
          />
        </button>

        {/* NavLinks */}
        {navLinks.map((link, i) => (
          <div key={i} className="w-full">
            {Array.isArray(link.content) ? (
              <div className="w-full">
                <button
                  className="flex items-center w-full text-left px-4 py-3 text-gray-700 border-b border-gray-200"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.name ? null : link.name
                    )
                  }
                >
                  <span>{link.name}</span>
                  <ChevronDown
                    className={`size-5 transform transition-transform ${
                      openDropdown === link.name ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown content */}
                {openDropdown === link.name && (
                  <div className="bg-white w-full">
                    {link.content.map((subLink, idx) => (
                      <Link
                        key={idx}
                        to={subLink.path}
                        onClick={() => {
                          scrollTo({ top: 0, behavior: 'smooth' });
                          setIsMenuOpen(false); // Close menu
                          setOpenDropdown(null); // Close dropdown
                        }}
                        className="block px-6 py-2 text-gray-600 hover:bg-gray-100 border-b border-gray-200"
                      >
                        {subLink.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={link.path}
                onClick={() => {
                  scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-3 text-gray-700 border-b border-gray-200"
              >
                {link.name}
              </Link>
            )}
          </div>
        ))}

        {!user && (
          <button
            onClick={() => {
              navigate('/sign-in');
              scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-10 bg-primary text-white px-8 py-2.5 rounded-xl transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
