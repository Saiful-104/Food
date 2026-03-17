// src/pages/admin/CreateFood.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaDollarSign, FaTag, FaImage, FaLeaf, FaFire } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const CreateFood = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key !== 'images') {
          formData.append(key, data[key]);
        }
      });
      
      // Append images
      images.forEach(image => {
        formData.append('images', image);
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/foods`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast.success('Food item created successfully!');
      navigate('/admin/foods');
    } catch (error) {
      toast.error('Failed to create food item');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Food Item</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Add a new dish to the menu</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Food Name</label>
              <div className="relative">
                <FaUtensils className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  {...register('name', { required: 'Food name is required' })}
                  className="input-field pl-10"
                  placeholder="e.g., Margherita Pizza"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  className="input-field pl-10"
                  placeholder="12.99"
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="relative">
                <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="input-field pl-10"
                >
                  <option value="">Select Category</option>
                  <option value="Appetizers">Appetizers</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Salads">Salads</option>
                  <option value="Soups">Soups</option>
                  <option value="Specials">Specials</option>
                </select>
              </div>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            {/* Cuisine */}
            <div>
              <label className="block text-sm font-medium mb-2">Cuisine</label>
              <input
                {...register('cuisine')}
                className="input-field"
                placeholder="e.g., Italian, Chinese, Mexican"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              {...register('description', { 
                required: 'Description is required',
                minLength: { value: 20, message: 'Description must be at least 20 characters' }
              })}
              rows="4"
              className="input-field"
              placeholder="Describe the dish, ingredients, preparation method..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium mb-2">Ingredients (comma separated)</label>
            <input
              {...register('ingredients')}
              className="input-field"
              placeholder="tomato, mozzarella, basil, olive oil"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Food Images</label>
            <div className="relative">
              <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="input-field pl-10 pt-2"
              />
            </div>
            {images.length > 0 && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                {images.length} image(s) selected
              </p>
            )}
          </div>

          {/* Nutritional Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Calories</label>
              <input
                type="number"
                {...register('nutritionalInfo.calories')}
                className="input-field"
                placeholder="450"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Protein (g)</label>
              <input
                type="number"
                {...register('nutritionalInfo.protein')}
                className="input-field"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Carbs (g)</label>
              <input
                type="number"
                {...register('nutritionalInfo.carbs')}
                className="input-field"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fat (g)</label>
              <input
                type="number"
                {...register('nutritionalInfo.fat')}
                className="input-field"
                placeholder="15"
              />
            </div>
          </div>

          {/* Dietary Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register('isVegetarian')} className="rounded text-primary-500" />
              <span className="flex items-center space-x-1">
                <FaLeaf className="text-green-500" />
                <span>Vegetarian</span>
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register('isVegan')} className="rounded text-primary-500" />
              <span className="flex items-center space-x-1">
                <FaLeaf className="text-green-500" />
                <span>Vegan</span>
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register('isGlutenFree')} className="rounded text-primary-500" />
              <span>Gluten Free</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register('isSpicy')} className="rounded text-primary-500" />
              <span className="flex items-center space-x-1">
                <FaFire className="text-red-500" />
                <span>Spicy</span>
              </span>
            </label>
          </div>

          {/* Preparation Time */}
          <div>
            <label className="block text-sm font-medium mb-2">Preparation Time</label>
            <input
              {...register('preparationTime')}
              className="input-field"
              placeholder="e.g., 20-30 min"
            />
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('isAvailable')} defaultChecked className="rounded text-primary-500" />
            <label>Available for ordering</label>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/foods')}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Creating...' : 'Create Food Item'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateFood;