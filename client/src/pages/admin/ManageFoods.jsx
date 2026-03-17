import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageFoods = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const foods = [
    { id: 1, name: 'Margherita Pizza', restaurant: 'Pizza Paradise', category: 'Main Course', price: 14.99, status: 'available' },
    { id: 2, name: 'Pepperoni Pizza', restaurant: 'Pizza Paradise', category: 'Main Course', price: 16.99, status: 'available' },
    { id: 3, name: 'Classic Cheeseburger', restaurant: 'Burger House', category: 'Main Course', price: 12.99, status: 'available' },
    { id: 4, name: 'Rainbow Roll', restaurant: 'Sushi Master', category: 'Main Course', price: 18.99, status: 'available' },
    { id: 5, name: 'Street Tacos', restaurant: 'Taco Fiesta', category: 'Main Course', price: 9.99, status: 'out_of_stock' },
  ];

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || food.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Foods</h1>
            <Link to="/admin/foods/create" className="btn-primary flex items-center">
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
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-700">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Restaurant</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 font-semibold">Price</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFoods.map((food) => (
                    <tr key={food.id} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                      <td className="py-3 px-4 font-medium">{food.name}</td>
                      <td className="py-3 px-4">{food.restaurant}</td>
                      <td className="py-3 px-4">{food.category}</td>
                      <td className="py-3 px-4">${food.price}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          food.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {food.status}
                        </span>
                      </td>
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

export default ManageFoods;