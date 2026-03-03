import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    // Clean up any potential styles when route changes
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.filter = 'none';
      mainContent.style.backgroundColor = 'transparent';
    }
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-md">
      <div className="container-custom py-4">
        <div className="relative">
          <div className="flex justify-center">
            <Link to="/" className="h-12">
              <img src="https://i.ibb.co/6095r8kg/logo.webp" alt="Luis H. Espín" className="h-full object-contain" />
            </Link>
          </div>

          {/* Navigation - Always visible */}
          <nav className="flex items-center justify-center mt-4 space-x-4 sm:space-x-8">
            <NavLink 
              to="/fotoblog" 
              label="Book Fotográfico" 
              isActive={location.pathname === '/fotoblog' || location.pathname === '/' || location.pathname.startsWith('/fotoblog')} 
            />
            <NavLink 
              to="/yo" 
              label="Conóceme" 
              isActive={location.pathname === '/yo' || location.pathname.startsWith('/yo')} 
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, label, isActive }) => {
  const baseClasses = "text-gray-300 hover:text-white transition-colors relative text-base lg:text-lg";
  const activeClasses = "text-white font-semibold relative text-base lg:text-lg";

  return (
    <Link
      to={to}
      className={isActive ? activeClasses : baseClasses}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
          layoutId="navbar-indicator"
          transition={{ type: 'spring', duration: 0.5 }}
        />
      )}
    </Link>
  );
};

export default Navbar;