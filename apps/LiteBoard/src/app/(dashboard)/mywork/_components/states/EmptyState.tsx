import React from 'react';
import { HelpIcon } from '@LiteBoard/ui';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({
  title = '데이터가 없습니다',
  description,
  icon = <HelpIcon width={48} height={48} className="text-neutral-400" />,
  className = '',
}: EmptyStateProps) => {
  return (
    <div className={`relative px-11 ${className}`}>
      <div className="flex flex-col justify-center items-center p-8 text-gray-500">
        {icon}
        <h3 className="mt-4 text-lg font-medium text-neutral-700">{title}</h3>
        {description && (
          <p className="mt-2 max-w-md text-sm text-center text-neutral-500">
            {description}
          </p>
        )}
      </div>
      <div className="absolute mt-[36px] h-[12px] bg-neutral-100 -left-11 -right-11"></div>
    </div>
  );
};
