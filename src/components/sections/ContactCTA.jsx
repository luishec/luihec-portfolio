import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactCTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/230554/pexels-photo-230554.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Camera background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="heading-2 mb-6">Ready to Capture Your Story?</h2>
          <p className="text-lg mb-8">
            Let's create something beautiful together. Whether you need portraits, event coverage, or commercial photography, I'm here to bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/reservation" 
              className="px-8 py-3 bg-white text-primary-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Book a Session
            </Link>
            <Link 
              to="/portfolio" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Explore My Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;