
import React, { useEffect } from 'react';

const CursorTrail = () => {
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    const trails: HTMLElement[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create trail particle
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = mouseX + 'px';
      trail.style.top = mouseY + 'px';
      
      document.body.appendChild(trail);
      trails.push(trail);

      // Remove trail after animation
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
        const index = trails.indexOf(trail);
        if (index > -1) {
          trails.splice(index, 1);
        }
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      // Clean up remaining trails
      trails.forEach(trail => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
    };
  }, []);

  return null;
};

export default CursorTrail;
