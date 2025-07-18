interface ProgressCircleProps {
  progress: number; // e.g., 38 for 38%
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const strokePercent = Math.min(Math.max(progress, 0), 100); // Clamp between 0–100
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const dashArray = `${(strokePercent / 100) * circumference} ${circumference}`;
  const rotation = `rotate(${(strokePercent / 100) * 360 - 90} 50 50)`;

  return (
    <svg
      fill="none"
      className="w-full h-full"
      strokeWidth={strokeWidth}
      viewBox="0 0 100 100"
      aria-hidden="true"
      role="presentation"
    >
      {/* Background track */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="rgba(79, 70, 229, 0.1)" // Indigo-500 with opacity
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-100"
      />
      {/* Foreground progress */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="rgb(34, 197, 94)" // Green-500
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashArray}
        transform={rotation}
        className="opacity-100 transition-all duration-500 ease-in-out"
        style={{
          transformOrigin: '50% 50%',
        }}
      />
    </svg>
  );
};

export default ProgressCircle;
