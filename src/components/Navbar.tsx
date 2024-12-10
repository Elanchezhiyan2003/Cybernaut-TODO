import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { CheckSquare, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-xl">TaskMaster</span>
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/tasks"
                className="text-gray-700 hover:text-indigo-600"
              >
                My Tasks
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}