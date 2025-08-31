'use client';
import { create } from 'zustand';

interface TimelineScrollStore {
  scrollContainer: HTMLDivElement | null;
  setScrollContainer: (el: HTMLDivElement | null) => void;
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
}

export const useTimelineScrollStore = create<TimelineScrollStore>(
  (set, get) => ({
    scrollContainer: null,
    getInitialScrollPosition: null,
    ensureDateRangeForScroll: null,
    setScrollContainer: (el) => set({ scrollContainer: el }),
    setGetInitialScrollPosition: (fn) => set({ getInitialScrollPosition: fn }),
    setEnsureDateRangeForScroll: (fn) => set({ ensureDateRangeForScroll: fn }),
    scrollBy: async (scrollPosition) => {
      const el = get().scrollContainer;
      const ensureRange = get().ensureDateRangeForScroll;

      if (el && ensureRange) {
        const currentScrollLeft = el.scrollLeft;
        const targetScrollLeft = currentScrollLeft + scrollPosition;
        const containerWidth = el.clientWidth;

        // 필요한 날짜 범위를 미리 로드
        await ensureRange(targetScrollLeft, containerWidth);
        // 스크롤 실행
        el.scrollBy({ left: scrollPosition, behavior: 'smooth' });
      }
    },
    scrollTo: async (leftPx) => {
      const el = get().scrollContainer;
      const ensureRange = get().ensureDateRangeForScroll;

      if (el && ensureRange) {
        const containerWidth = el.clientWidth;

        // 필요한 날짜 범위를 미리 로드
        await ensureRange(leftPx, containerWidth);
        // 스크롤 실행
        el.scrollTo({ left: leftPx, behavior: 'smooth' });
      }
    },
    scrollToToday: async () => {
      const el = get().scrollContainer;
      const getPos = get().getInitialScrollPosition;
      const ensureRange = get().ensureDateRangeForScroll;

      if (el && getPos && ensureRange) {
        const targetScrollLeft = getPos();
        const containerWidth = el.clientWidth;

        // 필요한 날짜 범위를 미리 로드
        await ensureRange(targetScrollLeft, containerWidth);
        // 스크롤 실행
        el.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
      }
    },
  })
);
