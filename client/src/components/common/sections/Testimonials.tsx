const Testimonials = () => {
  return (
    <section className="section my-20 w-full">
      <div className="w-full flex flex-col py-10 gap-4">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
            What Our Clients Are Saying
          </h1>
          <p className="text-lg md:text-xl mb-16 w-3/4 font-light text-gray-600">
            Empowering educators and transforming classrooms is at the heart of
            Edity. Our commitment ensures that every teacher receives unmatched
            resources tailored to their needs!
          </p>
        </div>
        <div className="w-full relative">
          <div className="absolute w-full h-full bg-medium-background-color -rotate-3 transform rounded-3xl" />
          <div className="relative z-10 w-full rounded-3xl bg-[#ffffff] py-24 shadow-[0_0_25px_rgba(0,0,0,0.1)]">
            <div className="absolute -top-10 left-10">
              <i
                className="fa-solid fa-quote-left text-8xl text-medium-background-color"
                aria-hidden="true"
              />
            </div>
            <div className="absolute -bottom-10 right-10">
              <i
                className="fa-solid fa-quote-left text-8xl text-medium-background-color"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center sm:justify-end">
              <div className="w-[50%] sm:w-[25%]">
                <div className="relative  mx-auto aspect-square max-h-[300px]">
                  <div className="absolute w-full h-full -top-6 -left-6 rounded-tl-2xl border-2 border-gray-600" />
                  <div className="absolute w-full h-full -bottom-6 -right-6 rounded-br-2xl border-2 border-gray-600" />
                  <div className="w-full h-full relative z-10 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/images/person2.png"
                      alt="Portrait of mid adult successful black mature woman looking at camera with arms crossed"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:w-[65%]">
                <div className="relative flex h-full flex-col justify-center gap-4 p-12">
                  <div className=" text-3xl font-bold">
                    Transformative Insights
                  </div>
                  <div className=" text-base">
                    "Edity has revolutionized my teaching approach. With
                    real-time data insights, I can now tailor my lessons to the
                    specific needs of my students, enhancing engagement and
                    learning outcomes!"
                  </div>
                  <div className="text-base font-bold">- Elohor Agbogoroma</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
