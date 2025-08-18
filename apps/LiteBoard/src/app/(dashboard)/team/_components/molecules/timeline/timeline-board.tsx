import { useRef, useEffect } from 'react';
import TimelineMonth from '../../atoms/timeline/timline-month';
import TimelineDay from '../../atoms/timeline/timeline-day';
import TimelineGridPannel from './timeline-grid-pannel';
import { Task } from '../../types/task';
import { useTimelineScrollStore } from '../../stores/useTimelineScrollStore';

interface TimelineBoardProps {
  days: Date[];
  tasks: Task[];
  onScroll?: (scrollLeft: number, containerWidth: number) => void;
  getInitialScrollPosition: () => number;
  getScrollAdjustment: () => number;
}

const TimelineBoard = ({
  days,
  tasks,
  onScroll,
  getInitialScrollPosition,
  getScrollAdjustment,
}: TimelineBoardProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // 타임라인 보드 DOM 객체
  const isInitialRenderRef = useRef<boolean>(true); // 최초 렌더링 여부 플래그
  const previousDaysLengthRef = useRef<number>(0);
  const lastScrollLeftRef = useRef<number>(0);
  const setScrollContainer = useTimelineScrollStore(
    (s) => s.setScrollContainer
  );
  const setGetInitialScrollPosition = useTimelineScrollStore(
    (s) => s.setGetInitialScrollPosition
  );

  // 최초 렌더링 시 스크롤 위치 초기화
  useEffect(() => {
    if (scrollContainerRef.current && isInitialRenderRef.current) {
      const initialScrollPosition = getInitialScrollPosition();
      scrollContainerRef.current.scrollLeft = initialScrollPosition;
      lastScrollLeftRef.current = initialScrollPosition;
      isInitialRenderRef.current = false;
    }
  }, [getInitialScrollPosition]);

  // 타임라인 보드 DOM 전역 스토어에 저장
  useEffect(() => {
    if (scrollContainerRef.current) {
      setScrollContainer(scrollContainerRef.current);
      return () => setScrollContainer(null);
    }
  }, [setScrollContainer]);

  // 전역 스토어에 초기 스크롤 위치 저장
  useEffect(() => {
    setGetInitialScrollPosition(getInitialScrollPosition);
    return () => setGetInitialScrollPosition(null);
  }, [getInitialScrollPosition, setGetInitialScrollPosition]);

  useEffect(() => {
    const currentDaysLength = days.length;
    const previousDaysLength = previousDaysLengthRef.current;

    if (
      currentDaysLength > previousDaysLength &&
      !isInitialRenderRef.current &&
      scrollContainerRef.current
    ) {
      const adjustment = getScrollAdjustment();
      if (adjustment > 0) {
        const newScrollLeft = lastScrollLeftRef.current + adjustment;

        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = newScrollLeft;
            lastScrollLeftRef.current = newScrollLeft;
          }
        }, 0);
      }
    }

    previousDaysLengthRef.current = currentDaysLength;
  }, [days.length, getScrollAdjustment]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (onScroll && scrollContainerRef.current) {
      const { scrollLeft } = e.currentTarget;
      lastScrollLeftRef.current = scrollLeft;
      const containerWidth = scrollContainerRef.current.clientWidth;
      onScroll(scrollLeft, containerWidth);
    }
  };

  return (
    <div className="flex overflow-hidden flex-col flex-1 h-full border-t border-neutral-200">
      <div
        ref={scrollContainerRef}
        className="overflow-auto flex-1 scrollbar scrollbar-thumb-neutral-200 scrollbar-track-transparent"
        onScroll={handleScroll}
      >
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
