
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Music, MusicOff } from 'lucide-react';

const MusicManager = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Initialize the sound
    const howl = new Howl({
      src: ['https://www.youtube.com/watch?v=OJixIQFF-wA&list=RDOJixIQFF-wA&start_radio=1'],
      loop: true,
      volume: 0.3,
      html5: true,
      onload: () => {
        console.log('Music loaded successfully');
      },
      onloaderror: (id, error) => {
        console.error('Error loading music:', error);
        // Fallback to a placeholder audio or handle gracefully
      }
    });

    setSound(howl);

    // Add event listener for first user interaction
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        howl.play();
        setIsPlaying(true);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      howl.unload();
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (!sound) return;

    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
    } else {
      sound.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!sound) return;

    if (isMuted) {
      sound.volume(0.3);
      setIsMuted(false);
    } else {
      sound.volume(0);
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
        <MusicOff className="w-6 h-6 text-white animate-pulse-glow" />
      ) : (
        <Music className="w-6 h-6 text-white animate-pulse-glow" />
      )}
    </button>
  );
};

export default MusicManager;
