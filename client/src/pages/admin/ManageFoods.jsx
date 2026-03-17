import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ManageFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch all foods from API
  const {
    data: foodsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allFoods", categoryFilter],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            page: 1,
            limit: 100,
            category: categoryFilter !== "all" ? categoryFilter : undefined,
          },
        },
      );
      return response.data.foods || [];
    },
  });

  const filteredFoods = (foodsData || []).filter((food) => {
    const matchesSearch =
      (food.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (food.restaurant?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async (foodId) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/foods/${foodId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Food item deleted successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to delete food item");
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
            <h1 className="text-2xl font-bold">Manage Foods</h1>
            <Link
              to="/admin/foods/create"
              className="btn-primary flex items-center"
            >
              <FaPlus className="mr-2" /> Add New Food
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <div className="md:w-48">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Categories</option>
                  <option value="Appetizers">Appetizers</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Beverages">Beverages</option>
                </select>
              </div>
            </div>
          </div>

          {/* Foods Table */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <p className="mt-4 text-neutral-600">Loading foods...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <p>Failed to load foods. Please try again.</p>
                </div>
              ) : filteredFoods.length === 0 ? (
                <div className="p-8 text-center text-neutral-500">
                  <p>No foods found</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-neutral-50 dark:bg-neutral-700">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Restaurant
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Price
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
                    {filteredFoods.map((food) => (
                      <tr
                        key={food._id}
                        className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                      >
                        <td className="py-3 px-4 font-medium">{food.name}</td>
                        <td className="py-3 px-4">
                          {food.restaurant?.name || "N/A"}
                        </td>
                        <td className="py-3 px-4">{food.category}</td>
                        <td className="py-3 px-4">
                          ${food.price?.toFixed(2) || "0.00"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              food.isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {food.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Link
                              to={`/admin/foods/edit/${food._id}`}
                              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg text-blue-500"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDelete(food._id)}
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

export default ManageFoods;
