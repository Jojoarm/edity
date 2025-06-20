import { Link } from 'react-router-dom';
import CircularShape from './CircularShape';

const Footer = () => {
  return (
    <section className="section relative w-full overflow-hidden bg-light-background-color text-gray-500/80 py-16 ">
      <CircularShape
        xPosition="-left-40"
        yPosition="-top-40"
        width="400px"
        height="400px"
        border="60px"
      />
      <CircularShape
        xPosition="-right-50"
        yPosition="bottom-0"
        width="400px"
        height="400px"
        border="60px"
      />
      <div className="relative flex flex-wrap justify-between gap-12 mb-8 md:gap-6">
        <div className="max-w-80">
          <Link
            onClick={() => {
              scrollTo({ top: 0, behavior: 'smooth' });
            }}
            to="/"
          >
            <h2 className=" text-primary mb-8 text-xl lg:text-3xl font-bold">
              EDITY
            </h2>
          </Link>
          <p className="text-sm">
            AI-Powered EdTech Platform Enhancing Teacher Performance
          </p>
        </div>

        <div>
          <p className="font-roboto mb-8 text-2xl font-semibold text-gray-800">
            MENU
          </p>
          <ul className="mt-3 mb-8 space-y-4 flex flex-col text-sm">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Overview</a>
            </li>
            <li>
              <a href="#">School Management</a>
            </li>
            <li>
              <a href="#">Educators Interface</a>
            </li>
            <li>
              <a href="#">Learners Dashboard</a>
            </li>
            <li>
              <a href="#">Researchers Interface</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-8 text-2xl font-semibold text-gray-800">
            OUR SERVICES
          </p>
          <ul className="font-roboto mb-8 space-y-4 mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#">School Management Technology</a>
            </li>
            <li>
              <a href="#">Teacher Training and Development</a>
            </li>
            <li>
              <a href="#">Educators Exchange Programs</a>
            </li>
            <li>
              <a href="#">Survey and Research Services</a>
            </li>
            <li>
              <a href="#">Open Source Database</a>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="font-roboto mb-8 text-2xl font-semibold text-gray-800">
            STAY UPDATED
          </p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r">
              {/* Arrow icon */}
              <img
                src="/assets/icons/arrow-left.svg"
                alt="arrow-icon"
                className="w-3.5 invert"
              />
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
      <div className="relative flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} Edity. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
