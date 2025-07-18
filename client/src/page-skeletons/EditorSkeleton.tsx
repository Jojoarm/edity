import React from 'react';

const EditorSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-xl border shadow-md">
      {/* Editor Container */}
      <div className="border rounded-lg overflow-hidden">
        {/* MDX Editor Loading State */}
        <div className="prose max-w-none p-4 min-h-[400px] focus:outline-none border-none">
          {/* Toolbar Skeleton */}
          <div className="toolbar-placeholder border-b p-2 bg-gray-50 flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Editor Content Skeleton */}
          <div className="content-area p-4 space-y-3">
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex justify-end mt-4 gap-4">
        <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-28 h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default EditorSkeleton;
