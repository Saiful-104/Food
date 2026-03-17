import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageRestaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const restaurants = [
    { id: 1, name: 'Pizza Paradise', cuisine: 'Italian', rating: 4.5, orders: 1250, status: 'active' },
    { id: 2, name: 'Burger House', cuisine: 'American', rating: 4.3, orders: 890, status: 'active' },
    { id: 3, name: 'Sushi Master', cuisine: 'Japanese', rating: 4.7, orders: 650, status: 'active' },
    { id: 4, name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.4, orders: 780, status: 'active' },
    { id: 5, name: 'China Garden', cuisine: 'Chinese', rating: 4.2, orders: 560, status: 'inactive' },
  ];

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Restaurants</h1>
            <Link to="/admin/restaurants/create" className="btn-primary flex items-center">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                  <p className="text-sm text-neutral-500 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                    <span className="text-sm">{restaurant.orders} orders</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      restaurant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {restaurant.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 btn-outline text-sm py-2">View</button>
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-blue-500">
                      <FaEdit />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageRestaurants;