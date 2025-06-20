import InterfaceCard from '../cards/InterfaceCard';
import CircularShape from '../CircularShape';

const Solutions = () => {
  return (
    <section className="relative section w-full bg-light-background-color overflow-hidden">
      <CircularShape
        xPosition="-left-40"
        yPosition="-top-40"
        widthClass="w-[400px]"
        heightClass="h-[400px]"
        borderClass="border-[60px]"
      />
      <CircularShape
        xPosition="-right-50"
        yPosition="bottom-0"
        widthClass="w-[400px]"
        heightClass="h-[400px]"
        borderClass="border-[60px]"
      />
      <div className="relative flex flex-col py-20 items-center text-center md:text-left md:items-start gap-4">
        <p className="text-sm text-primary">Our Solutions</p>
        <h1 className="text-3xl font-bold lg:text-4xl xl:text-5xl">
          Empowering Educators, learners and stakeholders&nbsp; Through
          Real-Time Insights
        </h1>
        <p className="text-lg font-light text-gray-600">
          Discover how Edity transforms teacher training and performance with
          cutting-edge AI technology.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          <InterfaceCard
            imgUrl="/assets/images/card-img2.png"
            alt="correlation scatter graph of model and observation data on a digital tablet"
            title="School Management Interface"
            description="Tailored dashboards for school leaders to automate assessment and performance tracking."
          />
          <InterfaceCard
            imgUrl="/assets/images/card-img3.png"
            alt="Pretty student working on her futuristic tablet in a library"
            title="Educators Interface"
            description="Access essential tools for lesson planning and professional development to enhance teaching effectiveness."
          />
          <InterfaceCard
            imgUrl="/assets/images/card-img4.png"
            alt="Statistics of business concept. Finance chart. Financial planning. Data analysis."
            title="Stakeholders Interface"
            description="Unique dashboards for conducting surveys to gather data-driven data for effective decision-making in educational policy and resource allocation."
          />
          <InterfaceCard
            imgUrl="/assets/images/card-img5.png"
            alt="dashboard for business analysis"
            title="Learners Dashboard"
            description="Interactive AI tools to support personalized&nbsp; learning and progress insights for students."
          />
          <InterfaceCard
            imgUrl="/assets/images/card-img6.png"
            alt="Data scientists. Male programmer using laptop analyzing and developing in various information on futuristic virtual interface screen"
            title="Researchers Interface"
            description="Comprehensive analytics and research tools for in-depth educational data exploration."
          />
        </div>
      </div>
    </section>
  );
};

export default Solutions;
