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
      className="min-h-screen"
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
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white text-center mb-8 md:mb-12 tracking-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Sobre mí
          </motion.h1>

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
            Especializado en imagen personal y marca visual. Trabajo con creadores digitales, influencers y figuras públicas que entienden el poder de una imagen bien construida.
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
            Creo que todos tienen una versión fotogénica de sí mismos — solo hace falta saber encontrarla. Mi trabajo va más allá de lo técnico: entiendo cómo funciona la percepción visual y cómo dirigir una imagen para que destaque de forma natural, sin forzar nada.
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
            No es solo una sesión de fotos — es un proceso donde descubrimos juntos cómo se ve tu mejor versión. Tengo buen ojo para capturar esos gestos y momentos que revelan quién eres de verdad, especialmente en el mundo digital, donde lo visual lo es todo.
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