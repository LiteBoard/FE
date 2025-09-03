'use client';
import TimelineBoard from '../../molecules/timeline/timeline-board';
import { useGenerateDays } from '../../hooks/useGenerateDays';
import { TaskData } from '@/types/category';

const TimelineContainer = ({ taskList }: { taskList: TaskData[][] }) => {
  const {
    days,
    handleScroll,
    getInitialScrollPosition,
    getScrollAdjustment,
    ensureDateRangeForScroll,
  } = useGenerateDays();

  return (
    <TimelineBoard
      days={days}
      tasks={taskList}
      onScroll={handleScroll}
      getInitialScrollPosition={getInitialScrollPosition}
      getScrollAdjustment={getScrollAdjustment}
      ensureDateRangeForScroll={ensureDateRangeForScroll}
    />
  );
};

export default TimelineContainer;
