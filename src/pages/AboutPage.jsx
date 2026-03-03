import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
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
      <section className="container-custom pt-4 md:pt-8 pb-16">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.p 
            className="text-gray-300 text-lg leading-relaxed mb-6 md:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <strong>Hola, soy Luis.</strong>
          </motion.p>

          <motion.p 
            className="text-gray-300 text-lg leading-relaxed mb-6 md:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            Fotógrafo con experiencia trabajando con creadores digitales, influencers y personas que buscan proyectar una imagen auténtica y coherente con su estilo de vida.
          </motion.p>

          <motion.div 
            className="rounded-lg overflow-hidden shadow-xl my-6 md:my-8"
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <picture>
              <source srcSet="https://i.ibb.co/C5G470mW/IMG-7142.webp" type="image/webp" />
              <img 
                src="https://i.ibb.co/C5G470mW/IMG-7142.jpg"
                alt="Luis H. Espín"
                className="w-full h-auto rounded-lg"
                loading="lazy"
                width="800"
                height="600"
              />
            </picture>
          </motion.div>

          <motion.p 
            className="text-gray-300 text-lg leading-relaxed mb-6 md:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            Más allá de lo técnico, te asesoro para que tus fotos comuniquen quién eres y generen una conexión real con la gente que te interesa. A veces, solo hace falta una nueva perspectiva para mostrar lo mejor de ti y empezar a destacar de forma natural, sin forzar nada.
          </motion.p>

          <motion.p 
            className="text-gray-300 text-lg leading-relaxed mb-6 md:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            Para muchos, más que una sesión de fotos, se convierte en una experiencia de descubrimiento. Tengo buen ojo para esos gestos y momentos que revelan tu esencia. Y entiendo cómo influye lo visual en lo que los demás perciben de ti, especialmente en el mundo digital.
          </motion.p>

          <motion.h2 
            className="text-2xl font-semibold text-white text-center mb-6 md:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            Detrás de cámaras
          </motion.h2>

          <motion.div 
            className="aspect-[9/16] w-full max-w-md mx-auto"
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <iframe 
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/zqo4XfNosU8"
              title="Behind the Scenes"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default AboutPage;