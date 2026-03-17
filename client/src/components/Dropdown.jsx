// src/components/Dropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ 
  trigger, 
  children, 
  align = 'left',
  width = 'auto',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  const widthClasses = {
    auto: 'w-auto',
    full: 'w-full',
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80'
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute z-50 mt-2 ${alignClasses[align]} ${widthClasses[width]} bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DropdownItem = ({ onClick, children, icon: Icon, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors ${className}`}
    >
      {Icon && <Icon className="text-neutral-500" />}
      <span>{children}</span>
    </button>
  );
};

export const DropdownDivider = () => {
  return <hr className="my-1 border-neutral-200 dark:border-neutral-700" />;
};

export default Dropdown;