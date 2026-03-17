import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FaTachometerAlt, FaShoppingBag, FaUser, 
  FaCog, FaHeart, FaMapMarkerAlt, FaSignOutAlt 
} from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Overview', end: true },
    { path: '/dashboard/orders', icon: FaShoppingBag, label: 'My Orders' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
    { path: '/dashboard/favorites', icon: FaHeart, label: 'Favorites' },
    { path: '/dashboard/addresses', icon: FaMapMarkerAlt, label: 'Addresses' },
    { path: '/dashboard/settings', icon: FaCog, label: 'Settings' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-64 flex-shrink-0"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary-500 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-sm text-neutral-500">{user?.email}</p>
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-primary-50 dark:hover:bg-primary-900/20 text-neutral-700 dark:text-neutral-300 hover:text-primary-500'
                    }`}
                  >
                    <item.icon className="text-lg" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-700 dark:text-neutral-300 hover:text-red-500 transition-colors"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
              <Outlet />
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;