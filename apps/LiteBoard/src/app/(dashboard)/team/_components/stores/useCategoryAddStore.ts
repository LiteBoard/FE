import { create } from 'zustand';

interface CategoryAddStore {
  isCategoryAddOpen: boolean;
  setIsCategoryAddOpen: (isCategoryAddOpen: boolean) => void;
}

export const useCategoryAddStore = create<CategoryAddStore>((set) => ({
  isCategoryAddOpen: false,
  setIsCategoryAddOpen: (isCategoryAddOpen) => set({ isCategoryAddOpen }),
}));
