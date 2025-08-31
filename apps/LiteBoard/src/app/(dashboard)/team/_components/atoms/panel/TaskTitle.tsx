import React from 'react';
import { cn } from '@/utils/cn';

interface TaskTitleProps {
  title: string;
  className?: string;
}

const TaskTitle = ({ title, className }: TaskTitleProps) => {
  return (
    <h1 className={cn('text-3xl font-semibold text-gray-900', className)}>
      {title}
    </h1>
  );
};

export default TaskTitle; 