
import React from 'react';
import { X } from 'lucide-react';

interface PlanetModalProps {
  isOpen: boolean;
  onClose: () => void;
  planet: {
    name: string;
    quote: string;
    story: string;
  } | null;
}

const PlanetModal: React.FC<PlanetModalProps> = ({ isOpen, onClose, planet }) => {
  if (!isOpen || !planet) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content animate-scale-in" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="close-star animate-pulse-glow"
          onClick={onClose}
        >
          ✨
        </button>
        
        <div className="text-center mb-6">
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-4 animate-shimmer">
            {planet.name}
          </h2>
          <p className="font-dancing text-lg md:text-xl text-[hsl(var(--blush-pink))] italic mb-6">
            "{planet.quote}"
          </p>
        </div>
        
        <div className="text-white font-lora leading-relaxed text-sm md:text-base space-y-4">
          {planet.story.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanetModal;
