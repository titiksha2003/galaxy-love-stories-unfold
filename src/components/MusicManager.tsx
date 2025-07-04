
import React, { useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { Music, VolumeOff } from 'lucide-react';

// Create a single global instance of the sound
let globalSound: Howl | null = null;

const MusicManager = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasInitialized = useRef(false);

  // Initialize sound only once
  useEffect(() => {
    // Make sure we only initialize the sound once
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    console.log('Initializing sound - first time');
    
    // Clear any existing instances
    if (globalSound) {
      globalSound.stop();
      globalSound.unload();
      globalSound = null;
    }
    
    // Stop any other sounds that might be playing
    Howler.stop();
    
    // Create a new sound instance
    globalSound = new Howl({
      src: ['/song.mp3'],
      loop: true,
      volume: 0.3,
      html5: true,
      onload: () => {
        console.log('Music loaded successfully');
      },
      onloaderror: (id, error) => {
        console.error('Error loading music:', error);
        // Try alternative source
        globalSound = new Howl({
          src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
          loop: true,
          volume: 0.3,
          html5: true
        });
      }
    });

    // Function to handle user interaction
    const handleFirstInteraction = () => {
      if (!hasInteracted && globalSound) {
        setHasInteracted(true);
        
        // Make sure we stop any sounds first
        Howler.stop();
        
        // Play the sound
        globalSound.play();
        setIsPlaying(true);
        console.log('Music started after user interaction');
        
        // Remove event listeners once we've handled the interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]); // Only depend on hasInteracted

  const toggleMusic = () => {
    if (!globalSound) return;

    if (isPlaying) {
      globalSound.pause();
      setIsPlaying(false);
    } else {
      globalSound.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!globalSound) return;

    if (isMuted) {
      globalSound.volume(0.3);
      setIsMuted(false);
    } else {
      globalSound.volume(0);
      setIsMuted(true);
    }
  };

  const handleClick = () => {
    if (isMuted) {
      toggleMute();
    } else {
      toggleMusic();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`music-toggle ${isMuted ? 'muted' : ''}`}
      title={isMuted ? 'Unmute Music' : isPlaying ? 'Pause Music' : 'Play Music'}
    >
      {isMuted ? (
        <VolumeOff className="w-6 h-6 text-white animate-pulse-glow" />
      ) : (
        <Music className="w-6 h-6 text-white animate-pulse-glow" />
      )}
    </button>
  );
};

export default MusicManager;
