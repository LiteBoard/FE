import { TaskData } from '@/types/category';
import { TaskStatus } from '@/types/common';
import { create } from 'zustand';

export interface TaskUpdateData {
  title: string;
  description: string;
  status: TaskStatus;
  startDate: string;
  endDate: string;
}

interface TaskDetailStore {
  isOpen: boolean;
  selectedTask: TaskData | null;
  originalTaskData: TaskUpdateData | null;
  currentTaskData: TaskUpdateData | null;
  openPanel: (task: TaskData, taskUpdateData: TaskUpdateData) => void;
  closePanel: (onUpdate?: (data: TaskUpdateData) => Promise<void>) => Promise<void>;
  clearSelectedTask: () => void;
  updateCurrentData: (updates: Partial<TaskUpdateData>) => void;
}

export const useTaskDetailStore = create<TaskDetailStore>((set, get) => ({
  isOpen: false,
  selectedTask: null,
  originalTaskData: null,
  currentTaskData: null,

  openPanel: (task, taskUpdateData) => set({
    isOpen: true,
    selectedTask: task,
    originalTaskData: taskUpdateData,
    currentTaskData: taskUpdateData
  }),

  closePanel: async (onUpdate) => {
    const { originalTaskData, currentTaskData } = get();

    if (originalTaskData && currentTaskData && onUpdate) {
      const hasChanges = JSON.stringify(originalTaskData) !== JSON.stringify(currentTaskData);
      if (hasChanges) {
        await onUpdate(currentTaskData);
      }
    }

    set({ isOpen: false });
  },

  clearSelectedTask: () => set({
    selectedTask: null,
    originalTaskData: null,
    currentTaskData: null
  }),

  updateCurrentData: (updates) => set((state) => ({
    currentTaskData: state.currentTaskData ? { ...state.currentTaskData, ...updates } : null
  })),
}));
