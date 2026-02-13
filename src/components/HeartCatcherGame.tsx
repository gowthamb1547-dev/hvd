import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FallingHeart {
  id: number;
  x: number;
  speed: number;
  y: number;
}

const WIN_SCORE = 15;

const HeartCatcherGame = () => {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [missed, setMissed] = useState(0);
  const nextId = useRef(0);
  const gameRef = useRef<HTMLDivElement>(null);

  const spawnHeart = useCallback(() => {
    const heart: FallingHeart = {
      id: nextId.current++,
      x: Math.random() * 85 + 5,
      speed: Math.random() * 2 + 2,
      y: -5,
    };
    setHearts((prev) => [...prev, heart]);
  }, []);

  useEffect(() => {
    if (!playing || won) return;
    const interval = setInterval(spawnHeart, 800);
    return () => clearInterval(interval);
  }, [playing, won, spawnHeart]);

  useEffect(() => {
    if (!playing || won) return;
    const frame = setInterval(() => {
      setHearts((prev) => {
        const remaining: FallingHeart[] = [];
        let newMissed = 0;
        for (const h of prev) {
          const newY = h.y + h.speed;
          if (newY > 100) {
            newMissed++;
          } else {
            remaining.push({ ...h, y: newY });
          }
        }
        if (newMissed > 0) setMissed((m) => m + newMissed);
        return remaining;
      });
    }, 50);
    return () => clearInterval(frame);
  }, [playing, won]);

  const catchHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    const newScore = score + 1;
    setScore(newScore);
    if (newScore >= WIN_SCORE) {
      setWon(true);
      setHearts([]);
    }
  };

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    setMissed(0);
    setWon(false);
    setHearts([]);
    nextId.current = 0;
  };

  return (
    <section className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-cursive text-4xl md:text-5xl text-center text-valentine-pink text-glow mb-8"
      >
        Catch The Hearts 💕
      </motion.h2>

      <div className="max-w-lg mx-auto">
        <div
          ref={gameRef}
          className="glass rounded-2xl relative overflow-hidden box-glow"
          style={{ height: "400px" }}
        >
          {!playing && !won && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startGame}
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-handwritten text-2xl hover:scale-105 transition-transform animate-pulse-glow"
              >
                Play Game 🎮
              </button>
            </div>
          )}

          {playing && !won && (
            <>
              <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                <span className="font-handwritten text-xl text-valentine-gold">
                  Score: {score}/{WIN_SCORE}
                </span>
                <span className="font-handwritten text-xl text-valentine-pink">
                  Missed: {missed}
                </span>
              </div>
              <AnimatePresence>
                {hearts.map((heart) => (
                  <motion.button
                    key={heart.id}
                    className="absolute text-3xl cursor-pointer hover:scale-125 transition-transform z-10"
                    style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                    onClick={() => catchHeart(heart.id)}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ❤️
                  </motion.button>
                ))}
              </AnimatePresence>
            </>
          )}

          {won && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="font-cursive text-3xl md:text-4xl text-valentine-pink text-glow mb-4">
                You Won!
              </h3>
              <p className="font-handwritten text-xl md:text-2xl text-valentine-blush mb-6 leading-relaxed">
                "You're not the winner of the game…<br />
                You're the winner of my heart ❤️"
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-handwritten text-lg hover:scale-105 transition-transform"
              >
                Play Again 🎮
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeartCatcherGame;
