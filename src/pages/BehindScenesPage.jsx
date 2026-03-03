import React from 'react';
import { motion } from 'framer-motion';

const BehindScenesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 min-h-screen pt-16"
    >
      <section className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          <div className="aspect-[9/16] w-full">
            <iframe 
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/zqo4XfNosU8"
              title="Behind the Scenes"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BehindScenesPage;