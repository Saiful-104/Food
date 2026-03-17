import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaSearch, FaEye, FaFilter } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch all orders from API
  const {
    data: ordersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allOrders", statusFilter],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: statusFilter !== "all" ? { status: statusFilter } : {},
        },
      );
      return response.data.orders || [];
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-cyan-100 text-cyan-800";
      case "on_delivery":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  const filteredOrders = (ordersData || []).filter((order) => {
    const matchesSearch =
      (order.user?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (order.restaurant?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (order._id || "").includes(searchTerm);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

          {/* Filters */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="on_delivery">On Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <p className="mt-4 text-neutral-600">Loading orders...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <p>Failed to load orders. Please try again.</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-neutral-500">
                  <p>No orders found</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-neutral-50 dark:bg-neutral-700">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Restaurant
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Total
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                      >
                        <td className="py-3 px-4 font-medium">
                          {order._id?.substring(0, 8)}...
                        </td>
                        <td className="py-3 px-4">
                          {order.user?.name || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {order.restaurant?.name || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          ${order.totalAmount?.toFixed(2) || "0.00"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.orderStatus)}`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg text-blue-500">
                            <FaEye />
                          </button>
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

export default ManageOrders;
