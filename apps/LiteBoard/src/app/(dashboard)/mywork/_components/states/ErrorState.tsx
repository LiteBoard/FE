import React from 'react';
import { WarnIcon } from '@LiteBoard/ui';

interface ErrorStateProps {
  title?: string;
  message: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = '데이터 로딩 오류',
  message,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <WarnIcon width={20} height={20} />
          <h2 className="font-bold">{title}</h2>
        </div>
        <p>{message}</p>
      </div>
      <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
    </div>
  );
}; 