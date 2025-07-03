
import React from 'react';

interface GalaxyCoreProps {
  onClick: () => void;
}

const GalaxyCore: React.FC<GalaxyCoreProps> = ({ onClick }) => {
  return (
    <div 
      className="galaxy-core animate-galaxy-pulse animate-rotate"
      onClick={onClick}
      title="The Heart of Our Universe"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--lavender))] via-[hsl(var(--blush-pink))] to-[hsl(var(--soft-gold))] opacity-60 animate-pulse" />
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[hsl(var(--soft-gold))] via-[hsl(var(--starlight-white))] to-[hsl(var(--lavender))] opacity-40" />
      <div className="absolute inset-4 rounded-full bg-[hsl(var(--galaxy-navy))] opacity-80" />
    </div>
  );
};

export default GalaxyCore;
