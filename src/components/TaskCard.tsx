import React, { useState } from 'react';
import { format } from 'date-fns';
import { Task } from '../types';
import { useTaskStore } from '../store/taskStore';
import { Trash2, Edit, Check, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

/**
 * Renders a single task card.
 * @param {Task} task - The task to render.
 * @param {function} onEdit - A callback to call when the user wants to edit the task.
 * @returns {ReactElement} A React element representing the task card.
 */
export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  // State for inline editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };
  
  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-emerald-100 text-emerald-800',
  };

  const handleStatusChange = (newStatus: string) => {
    updateTask(task.id, { status: newStatus, updatedAt: new Date().toISOString() });
  };

  const handleSave = () => {
    updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority as 'low' | 'medium' | 'high',
      status: editedStatus as 'pending' | 'in-progress' | 'completed',
      updatedAt: new Date().toISOString()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedPriority(task.priority);
    setEditedStatus(task.status);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow w-1/2 p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value as 'pending' | 'in-progress' | 'completed')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              <div className="mt-2 flex gap-2">
                <span className={clsx('px-2 py-1 rounded text-xs font-medium', priorityColors[task.priority])}>
                  <AlertCircle className="h-3 w-3 inline mr-1" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                <span className={clsx('px-2 py-1 rounded text-xs font-medium', statusColors[task.status])}>
                  {task.status === 'completed' ? (
                    <CheckCircle className="h-3 w-3 inline mr-1" />
                  ) : (
                    <Clock className="h-3 w-3 inline mr-1" />
                  )}
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-800"
                title="Save changes"
              >
                <Check className="h-5 w-5" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:text-red-800"
                title="Cancel editing"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 editbtn text-gray-400 hover:text-indigo-600"
                title="Edit task"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 text-gray-400 hover:text-red-600"
                title="Delete task"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleStatusChange('pending')}
            className={clsx(
              'px-2 py-1 rounded',
              task.status === 'pending' ? 'bg-gray-200' : 'hover:bg-gray-100'
            )}
          >
            Pending
          </button>
          <button
            onClick={() => handleStatusChange('in-progress')}
            className={clsx(
              'px-2 py-1 rounded',
              task.status === 'in-progress' ? 'bg-gray-200' : 'hover:bg-gray-100'
            )}
          >
            In Progress
          </button>
          <button
            onClick={() => handleStatusChange('completed')}
            className={clsx(
              'px-2 py-1 rounded',
              task.status === 'completed' ? 'bg-gray-200' : 'hover:bg-gray-100'
            )}
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}