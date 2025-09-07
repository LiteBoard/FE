import { Profile, UserIcon } from '@LiteBoard/ui';
import { truncateText } from '@/utils/truncateText';
import {
  CATEGORY_TASK_STATUS_STYLES,
  TaskStatus,
} from '../../consts/categoryTaskColorMap';
import { cn } from '@/utils/cn';
import { transformTaskStatus } from '../../hooks/transformTaskStatus';
import { Member } from '@/types/common';
import { useTaskDetailStore } from '../../stores/useTaskDetailStore';
import { TaskData } from '@/types/category';

interface CategoryTaskCardProps {
  task: TaskData;
  title: string;
  status: TaskStatus;
  members: Member[] | null;
}

const CategoryTaskCard = ({
  task,
  title,
  status,
  members,
}: CategoryTaskCardProps) => {
  const { openPanel } = useTaskDetailStore();

  const handleClick = () => {
    openPanel(task);
  };

  return (
    <div 
      className="flex justify-between items-center h-7 cursor-pointer hover:bg-neutral-200 rounded-md px-2 -mx-2 transition-colors"
      onClick={handleClick}
    >
      <p>{truncateText(title, 9)}</p>
      <div className="flex gap-2 justify-center items-center">
        <div
          className={cn(
            'inline-flex whitespace-nowrap text-center h-6 px-[10px] rounded-full text-text-B3M',
            CATEGORY_TASK_STATUS_STYLES[status].textColor,
            CATEGORY_TASK_STATUS_STYLES[status].bgColor
          )}
        >
          {transformTaskStatus(status)}
        </div>
        {members ? (
          <Profile name={members[0]?.nickname ?? ''} size="sm" />
        ) : (
          <div className="rounded-full w-7 h-7 border-[2px] border-neutral-300 border-dashed bg-neutral-50 flex items-center justify-center">
            <UserIcon width={14} height={14} className="text-neutral-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTaskCard;
