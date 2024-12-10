import React, { useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import TaskCard from './TaskCard';
import type { Task } from '../types';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

export default function TaskList({ onEditTask }: TaskListProps) {
  const tasks = useTaskStore((state) => state.tasks);
  const loadTasks = useTaskStore((state) => state.loadTasks);

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <section className='w-full flex'>
      <div className="flex min-w-full justify-evenly bg-none flex-wrap">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={onEditTask} 
          />
        ))}
      </div>
    </section>
  );
}