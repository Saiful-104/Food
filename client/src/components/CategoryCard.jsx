import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/explore?category=${category.name}`}
      className="card p-6 text-center hover:shadow-xl transition-all duration-300 group"
    >
      <div className={`text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300`}>
        {category.icon}
      </div>
      <h3 className="font-semibold mb-1">{category.name}</h3>
      <p className="text-sm text-neutral-500">{category.count} items</p>
    </Link>
  );
};

export default CategoryCard;