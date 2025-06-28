import { ChevronRight, Plus, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  borderColor: string;
  lightColor: string;
  color: string;
  IconComponent: LucideIcon;
  title: string;
  description: string;
  features: string[];
  path: string;
  // onSubmit: () => void;
};

const ActionToolCard = ({
  borderColor,
  lightColor,
  color,
  IconComponent,
  title,
  description,
  features,
  path,
}: // onSubmit,
Props) => {
  return (
    <div
      className={`bg-white rounded-xl w-full flex flex-col shadow-sm border ${borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
    >
      {/* Tool Header */}
      <div className={`${lightColor} p-6 rounded-t-xl`}>
        <div className="flex items-center justify-between mb-4 ">
          <div className={`${color} p-3 rounded-lg`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Tool Features */}
      <div className="p-6 h-full">
        <h4 className="text-xs md:text-sm font-medium text-gray-900 mb-3">
          Key Features:
        </h4>
        <ul className="space-y-2">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <div className={`w-1.5 h-1.5 ${color} rounded-full mr-3`}></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <Link
          to={path}
          className={`w-full ${color} text-sm text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
        >
          <Plus className="w-4 h-4" />
          Open Tool
        </Link>
      </div>
    </div>
  );
};

export default ActionToolCard;
