import { create } from 'zustand';
import { Task } from '../types/task';

interface TaskDetailStore {
  isOpen: boolean;
  selectedTask: Task | null;
  openPanel: (task: Task) => void;
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