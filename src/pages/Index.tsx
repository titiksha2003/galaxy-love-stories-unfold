
import React, { useState } from 'react';
import GalaxyBackground from '../components/GalaxyBackground';
import CursorTrail from '../components/CursorTrail';
import Planet from '../components/Planet';
import PlanetModal from '../components/PlanetModal';
import GalaxyCore from '../components/GalaxyCore';
import InfiniteLoveModal from '../components/InfiniteLoveModal';
import { planetStories } from '../data/planetStories';

const Index = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<typeof planetStories[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfiniteLoveOpen, setIsInfiniteLoveOpen] = useState(false);

  const planets = [
    { name: 'Mercury', className: 'planet-mercury', size: 30, orbitRadius: 150, delay: 0 },
    { name: 'Venus', className: 'planet-venus', size: 35, orbitRadius: 200, delay: 5 },
    { name: 'Earth', className: 'planet-earth', size: 40, orbitRadius: 250, delay: 10 },
    { name: 'Mars', className: 'planet-mars', size: 35, orbitRadius: 300, delay: 15 },
    { name: 'Jupiter', className: 'planet-jupiter', size: 60, orbitRadius: 380, delay: 20 },
    { name: 'Saturn', className: 'planet-saturn', size: 55, orbitRadius: 450, delay: 25 },
    { name: 'Neptune', className: 'planet-neptune', size: 45, orbitRadius: 520, delay: 30 },
  ];

  const handlePlanetClick = (planetName: string) => {
    const story = planetStories.find(p => p.name === planetName);
    if (story) {
      setSelectedPlanet(story);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlanet(null);
  };

  const openInfiniteLove = () => {
    setIsInfiniteLoveOpen(true);
  };

  const closeInfiniteLove = () => {
    setIsInfiniteLoveOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GalaxyBackground />
      <CursorTrail />
      
      {/* Header */}
      <div className="relative z-10 text-center pt-8 px-4">
        <h1 className="font-dancing text-3xl md:text-5xl lg:text-6xl text-white mb-4 animate-shimmer leading-relaxed">
          "In every corner of the galaxy, there's a version of us.
        </h1>
        <p className="font-dancing text-xl md:text-2xl lg:text-3xl text-[hsl(var(--blush-pink))] animate-shimmer">
          Click a planet to discover how we love in every universe."
        </p>
      </div>

      {/* Solar System */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="relative">
          {/* Galaxy Core */}
          <GalaxyCore onClick={openInfiniteLove} />
          
          {/* Planets */}
          {planets.map((planet) => (
            <Planet
              key={planet.name}
              name={planet.name}
              className={planet.className}
              size={planet.size}
              orbitRadius={planet.orbitRadius}
              animationDelay={planet.delay}
              onClick={() => handlePlanetClick(planet.name)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 px-4">
        <p className="font-orbitron text-lg md:text-xl text-[hsl(var(--soft-gold))] animate-shimmer">
          "Wherever you are in the universe… just know, I'm loving you in every version."
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="animate-twinkle text-white" style={{ animationDelay: `${i * 0.5}s` }}>
              ✨
            </span>
          ))}
        </div>
      </div>

      {/* Modals */}
      <PlanetModal
        isOpen={isModalOpen}
        onClose={closeModal}
        planet={selectedPlanet}
      />
      
      <InfiniteLoveModal
        isOpen={isInfiniteLoveOpen}
        onClose={closeInfiniteLove}
      />
    </div>
  );
};

export default Index;
