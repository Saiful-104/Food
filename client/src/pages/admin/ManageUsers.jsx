import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash, FaUserPlus, FaFilter } from 'react-icons/fa';

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', orders: 12, joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', orders: 8, joined: '2024-01-20' },
    { id: 3, name: 'Admin User', email: 'admin@foodexpress.com', role: 'admin', orders: 0, joined: '2024-01-10' },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', orders: 5, joined: '2024-02-01' },
    { id: 5, name: 'Sarah Williams', email: 'sarah@example.com', role: 'user', orders: 15, joined: '2024-02-05' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Users</h1>
            <button className="btn-primary flex items-center">
              <FaUserPlus className="mr-2" /> Add New User
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <div className="md:w-48">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Roles</option>
                  <option value="user">Users</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-700">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Role</th>
                    <th className="text-left py-3 px-4 font-semibold">Orders</th>
                    <th className="text-left py-3 px-4 font-semibold">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">{user.orders}</td>
                      <td className="py-3 px-4">{user.joined}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg text-blue-500">
                            <FaEdit />
                          </button>
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg text-red-500">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageUsers;