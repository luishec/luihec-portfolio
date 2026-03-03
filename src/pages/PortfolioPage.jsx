import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Gallery from '../components/portfolio/Gallery';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PortfolioPage = () => {
  const photos = useQuery(api.photos.listAll);
  const loading = photos === undefined;

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
