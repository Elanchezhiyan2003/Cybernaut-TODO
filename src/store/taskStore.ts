import { create } from 'zustand';
import type { Task } from '../types';
import { useAuthStore } from './authStore';

const TASKS_STORAGE_KEY = 'taskmaster_tasks';

const getStoredTasks = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

const setStoredTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  loadTasks: () => void;
  getUserTasks: (userId: string) => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: getStoredTasks(),
  
  setTasks: (tasks) => {
    set({ tasks });
    setStoredTasks(tasks);
  },
  
  addTask: (task) => {
    const currentUser = useAuthStore.getState().user;
    if (!currentUser) return;

    const newTask = {
      ...task,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => {
      const newTasks = [...state.tasks, newTask];
      setStoredTasks(newTasks);
      return { tasks: newTasks };
    });
  },
  
  updateTask: (taskId, updates) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      );
      setStoredTasks(updatedTasks);
      return { tasks: updatedTasks };
    });
  },
  
  deleteTask: (taskId) => {
    set((state) => {
      const filteredTasks = state.tasks.filter((task) => task.id !== taskId);
      setStoredTasks(filteredTasks);
      return { tasks: filteredTasks };
    });
  },
  
  loadTasks: () => {
    const storedTasks = getStoredTasks();
    set({ tasks: storedTasks });
  },

  getUserTasks: (userId) => {
    return get().tasks.filter((task) => task.userId === userId);
  },
}));