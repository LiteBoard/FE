import React from 'react';
import TaskStatusChip from '../../atoms/panel/TaskStatusChip';
import TaskTitle from '../../atoms/panel/TaskTitle';
import TaskDeleteButton from '../../atoms/panel/TaskDeleteButton';
import { TaskStatus } from '../../consts/categoryTaskColorMap';

interface TaskHeaderProps {
  status: TaskStatus;
  title: string;
  taskId: number;
  onDeleteSuccess?: () => void;
}

const TaskHeader = ({ status, title, taskId, onDeleteSuccess }: TaskHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-[40px] pt-[40px] border-neutral-200">
      <div className="flex flex-col gap-3">
        <TaskStatusChip status={status} />
        <TaskTitle title={title} />
      </div>
      <TaskDeleteButton 
        taskId={taskId} 
        onDeleteSuccess={onDeleteSuccess}
      />
    </div>
  );
};

export default TaskHeader; 