import { Link } from 'react-router-dom';
import CircularShape from '../CircularShape';

const Hero = () => {
  return (
    <section className="relative section bg-light-background-color overflow-hidden pb-10">
      <CircularShape
        xPosition="-left-56"
        yPosition="top-0"
        width="400px"
        height="400px"
        border="60px"
      />
      <CircularShape
        xPosition="-right-60"
        yPosition="bottom-14"
        width="400px"
        height="400px"
        border="60px"
        hidden
      />
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
            educators receive tailored support for effective student engagement
            and learning outcomes.
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
            src="/assets/images/card-img1.png"
            alt="Metaverse VR virtual meeting conference, business office digital world technology MR mixed reality presentation Global business finance GDP graph chart report stock exchange market trading investment data analytics"
            className="relative mt-8 aspect-square w-full rounded-2xl object-cover lg:mt-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
