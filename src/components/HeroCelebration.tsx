import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const HeroCelebration = () => {
  useEffect(() => {
    // Fire confetti bursts
    const fire = (opts: confetti.Options) => {
      confetti({
        ...opts,
        disableForReducedMotion: true,
      });
    };

    // Party poppers from sides
    fire({ particleCount: 100, spread: 70, origin: { x: 0.1, y: 0.6 }, colors: ["#ff1744", "#ff6090", "#ffd54f", "#fff"] });
    fire({ particleCount: 100, spread: 70, origin: { x: 0.9, y: 0.6 }, colors: ["#ff1744", "#ff6090", "#ffd54f", "#fff"] });

    // Center burst
    setTimeout(() => {
      fire({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ["#ff1744", "#e91e63", "#f48fb1", "#ffd54f"] });
    }, 300);

    // Heart shapes
    const heartInterval = setInterval(() => {
      fire({ particleCount: 5, spread: 50, origin: { x: Math.random(), y: 0 }, gravity: 0.8, ticks: 300, colors: ["#ff1744", "#e91e63"] });
    }, 500);

    return () => clearInterval(heartInterval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 pb-8">
      {/* Falling rose petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-fall text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 4}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            🌹
          </div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1, delay: 0.3 }}
        className="text-center px-4"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-7xl md:text-8xl mb-6"
        >
          ❤️
        </motion.div>
        <h1 className="font-cursive text-5xl md:text-7xl lg:text-8xl text-valentine-pink text-glow mb-4 leading-relaxed">
          Happy Valentine's Day
        </h1>
        <p className="font-handwritten text-3xl md:text-4xl text-valentine-gold text-glow-gold">
          My Love ❤️
        </p>
      </motion.div>
    </section>
  );
};

export default HeroCelebration;
