import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaTrash, FaArrowRight } from "react-icons/fa";
import FoodCard from "../components/FoodCard";

const Favorites = () => {
  // Sample favorites data - in production would come from backend
  const [favorites, setFavorites] = useState([
    {
      _id: "1",
      name: "Margherita Pizza",
      price: 14.99,
      rating: 4.8,
      images: ["https://images.unsplash.com/photo-1604382354936-07c5d9983bd3"],
      category: "Pizza",
    },
    {
      _id: "2",
      name: "Classic Cheeseburger",
      price: 12.99,
      rating: 4.6,
      images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd"],
      category: "Burgers",
    },
    {
      _id: "3",
      name: "California Roll",
      price: 18.99,
      rating: 4.9,
      images: ["https://images.unsplash.com/photo-1579584425555-c3ce17fd4351"],
      category: "Sushi",
    },
    {
      _id: "4",
      name: "Chicken Tikka Masala",
      price: 15.99,
      rating: 4.7,
      images: ["https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"],
      category: "Indian",
    },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav._id !== id));
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <FaHeart className="text-4xl text-neutral-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Start adding your favorite foods to see them here
        </p>
        <Link to="/explore" className="btn-primary inline-block">
          Explore Foods <FaArrowRight className="inline ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">My Favorite Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((food) => (
          <motion.div
            key={food._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <FoodCard food={food} />
            <button
              onClick={() => removeFavorite(food._id)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
            >
              <FaTrash />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
