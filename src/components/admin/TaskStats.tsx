import React from 'react';
import { Task } from '../../types';
import { CheckCircle, Clock, ListTodo } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === 'in-progress'
  ).length;

  const stats = [
    {
      name: 'Total Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'bg-indigo-500',
    },
    {
      name: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      name: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      name: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div
                className={`flex-shrink-0 p-3 rounded-md ${stat.color}`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}