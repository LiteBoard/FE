import { cn } from '@utils/cn';
import { isSaturday, isSunday } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { DAY_HEIGHT_PX, DAY_WIDTH_PX } from '../../consts/timeline';

import TimelineTaskCard from '../../atoms/timeline/timeline-task-card';
import { transformDate } from '@/utils/transformDate';
import { useEffect, useState } from 'react';
import { TaskData } from '@/types/category';

interface TimelineGridPannelProps {
  days: Date[];
  tasks: TaskData[][];
}

const TimelineGridPannel = ({ days, tasks }: TimelineGridPannelProps) => {
  const [gridHeight, setGridHeight] = useState('500px');
  const startDate = days[0] || new Date();

  useEffect(() => {
    // 디바이스 화면 높이에 따른 타임라인 보드 높이 계산 로직
    const calculateGridHeight = () => {
      const isSmallScreen = window.innerHeight < 1024;

      const baseMargin = 236;
      const extraMargin = isSmallScreen ? 150 : 50;

      const availableHeight = window.innerHeight - baseMargin - extraMargin;
      const calculatedHeight = Math.max(availableHeight, 200);

      setGridHeight(`${calculatedHeight}px`);
    };

    calculateGridHeight();

    window.addEventListener('resize', calculateGridHeight);
    return () => window.removeEventListener('resize', calculateGridHeight);
  }, []);

  return (
    <div className="relative">
      {/* 오늘 날짜 체크 선 */}
      <div
        className="absolute z-50 w-2 h-2 bg-red-500 rounded-full pointer-events-none"
        style={{
          top: '-3px',
          left: `${differenceInDays(new Date(), startDate) * DAY_WIDTH_PX + DAY_WIDTH_PX / 2 - 3.5}px`,
        }}
      />
      <div
        className="absolute bottom-0 z-30 w-[1px] bg-red-400 pointer-events-none"
        style={{
          top: '-3px',
          left: `${differenceInDays(new Date(), startDate) * DAY_WIDTH_PX + DAY_WIDTH_PX / 2}px`,
        }}
      />

      {/* 그리드 패널 */}
      <div
        className="grid relative pt-[46px]"
        style={{
          gridTemplateColumns: `repeat(${days.length}, ${DAY_WIDTH_PX}px)`,
          gridTemplateRows: `repeat(20, ${DAY_HEIGHT_PX}px)`,
          gap: '2px 0',
          maxHeight: gridHeight,
          overflowY: 'scroll',
        }}
      >
        {Array.from({ length: 20 }, (_, rowIndex) =>
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
        {(() => {
          let globalTaskIndex = 0;
          const elements: React.ReactElement[] = [];

          tasks.forEach((taskGroup, groupIndex) => {
            taskGroup.forEach((task) => {
              const startDayIndex = differenceInDays(
                transformDate(task.startDate),
                startDate
              );
              const duration =
                differenceInDays(
                  transformDate(task.endDate),
                  transformDate(task.startDate)
                ) + 1;
              const left = startDayIndex * DAY_WIDTH_PX;
              const width = duration * DAY_WIDTH_PX;

              elements.push(
                <TimelineTaskCard
                  key={task.id}
                  task={task}
                  left={left}
                  width={width}
                  taskIndex={globalTaskIndex}
                />
              );
              globalTaskIndex++;
            });

            if (groupIndex < tasks.length - 1) {
              globalTaskIndex++;
            }
          });

          return elements;
        })()}
      </div>
    </div>
  );
};

export default TimelineGridPannel;
