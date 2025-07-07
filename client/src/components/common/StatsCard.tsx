type StatsCardProps = {
  icon: string;
  title: string;
  value: number | string;
  subtitle?: string;
  bgColor: string;
};
const StatsCard = ({
  icon,
  title,
  value,
  subtitle,
  bgColor,
}: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-4 rounded-full text-center ${bgColor}`}>
          <i className={`${icon} text-white text-xl`}></i>
          {/* <Icon className="w-6 h-6 text-white" /> */}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
