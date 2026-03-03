import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative h-[50vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/75 to-primary-900/60"></div>
      </div>
      
      <div className="container-custom relative z-10 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="heading-1 mb-4"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl max-w-2xl text-gray-200"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default PageHeader;