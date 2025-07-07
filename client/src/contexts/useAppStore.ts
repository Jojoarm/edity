import { create } from 'zustand';
import type { ActivityData, UserType } from '../types';

type AppState = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isAuthLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  currency: string;
  activities: ActivityData[];
  setActivities: (data: ActivityData[]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthLoading: true,
  setAuthLoading: (loading) => set({ isAuthLoading: loading }),
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  currency: import.meta.env.VITE_CURRENCY || '$',
  activities: [],
  setActivities: (data) => set({ activities: data }),
}));
