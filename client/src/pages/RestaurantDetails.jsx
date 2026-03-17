import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, 
  FaClock, FaTruck, FaDollarSign, FaArrowLeft,
  FaRegHeart, FaHeart
} from 'react-icons/fa';
import axios from 'axios';
import FoodCard from '../components/FoodCard';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch restaurant details
  const { data: restaurant, isLoading: restaurantLoading } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/restaurants/${id}`);
      return response.data;
    }
  });

  // Fetch restaurant foods
  const { data: foodsData, isLoading: foodsLoading } = useQuery({
    queryKey: ['restaurant-foods', id],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/foods?restaurant=${id}`);
      return response.data;
    }
  });

  if (restaurantLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Restaurant Not Found</h2>
        <Link to="/explore" className="btn-primary">
          Back to Explore
        </Link>
      </div>
    );
  }

  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const today = weekDays[new Date().getDay() - 1];

  return (
    <div className="pb-20">
      {/* Cover Image */}
      <div className="relative h-80 md:h-96">
        <img 
          src={restaurant.coverImage || restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Back Button */}
        <Link 
          to="/explore" 
          className="absolute top-4 left-4 bg-white/90 dark:bg-neutral-800/90 p-3 rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
        >
          <FaArrowLeft />
        </Link>

        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white/90 dark:bg-neutral-800/90 p-3 rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart />
          )}
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="container-custom relative -mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="font-medium">{restaurant.rating?.toFixed(1) || '4.5'}</span>
                  <span className="text-neutral-500 ml-1">({restaurant.totalRatings || 0} reviews)</span>
                </div>
                <span className="text-neutral-300">|</span>
                <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{restaurant.address?.city}, {restaurant.address?.state}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <FaTruck className="text-primary-500 mx-auto mb-1" />
                <span className="text-sm font-medium">${restaurant.deliveryFee} Delivery</span>
              </div>
              <div className="text-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <FaDollarSign className="text-primary-500 mx-auto mb-1" />
                <span className="text-sm font-medium">Min ${restaurant.minimumOrder}</span>
              </div>
            </div>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-6">
            {restaurant.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {restaurant.cuisine?.map((item, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Contact & Hours */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <div>
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                  <FaPhone className="mr-3 text-primary-500" />
                  <span>{restaurant.contact?.phone}</span>
                </div>
                <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                  <FaEnvelope className="mr-3 text-primary-500" />
                  <span>{restaurant.contact?.email}</span>
                </div>
                <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                  <FaMapMarkerAlt className="mr-3 text-primary-500" />
                  <span>{restaurant.address?.street}, {restaurant.address?.city}, {restaurant.address?.state} {restaurant.address?.zipCode}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Opening Hours</h3>
              <div className="space-y-2">
                {weekDays.map((day) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="capitalize">{day}:</span>
                    <span className={day === today ? 'text-primary-500 font-medium' : 'text-neutral-600 dark:text-neutral-400'}>
                      {restaurant.openingHours?.[day]?.open || 'Closed'} - {restaurant.openingHours?.[day]?.close || 'Closed'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Menu Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
          
          {foodsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card">
                  <div className="skeleton h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <div className="skeleton h-6 w-3/4" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {foodsData?.foods?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {foodsData.foods.map((food) => (
                    <FoodCard key={food._id} food={food} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    No menu items available at the moment.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;