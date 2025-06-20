import ToolCard from '../cards/ToolCard';

const Info = () => {
  return (
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
              src="/assets/images/chartImg.png"
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
  );
};

export default Info;
