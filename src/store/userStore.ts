import { create } from 'zustand';
import type { User } from '../types';

// Helper functions for localStorage
const USERS_STORAGE_KEY = 'taskmaster_users';

const getStoredUsers = (): User[] => {
  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!storedUsers) {
      // Initialize with default admin user if no users exist
      const defaultAdmin: User = {
        id: '1',
        username: 'admin',
        password: 'admin123',
        email: 'admin@taskmaster.com',
        role: 'admin',
        isActive: true,
      };
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([defaultAdmin]));
      return [defaultAdmin];
    }
    return JSON.parse(storedUsers);
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return [];
  }
};

const setStoredUsers = (users: User[]) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  loadUsers: () => void;
  getUserById: (userId: string) => User | undefined;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: getStoredUsers(),
  
  setUsers: (users) => {
    set({ users });
    setStoredUsers(users);
  },
  
  addUser: (user) => {
    set((state) => {
      const newUsers = [...state.users, user];
      setStoredUsers(newUsers);
      return { users: newUsers };
    });
  },
  
  updateUser: (userId, updates) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      );
      setStoredUsers(updatedUsers);
      return { users: updatedUsers };
    });
  },
  
  deleteUser: (userId) => {
    set((state) => {
      const filteredUsers = state.users.filter((user) => user.id !== userId);
      setStoredUsers(filteredUsers);
      return { users: filteredUsers };
    });
  },
  
  loadUsers: () => {
    const storedUsers = getStoredUsers();
    set({ users: storedUsers });
  },

  getUserById: (userId) => {
    return get().users.find((user) => user.id === userId);
  },
}));