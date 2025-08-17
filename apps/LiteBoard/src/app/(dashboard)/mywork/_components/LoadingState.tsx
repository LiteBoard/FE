import React from 'react';

interface LoadingStateProps {
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6 w-64"></div>
        <div className="flex gap-6">
          <div className="w-[265px] h-[148px] bg-gray-200 rounded-3xl"></div>
          <div className="w-[265px] h-[148px] bg-gray-200 rounded-3xl"></div>
          <div className="w-[265px] h-[148px] bg-gray-200 rounded-3xl"></div>
        </div>
      </div>
      <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
    </div>
  );
}; 