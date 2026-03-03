import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutPreview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-gray-50 py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Photographer portrait" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-1/2 -right-8 -bottom-8 left-1/2 bg-accent-100 rounded-lg -z-0"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="heading-2 mb-6">About Me</h2>
            <p className="body-text mb-4">
              Hello, I'm [Your Name], a professional photographer with over 10 years of experience capturing life's most beautiful moments. My passion for photography began when I was a teenager and received my first camera as a gift.
            </p>
            <p className="body-text mb-6">
              I specialize in portrait, landscape, and event photography, with a particular focus on natural light and authentic emotions. My style combines classic techniques with modern aesthetics to create timeless images.
            </p>
            <Link 
              to="/about" 
              className="btn-primary inline-block"
            >
              Learn More About Me
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;