type Props = {
  num: string;
  title: string;
  description: string;
};

const NumberCard = ({ num, title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 md:gap-4 md:max-w-xs md:p-12 bg-[#ffffff] p-8 rounded-3xl shadow-lg border-b border-gray-200 shadow-[#ccc] ">
      <div
        className={`mx-auto mb-3 md:mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl text-primary bg-light-background-color `}
      >
        <p className="font-roboto">{num}</p>
      </div>
      <h4 className="md-2 md:mb-4 text-xl md:text-2xl font-roboto font-semibold">
        {title}
      </h4>
      <p className="text-gray-600 text-sm font-light md:text-base font-roboto">
        {description}
      </p>
    </div>
  );
};

export default NumberCard;
