import React from 'react';
import { WarnIcon } from '@LiteBoard/ui';

interface ErrorStateProps {
  title?: string;
  message: string;
  className?: string;
}

export const ErrorState = ({
  title = '데이터 로딩 오류',
  message,
  className = '',
}: ErrorStateProps) => {
  return (
    <div className={`relative px-11 ${className}`}>
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        <div className="flex gap-2 items-center mb-2">
          <WarnIcon width={20} height={20} />
          <h2 className="font-bold">{title}</h2>
        </div>
        <p>{message}</p>
      </div>
      <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
    </div>
  );
};
