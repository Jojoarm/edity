import { calculateTrendPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  subtitle: {
    increment: string;
    decrement: string;
  };
  description: {
    increment: string;
    decrement: string;
  };
  total: number | string;
  lastCount: number;
  currentCount: number;
}

const SummaryCard = ({
  title,
  subtitle,
  description,
  currentCount,
  lastCount,
  total,
}: SummaryCardProps) => {
  const { trend, percentage } = calculateTrendPercentage(
    currentCount,
    lastCount
  );

  const isDecrement = trend === 'decrement';

  return (
    <div className="relative flex flex-col gap-4 h-full p-6 rounded-2xl shadow-sm border border-gray-200 bg-white transition-transform duration-200 group hover:scale-[1.02]">
      <div
        className={`absolute top-0 right-0 my-2 mx-4 rounded-md px-2 py-1 flex items-center gap-1 text-xs font-semibold ${
          isDecrement
            ? 'text-orange-700 bg-orange-100 border border-orange-300'
            : 'text-green-700 bg-green-100 border border-green-300'
        }`}
      >
        {isDecrement ? (
          <TrendingDown className="w-4 h-4" />
        ) : (
          <TrendingUp className="w-4 h-4" />
        )}
        <span>{`${isDecrement ? '-' : '+'}${percentage}%`}</span>
      </div>
      {/* Header */}
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-base font-roboto text-gray-600 font-medium">
          {title}
        </p>
        <h2 className="font-bold text-2xl text-gray-900">{total}</h2>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <p
          className={`text-sm font-semibold ${
            isDecrement ? 'text-orange-700' : 'text-green-new-500'
          }`}
        >
          {isDecrement ? subtitle.decrement : subtitle.increment}
        </p>
        <p className="text-sm text-gray-600 leading-snug">
          {isDecrement ? description.decrement : description.increment}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
