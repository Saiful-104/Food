// src/pages/admin/EditFood.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaDollarSign, FaTag, FaImage } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const EditFood = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const { data: food, isLoading } = useQuery({
    queryKey: ['food', id],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/foods/${id}`);
      return response.data;
    }
  });

  useEffect(() => {
    if (food) {
      reset({
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category,
        cuisine: food.cuisine,
        ingredients: food.ingredients?.join(', '),
        isVegetarian: food.isVegetarian,
        isVegan: food.isVegan,
        isGlutenFree: food.isGlutenFree,
        isSpicy: food.isSpicy,
        preparationTime: food.preparationTime,
        isAvailable: food.isAvailable,
        'nutritionalInfo.calories': food.nutritionalInfo?.calories,
        'nutritionalInfo.protein': food.nutritionalInfo?.protein,
        'nutritionalInfo.carbs': food.nutritionalInfo?.carbs,
        'nutritionalInfo.fat': food.nutritionalInfo?.fat
      });
    }
  }, [food, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key !== 'images' && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      
      images.forEach(image => {
        formData.append('images', image);
      });

      await axios.put(`${import.meta.env.VITE_API_URL}/foods/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast.success('Food item updated successfully!');
      navigate('/admin/foods');
    } catch (error) {
      toast.error('Failed to update food item');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Food Item</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Update dish information</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Same form fields as CreateFood */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Food Name</label>
              <div className="relative">
                <FaUtensils className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  {...register('name', { required: 'Food name is required' })}
                  className="input-field pl-10"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

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
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

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

            <div>
              <label className="block text-sm font-medium mb-2">Cuisine</label>
              <input
                {...register('cuisine')}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              {...register('description', { 
                required: 'Description is required',
                minLength: { value: 20, message: 'Description must be at least 20 characters' }
              })}
              rows="4"
              className="input-field"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ingredients (comma separated)</label>
            <input
              {...register('ingredients')}
              className="input-field"
            />
          </div>

          {/* Existing Images */}
          {food?.images?.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Current Images</label>
              <div className="grid grid-cols-4 gap-4">
                {food.images.map((img, index) => (
                  <img key={index} src={img} alt={`Food ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Upload New Images</label>
            <div className="relative">
              <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
                className="input-field pl-10 pt-2"
              />
            </div>
          </div>

          {/* Nutritional Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Calories</label>
              <input
                type="number"
                {...register('nutritionalInfo.calories')}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Protein (g)</label>
              <input
                type="number"
                {...register('nutritionalInfo.protein')}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Carbs (g)</label>
              <input
                type="number"
                {...register('nutritionalInfo.carbs')}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fat (g)</label>
              <input
                type="number"
                {...register('nutritionalInfo.fat')}
                className="input-field"
              />
            </div>
          </div>

          {/* Dietary Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register('isVegetarian')} className="rounded text-primary-500" />
              <span>Vegetarian</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register('isVegan')} className="rounded text-primary-500" />
              <span>Vegan</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register('isGlutenFree')} className="rounded text-primary-500" />
              <span>Gluten Free</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register('isSpicy')} className="rounded text-primary-500" />
              <span>Spicy</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Preparation Time</label>
            <input
              {...register('preparationTime')}
              className="input-field"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('isAvailable')} className="rounded text-primary-500" />
            <label>Available for ordering</label>
          </div>

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
              {loading ? 'Updating...' : 'Update Food Item'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditFood;