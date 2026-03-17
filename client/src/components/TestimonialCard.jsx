import React from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="card p-6">
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} 
          alt={testimonial.user}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold">{testimonial.user}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`${i < testimonial.rating ? 'text-yellow-500' : 'text-neutral-300'}`} 
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 italic">"{testimonial.comment}"</p>
    </div>
  );
};

export default TestimonialCard;