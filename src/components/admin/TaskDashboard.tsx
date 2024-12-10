import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useUserStore } from '../../store/userStore';
import { useAuthStore } from '../../store/authStore';
import { Edit2, Trash2, Check, X, AlertCircle } from 'lucide-react';
import TaskList from '../TaskList';
import TaskForm from '../TaskForm';

interface EditingTask {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function TaskDashboard() {
  const loadTasks = useTaskStore((state) => state.loadTasks);
  const currentUser = useAuthStore((state) => state.user);
  const tasks = useTaskStore((state) => 
    currentUser?.role === 'admin' 
      ? state.tasks 
      : state.getUserTasks(currentUser?.id || '')
  );
  const users = useUserStore((state) => state.users);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null);
  const [filter, setFilter] = useState<string>('all'); // 'all' or userId

  useEffect(() => {
    // Load tasks from localStorage when component mounts
    loadTasks();
  }, [loadTasks]);

  const handleEdit = (task: EditingTask) => {
    setEditingTask(task);
  };

  const handleSave = () => {
    if (editingTask) {
      updateTask(editingTask.id, {
        title: editingTask.title,
        status: editingTask.status,
      });
      setEditingTask(null);
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.userId === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleEditTask = (task: any) => {
    // Task editing is handled within TaskCard component
    console.log('Editing task:', task.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Task</h2>
        <TaskForm />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {currentUser?.role === 'admin' ? 'All Tasks' : 'My Tasks'}
        </h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Task Dashboard</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white shadow-md min-h-96 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => {
                  const user = users.find((u) => u.id === task.userId);
                  const isEditing = editingTask?.id === task.id;

                  return (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editingTask.title}
                            onChange={(e) =>
                              setEditingTask({ ...editingTask, title: e.target.value })
                            }
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">
                            {task.title}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user?.username || 'Unknown User'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <select
                            value={editingTask.status}
                            onChange={(e) =>
                              setEditingTask({
                                ...editingTask,
                                status: e.target.value as 'pending' | 'in-progress' | 'completed',
                              })
                            }
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        ) : (
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-red-600 hover:text-red-900"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleEdit({
                                  id: task.id,
                                  title: task.title,
                                  status: task.status,
                                })
                              }
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-10">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all'
                  ? 'No tasks have been created yet.'
                  : 'This user has no tasks assigned.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
