type ToolCardProps = {
  icon: string;
  bgFill: string;
  textColor: string;
  title: string;
  description: string;
};

const ToolCard = ({
  icon,
  bgFill,
  textColor,
  title,
  description,
}: ToolCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 md:gap-4 md:max-w-xs  p-4">
      <div
        className={`mx-auto mb-3 md:mb-6 flex h-20 w-20 items-center justify-center rounded-3xl text-4xl ${bgFill} ${textColor} `}
      >
        <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
      </div>
      <h4 className="md-2 md:mb-4 text-xl md:text-2xl font-semibold">
        {title}
      </h4>
      <p className="text-gray-600 text-sm md:text-base">{description}</p>
    </div>
  );
};

export default ToolCard;
