import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase/client';
import Gallery from '../components/portfolio/Gallery';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PortfolioPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('fotofolio_fotos')
        .select('*')
        .order('views', { ascending: false })
        .order('id', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="bg-gray-900 min-h-screen"
    >
      <motion.div 
        className="container-custom py-2 md:py-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.7,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {loading ? (
          <motion.div 
            className="flex justify-center items-center min-h-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <LoadingSpinner />
            </motion.div>
          </motion.div>
        ) : (
          <>
            <Gallery photos={photos} />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PortfolioPage;