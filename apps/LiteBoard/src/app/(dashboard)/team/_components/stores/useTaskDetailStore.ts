import { TaskData } from '@/types/category';
import { create } from 'zustand';

interface TaskDetailStore {
  isOpen: boolean;
  selectedTask: TaskData | null;
  openPanel: (task: TaskData) => void;
  closePanel: () => void;
  clearSelectedTask: () => void;
}

export const useTaskDetailStore = create<TaskDetailStore>((set) => ({
  isOpen: false,
  selectedTask: null,
  openPanel: (task) => set({ isOpen: true, selectedTask: task }),
  closePanel: () => set({ isOpen: false }),
  clearSelectedTask: () => set({ selectedTask: null }),
}));
