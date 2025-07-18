import Progress from './Progress';

const TimeSaving = () => {
  return (
    <div className="relative flex items-end h-[400px] w-full p-4 rounded-2xl shadow-md border-b border-gray-200 shadow-gray-600 bg-navy-50 group cursor-pointer overflow-hidden">
      <div className="absolute inset-0 h-[250px] flex justify-center pt-5 transition-transform ease-in duration-300 group-hover:scale-95 group-hover:translate-y-4">
        <Progress />
      </div>
      <div className="relative transition-transform ease-in duration-300 group-hover:scale-95 group-hover:-translate-y-4">
        <div className="absolute inset-0 bg-navy-50 rounded-xl shadow-md mask-t-from-55%" />

        <div className="relative flex flex-col gap-5 text-dark-background-color overflow-hidden rounded-xl">
          <div className="relative z-20 flex flex-col items-start p-5">
            <i className="fa-solid fa-clock text-4xl md:text-5xl text-gray-500 mb-2"></i>
            <h2 className="font-roboto text-lg md:text-xl lg:text-2xl font-semibold">
              Time Saving Tools
            </h2>
            <p className="text-lg text-gray-500">
              Effective Lesson Designs built on proven methods. That means less
              time planning and more teaching, without cutting corners on
              quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSaving;
