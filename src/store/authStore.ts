import { create } from 'zustand';
import { useUserStore } from './userStore';
import type { User } from '../types';

const AUTH_STORAGE_KEY = 'taskmaster_auth';

const getStoredAuth = (): { user: User | null } => {
  try {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedAuth ? JSON.parse(storedAuth) : { user: null };
  } catch (error) {
    console.error('Error loading auth from localStorage:', error);
    return { user: null };
  }
};

const setStoredAuth = (auth: { user: User | null }) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } catch (error) {
    console.error('Error saving auth to localStorage:', error);
  }
};

interface AuthState {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  ...getStoredAuth(),
  
  login: (username: string, password: string) => {
    const users = useUserStore.getState().users;
    const user = users.find(
      (u) => u.username === username && u.password === password && u.isActive
    );
    
    if (user) {
      set({ user, isAuthenticated: true });
      setStoredAuth({ user });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    setStoredAuth({ user: null });
  },
  
  isAuthenticated: !!getStoredAuth().user,
}));