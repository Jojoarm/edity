type AiToolCardProps = {
  icon: string;
  bgFill: string;
  textColor: string;
  title: string;
  description: string;
  onClick?: () => void;
};

const AiToolCard = ({
  icon,
  bgFill,
  textColor,
  title,
  description,
  onClick,
}: AiToolCardProps) => {
  return (
    <div className="feature-card group cursor-pointer" onClick={onClick}>
      <div
        className={` mx-auto mb-4 flex text-[2.5rem] items-center justify-center text-center rounded-3xl ${bgFill} ${textColor} w-20 h-20 group-hover:scale-110 transition-transform duration-300`}
      >
        <i className={`icon ${icon}`} aria-hidden="true"></i>
      </div>
      <div className="text-[1.3rem] text-center font-semibold mb-3 text-gray-800 group-hover:text-gray-900">
        {title}
      </div>
      <div className="text-[0.9rem] text-center opacity-80 leading-[1.4] text-gray-600">
        {description}
      </div>
    </div>
  );
};

export default AiToolCard;
