import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaTruck, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'preparing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'on_delivery': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden"
    >
      {/* Order Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">{order.restaurant}</h3>
            <p className="text-sm text-neutral-500">
              Order #{order._id.slice(-8)} • {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
              {order.orderStatus}
            </span>
            <span className="font-bold text-primary-500">${order.total}</span>
          </div>
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-neutral-500">{order.items.length} items</span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-primary-500 hover:text-primary-600"
          >
            {expanded ? (
              <>Show Less <FaChevronUp className="ml-1" /></>
            ) : (
              <>Show Details <FaChevronDown className="ml-1" /></>
            )}
          </button>
        </div>

        {/* Expanded Items */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                    <div>
                      <span className="font-medium">{item.quantity}x </span>
                      <span>{item.name}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delivery Info */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
          <div className="flex items-center">
            <FaTruck className="mr-1" />
            <span>Delivery: {order.deliveryAddress?.street}</span>
          </div>
          {order.estimatedDeliveryTime && (
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>Est: {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-end space-x-3">
          {order.orderStatus === 'delivered' && !order.rating && (
            <button className="flex items-center space-x-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              <FaStar />
              <span>Rate Order</span>
            </button>
          )}
          <Link 
            to={`/orders/${order._id}`}
            className="btn-outline text-sm"
          >
            View Details
          </Link>
          <button className="btn-primary text-sm">
            Reorder
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;