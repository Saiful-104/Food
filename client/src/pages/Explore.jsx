// src/pages/Explore.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaStar, FaSortAmountDown } from 'react-icons/fa';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import Pagination from '../components/Pagination';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    cuisine: '',
    minPrice: '',
    maxPrice: '',
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    rating: ''
  });
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 12;

  const { data, isLoading } = useQuery({
    queryKey: ['foods', { ...filters, sortBy, sortOrder, page, searchTerm }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit,
        sortBy,
        sortOrder,
        search: searchTerm,
        ...filters
      });
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/foods?${params}`);
      return response.data;
    }
  });

  const categories = [
    'All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Salads', 'Soups', 'Specials'
  ];

  const cuisines = [
    'Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 'Thai', 'American', 'Mediterranean'
  ];

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Foods</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Discover delicious meals from top restaurants
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for foods, cuisines, or restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 py-4"
            />
          </div>
        </div>

        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden btn-outline w-full mb-4 flex items-center justify-center space-x-2"
        >
          <FaFilter />
          <span>Filters</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <motion.div
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
            className="lg:w-64 lg:opacity-100 lg:h-auto overflow-hidden lg:overflow-visible"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <FaFilter />
                <span>Filters</span>
              </h3>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Cuisine Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Cuisine</label>
                <select
                  value={filters.cuisine}
                  onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                  className="input-field"
                >
                  <option value="">All Cuisines</option>
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                  className="input-field"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>

              {/* Dietary Filters */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.vegetarian}
                    onChange={(e) => setFilters({ ...filters, vegetarian: e.target.checked })}
                    className="rounded text-primary-500"
                  />
                  <span>Vegetarian</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.vegan}
                    onChange={(e) => setFilters({ ...filters, vegan: e.target.checked })}
                    className="rounded text-primary-500"
                  />
                  <span>Vegan</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.glutenFree}
                    onChange={(e) => setFilters({ ...filters, glutenFree: e.target.checked })}
                    className="rounded text-primary-500"
                  />
                  <span>Gluten Free</span>
                </label>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({
                  category: '',
                  cuisine: '',
                  minPrice: '',
                  maxPrice: '',
                  vegetarian: false,
                  vegan: false,
                  glutenFree: false,
                  rating: ''
                })}
                className="text-sm text-primary-500 hover:text-primary-600"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex justify-end mb-4">
              <div className="flex items-center space-x-2">
                <FaSortAmountDown className="text-neutral-400" />
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="input-field py-2"
                >
                  <option value="rating-desc">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
              Showing {data?.foods?.length || 0} of {data?.total || 0} results
            </p>

            {/* Food Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
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
                {data?.foods?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.foods.map((food) => (
                      <FoodCard key={food._id} food={food} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                      No foods found matching your criteria
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {data?.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={data.totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;