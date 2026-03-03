import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import FeaturedGallery from '../components/sections/FeaturedGallery';
import AboutPreview from '../components/sections/AboutPreview';
import ServicesSection from '../components/sections/ServicesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactCTA from '../components/sections/ContactCTA';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero 
        title="Capturing Life's Beautiful Moments"
        subtitle="Professional Photography That Tells Your Story"
        imageUrl="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />
      
      <FeaturedGallery />
      
      <AboutPreview />
      
      <ServicesSection />
      
      <TestimonialsSection />
      
      <ContactCTA />
    </motion.div>
  );
};

export default HomePage;