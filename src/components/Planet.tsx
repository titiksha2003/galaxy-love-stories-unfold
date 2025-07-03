
import React from 'react';

interface PlanetProps {
  name: string;
  className: string;
  size: number;
  orbitRadius: number;
  animationDelay: number;
  onClick: () => void;
}

const Planet: React.FC<PlanetProps> = ({ 
  name, 
  className, 
  size, 
  orbitRadius, 
  animationDelay, 
  onClick 
}) => {
  const orbitStyle = {
    '--orbit-radius': `${orbitRadius}px`,
    animationDelay: `${animationDelay}s`,
  } as React.CSSProperties;

  return (
    <div 
      className="absolute animate-orbit"
      style={orbitStyle}
    >
      <div
        className={`planet ${className} animate-float`}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          animationDelay: `${animationDelay * 0.5}s`
        }}
        onClick={onClick}
        title={name}
      />
    </div>
  );
};

export default Planet;
