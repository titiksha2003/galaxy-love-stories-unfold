
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import GalaxyBackground from '../components/GalaxyBackground';

interface Star {
  id: number;
  x: number;
  y: number;
  speed: number;
  isLove: boolean;
}

const Game = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [playerX, setPlayerX] = useState(400);
  const [stars, setStars] = useState<Star[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [loveMessage, setLoveMessage] = useState('');
  
  const loveMessages = [
    "Your love lights up my universe! ✨",
    "Together we make the perfect constellation! 💫",
    "You're my brightest star! 🌟",
    "Our love is infinite like the cosmos! 🌌",
    "You make my heart twinkle like starlight! ✨"
  ];

  const gameLoop = useCallback(() => {
    if (!gameRunning) return;

    setStars(prevStars => {
      const newStars = prevStars
        .map(star => ({ ...star, y: star.y + star.speed }))
        .filter(star => star.y < 600);

      // Add new stars randomly
      if (Math.random() < 0.3) {
        newStars.push({
          id: Date.now(),
          x: Math.random() * 750 + 25,
          y: 0,
          speed: Math.random() * 3 + 2,
          isLove: Math.random() > 0.3 // 70% chance of love star
        });
      }

      return newStars;
    });
  }, [gameRunning]);

  useEffect(() => {
    if (gameRunning) {
      const interval = setInterval(gameLoop, 50);
      return () => clearInterval(interval);
    }
  }, [gameLoop, gameRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player (heart)
    ctx.font = '30px Arial';
    ctx.fillText('💖', playerX, 550);

    // Draw stars
    stars.forEach(star => {
      ctx.font = '20px Arial';
      ctx.fillText(star.isLove ? '✨' : '⭐', star.x, star.y);
    });

    // Check collisions
    stars.forEach(star => {
      const distance = Math.sqrt(
        Math.pow(star.x - playerX, 2) + Math.pow(star.y - 550, 2)
      );
      
      if (distance < 30) {
        if (star.isLove) {
          setScore(prev => prev + 10);
          if ((score + 10) % 50 === 0) {
            setLoveMessage(loveMessages[Math.floor(Math.random() * loveMessages.length)]);
            setTimeout(() => setLoveMessage(''), 2000);
          }
        } else {
          setGameOver(true);
          setGameRunning(false);
        }
        
        setStars(prevStars => prevStars.filter(s => s.id !== star.id));
      }
    });
  }, [stars, playerX, score, loveMessages]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameRunning) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        setPlayerX(prev => Math.max(25, prev - 20));
        break;
      case 'ArrowRight':
        setPlayerX(prev => Math.min(775, prev + 20));
        break;
    }
  }, [gameRunning]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const startGame = () => {
    setGameRunning(true);
    setGameOver(false);
    setScore(0);
    setStars([]);
    setPlayerX(400);
    setLoveMessage('');
  };

  const resetGame = () => {
    setGameRunning(false);
    setGameOver(false);
    setScore(0);
    setStars([]);
    setPlayerX(400);
    setLoveMessage('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GalaxyBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-[hsl(var(--lavender))] to-[hsl(var(--blush-pink))] text-white rounded-full font-fredoka hover:scale-105 transition-transform"
        >
          ← Back to Galaxy
        </button>

        <div className="text-center mb-8">
          <h1 className="font-orbitron text-4xl md:text-6xl text-white mb-4 animate-shimmer">
            🌠 Catch Stars for Love 🌠
          </h1>
          <p className="font-fredoka text-lg text-[hsl(var(--soft-gold))] mb-4 text-center max-w-xl mx-auto leading-relaxed">
              In this universe where distance keeps us apart,<br />
              her words travel through stars — waiting to be caught.<br />
              <br />
              The glowing ones hold love.<br />
              The others… hold silence and danger.<br />
              <br />
              Move gently.<br />
              Catch her heart.<br />
              Avoid the void.
          </p>

          <div className="font-fredoka text-2xl text-[hsl(var(--blush-pink))] font-bold">
            Score: {score}
          </div>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border-2 border-[hsl(var(--soft-gold))] rounded-lg bg-black/30"
          />
          
          {loveMessage && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[hsl(var(--blush-pink))] to-[hsl(var(--soft-gold))] text-white px-6 py-3 rounded-full font-dancing text-xl animate-pulse">
              {loveMessage}
            </div>
          )}
          
          {!gameRunning && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-[hsl(var(--lavender))] to-[hsl(var(--blush-pink))] text-white font-fredoka text-xl rounded-full hover:scale-105 transition-transform animate-pulse-glow"
              >
                Start Game
              </button>
            </div>
          )}
          
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-lg">
              <h2 className="font-orbitron text-3xl text-white mb-4">Game Over!</h2>
              <p className="font-fredoka text-xl text-[hsl(var(--soft-gold))] mb-6 font-bold">Final Score: {score}</p>
              <div className="space-x-4">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-[hsl(var(--lavender))] to-[hsl(var(--blush-pink))] text-white font-fredoka rounded-full hover:scale-105 transition-transform"
                >
                  Play Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-gradient-to-r from-[hsl(var(--soft-gold))] to-[hsl(var(--starlight-white))] text-[hsl(var(--galaxy-navy))] font-fredoka rounded-full hover:scale-105 transition-transform"
                >
                  Back to Galaxy
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="font-dancing text-lg text-white">
            "Every star you catch with message is a reminder of how much I love you! 💫"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game;
