import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { useUserStore } from '../store/userStore';
import UserList from '../components/admin/UserList';
import TaskDashboard from '../components/admin/TaskDashboard';
import CreateUserForm from '../components/admin/CreateUserForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function AdminDashboard() {
  const tasks = useTaskStore((state) => state.tasks);
  const users = useUserStore((state) => state.users);

  // Initialize admin user only, removing default users (user1, user2)
  React.useEffect(() => {
    if (users.length === 0) {
      useUserStore.getState().setUsers([
        {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin',
          isActive: true,
        },
      ]);
    } else {
      // Filter out default users if they exist
      const currentUsers = useUserStore.getState().users;
      const filteredUsers = currentUsers.filter(
        (user) => !['user1', 'user2'].includes(user.username)
      );
      useUserStore.getState().setUsers(filteredUsers);
      
      
    }
  }, [users.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage users and monitor tasks
          </p>
        </div>

        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks">
            <TaskDashboard />
          </TabsContent>
          
          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
                <UserList users={users} />
              </div>
              <div>
                <CreateUserForm />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
