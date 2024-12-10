import { useUserStore } from './userStore';

export const initializeAdmin = () => {
  const users = useUserStore.getState().users;
  
  // Only add admin if no users exist
  if (users.length === 0) {
    useUserStore.getState().addUser({
      id: '1',
      username: 'admin',
      password: 'admin123',  // In production, this should be hashed
      email: 'admin@taskmaster.com',
      role: 'admin',
      isActive: true,
    });
  }
};
