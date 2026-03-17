import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaUsers, FaUtensils, FaShoppingBag, FaStar,
  FaDollarSign, FaChartLine, FaStore, FaClipboardList 
} from 'react-icons/fa';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: FaUsers, color: 'bg-blue-500', change: '+12%' },
    { title: 'Total Orders', value: '567', icon: FaShoppingBag, color: 'bg-green-500', change: '+8%' },
    { title: 'Total Revenue', value: '$12,345', icon: FaDollarSign, color: 'bg-purple-500', change: '+15%' },
    { title: 'Restaurants', value: '45', icon: FaStore, color: 'bg-orange-500', change: '+5%' },
    { title: 'Food Items', value: '890', icon: FaUtensils, color: 'bg-red-500', change: '+10%' },
    { title: 'Avg. Rating', value: '4.5', icon: FaStar, color: 'bg-yellow-500', change: '+0.2' },
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', restaurant: 'Pizza Paradise', total: 45.99, status: 'delivered' },
    { id: '#12346', customer: 'Jane Smith', restaurant: 'Burger House', total: 32.50, status: 'preparing' },
    { id: '#12347', customer: 'Mike Johnson', restaurant: 'Sushi Master', total: 78.20, status: 'pending' },
    { id: '#12348', customer: 'Sarah Williams', restaurant: 'Taco Fiesta', total: 28.75, status: 'on_delivery' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'on_delivery': return 'bg-purple-100 text-purple-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Welcome back! Here's what's happening with your platform.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-sm text-green-500">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link to="/admin/users" className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow">
              <FaUsers className="text-2xl text-primary-500 mx-auto mb-2" />
              <span className="text-sm font-medium">Manage Users</span>
            </Link>
            <Link to="/admin/foods" className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow">
              <FaUtensils className="text-2xl text-primary-500 mx-auto mb-2" />
              <span className="text-sm font-medium">Manage Foods</span>
            </Link>
            <Link to="/admin/orders" className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow">
              <FaShoppingBag className="text-2xl text-primary-500 mx-auto mb-2" />
              <span className="text-sm font-medium">Manage Orders</span>
            </Link>
            <Link to="/admin/restaurants" className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow">
              <FaStore className="text-2xl text-primary-500 mx-auto mb-2" />
              <span className="text-sm font-medium">Restaurants</span>
            </Link>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Restaurant</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.restaurant}</td>
                      <td className="py-3 px-4">${order.total}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link to={`/admin/orders/${order.id}`} className="text-primary-500 hover:text-primary-600">
                          View
                        </Link>
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

export default AdminDashboard;