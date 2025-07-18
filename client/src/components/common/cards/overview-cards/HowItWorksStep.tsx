import React from 'react';

interface HowItWorksStepProps {
  step: number;
  imageSrc: string;
  iconClass: string;
  title: string;
  description: string;
  reverse?: boolean;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  step,
  imageSrc,
  iconClass,
  title,
  description,
  reverse = false,
}) => {
  return (
    <div
      className={`flex ${
        reverse
          ? 'flex-col lg:flex-row-reverse'
          : 'flex-col-reverse lg:flex-row'
      } gap-4 lg:gap-8 items-center justify-center mt-5`}
    >
      <div className="relative flex items-center justify-center w-full lg:w-[60%]">
        <img
          src={imageSrc}
          alt={`step-${step}-illustration`}
          className="object-contain transition-all duration-300 max-h-[592px]"
        />
      </div>

      <div className="flex flex-col gap-2 lg:gap-5 w-full lg:w-[40%]">
        <p className="text-lg text-gray-600 font-semibold text-center underline font-roboto">
          Step {step}
        </p>
        <div className="flex items-center justify-center text-center rounded-3xl bg-primary text-white size-12 md:size-15 lg:size-20 ">
          <i className={`${iconClass} text-2xl md:text-3xl lg:text-4xl`} />
        </div>

        <h2 className="font-bold text-lg md:text-2xl lg:text-3xl text-dark-background-color">
          {title}
        </h2>
        <p className=" text-xs md:text-base lg:text-lg text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksStep;
