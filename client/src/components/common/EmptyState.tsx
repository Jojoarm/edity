import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  description = 'There are currently no items to display.',
  icon,
  className = '',
}) => {
  const defaultIcon = (
    <svg
      className="w-16 h-16 text-gray-300 mx-auto"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-8 ${className}`}
    >
      <div className="mb-4">{icon || defaultIcon}</div>
      <h3 className="text-lg font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-sm text-gray-400 max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
