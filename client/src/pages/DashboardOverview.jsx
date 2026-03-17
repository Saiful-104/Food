import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaShoppingBag, FaDollarSign, FaClock, 
  FaTruck, FaStar, FaUtensils 
} from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DashboardOverview = () => {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['myOrders'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/myorders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    }
  });

  const stats = [
    {
      title: 'Total Orders',
      value: orders?.length || 0,
      icon: FaShoppingBag,
      color: 'bg-blue-500',
      link: '/dashboard/orders'
    },
    {
      title: 'Total Spent',
      value: `$${orders?.reduce((sum, order) => sum + order.total, 0).toFixed(2) || 0}`,
      icon: FaDollarSign,
      color: 'bg-green-500',
      link: '/dashboard/orders'
    },
    {
      title: 'Pending Orders',
      value: orders?.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'confirmed').length || 0,
      icon: FaClock,
      color: 'bg-yellow-500',
      link: '/dashboard/orders?status=pending'
    },
    {
      title: 'Delivered',
      value: orders?.filter(o => o.orderStatus === 'delivered').length || 0,
      icon: FaTruck,
      color: 'bg-purple-500',
      link: '/dashboard/orders?status=delivered'
    }
  ];

  const recentOrders = orders?.slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={stat.link} className="block">
              <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <h3 className="text-neutral-600 dark:text-neutral-300">{stat.title}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-primary-500 hover:text-primary-600">
            View All
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order._id} className="flex items-center justify-between p-3 bg-white dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <FaUtensils className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{order.restaurant}</h3>
                    <p className="text-sm text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary-500">${order.total}</span>
                  <p className="text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-500 mb-4">You haven't placed any orders yet</p>
            <Link to="/explore" className="btn-primary">
              Browse Restaurants
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;