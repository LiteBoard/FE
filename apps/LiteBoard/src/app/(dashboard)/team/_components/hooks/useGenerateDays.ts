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
    const todayAtNoon = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0, 0);
    return subMonths(todayAtNoon, INITIAL_MONTHS_BEFORE);
  });

  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    const todayAtNoon = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0, 0);
    return addMonths(todayAtNoon, INITIAL_MONTHS_AFTER);
  });

  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAdjustmentRef = useRef<number>(0);
  const isLoadingRef = useRef<boolean>(false);

  // 날짜 생성 함수
  const generateDays = useCallback((start: Date, end: Date) => {
    const days = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      const dayAtNoon = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0, 0);
      days.push(dayAtNoon);
      currentDate = addDays(currentDate, 1);
    }

    return days;
  }, []);

  const days = generateDays(startDate, endDate);

  // 왼쪽으로 스크롤하여 과거 날짜 로드 함수
  const loadMorePastDays = useCallback(() => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;
    const oldStartDate = startDate;
    const newStartDate = subMonths(startDate, 1);

    const addedDays = differenceInDays(oldStartDate, newStartDate);
    const addedWidth = addedDays * DAY_WIDTH_PX;

    scrollAdjustmentRef.current = addedWidth;

    setStartDate(newStartDate);

    // 상태 업데이트 후 로딩 플래그 해제
    setTimeout(() => {
      isLoadingRef.current = false;
    }, 0);
  }, [startDate]);

  // 오른쪽으로 스크롤하여 미래 날짜 로드 함수
  const loadMoreFutureDays = useCallback(() => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;
    const newEndDate = addMonths(endDate, 1);
    setEndDate(newEndDate);

    // 상태 업데이트 후 로딩 플래그 해제
    setTimeout(() => {
      isLoadingRef.current = false;
    }, 0);
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

  // 스크롤 위치에 필요한 날짜 범위를 미리 로드하는 함수
  const ensureDateRangeForScroll = useCallback(
    async (targetScrollLeft: number, containerWidth: number) => {
      const maxAttempts = 10;
      let attempts = 0;

      while (attempts < maxAttempts) {
        const totalWidth = days.length * DAY_WIDTH_PX;
        const scrollRight = targetScrollLeft + containerWidth;
        let needsMoreLoad = false;

        // 왼쪽 범위 체크 및 로드
        if (targetScrollLeft < LOAD_MORE_THRESHOLD_DAYS * DAY_WIDTH_PX) {
          if (!isLoadingRef.current) {
            loadMorePastDays();
            needsMoreLoad = true;
          }
        }

        // 오른쪽 범위 체크 및 로드
        if (
          scrollRight >
          totalWidth - LOAD_MORE_THRESHOLD_DAYS * DAY_WIDTH_PX
        ) {
          if (!isLoadingRef.current) {
            loadMoreFutureDays();
            needsMoreLoad = true;
          }
        }

        if (!needsMoreLoad) {
          break;
        }

        // 로딩 완료 대기
        await new Promise<void>((resolve) => {
          const checkLoading = () => {
            if (!isLoadingRef.current) {
              resolve();
            } else {
              setTimeout(checkLoading, 10);
            }
          };
          checkLoading();
        });

        attempts++;
      }
    },
    [days.length, loadMorePastDays, loadMoreFutureDays]
  );

  // 오늘 날짜의 초기 스크롤 위치 계산 함수
  const getInitialScrollPosition = useCallback(() => {
    const today = new Date();
    const todayAtNoon = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0, 0);
    const todayIndex = differenceInDays(todayAtNoon, startDate);
    const todayPosition = todayIndex * DAY_WIDTH_PX;
    const containerWidth = window.innerWidth * 0.7;
    const targetPosition = containerWidth * TODAY_POSITION_RATIO;

    return Math.max(0, todayPosition - targetPosition);
  }, [startDate]);

  // 스크롤 위치 조정값 가져오기 함수 (과거 날짜 로드 후 앞쪽에 push 할 때 발생하는 스크롤 밀림 현상 방지)
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
    startDate,
    endDate,
    loadMorePastDays,
    loadMoreFutureDays,
    handleScroll,
    getInitialScrollPosition,
    getScrollAdjustment,
    ensureDateRangeForScroll,
  };
};
