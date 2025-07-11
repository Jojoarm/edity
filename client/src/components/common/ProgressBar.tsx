type ProgressBarProps = {
  current: number;
  target: number;
};
const ProgressBar = ({ current, target }: ProgressBarProps) => {
  const percentage = (current / target) * 100;
  const getColor = (percentage: number) =>
    percentage >= 70
      ? 'bg-green-500'
      : percentage >= 50
      ? 'bg-yellow-500'
      : percentage >= 30
      ? 'bg-orange-500'
      : 'bg-gray-500';

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600 font-semibold">Progress</span>
        <span className="font-medium">
          {current}/{target}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${getColor(
            percentage
          )} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {Math.round(percentage)}% complete
      </div>
    </div>
  );
};

export default ProgressBar;
