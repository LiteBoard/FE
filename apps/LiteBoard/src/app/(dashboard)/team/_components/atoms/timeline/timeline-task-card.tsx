import { cn } from '@utils/cn';
import { Task } from '../../types/task';
import { TASK_STATUS_STYLES } from '../../consts/taskColorMap';

interface TimelineTaskCardProps {
  task: Task;
  left: number;
  width: number;
  taskIndex: number;
}

const TimelineTaskCard = ({
  task,
  left,
  width,
  taskIndex,
}: TimelineTaskCardProps) => {
  return (
    <div
      key={task.id}
      className={cn(
        'absolute top-0 h-[38px] flex items-center px-2 rounded-r-md border-l-[6px] border-r-2',
        TASK_STATUS_STYLES[task.status].bgColor,
        TASK_STATUS_STYLES[task.status].borderColor
      )}
      style={{
        left: `${left}px`,
        width: `${width}px`,
        top: `${taskIndex * (38 + 2) + 46}px`,
      }}
    >
      <div className="flex justify-between items-center w-full">
        <span className="text-text-T3 text-neutral-800">{task.name}</span>
        <span className="text-text-caption text-neutral-900">
          {task.progress}
        </span>
      </div>
    </div>
  );
};

export default TimelineTaskCard;
