import { Link } from 'react-router-dom';
import ToolCard from '../../components/common/cards/ToolCard';

const Home = () => {
  return (
    <div className="w-full  h-full ">
      <section className="relative section bg-light-background-color overflow-hidden pb-10">
        <div className="absolute -left-56 top-0 h-[400px] w-[400px] rounded-full border-[60px] border-medium-background-color" />
        <div className="absolute hidden lg:block -right-60 bottom-14 h-[400px] w-[400px] rounded-full border-[60px] border-medium-background-color"></div>
        <div className="relative flex flex-col lg:flex-row">
          <div className="mt-12 w-full lg:mt-24 lg:w-[55%] lg:pr-14">
            <h1 className="mb-8 text-center text-4xl font-bold lg:text-left xl:text-5xl 2xl:text-6xl">
              <div className="">Collaborative Education</div>

              <div className="text-primary">Powered by Data</div>

              <div className="">Equipping Stakeholders with Insights</div>
            </h1>
            <p className="mb-8 text-center text-gray-600 lg:text-left">
              Edity revolutionizes public education with AI-driven tools that
              enhance teacher performance and training. Our intuitive platform
              simplifies data collection and offers real-time insights, ensuring
              educators receive tailored support for effective student
              engagement and learning outcomes.
            </p>
            <div className="mb-12 text-center lg:text-left">
              <Link
                to="/contact-us"
                className="items-center rounded bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-200"
              >
                Get Started Today
              </Link>
            </div>
          </div>

          <div className="relative mt-12 hidden w-full h-full overflow-visible lg:block lg:w-[45%] lg:p-6">
            <div className="absolute bottom-0 left-0 w-0 h-0 border-[100px] border-transparent border-l-primary border-b-primary" />
            <div className="absolute top-16 -right-9 h-[145px] w-[190px] bg-[radial-gradient(#cacccc_2px,transparent_3px)] bg-[length:16px_16px]" />
            <img
              src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/56bb679c-857c-4312-751d-ef21582af100/public"
              alt="Metaverse VR virtual meeting conference, business office digital world technology MR mixed reality presentation Global business finance GDP graph chart report stock exchange market trading investment data analytics"
              className="relative mt-8 aspect-square w-full rounded-2xl object-cover lg:mt-0"
              data-landingsite-gallery-type="image"
              data-seo-image=""
              data-media='{"id":"1398629042","src":"iStock","type":"image"}'
            />
          </div>
        </div>
      </section>

      <section className="section flex items-center flex-col gap-6 py-10">
        <h1 className="mb-2 text-center text-3xl font-bold xl:text-4xl 2xl:text-5xl">
          Transform Your Educational Experience with Edity
        </h1>
        <h3 className="mx-auto mb-8 w-3/4 text-center text-2xl text-gray-700 font-semibold">
          Free Tools for All Educators
        </h3>
        <div className="w-full flex flex-wrap space-y-6 md:space-y-0 gap-6 items-center text-center justify-center">
          <ToolCard
            title="Basic Lesson Templates"
            description="Access standardized lesson plan templates to kickstart your teaching preparation."
            bgFill="bg-blue-100"
            textColor="text-blue-500"
            icon="fa-pencil-ruler"
          />
          <ToolCard
            title="Basic Performance Insights"
            description="View simplified student performance summaries to track basic progress."
            bgFill="bg-teal-100"
            textColor="text-teal-500"
            icon="fa-envelope"
          />
          <ToolCard
            title="Community Resources"
            description="Access a basic library of shared educational resources and community tips."
            bgFill="bg-stone-100"
            textColor="text-stone-500"
            icon="fa-credit-card"
          />
        </div>

        <div className="w-full rounded-2xl bg-light-background-color p-5 flex flex-col items-center mt-10 py-16">
          <h2 className="mx-auto mb-6 md:mb-12 w-3/4 text-center text-2xl font-bold">
            Premium Tools for Advanced Educators
          </h2>
          <p className="mx-auto mb-6 md:mb-12 w-3/4 text-center font-normal text-dark-500">
            Unlock these cutting-edge tools and resources for only{' '}
            <span className="text-primary text-3xl font-bold">$20/month.</span>
          </p>

          <div className="flex flex-row">
            <div className="hidden w-[30%] xl:block">
              <img
                src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/8533c04f-9e28-4b24-bcc7-8c019af98e00/public"
                alt="Business 3d tablet virtual growth arrow financial graph on digital technology strategy background with finance data marketing chart analysis report or success investment diagram economy screen profit."
                className="relative mt-8 h-full rounded-2xl object-cover lg:mt-0"
              />
            </div>
            <div className="w-full xl:w-[70%] grid grid-cols-2 md:grid-cols-3 gap-y-6 md:gap-y-12 items-start">
              <ToolCard
                title="Personalized Lesson Planning"
                description="Create customized lesson plans that cater to your student's diverse learning needs and objectives."
                bgFill="bg-blue-100"
                textColor="text-blue-500"
                icon="fa-pencil-ruler"
              />
              <ToolCard
                title="360-Degree Reporting Tools"
                description="Access comprehensive reports through robust data collection, enhancing your operational insights."
                bgFill="bg-orange-100"
                textColor="text-orange-500"
                icon="fa-server"
              />
              <ToolCard
                title="Automated Assessment Tools"
                description="Streamline grading processes and easily analyze student performance to ensure effective learning outcomes."
                bgFill="bg-rose-100"
                textColor="text-rose-500"
                icon="fa-map-marker-alt"
              />
              <ToolCard
                title="Real-Time Data Insights"
                description="Utilize interactive dashboards that provide real-time analytics to facilitate data-driven decisions."
                bgFill="bg-teal-100"
                textColor="text-teal-500"
                icon="fa-envelope"
              />
              <ToolCard
                title="Collaborative Educator Platforms"
                description="Engage in collaborative planning while sharing resources and best practices with fellow educators."
                bgFill="bg-stone-100"
                textColor="text-stone-500"
                icon="fa-credit-card"
              />
              <ToolCard
                title="Integrated Student Learning Tools"
                description="Empower students with access to learning resources that promote continual progress and engagement."
                bgFill="bg-violet-100"
                textColor="text-violet-500"
                icon="fa-calendar-check"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section  w-full mt-30 mb-10">
        <div className="relative w-full flex  bg-primary rounded-3xl md:min-h-[535px]">
          <div className="relative w-full px-30 py-10 lg:pt-32 md:w-1/2 text-[#ffffff] overflow-hidden rounded-3xl">
            <div className="absolute -left-16 -top-16 h-[300px] w-[300px] rounded-full border-[50px] border-medium-background-color" />
            <div className="relative flex flex-col items-center md:items-start">
              <p className="mb-4 text-sm">
                Transform your educational institution with Edity
              </p>
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl xl:text-5xl">
                AI-powered EdTech solutions for enhanced teacher performance
              </h2>
              <p className="mb-12 text-base">
                Empowering educators with data-driven insights for effective
                learning
              </p>
              <button
                // onClick={() => {
                //   navigate('/sign-up');
                //   scrollTo({ top: 0, behavior: 'smooth' });
                // }}
                className="bg-white hover:bg-light-background-color text-primary text-sm font-semibold px-8 py-3 cursor-pointer rounded transition-all duration-500"
              >
                Sign Up Now
              </button>
            </div>
          </div>
          <div className="relative hidden md:block w-1/2">
            <div className="absolute bottom-0 lg:h-[115%] xl:left-12 xl:h-[125%]">
              <img
                className="relative z-20 h-full"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/man_with_ipad.png"
                alt="Business Owner"
                data-landingsite-gallery-type="person"
              />
            </div>
            <div className="absolute h-full w-full rounded-3xl overflow-hidden">
              <div className="absolute right-0 top-10 h-[145px] w-[150px] bg-[radial-gradient(#cccacc,transparent_3px)] [background-size:16px_16px] 2xl:right-29 2xl:w-[190px]" />
              <div className="absolute -bottom-16 -right-16 h-[300px] w-[300px] rounded-full border-[50px] border-medium-background-color" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
