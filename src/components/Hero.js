import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const bounceVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.section
      id="home"
      className="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={itemVariants}>
        Discover the Hottest Kicks 👟
      </motion.h2>

      <motion.p variants={itemVariants}>
        Stay ahead with the latest trends in sneakers. Shop exclusive designs from top brands worldwide.
      </motion.p>

      <motion.button
        variants={itemVariants}
        onClick={() => document.getElementById('trending').scrollIntoView({ behavior: 'smooth' })}
        whileHover={{ scale: 1.08, boxShadow: '0 10px 30px rgba(0, 212, 255, 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        Explore Now
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <FaArrowDown style={{ marginLeft: '0.5rem' }} />
        </motion.div>
      </motion.button>

      {/* Floating Elements for Visual Interest */}
      <motion.div
        className="hero-float-1"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-float-2"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </motion.section>
  );
};

export default Hero;