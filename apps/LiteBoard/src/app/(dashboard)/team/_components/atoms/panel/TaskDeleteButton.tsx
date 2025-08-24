import React from 'react';
import { Button, TrashIcon } from '@LiteBoard/ui';
import { cn } from '@/utils/cn';

const TaskDeleteButton = () => {
  return (
    <Button 
      variant="borderless" 
      size="md" 
      className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100"
    >
      <TrashIcon width={24} height={24} />
      <span className="text-text-T3 text-neutral-600">업무 삭제</span>
    </Button>
  );
};

export default TaskDeleteButton; 