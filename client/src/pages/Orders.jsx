import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaStar, FaSortAmountDown } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/myorders`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      return response.data;
    },
  });

  const filteredAndSortedOrders = orders
    ? orders
        .filter((order) => {
          const matchesSearch = order.restaurant
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesStatus =
            statusFilter === "all" || order.orderStatus === statusFilter;
          return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
          let comparison = 0;
          switch (sortBy) {
            case "date":
              comparison = new Date(a.createdAt) - new Date(b.createdAt);
              break;
            case "price":
              comparison = (a.totalAmount || 0) - (b.totalAmount || 0);
              break;
            case "restaurant":
              comparison = (a.restaurant || "").localeCompare(
                b.restaurant || "",
              );
              break;
            default:
              comparison = 0;
          }
          return sortOrder === "asc" ? comparison : -comparison;
        })
    : [];

  const statuses = [
    "all",
    "pending",
    "confirmed",
    "preparing",
    "on_delivery",
    "delivered",
    "cancelled",
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>

          {/* Filters */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by restaurant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <div className="md:w-44">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() +
                        status.slice(1).replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:w-40">
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field flex-1"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="price">Sort by Price</option>
                    <option value="restaurant">Sort by Restaurant</option>
                  </select>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="px-3 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition flex items-center gap-1"
                    title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
                  >
                    <FaSortAmountDown />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4"
                >
                  <div className="skeleton h-6 w-48 mb-2" />
                  <div className="skeleton h-4 w-32" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedOrders?.length > 0 ? (
                filteredAndSortedOrders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
                  <p className="text-neutral-500">No orders found</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;
