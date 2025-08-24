import React from 'react';
import { cn } from '@/utils/cn';
import { CATEGORY_TASK_STATUS_STYLES, TaskStatus } from '../../consts/categoryTaskColorMap';
import { transformTaskStatus } from '../../hooks/transformTaskStatus';

interface TaskStatusChipProps {
  status: TaskStatus;
  className?: string;
}

const TaskStatusChip = ({ status, className }: TaskStatusChipProps) => {
  return (
    <div
      className={cn(
        'inline-flex whitespace-nowrap text-center h-6 px-[10px] rounded-full text-text-B3M w-[61px]',
        CATEGORY_TASK_STATUS_STYLES[status].textColor,
        CATEGORY_TASK_STATUS_STYLES[status].bgColor,
        className
      )}
    >
      {transformTaskStatus(status)}
    </div>
  );
};

export default TaskStatusChip; 