import { Member } from '@/types/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: Member | null;
  setUser: (user: Member) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: Member) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
