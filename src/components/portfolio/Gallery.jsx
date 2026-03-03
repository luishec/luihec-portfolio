import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabase/client';
import { useInView } from 'react-intersection-observer';

const Gallery = ({ photos: initialPhotos }) => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openModal = async (photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
    
    try {
      const { error } = await supabase.rpc('increment_photo_views', {
        photo_id: photo.id
      });
      
      if (error) {
        console.error('Error incrementing views:', error);
        return;
      }

      setPhotos(prevPhotos => 
        prevPhotos.map(p => 
          p.id === photo.id 
            ? { ...p, views: (p.views || 0) + 1 }
            : p
        )
      );
      setSelectedPhoto(prev => ({ ...prev, views: (prev.views || 0) + 1 }));
      
    } catch (error) {
      console.error('Error calling increment function:', error);
    }
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No hay fotos en esta categoría.
      </div>
    );
  }

  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Variantes de animación para cada foto
  const photoVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <>
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => openModal(photo)}
            variants={photoVariants}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="relative max-w-7xl max-h-[90vh] overflow-hidden rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <picture>
                <source 
                  srcSet={`${selectedPhoto.url}?auto=compress&cs=tinysrgb&w=1600&fm=webp`} 
                  type="image/webp" 
                />
                <img 
                  src={`${selectedPhoto.url}?auto=compress&cs=tinysrgb&w=1600`}
                  alt={selectedPhoto.title || 'Gallery photo'}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  loading="lazy"
                  width="1600"
                  height="2400"
                />
              </picture>
              
              <button
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-2xl"
                onClick={closeModal}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Componente separado para cada foto con animaciones individuales
const PhotoCard = ({ photo, onClick, variants }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px 0px'
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className="aspect-[2/3] overflow-hidden cursor-pointer rounded-lg relative group"
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <picture>
          <source 
            srcSet={`${photo.url}?auto=compress&cs=tinysrgb&w=800&fm=webp`} 
            type="image/webp" 
          />
          <img 
            src={`${photo.url}?auto=compress&cs=tinysrgb&w=800`}
            alt={photo.title || 'Gallery photo'}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
            width="800"
            height="1200"
          />
        </picture>
      </motion.div>
      
      {/* Overlay sutil al hacer hover */}
      <motion.div
        className="absolute inset-0 bg-black/0 rounded-lg"
        whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
export default Gallery;