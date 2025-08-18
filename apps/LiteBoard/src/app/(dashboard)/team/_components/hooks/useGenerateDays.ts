import {
  INITIAL_MONTHS_BEFORE,
  INITIAL_MONTHS_AFTER,
  LOAD_MORE_THRESHOLD_DAYS,
  DAY_WIDTH_PX,
  TODAY_POSITION_RATIO,
} from '../consts/timeline';
import { addDays, subMonths, addMonths, differenceInDays } from 'date-fns';
import { useState, useCallback, useEffect, useRef } from 'react';

export const useGenerateDays = () => {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return subMonths(today, INITIAL_MONTHS_BEFORE);
  });

  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return addMonths(today, INITIAL_MONTHS_AFTER);
  });

  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAdjustmentRef = useRef<number>(0);

  // 날짜 생성 함수
  const generateDays = useCallback((start: Date, end: Date) => {
    const days = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      days.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }

    return days;
  }, []);

  const days = generateDays(startDate, endDate);

  // 왼쪽으로 스크롤하여 과거 날짜 로드 함수
  const loadMorePastDays = useCallback(() => {
    const oldStartDate = startDate;
    const newStartDate = subMonths(startDate, 1);

    const addedDays = differenceInDays(oldStartDate, newStartDate);
    const addedWidth = addedDays * DAY_WIDTH_PX;

    scrollAdjustmentRef.current = addedWidth;

    setStartDate(newStartDate);
  }, [startDate]);

  // 오른쪽으로 스크롤하여 미래 날짜 로드 함수
  const loadMoreFutureDays = useCallback(() => {
    const newEndDate = addMonths(endDate, 1);
    setEndDate(newEndDate);
  }, [endDate]);

  // 스크롤 위치에 따라 새로운 기간 로드 함수
  const handleScroll = useCallback(
    (scrollLeft: number, containerWidth: number) => {
      //기존 타이머가 설정되어있다면 초기화
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      // 과거, 미래 날짜 로드 디바운싱 처리
      scrollTimerRef.current = setTimeout(() => {
        if (scrollLeft < LOAD_MORE_THRESHOLD_DAYS * DAY_WIDTH_PX) {
          loadMorePastDays();
        }

        const totalWidth = days.length * DAY_WIDTH_PX;
        const scrollRight = scrollLeft + containerWidth;
        const thresholdFromRight = LOAD_MORE_THRESHOLD_DAYS * DAY_WIDTH_PX;

        if (scrollRight > totalWidth - thresholdFromRight) {
          loadMoreFutureDays();
        }
      }, 10);
    },
    [days.length, loadMorePastDays, loadMoreFutureDays]
  );

  // 오늘 날짜의 초기 스크롤 위치 계산 함수
  const getInitialScrollPosition = useCallback(() => {
    const today = new Date();
    const todayIndex = differenceInDays(today, startDate);
    const todayPosition = todayIndex * DAY_WIDTH_PX;
    const containerWidth = window.innerWidth * 0.7;
    const targetPosition = containerWidth * TODAY_POSITION_RATIO;

    return Math.max(0, todayPosition - targetPosition);
  }, [startDate]);

  // 스크롤 위치 조정값 가져오기 함수
  // (과거 날짜 로드 후 앞쪽에 push 할 때 발생하는 스크롤 밀림 현상 방지)
  const getScrollAdjustment = useCallback(() => {
    const adjustment = scrollAdjustmentRef.current;
    scrollAdjustmentRef.current = 0;
    return adjustment;
  }, []);

  // 컴포넌트 언마운트 시 타이머 초기화
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  return {
    days,
    loadMorePastDays,
    loadMoreFutureDays,
    handleScroll,
    getInitialScrollPosition,
    getScrollAdjustment,
    startDate,
    endDate,
  };
};
