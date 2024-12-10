export type User = {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
};

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};