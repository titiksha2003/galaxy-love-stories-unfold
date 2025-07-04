import React, { useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { Music, VolumeOff } from 'lucide-react';

let globalSound: Howl | null = null;

const MusicManager = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasInitialized = useRef(false);

  // ✅ Dynamically set correct path based on environment
  const primarySrc = import.meta.env.DEV
    ? 'song.mp3' // local dev path
    : '/galaxy-love-stories-unfold/song.mp3'; // GitHub Pages path

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    console.log('Initializing sound - first time');

    if (globalSound) {
      globalSound.stop();
      globalSound.unload();
      globalSound = null;
    }

    Howler.stop();

    globalSound = new Howl({
      src: [primarySrc],
      loop: true,
      volume: 0.3,
      html5: true,
      onload: () => {
        console.log('Music loaded successfully');
      },
      onloaderror: (id, error) => {
        console.error('Error loading music:', error);
        globalSound = new Howl({
          src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
          loop: true,
          volume: 0.3,
          html5: true
        });
      }
    });

    const handleFirstInteraction = () => {
      if (!hasInteracted && globalSound) {
        setHasInteracted(true);
        Howler.stop();
        globalSound.play();
        setIsPlaying(true);
        console.log('Music started after user interaction');

        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

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
