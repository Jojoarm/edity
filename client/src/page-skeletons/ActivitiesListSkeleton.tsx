import React from 'react';

const ActivitiesListSkeleton = () => {
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Title and Action Buttons Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-96 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-80"></div>
        </div>
        <div className="flex items-center space-x-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* Filters Section Skeleton */}
      <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-24 absolute right-4 top-2"></div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-2">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap space-y-1 space-x-4">
              <div className="h-10 bg-gray-200 rounded w-28"></div>
              <div className="h-10 bg-gray-200 rounded w-28"></div>
              <div className="h-10 bg-gray-200 rounded w-28"></div>
            </div>
          </div>

          {/* Result Summary */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Activities Table Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="animate-pulse">
          {/* Table Header */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-6">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
            <div
              key={row}
              className="border-b border-gray-200 p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-6">
                {/* Checkbox */}
                <div className="w-4 h-4 bg-gray-200 rounded"></div>

                {/* Activity Title and Description */}
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-64"></div>
                </div>

                {/* Type */}
                <div className="w-20">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>

                {/* Provider */}
                <div className="w-24">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>

                {/* Hours */}
                <div className="w-16">
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>

                {/* Date */}
                <div className="w-24">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>

                {/* Status */}
                <div className="w-24">
                  <div className="h-6 bg-gray-200 rounded-md w-20"></div>
                </div>

                {/* Actions */}
                <div className="w-32">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Skeleton */}
          <div className="p-4 flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 bg-gray-200 rounded w-8"></div>
              <div className="h-8 bg-gray-200 rounded w-8"></div>
              <div className="h-8 bg-gray-200 rounded w-8"></div>
              <div className="h-8 bg-gray-200 rounded w-8"></div>
              <div className="h-8 bg-gray-200 rounded w-8"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ActivitiesListSkeleton;
