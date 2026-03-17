import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaFilter,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Fetch all users from API
  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", roleFilter],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            page: 1,
            limit: 100,
            role: roleFilter !== "all" ? roleFilter : undefined,
          },
        },
      );
      return response.data.users || [];
    },
  });

  const filteredUsers = (usersData || []).filter((user) => {
    const matchesSearch =
      (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("User deleted successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

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
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <p className="mt-4 text-neutral-600">Loading users...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <p>Failed to load users. Please try again.</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-8 text-center text-neutral-500">
                  <p>No users found</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-neutral-50 dark:bg-neutral-700">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Role
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Joined
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                      >
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg text-blue-500">
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg text-red-500"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageUsers;
