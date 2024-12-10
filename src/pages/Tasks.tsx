import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useAuthStore } from '../store/authStore';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task } from '../types';

export default function Tasks() {
  const user = useAuthStore((state) => state.user);
  const tasks = useTaskStore((state) => state.tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const userTasks = tasks.filter((task) => task.userId === user?.id);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    // Implement edit functionality
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="mt-2 text-gray-600">
          Manage your tasks and stay organized
        </p>
      </div>

      <TaskForm />
      <TaskList tasks={userTasks} onEditTask={handleEditTask} />
    </div>
  );
}