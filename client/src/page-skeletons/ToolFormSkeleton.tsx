const ToolFormSkeleton = () => {
  return (
    <div className="py-5 px-10 mb-10 w-full flex flex-col items-center justify-center shadow-xl bg-navy-50 border border-gray-300/80 rounded-2xl">
      {/* Form Title Skeleton */}
      <div className="w-full mb-6">
        <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto animate-pulse"></div>
      </div>

      {/* Form Fields Row Skeleton */}
      <div className="w-full flex flex-col md:flex-row space-x-5 mb-6">
        {/* Subject Field Skeleton */}
        <div className="flex-1 mb-4 md:mb-0">
          <div className="mb-2">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
          <div className="relative">
            <div className="h-12 bg-gray-100 border border-gray-300 rounded-lg animate-pulse flex items-center px-3">
              <div className="w-5 h-5 bg-gray-200 rounded mr-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Class Level Field Skeleton */}
        <div className="flex-1 mb-4 md:mb-0">
          <div className="mb-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          <div className="relative">
            <div className="h-12 bg-gray-100 border border-gray-300 rounded-lg animate-pulse flex items-center px-3">
              <div className="w-5 h-5 bg-gray-200 rounded mr-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Academic Term Field Skeleton */}
        <div className="flex-1 mb-4 md:mb-0">
          <div className="mb-2">
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
          </div>
          <div className="relative">
            <div className="h-12 bg-gray-100 border border-gray-300 rounded-lg animate-pulse flex items-center px-3">
              <div className="w-5 h-5 bg-gray-200 rounded mr-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Children Content Skeleton - placeholder for additional form content */}
      <div className="w-full mb-6">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-12 bg-gray-100 border border-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="w-full flex justify-center">
        <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ToolFormSkeleton;
