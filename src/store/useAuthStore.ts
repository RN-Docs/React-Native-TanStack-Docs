import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import type { AuthUser } from '../api/auth';

type AuthStore = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  setAuth: async (token, user) => {
    await AsyncStorage.setItem('token', token);
    set({ token, user, isAuthenticated: true });
  },
  logout: async () => {
    await AsyncStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
