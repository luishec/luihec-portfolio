import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center px-4 py-20 bg-gray-900"
    >
      <h1 className="text-9xl font-bold text-accent-200">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6 text-center text-white">Página no encontrada</h2>
      <p className="text-center text-gray-400 max-w-md mb-8">
        La página que buscas no existe o ha sido movida. Volvamos a ponerte en el camino correcto.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-accent-600 text-white rounded-md font-medium hover:bg-accent-700 transition-colors"
      >
        Volver al Inicio
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;