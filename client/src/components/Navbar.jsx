import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  FaHome, 
  FaCompass, 
  FaInfoCircle, 
  FaEnvelope, 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaUtensils,
  FaShoppingCart,
  FaTachometerAlt,
  FaCog,
  FaSignOutAlt,
  FaChevronDown
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  const navLinks = isAuthenticated ? [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/explore', icon: FaCompass, label: 'Explore' },
    { to: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { to: '/blog', icon: FaInfoCircle, label: 'Blog' },
  ] : [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/explore', icon: FaCompass, label: 'Explore' },
    { to: '/about', icon: FaInfoCircle, label: 'About' },
    { to: '/contact', icon: FaEnvelope, label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaUtensils className="text-2xl text-primary-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              FoodExpress
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <span className="flex items-center space-x-1">
                  <link.icon className="text-sm" />
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-300">{user?.name?.split(' ')[0]}</span>
                  <FaChevronDown className={`text-xs transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-lg py-2 border border-neutral-200 dark:border-neutral-700"
                    >
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        <FaUser className="text-neutral-500" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        <FaShoppingCart className="text-neutral-500" />
                        <span>My Orders</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                          onClick={() => setProfileOpen(false)}
                        >
                          <FaTachometerAlt className="text-neutral-500" />
                          <span>Admin</span>
                        </Link>
                      )}
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        <FaCog className="text-neutral-500" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 text-red-500"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ml-2"
            >
              {isDark ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-neutral-700" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {isDark ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-neutral-700" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="text-primary-500" />
                    <span>{link.label}</span>
                  </Link>
                ))}

                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUser className="text-primary-500" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaShoppingCart className="text-primary-500" />
                      <span>My Orders</span>
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaTachometerAlt className="text-primary-500" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-3 w-full text-left rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-red-500"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="pt-4 space-y-2">
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-center text-primary-500 border border-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 text-center bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;