import React from 'react';

interface TestimonialProps {
  message: string;
  name: string;
  role: string;
  location: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  message,
  name,
  role,
  location,
  image,
}) => {
  return (
    <div className="w-full flex flex-col space-y-10 max-w-6xl">
      <p className="text-lg text-gray-600 text-center italic">“{message}”</p>
      <div className="flex p-6 gap-6 items-center justify-end">
        <div className="flex flex-col justify-end items-end">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            {name}
          </h2>
          <p className="text-base font-normal text-right">{role}</p>
          <p className="italic text-sm text-gray-600 capitalize">{location}</p>
        </div>
        <div className="size-[80px] sm:size-[100px] rounded-full shadow-md border p-3 shadow-whitesmoke border-whitesmoke ">
          <img
            src={image}
            alt={`${name} profile`}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
