import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src={imageUrl} 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30"></div>
      </div>
      
      <div className="container-custom relative z-10 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-2xl mb-8"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Link 
            to="/fotoblog" 
            className="px-8 py-3 bg-white text-primary-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Ver Book Fotográfico
          </Link>
          <Link 
            to="/reservation" 
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
          >
            Book a Session
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;