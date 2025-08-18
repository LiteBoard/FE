import React from 'react';
import { Skeleton } from '@LiteBoard/ui';

interface LoadingStateProps {
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* 대시보드 제목 스켈레톤 */}
      <Skeleton className="h-8 w-64 mb-6" />
      
      {/* 대시보드 카드들 스켈레톤 */}
      <div className="flex gap-6">
        <Skeleton className="w-[265px] h-[148px] rounded-3xl" />
        <Skeleton className="w-[265px] h-[148px] rounded-3xl" />
        <Skeleton className="w-[265px] h-[148px] rounded-3xl" />
      </div>
      
      {/* 하단 구분선 */}
      <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
    </div>
  );
}; 