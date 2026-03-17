import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ManageRestaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all restaurants from API
  const {
    data: restaurantsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allRestaurants"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/restaurants`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { limit: 100 },
        },
      );
      return response.data.restaurants || [];
    },
  });

  const filteredRestaurants = (restaurantsData || []).filter(
    (r) =>
      (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.cuisine || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (restaurantId) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/restaurants/${restaurantId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        toast.success("Restaurant deleted successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to delete restaurant");
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
            <h1 className="text-2xl font-bold">Manage Restaurants</h1>
            <Link
              to="/admin/restaurants/create"
              className="btn-primary flex items-center"
            >
              <FaPlus className="mr-2" /> Add Restaurant
            </Link>
          </div>

          {/* Search */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 mb-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Restaurants Grid */}
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-neutral-600">Loading restaurants...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              <p>Failed to load restaurants. Please try again.</p>
            </div>
          ) : filteredRestaurants.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              <p>No restaurants found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant._id}
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-2">
                      {restaurant.cuisine || "Multi-cuisine"}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="font-medium">
                          {(restaurant.rating || 0).toFixed(1)}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          restaurant.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {restaurant.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/restaurant/${restaurant._id}`}
                        className="flex-1 btn-outline text-sm py-2"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/restaurants/edit/${restaurant._id}`}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-blue-500"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(restaurant._id)}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ManageRestaurants;
