import { useAppStore } from '@/contexts/useAppStore';
import { useNavigate } from 'react-router-dom';

const Transform = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();
  return (
    <section className="section my-20 w-full">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center xl:items-start justify-center xl:justify-start text-center xl:text-left xl:pr-14 gap-4 w-full xl:w-[55%]">
          <h1 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
            Transform your educational experience with Edity!
          </h1>
          <p className="text-base lg:text-lg font-roboto text-gray-600">
            Elevate your educational impact with our AI-powered EdTech platform,
            designed specifically for public schools. Our innovative solution
            empowers administrators to streamline processes, automate
            assessments, and generate comprehensive performance reports,
            dedicating more time to enhancing student experiences.
          </p>
          <div className="xl:pl-8 text-gray-600 font-roboto">
            <ul className="text-base lg:text-lg">
              <li className="mb-4 flex flex-row">
                <i
                  className="fa fa-check mr-4 mt-1 text-green-500"
                  aria-hidden="true"
                ></i>
                <span>
                  Tailored Dashboards - Get customized dashboards equipped with
                  essential tools for lesson planning, student engagement, and
                  professional development.
                </span>
              </li>
              <li className="mb-4 flex flex-row">
                <i
                  className="fa fa-check mr-4 mt-1 text-green-500"
                  aria-hidden="true"
                ></i>
                <span>
                  Data-Driven Insights - Harness sophisticated survey and data
                  analytics tools to derive actionable insights that shape
                  educational policies and resource allocations.
                </span>
              </li>
              <li className="mb-4 flex flex-row">
                <i
                  className="fa fa-check mr-4 mt-1 text-green-500"
                  aria-hidden="true"
                ></i>
                <span>
                  Holistic Performance Tracking - Monitor teacher performance
                  and student progress to ensure every learner excels in their
                  educational journey.
                </span>
              </li>
            </ul>
          </div>
          <p className="text-base lg:text-lg font-roboto text-gray-600">
            With Edity, every strategic choice is grounded in real-time data,
            facilitating continuous improvement in the learning environment.
            Step into the future of education and join us in transforming
            teaching practices and uplifting student achievements.
          </p>
          {!user && (
            <button
              onClick={() => {
                navigate('/sign-up');
                scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary-200 w-[250px] text-white text-sm font-semibold px-8 py-3 cursor-pointer rounded transition-all duration-500"
            >
              Get Started Today
            </button>
          )}
        </div>

        <div className="hidden p-6 xl:block xl:w-[45%]">
          <div className="relative w-full rounded-3xl">
            <div className="absolute -bottom-5 -left-5 w-0 h-0 border-[100px] border-transparent border-l-primary border-b-primary" />
            <div className="absolute top-16 -right-15 h-[145px] w-[190px] bg-[radial-gradient(#cacccc_2px,transparent_3px)] bg-[length:16px_16px]" />
            <div className="relative w-full overflow-hidden">
              <img
                src="/assets/images/card-img7.png"
                alt="Metaverse VR virtual meeting conference, business office digital world technology MR mixed reality presentation Global business finance GDP graph chart report stock exchange market trading investment data analytics"
                className="aspect-square w-full rounded-2xl object-cover"
              />
              <img
                src="/assets/images/card-img8.png"
                alt="Metaverse VR virtual meeting conference, business office digital world technology MR mixed reality presentation Global business finance GDP graph chart report stock exchange market trading investment data analytics"
                className="absolute -bottom-4 -right-4 mt-8 aspect-square w-[40%] border-[20px] border-[#ffffff] rounded-2xl object-cover lg:mt-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transform;
