import { cn } from '@utils/cn';
import { TaskData } from '@/types/category';
import { TASK_STATUS_STYLES } from '../../consts/taskColorMap';
import { useTaskDetailStore } from '../../stores/useTaskDetailStore';
import { TaskStatus } from '../../consts/categoryTaskColorMap';

interface TimelineTaskCardProps {
  task: TaskData;
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
  const { openPanel } = useTaskDetailStore();

  const handleClick = () => {
    openPanel(task);
  };

  return (
    <div
      key={task.id}
      className={cn(
        'absolute top-0 h-[38px] flex items-center px-2 rounded-r-md border-l-[6px] border-r-2 cursor-pointer hover:opacity-80 transition-opacity',
        TASK_STATUS_STYLES[task.status as TaskStatus].bgColor,
        TASK_STATUS_STYLES[task.status as TaskStatus].borderColor
      )}
      style={{
        left: `${left}px`,
        width: `${width}px`,
        top: `${taskIndex * (38 + 2) + 46}px`,
      }}
      onClick={handleClick}
    >
      <div
        className={`flex relative items-center w-full ${width < 120 ? 'justify-end' : 'justify-between'}`}
      >
        <span
          className={`truncate text-text-T3 text-neutral-800 text-ellipsis ${width < 120 ? 'hidden' : ''}`}
        >
          {task.title}
        </span>
        <span
          className={`w-6 whitespace-nowrap text-text-caption ${task.status === 'DELAYED' ? 'text-red-500' : 'text-neutral-900'}`}
        >
          {task.completedTodoCount} / {task.pendingTodoCount}
        </span>
      </div>

      {Array.from({ length: width / 40 - 1 }).map((_, index) => (
        <div
          key={index}
          style={{ left: `${34 + index * 40}px` }}
          className="absolute top-0 right-0 bottom-0 border-l-[0.7px] border-dashed border-neutral-500"
        />
      ))}
    </div>
  );
};

export default TimelineTaskCard;
