import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white py-8 border-t border-gray-800"
    >
      <div className="container-custom">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Luis H. Book Fotográfico © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;