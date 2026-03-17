import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { 
  FaClock, 
  FaTruck, 
  FaStar, 
  FaUsers, 
  FaUtensils, 
  FaLeaf,
  FaArrowRight 
} from 'react-icons/fa';
import FoodCard from '../components/FoodCard';
import TestimonialCard from '../components/TestimonialCard';
import CategoryCard from '../components/CategoryCard';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/stats`);
      return response.data;
    }
  });

  const { data: featuredFoods, isLoading } = useQuery({
    queryKey: ['featured-foods'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/foods?limit=8`);
      return response.data.foods;
    }
  });

  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/testimonials`);
      return response.data;
    }
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  };

  const categories = [
    { name: 'Pizza', icon: '🍕', count: 45, color: 'from-red-500 to-orange-500' },
    { name: 'Burgers', icon: '🍔', count: 32, color: 'from-yellow-500 to-amber-500' },
    { name: 'Sushi', icon: '🍣', count: 28, color: 'from-green-500 to-teal-500' },
    { name: 'Chinese', icon: '🥡', count: 36, color: 'from-red-500 to-pink-500' },
    { name: 'Desserts', icon: '🍰', count: 24, color: 'from-purple-500 to-pink-500' },
    { name: 'Salads', icon: '🥗', count: 19, color: 'from-green-500 to-lime-500' },
  ];

  const features = [
    {
      icon: FaClock,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less',
      color: 'text-primary-500'
    },
    {
      icon: FaTruck,
      title: 'Live Tracking',
      description: 'Track your order in real-time from kitchen to door',
      color: 'text-secondary-500'
    },
    {
      icon: FaStar,
      title: 'Top Rated',
      description: 'Thousands of 5-star reviews from happy customers',
      color: 'text-yellow-500'
    },
    {
      icon: FaLeaf,
      title: 'Fresh Food',
      description: 'Prepared fresh with quality ingredients',
      color: 'text-green-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Slider {...sliderSettings}>
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative h-[70vh]">
              <img
                src={`/images/hero-${item}.jpg`}
                alt={`Hero ${item}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
                <div className="container-custom h-full flex items-center">
                  <div className="max-w-2xl text-white">
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl md:text-6xl font-bold mb-4"
                    >
                      Delicious Food Delivered To Your Doorstep
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl mb-8"
                    >
                      Discover the best restaurants in your area and get your favorite meals delivered fast
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap gap-4"
                    >
                      <Link to="/explore" className="btn-primary text-lg">
                        Order Now
                      </Link>
                      <Link to="/about" className="btn-outline text-white border-white hover:bg-white hover:text-primary-500 text-lg">
                        Learn More
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <FaUsers className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{stats?.users || '50K+'}</div>
              <div className="text-primary-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <FaUtensils className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{stats?.restaurants || '500+'}</div>
              <div className="text-primary-100">Restaurants</div>
            </div>
            <div className="text-center">
              <FaStar className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{stats?.orders || '100K+'}</div>
              <div className="text-primary-100">Orders Delivered</div>
            </div>
            <div className="text-center">
              <FaClock className="text-4xl mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">30 min</div>
              <div className="text-primary-100">Average Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose FoodExpress?</h2>
            <p className="section-subtitle">We make food delivery simple, fast, and enjoyable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <feature.icon className={`text-5xl ${feature.color} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-neutral-100 dark:bg-neutral-800/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Popular Categories</h2>
            <p className="section-subtitle">Explore our wide variety of cuisines</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="section-title">Featured Items</h2>
              <p className="section-subtitle">Most popular dishes this week</p>
            </div>
            <Link to="/explore" className="btn-outline flex items-center gap-2">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="card">
                  <div className="skeleton h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <div className="skeleton h-6 w-3/4" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-2/3" />
                  </div>
                </div>
              ))
            ) : (
              featuredFoods?.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-primary-50 dark:bg-primary-900/20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get your food in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Choose Food', description: 'Browse restaurants and select your favorite dishes' },
              { step: 2, title: 'Place Order', description: 'Add items to cart and proceed to checkout' },
              { step: 3, title: 'Track Delivery', description: 'Follow your order in real-time' },
              { step: 4, title: 'Enjoy Meal', description: 'Get your food delivered hot and fresh' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from real food lovers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials?.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-100 dark:bg-neutral-800/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Got questions? We've got answers</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              {
                q: 'How fast is the delivery?',
                a: 'Most orders are delivered within 30-45 minutes. You can track your order in real-time.'
              },
              {
                q: 'What areas do you deliver to?',
                a: 'We currently deliver to all major cities. Check if your area is covered during checkout.'
              },
              {
                q: 'Can I track my order?',
                a: 'Yes! You can track your order live from the restaurant to your doorstep.'
              },
              {
                q: 'What if my food arrives cold?',
                a: "We guarantee hot delivery. If your food isn't hot, we'll refund or replace it."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 mb-4"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers today</p>
          <Link to="/register" className="btn-primary bg-white text-primary-500 hover:bg-neutral-100 text-lg">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;