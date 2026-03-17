import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaUsers, FaTruck, FaHeart } from 'react-icons/fa';

const About = () => {
  const team = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Former restaurant owner with a passion for food tech'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Ensures every delivery is perfect and on time'
    },
    {
      name: 'Mike Chen',
      role: 'Tech Lead',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      bio: 'Building the future of food delivery'
    }
  ];

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">About FoodExpress</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            We're on a mission to bring delicious food to your doorstep, fast and fresh
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Founded in 2020, FoodExpress started with a simple idea: make great food accessible to everyone. 
              What began as a small delivery service in New York has grown into a platform connecting thousands 
              of restaurants with hungry customers across the country.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              We believe that food brings people together, and we're committed to making every meal special. 
              From local favorites to international cuisine, we're here to satisfy every craving.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5" 
              alt="Our team"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: FaUtensils, value: '500+', label: 'Restaurants' },
            { icon: FaUsers, value: '50k+', label: 'Happy Customers' },
            { icon: FaTruck, value: '100k+', label: 'Deliveries' },
            { icon: FaHeart, value: '4.8', label: 'Average Rating' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="text-4xl text-primary-500 mx-auto mb-3" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-neutral-600 dark:text-neutral-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary-500 mb-2">{member.role}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;