'use client';
import { create } from 'zustand';

interface ScrollPosition {
  scrollLeft: number;
  containerWidth: number;
}

interface TimelineScrollStore {
  scrollPosition: ScrollPosition | null;
  setScrollPosition: (position: ScrollPosition | null) => void;
  scrollBy: (scrollPosition: number) => Promise<void>;
  scrollTo: (leftPx: number) => Promise<void>;
  getInitialScrollPosition: (() => number) | null;
  setGetInitialScrollPosition: (fn: (() => number) | null) => void;
  ensureDateRangeForScroll:
    | ((targetScrollLeft: number, containerWidth: number) => Promise<void>)
    | null;
  setEnsureDateRangeForScroll: (
    fn:
      | ((targetScrollLeft: number, containerWidth: number) => Promise<void>)
      | null
  ) => void;
  scrollToToday: () => Promise<void>;
  onScrollBy: ((scrollPosition: number) => void) | null;
  onScrollTo: ((leftPx: number) => void) | null;
  setOnScrollBy: (callback: ((scrollPosition: number) => void) | null) => void;
  setOnScrollTo: (callback: ((leftPx: number) => void) | null) => void;
}

export const useTimelineScrollStore = create<TimelineScrollStore>(
  (set, get) => ({
    scrollPosition: null,
    getInitialScrollPosition: null,
    ensureDateRangeForScroll: null,
    onScrollBy: null,
    onScrollTo: null,

    setScrollPosition: (position) => set({ scrollPosition: position }),
    setGetInitialScrollPosition: (fn) => set({ getInitialScrollPosition: fn }),
    setEnsureDateRangeForScroll: (fn) => set({ ensureDateRangeForScroll: fn }),
    setOnScrollBy: (callback) => set({ onScrollBy: callback }),
    setOnScrollTo: (callback) => set({ onScrollTo: callback }),

    scrollBy: async (scrollPosition) => {
      const currentPosition = get().scrollPosition;
      const ensureRange = get().ensureDateRangeForScroll;
      const onScrollBy = get().onScrollBy;

      if (currentPosition && ensureRange && onScrollBy) {
        const targetScrollLeft = currentPosition.scrollLeft + scrollPosition;
        const containerWidth = currentPosition.containerWidth;

        // 필요한 날짜 범위를 미리 로드
        await ensureRange(targetScrollLeft, containerWidth);
        // 외부 콜백을 통해 DOM 조작 실행
        onScrollBy(scrollPosition);
      }
    },

    scrollTo: async (leftPx) => {
      const currentPosition = get().scrollPosition;
      const ensureRange = get().ensureDateRangeForScroll;
      const onScrollTo = get().onScrollTo;

      if (currentPosition && ensureRange && onScrollTo) {
        const containerWidth = currentPosition.containerWidth;

        // 필요한 날짜 범위를 미리 로드
        await ensureRange(leftPx, containerWidth);
        // 외부 콜백을 통해 DOM 조작 실행
        onScrollTo(leftPx);
      }
    },

    scrollToToday: async () => {
      const currentPosition = get().scrollPosition;
      const getPos = get().getInitialScrollPosition;
      const ensureRange = get().ensureDateRangeForScroll;
      const onScrollTo = get().onScrollTo;

      if (currentPosition && getPos && ensureRange && onScrollTo) {
        const targetScrollLeft = getPos();
        const containerWidth = currentPosition.containerWidth;

        // 필요한 날짜 범위를 미리 로드
        await ensureRange(targetScrollLeft, containerWidth);
        // 외부 콜백을 통해 DOM 조작 실행
        onScrollTo(targetScrollLeft);
      }
    },
  })
);
