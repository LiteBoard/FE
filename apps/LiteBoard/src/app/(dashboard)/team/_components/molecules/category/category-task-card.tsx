import { Profile } from '@LiteBoard/ui';
import { truncateText } from '@/utils/truncateText';
import {
  CATEGORY_TASK_STATUS_STYLES,
  TaskStatus,
} from '../../consts/categoryTaskColorMap';
import { cn } from '@/utils/cn';
import { useTransformTaskStatus } from '../../hooks/useTransformTaskStatus';

interface CategoryTaskCardProps {
  description: string;
  status: TaskStatus;
}

const CategoryTaskCard = ({ description, status }: CategoryTaskCardProps) => {
  return (
    <div className="flex justify-between items-center h-7">
      <p>{truncateText(description, 9)}</p>
      <div className="flex gap-2 justify-center items-center">
        <div
          className={cn(
            'inline-flex whitespace-nowrap text-center h-6 px-[10px] rounded-full text-text-B3M',
            CATEGORY_TASK_STATUS_STYLES[status].textColor,
            CATEGORY_TASK_STATUS_STYLES[status].bgColor
          )}
        >
          {useTransformTaskStatus(status)}
        </div>
        <Profile name="성태현" size="sm" />
      </div>
    </div>
  );
};

export default CategoryTaskCard;
