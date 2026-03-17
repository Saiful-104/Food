import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: '10 Best Pizza Places in New York',
      excerpt: 'Discover the top pizzerias that are serving the most delicious slices in the Big Apple.',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      author: 'John Smith',
      date: '2024-02-15',
      category: 'Food Guide'
    },
    {
      id: 2,
      title: 'How to Make Perfect Sushi at Home',
      excerpt: 'Learn the art of sushi making with these expert tips and tricks from master chefs.',
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754',
      author: 'Sarah Johnson',
      date: '2024-02-10',
      category: 'Cooking Tips'
    },
    {
      id: 3,
      title: 'The Rise of Plant-Based Burgers',
      excerpt: 'Exploring the growing trend of vegetarian and vegan burger options in restaurants.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
      author: 'Mike Chen',
      date: '2024-02-05',
      category: 'Food Trends'
    },
    {
      id: 4,
      title: 'Food Delivery: Past, Present & Future',
      excerpt: 'How technology has transformed the way we order and receive our favorite meals.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d',
      author: 'Emily Brown',
      date: '2024-01-28',
      category: 'Industry'
    }
  ];

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Our Blog</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Latest news, tips, and stories from the food world
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-neutral-500 mb-3">
                  <FaCalendar className="mr-2" />
                  <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                  <FaUser className="mr-2" />
                  <span>{post.author}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
                >
                  Read More <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Get the latest food news and updates delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field flex-1"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;