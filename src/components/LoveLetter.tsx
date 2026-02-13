import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Edit your love letter here
const LETTER_TEXT = `My Dearest Love,

From the very first moment I saw you, I knew my life would never be the same. You walked into my world and painted it with colors I never knew existed.

Every day with you feels like a beautiful dream — one I never want to wake up from. Your smile lights up even my darkest days, and your laughter is the sweetest melody I've ever heard.

I promise to love you endlessly, to cherish every moment we share, and to be your safe place in this crazy world.

You are my everything — my best friend, my soulmate, my forever Valentine.

With all my heart and soul,
Forever Yours ❤️`;

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [miniHearts, setMiniHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setDisplayText("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < LETTER_TEXT.length) {
        setDisplayText(LETTER_TEXT.slice(0, charIndex + 1));
        charIndex++;

        // Spawn mini hearts occasionally
        if (charIndex % 20 === 0) {
          setMiniHearts((prev) => [
            ...prev.slice(-10),
            { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 60 + 20 },
          ]);
        }
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <section className="py-16 px-4 pb-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-cursive text-4xl md:text-5xl text-center text-valentine-pink text-glow mb-8"
      >
        A Letter For You 💌
      </motion.h2>

      <div className="max-w-lg mx-auto">
        {/* Envelope */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          className="relative cursor-pointer mx-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Envelope body */}
          <div
            className="relative rounded-lg overflow-hidden mx-auto"
            style={{
              width: "280px",
              height: "180px",
              background: "linear-gradient(135deg, hsl(30 50% 75%), hsl(25 45% 65%))",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {/* Envelope flap */}
            <motion.div
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformOrigin: "top", perspective: "500px" }}
              className="absolute inset-x-0 top-0 z-10"
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "140px solid transparent",
                  borderRight: "140px solid transparent",
                  borderTop: "90px solid hsl(25 40% 60%)",
                }}
              />
            </motion.div>

            {/* Heart seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl z-20">
              {isOpen ? "💌" : "❤️"}
            </div>

            {/* Bottom fold lines */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                width: 0,
                height: 0,
                borderLeft: "140px solid transparent",
                borderRight: "140px solid transparent",
                borderBottom: "80px solid hsl(28 45% 70%)",
              }}
            />
          </div>

          <p className="text-center font-handwritten text-valentine-pink mt-4 text-lg">
            {isOpen ? "Click to close" : "Click to open 💕"}
          </p>
        </motion.div>

        {/* Letter content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0, height: 0 }}
              animate={{ y: 0, opacity: 1, height: "auto" }}
              exit={{ y: -20, opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 relative"
            >
              {/* Mini floating hearts */}
              {miniHearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -40 }}
                  transition={{ duration: 1.5 }}
                  className="absolute text-sm pointer-events-none"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                >
                  💕
                </motion.div>
              ))}

              <div
                className="rounded-xl p-6 md:p-8 relative"
                style={{
                  background: "linear-gradient(135deg, hsl(40 30% 92%), hsl(35 25% 88%))",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  minHeight: "300px",
                }}
              >
                {/* Paper texture lines */}
                <div className="absolute inset-x-8 top-8 bottom-8 pointer-events-none">
                  {Array.from({ length: 15 }, (_, i) => (
                    <div
                      key={i}
                      className="w-full border-b border-blue-200/30"
                      style={{ height: "28px" }}
                    />
                  ))}
                </div>

                <pre className="font-handwritten text-base md:text-lg leading-7 whitespace-pre-wrap relative z-10"
                  style={{ color: "hsl(340 50% 30%)" }}
                >
                  {displayText}
                  {isTyping && (
                    <span className="border-r-2 border-valentine-rose animate-typewriter-cursor">&nbsp;</span>
                  )}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveLetter;
