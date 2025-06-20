import CircularShape from '../CircularShape';

const Info2 = () => {
  return (
    <section className="section  w-full mt-30 mb-10">
      <div className="relative w-full flex  bg-primary rounded-3xl md:min-h-[535px]">
        <div className="relative w-full py-10 md:pt-32 md:w-1/2 text-[#ffffff] overflow-hidden rounded-3xl">
          <CircularShape
            xPosition="-left-16"
            yPosition="-top-16"
            widthClass="w-[300px]"
            heightClass="h-[300px]"
            borderClass="border-[50px]"
          />
          <div className="w-full px-5 md:px-10 lg:px-30 relative flex flex-col items-center justify-center text-center md:text-start md:items-start">
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
        <div className="relative hidden md:block md:w-1/2">
          <div className="absolute bottom-0 lg:h-[115%] xl:left-12 xl:h-[125%]">
            <img
              className="relative z-20 h-full"
              src="/assets/images/person.png"
              alt="Business Owner"
              data-landingsite-gallery-type="person"
            />
          </div>
          <div className="absolute h-full w-full rounded-3xl overflow-hidden">
            <div className="absolute right-0 top-10 h-[145px] w-[150px] bg-[radial-gradient(#cccacc,transparent_3px)] [background-size:16px_16px] 2xl:right-29 2xl:w-[190px]" />
            <CircularShape
              xPosition="-right-16"
              yPosition="-bottom-16"
              widthClass="w-[300px]"
              heightClass="h-[300px]"
              borderClass="border-[50px]"
              hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info2;
