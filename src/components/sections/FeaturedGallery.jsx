import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const FeaturedGallery = () => {
  const photos = useQuery(api.photos.listFeatured);
  const loading = photos === undefined;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="container-custom section-padding">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="heading-2 mb-4">Featured Work</h2>
        <p className="body-text max-w-3xl mx-auto">
          A selection of my best and most captivating photography work. Each image has been carefully composed and edited to tell a unique story.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600"></div>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {photos.filter(photo => !photo.nsfw).map((photo) => (
            <motion.div
              key={photo._id}
              variants={item}
              className="overflow-hidden rounded-lg shadow-md group"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={photo.url}
                  alt={photo.title || 'Featured photo'}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-medium">{photo.title}</h3>
                  <p className="text-white/80 mt-2">{photo.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-12"
      >
        <Link
          to="/fotoblog"
          className="btn-primary inline-block"
        >
          Ver Book Fotográfico Completo
        </Link>
      </motion.div>
    </section>
  );
};

export default FeaturedGallery;
