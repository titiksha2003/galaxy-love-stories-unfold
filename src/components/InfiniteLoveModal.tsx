
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface InfiniteLoveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfiniteLoveModal: React.FC<InfiniteLoveModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePlayGame = () => {
    navigate('/game');
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content animate-scale-in text-center" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(200, 184, 244, 0.2) 0%, rgba(11, 12, 42, 0.95) 70%)',
          border: '2px solid rgba(249, 197, 209, 0.5)',
        }}
      >
        <button 
          className="close-star animate-pulse-glow"
          onClick={onClose}
        >
          ✨
        </button>
        
        <div className="py-8">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[hsl(var(--lavender))] via-[hsl(var(--blush-pink))] to-[hsl(var(--soft-gold))] animate-galaxy-pulse" />
          </div>
          
          <div className="font-dancing text-2xl md:text-4xl text-white leading-relaxed animate-shimmer space-y-4">
            <p>No matter the planet,</p>
            <p>No matter the time,</p>
            <p>No matter the universe —</p>
            <p className="text-[hsl(var(--blush-pink))] font-bold">My love for you will never change.</p>
            <p className="text-[hsl(var(--soft-gold))] text-3xl md:text-5xl font-bold mt-6">
              I will love you… infinitely.
            </p>
          </div>
          
          <button
            onClick={handlePlayGame}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-[hsl(var(--blush-pink))] to-[hsl(var(--soft-gold))] text-white font-orbitron font-bold rounded-full hover:scale-105 transition-transform animate-pulse-glow"
          >
            🌠 Catch Stars for Love 🌠
          </button>
          
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteLoveModal;
