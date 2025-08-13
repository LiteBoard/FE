import { cn } from '@utils/cn';
import { isSaturday, isSunday } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { DAY_HEIGHT_PX, DAY_WIDTH_PX, START_DATE } from '../../consts/timeline';
import { Task } from '../../types/task';
import TimelineTaskCard from './timeline-task-card';
import { transformDate } from '@/utils/transformDate';

interface TimelineGridPannelProps {
  days: Date[];
  tasks: Task[];
}

const TimelineGridPannel = ({ days, tasks }: TimelineGridPannelProps) => {
  return (
    <div
      className="grid relative pt-[46px]"
      style={{
        gridTemplateColumns: `repeat(${days.length}, ${DAY_WIDTH_PX}px)`,
        gridTemplateRows: `repeat(15, ${DAY_HEIGHT_PX}px)`,
        gap: '2px 0',
        maxHeight: '660px',
        overflowY: 'scroll',
      }}
    >
      {Array.from({ length: 15 }, (_, rowIndex) =>
        days.map((day, dayIndex) => {
          const isSat = isSaturday(day);
          const isSun = isSunday(day);

          return (
            <div
              key={`${rowIndex}-${dayIndex}`}
              className={cn(
                'h-full border-t border-b border-l border-gray-100',
                {
                  'bg-neutral-50': isSat || isSun,
                  'bg-neutral-white': !isSat && !isSun,
                }
              )}
            ></div>
          );
        })
      ).flat()}

      {/* 태스크 바 렌더링 영역 */}
      {tasks.map((task, taskIndex) => {
        const startDayIndex = differenceInDays(
          transformDate(task.startDate),
          transformDate(START_DATE)
        );
        const duration =
          differenceInDays(
            transformDate(task.endDate),
            transformDate(task.startDate)
          ) + 1;
        const left = startDayIndex * DAY_WIDTH_PX;
        const width = duration * DAY_WIDTH_PX;

        return (
          <TimelineTaskCard
            key={task.id}
            task={task}
            left={left}
            width={width}
            taskIndex={taskIndex}
          />
        );
      })}

      {/* 오늘 날짜 체크 선 */}
      <div
        className="absolute top-0 bottom-0 z-30 w-[1px] bg-red-400"
        style={{
          left: `${differenceInDays(new Date(), transformDate(START_DATE)) * DAY_WIDTH_PX + DAY_WIDTH_PX / 2}px`,
        }}
      />
    </div>
  );
};

export default TimelineGridPannel;
