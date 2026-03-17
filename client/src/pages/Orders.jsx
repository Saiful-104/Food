import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['myOrders'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/myorders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    }
  });

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.restaurant?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['all', 'pending', 'confirmed', 'preparing', 'on_delivery', 'delivered', 'cancelled'];

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
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4">
                  <div className="skeleton h-6 w-48 mb-2" />
                  <div className="skeleton h-4 w-32" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders?.length > 0 ? (
                filteredOrders.map((order) => (
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