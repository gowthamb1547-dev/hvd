import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  "I love you not because of who you are, but because of who I am when I am with you.",
  "Every love story is beautiful, but ours is my favorite.",
  "You are my today and all of my tomorrows.",
  "In all the world, there is no heart for me like yours.",
  "I fell in love the way you fall asleep: slowly, and then all at once.",
  "You are the source of my joy, the center of my world and the whole of my heart.",
  "I choose you. And I'll choose you over and over. Without pause, without a doubt, in a heartbeat.",
];

const LoveQuotes = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const quote = QUOTES[index];
    let charIndex = 0;
    setDisplayText("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex < quote.length) {
        setDisplayText(quote.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % QUOTES.length);
        }, 3000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [index]);

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center relative"
      >
        <div className="glass rounded-2xl p-8 md:p-12 box-glow relative overflow-hidden">
          {/* Floating hearts around quotes */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl pointer-events-none"
              animate={{
                y: [0, -20, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.5 }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            >
              💕
            </motion.div>
          ))}

          <div className="text-4xl mb-6">💌</div>
          <h2 className="font-cursive text-3xl md:text-4xl text-valentine-pink text-glow mb-8">
            Words of Love
          </h2>

          <AnimatePresence mode="wait">
            <motion.div key={index} className="min-h-[80px] flex items-center justify-center">
              <p className="font-romantic text-xl md:text-2xl text-valentine-blush leading-relaxed">
                "{displayText}
                {isTyping && (
                  <span className="border-r-2 border-valentine-pink animate-typewriter-cursor ml-1">&nbsp;</span>
                )}
                "
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveQuotes;
