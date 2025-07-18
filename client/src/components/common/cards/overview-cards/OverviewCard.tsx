import type { ReactNode } from 'react';

type OverviewCardProps = {
  iconClass: string;
  title: string;
  description: string;
  children: ReactNode;
};

const OverviewCard = ({
  iconClass,
  title,
  description,
  children,
}: OverviewCardProps) => {
  return (
    <div className="bg-navy-50 p-4 w-full rounded-2xl shadow-md border-b border-gray-200 shadow-gray-600">
      <div className="relative flex items-end h-[380px]  bg-navy-50 group cursor-pointer overflow-hidden">
        <div className="absolute inset-0 h-[250px] p-6 bg-navy-50 flex justify-center pt-5 transition-transform ease-in duration-300 group-hover:scale-98 group-hover:translate-y-2">
          {children}
        </div>
        <div className="relative transition-transform ease-in duration-300 group-hover:scale-95 group-hover:-translate-y-4">
          <div className="absolute inset-0 bg-navy-50 rounded-xl shadow-md mask-t-from-75%" />

          <div className="relative flex flex-col gap-5 text-dark-background-color overflow-hidden rounded-xl">
            <div className="relative z-20 flex flex-col items-start p-5">
              <i
                className={`${iconClass} text-4xl md:text-5xl text-gray-500 mb-2`}
              ></i>
              <h2 className="font-roboto text-lg md:text-xl lg:text-2xl font-semibold">
                {title}
              </h2>
              <p className="text-sm md:text-md lg:text-lg text-gray-500">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
