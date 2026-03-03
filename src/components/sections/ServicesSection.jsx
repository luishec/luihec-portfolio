import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: "portrait",
      title: "Portrait Photography",
      description: "Professional individual and group portraits that capture personality and emotion in a natural way.",
      imageUrl: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      icon: "landscape",
      title: "Landscape & Travel",
      description: "Breathtaking landscape and travel photography that showcases the beauty of destinations around the world.",
      imageUrl: "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      icon: "wedding",
      title: "Wedding & Events",
      description: "Comprehensive coverage of weddings and special events, capturing both candid moments and classic poses.",
      imageUrl: "https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      icon: "commercial",
      title: "Commercial Photography",
      description: "High-quality product and brand photography for businesses, perfectly showcasing your products and services.",
      imageUrl: "https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1600"
    }
  ];

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
        <h2 className="heading-2 mb-4">Services Offered</h2>
        <p className="body-text max-w-3xl mx-auto">
          I provide a range of professional photography services tailored to your specific needs. From intimate portraits to grand events, I'm here to capture your special moments.
        </p>
      </motion.div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
            variants={item}
          />
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-12"
      >
        <Link 
          to="/reservation" 
          className="btn-primary inline-block"
        >
          View Pricing & Book
        </Link>
      </motion.div>
    </section>
  );
};

const ServiceCard = ({ icon, title, description, imageUrl, variants }) => {
  let iconSvg;

  switch (icon) {
    case 'portrait':
      iconSvg = (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
      break;
    case 'landscape':
      iconSvg = (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
      break;
    case 'wedding':
      iconSvg = (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
      break;
    case 'commercial':
      iconSvg = (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
      break;
    default:
      iconSvg = null;
  }

  return (
    <motion.div
      variants={variants}
      className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="sm:w-1/3 h-48 sm:h-auto">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 sm:w-2/3">
        <div className="text-accent-600 mb-4">
          {iconSvg}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to="/portfolio" className="text-accent-600 font-medium hover:text-accent-700 transition-colors">
          See Examples →
        </Link>
      </div>
    </motion.div>
  );
};

export default ServicesSection;