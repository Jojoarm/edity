type TitleProps = {
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
};

const ToolTitle = ({ title, description, icon, iconColor }: TitleProps) => {
  return (
    <div className="w-full h-full flex gap-4  mb-6 bg-navy-50 rounded-3xl shadow border p-6 font-roboto">
      {icon && iconColor && (
        <div className="hidden md:flex items-center justify-center w-[150px] p-4 rounded-3xl bg-dark-background-color">
          <i className={`text-6xl ${icon} ${iconColor}`}></i>
        </div>
      )}
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold text-dark-600 mb-2">
          {title}
        </h1>
        <p className="text-sm md:text-base font-medium text-gray-500/80 ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ToolTitle;
