
import React, { useEffect, useRef } from 'react';

const GalaxyBackground = () => {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      if (!starsRef.current) return;
      
      const numStars = 200;
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        const size = Math.random() > 0.8 ? 'star-large' : Math.random() > 0.5 ? 'star-medium' : 'star-small';
        
        star.className = `star ${size} animate-twinkle`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 2}s`;
        
        fragment.appendChild(star);
      }
      
      starsRef.current.appendChild(fragment);
    };

    generateStars();
  }, []);

  return (
    <>
      <div className="galaxy-bg" />
      <div ref={starsRef} className="fixed inset-0 pointer-events-none z-0" />
    </>
  );
};

export default GalaxyBackground;
