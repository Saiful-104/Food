import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaClock, FaShoppingCart } from "react-icons/fa";

const FoodCard = ({ food }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="card group">
      <div className="relative overflow-hidden h-48 bg-neutral-200 dark:bg-neutral-700">
        {/* Skeleton loader while image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-pulse"></div>
        )}
        {/* Lazy loaded image */}
        <img
          src={
            food.images?.[0] ||
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          }
          alt={food.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {food.isVegetarian && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Veg
          </span>
        )}
        {food.isSpicy && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Spicy
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{food.name}</h3>
          <div className="flex items-center text-yellow-500">
            <FaStar className="mr-1" />
            <span className="text-sm font-medium">
              {food.rating?.toFixed(1) || "4.5"}
            </span>
          </div>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-2">
          {food.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-neutral-500 flex items-center">
            <FaClock className="mr-1" /> {food.preparationTime || "20-30 min"}
          </span>
          <span className="text-xs text-neutral-500">{food.cuisine}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-500">
            ${food.price}
          </span>
          <div className="flex space-x-2">
            <Link
              to={`/food/${food._id}`}
              className="btn-primary text-sm py-2 px-4"
            >
              View Details
            </Link>
            <button className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-primary-500 hover:text-white transition-colors">
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
