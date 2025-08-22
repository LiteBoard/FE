'use client';
import { create } from 'zustand';

interface TimelineScrollStore {
  scrollContainer: HTMLDivElement | null;
  setScrollContainer: (el: HTMLDivElement | null) => void;
  scrollBy: (scrollPosition: number) => void;
  scrollTo: (leftPx: number) => void;
  getInitialScrollPosition: (() => number) | null;
  setGetInitialScrollPosition: (fn: (() => number) | null) => void;
  scrollToToday: () => void;
}

export const useTimelineScrollStore = create<TimelineScrollStore>(
  (set, get) => ({
    scrollContainer: null,
    getInitialScrollPosition: null,
    setScrollContainer: (el) => set({ scrollContainer: el }),
    setGetInitialScrollPosition: (fn) => set({ getInitialScrollPosition: fn }),
    scrollBy: (scrollPosition) => {
      const el = get().scrollContainer;
      if (el) {
        el.scrollBy({ left: scrollPosition, behavior: 'smooth' });
      }
    },
    scrollTo: (leftPx) => {
      const el = get().scrollContainer;
      if (el) {
        el.scrollTo({ left: leftPx, behavior: 'smooth' });
      }
    },
    scrollToToday: () => {
      const el = get().scrollContainer;
      const getPos = get().getInitialScrollPosition;
      if (el && getPos) {
        el.scrollTo({ left: getPos(), behavior: 'smooth' });
      }
    },
  })
);
