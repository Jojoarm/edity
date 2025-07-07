type ProgressBarProps = {
  current: number;
  target: number;
  color?: string;
};
const ProgressBar = ({
  current,
  target,
  color = 'bg-orange-300',
}: ProgressBarProps) => {
  const percentage = (current / target) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color} transition-all duration-300`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
