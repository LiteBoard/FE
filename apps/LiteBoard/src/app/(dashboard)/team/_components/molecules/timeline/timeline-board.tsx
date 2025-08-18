import TimelineMonth from '../../atoms/timeline/timline-month';
import TimelineDay from '../../atoms/timeline/timeline-day';
import TimelineGridPannel from './timeline-grid-pannel';
import { Task } from '../../types/task';

interface TimelineBoardProps {
  days: Date[];
  tasks: Task[];
}

const TimelineBoard = ({ days, tasks }: TimelineBoardProps) => {
  return (
    <div className="flex overflow-hidden flex-col flex-1 h-full border-t border-neutral-200">
      <div className="overflow-auto flex-1 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
        <div className="min-w-max">
          <TimelineMonth days={days} />
          <TimelineDay days={days} />
          <TimelineGridPannel days={days} tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default TimelineBoard;
