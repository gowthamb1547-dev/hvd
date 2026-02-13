import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface ProposalScreenProps {
  onAccept: () => void;
}

const ProposalScreen = ({ onAccept }: ProposalScreenProps) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [escaped, setEscaped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const escapeNo = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width - 120;
    const maxY = rect.height - 50;
    setNoPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
    setEscaped(true);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, hsl(340 50% 15%), hsl(330 60% 20%), hsl(350 40% 12%))",
        backgroundSize: "400% 400%",
      }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-title"
      aria-describedby="proposal-description"
    >
      <motion.div
        ref={containerRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
        className="glass-strong rounded-3xl p-8 md:p-12 text-center max-w-md mx-4 relative box-glow"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-6xl mb-6" role="img" aria-label="Heart emoji">💕</div>
          <h1 
            id="proposal-title"
            className="font-cursive text-4xl md:text-5xl lg:text-6xl text-valentine-pink text-glow mb-8 leading-relaxed"
          >
            Will you be my Valentine?
          </h1>
          <p id="proposal-description" className="sr-only">
            A romantic Valentine's Day proposal. Choose Yes to accept or No to decline.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[80px]"
          role="group"
          aria-label="Proposal choices"
        >
          <button
            onClick={onAccept}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-handwritten text-xl 
              hover:scale-110 transition-all duration-300 animate-pulse-glow z-10 focus:outline-none focus:ring-4 focus:ring-primary/50"
            aria-label="Accept proposal"
          >
            Yes 💖
          </button>

          <motion.button
            animate={escaped ? { x: noPos.x, y: noPos.y } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onMouseEnter={escapeNo}
            onTouchStart={escapeNo}
            className="px-8 py-3 rounded-full border border-valentine-rose/30 text-muted-foreground font-handwritten text-xl
              hover:border-valentine-rose/50 transition-colors focus:outline-none focus:ring-4 focus:ring-valentine-rose/30"
            aria-label="Decline proposal"
          >
            No 💔
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: escaped ? 1 : 0 }}
          className="mt-4 text-valentine-pink/60 text-sm font-handwritten"
          role="alert"
          aria-live="polite"
        >
          Haha, you can't say no! 😘
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ProposalScreen;
