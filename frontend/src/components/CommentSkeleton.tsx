import React from 'react';

export default function CommentSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-3.5 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-3.5 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-4/5 h-3.5 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
