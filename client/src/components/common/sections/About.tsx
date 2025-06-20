import NumberCard from '../cards/NumberCard';

const About = () => {
  return (
    <section className="section my-20 w-full">
      <div className="w-full flex flex-col py-20 items-center justify-center text-center gap-4">
        <h1 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
          How Edity Empowers Educators
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-600">
          Revolutionize your teaching experience with Edity
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:space-x-8">
          <NumberCard
            num="1"
            title="Engage with Interactive Tools"
            description="Utilize dynamic resources tailored to engage and excite your students."
          />
          <NumberCard
            num="2"
            title="Personalize Learning Experiences"
            description="Customize educational paths that address performance gaps identified for each teacher"
          />
          <NumberCard
            num="3"
            title="Collaborate Seamlessly"
            description="Work effortlessly with peers, sharing insights and resources in real-time.x"
          />
          <NumberCard
            num="4"
            title="Monitor Progress Effectively"
            description="Track performance metrics to elevate teaching strategies and student outcomes."
          />
        </div>
      </div>
    </section>
  );
};

export default About;
