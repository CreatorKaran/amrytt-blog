import React from 'react';

export default function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-6 mt-8">

      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="flex gap-5 items-start">
            <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className='flex flex-row justify-between'>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ))}


    </div>
  );
}
