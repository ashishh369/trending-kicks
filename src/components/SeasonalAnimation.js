import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SeasonalAnimation.css';

const SeasonalAnimation = () => {
  const [season, setSeason] = useState('winter');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Detect season based on date
    const month = new Date().getMonth();
    if (month >= 11 || month <= 1) {
      setSeason('winter');
    } else if (month >= 2 && month <= 4) {
      setSeason('spring');
    } else if (month >= 5 && month <= 7) {
      setSeason('summer');
    } else {
      setSeason('autumn');
    }
  }, []);

  useEffect(() => {
    // Generate particles based on season
    let newParticles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        size: season === 'winter' ? 4 + Math.random() * 6 : 6 + Math.random() * 8,
      });
    }
    setParticles(newParticles);
  }, [season]);

  const getParticleEmoji = () => {
    switch (season) {
      case 'winter':
        return '❄️';
      case 'spring':
        return '🌸';
      case 'summer':
        return '🍃';
      case 'autumn':
        return '🍂';
      default:
        return '❄️';
    }
  };

  const getBackgroundClass = () => {
    switch (season) {
      case 'winter':
        return 'seasonal-bg-winter';
      case 'spring':
        return 'seasonal-bg-spring';
      case 'summer':
        return 'seasonal-bg-summer';
      case 'autumn':
        return 'seasonal-bg-autumn';
      default:
        return 'seasonal-bg-winter';
    }
  };

  const getAnimationClass = () => {
    switch (season) {
      case 'winter':
        return 'snowfall';
      case 'spring':
        return 'bloom';
      case 'summer':
        return 'windBlown';
      case 'autumn':
        return 'falling';
      default:
        return 'snowfall';
    }
  };

  return (
    <div className={`seasonal-container ${getBackgroundClass()}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`seasonal-particle ${getAnimationClass()}`}
          style={{
            left: `${particle.left}%`,
            fontSize: `${particle.size}px`,
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: window.innerHeight + 100,
            opacity: [0, 1, 1, 0],
            rotate: season === 'summer' ? [0, 360, 720] : [0, 180],
            x: season === 'summer' ? [0, 50, -30, 20] : 0,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: season === 'summer' ? 'easeInOut' : 'easeIn',
          }}
        >
          {getParticleEmoji()}
        </motion.div>
      ))}
    </div>
  );
};

export default SeasonalAnimation;
