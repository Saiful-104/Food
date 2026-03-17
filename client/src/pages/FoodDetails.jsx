// src/pages/FoodDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaStar,
  FaClock,
  FaFire,
  FaLeaf,
  FaHeart,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
} from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import FoodCard from "../components/FoodCard";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: food, isLoading } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/${id}`,
      );
      return response.data;
    },
  });

  const { data: relatedFoods } = useQuery({
    queryKey: ["related-foods", food?.category, food?._id],
    queryFn: async () => {
      if (!food) return [];
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods?category=${food.category}&limit=4&exclude=${food._id}`,
      );
      return response.data.foods;
    },
    enabled: !!food,
  });

  const addToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    // Add to cart logic
    toast.success("Added to cart!");
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === food?.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? food?.images.length - 1 : prev - 1,
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <span className="text-neutral-500">Home</span> /
          <span className="text-neutral-500"> Explore</span> /
          <span className="text-primary-500"> {food?.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card overflow-hidden mb-4 relative group">
              <img
                src={
                  food?.images[selectedImage] ||
                  food?.images[0] ||
                  "/images/placeholder.jpg"
                }
                alt={food?.name}
                className="w-full h-96 object-cover"
              />

              {food?.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-neutral-800/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-neutral-800/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {food?.images?.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {food.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary-500"
                        : "border-transparent hover:border-primary-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Food Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{food?.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-500" />
                  <span className="font-medium">
                    {food?.rating?.toFixed(1)}
                  </span>
                  <span className="text-neutral-500">
                    ({food?.totalRatings || 0} reviews)
                  </span>
                </div>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-600 dark:text-neutral-400">
                  {food?.cuisine}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary-500">
                ${food?.price}
              </span>
              {food?.discountPrice && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    ${food?.discountPrice}
                  </span>
                  <span className="badge badge-success">
                    Save ${(food?.price - food?.discountPrice).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Dietary Info */}
            <div className="flex flex-wrap gap-2">
              {food?.isVegetarian && (
                <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center space-x-1">
                  <FaLeaf />
                  <span>Vegetarian</span>
                </span>
              )}
              {food?.isVegan && (
                <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center space-x-1">
                  <FaLeaf />
                  <span>Vegan</span>
                </span>
              )}
              {food?.isGlutenFree && (
                <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Gluten Free
                </span>
              )}
              {food?.isSpicy && (
                <span className="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center space-x-1">
                  <FaFire />
                  <span>Spicy</span>
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {food?.description}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {food?.ingredients?.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Nutritional Information
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                  <div className="text-sm text-neutral-500">Calories</div>
                  <div className="font-semibold">
                    {food?.nutritionalInfo?.calories || "-"}
                  </div>
                </div>
                <div className="text-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                  <div className="text-sm text-neutral-500">Protein</div>
                  <div className="font-semibold">
                    {food?.nutritionalInfo?.protein || "-"}g
                  </div>
                </div>
                <div className="text-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                  <div className="text-sm text-neutral-500">Carbs</div>
                  <div className="font-semibold">
                    {food?.nutritionalInfo?.carbs || "-"}g
                  </div>
                </div>
                <div className="text-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                  <div className="text-sm text-neutral-500">Fat</div>
                  <div className="font-semibold">
                    {food?.nutritionalInfo?.fat || "-"}g
                  </div>
                </div>
              </div>
            </div>

            {/* Preparation Time */}
            <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
              <FaClock />
              <span>
                Preparation time: {food?.preparationTime || "20-30 min"}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-neutral-300 dark:border-neutral-700">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  +
                </button>
              </div>

              <button
                onClick={addToCart}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>

              <button className="p-4 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <FaHeart className="text-neutral-500" />
              </button>
            </div>

            {/* Availability */}
            {food?.isAvailable ? (
              <div className="flex items-center space-x-2 text-green-500">
                <FaCheck />
                <span>Available for delivery</span>
              </div>
            ) : (
              <div className="text-red-500">Currently unavailable</div>
            )}
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedFoods?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedFoods.map((item) => (
                <FoodCard key={item._id} food={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
