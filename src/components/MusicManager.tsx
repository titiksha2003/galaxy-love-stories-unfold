
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Music, VolumeOff } from 'lucide-react';

const MusicManager = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Initialize the sound with a working audio source
    const howl = new Howl({
      src: 'C:/Users/titik/OneDrive/Desktop/new/galaxy-love-stories-unfold/song.mp3',
      loop: true,
      volume: 0.3,
      html5: true,
/*************  ✨ Windsurf Command ⭐  *************/
      // Callback when the sound has loaded successfully
/*******  ac6955c2-9797-4a6d-9bed-aad5436f86d4  *******/
      onload: () => {
        console.log('Music loaded successfully');
      },
      onloaderror: (id, error) => {
        console.error('Error loading music:', error);
        // Try alternative source
        const fallbackHowl = new Howl({
          src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
          loop: true,
          volume: 0.3,
          html5: true,
          onload: () => {
            console.log('Fallback music loaded successfully');
          },
          onloaderror: () => {
            console.log('Could not load background music - using silent mode');
          }
        });
        setSound(fallbackHowl);
      }
    });

    setSound(howl);

    // Add event listener for first user interaction
    const handleFirstInteraction = () => {
      if (!hasInteracted && howl) {
        setHasInteracted(true);
        howl.play();
        setIsPlaying(true);
        console.log('Music started playing after user interaction');
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
      console.log('Music paused');
    } else {
      sound.play();
      setIsPlaying(true);
      console.log('Music resumed');
    }
  };

  const toggleMute = () => {
    if (!sound) return;

    if (isMuted) {
      sound.volume(0.3);
      setIsMuted(false);
      console.log('Music unmuted');
    } else {
      sound.volume(0);
      setIsMuted(true);
      console.log('Music muted');
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
