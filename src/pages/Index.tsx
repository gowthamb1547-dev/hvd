import { useState, useRef, useCallback, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import SparkleParticles from "@/components/SparkleParticles";
import MusicControl from "@/components/MusicControl";

// Lazy load components for better performance
const ProposalScreen = lazy(() => import("@/components/ProposalScreen"));
const CelebrationScreen = lazy(() => import("@/components/CelebrationScreen"));

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-2xl">💕</div>
  </div>
);

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setMusicStarted(true);
    }
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    startMusic();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (!musicStarted) {
        startMusic();
      }
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "linear-gradient(135deg, hsl(340 50% 12%), hsl(330 55% 15%), hsl(350 40% 10%), hsl(320 45% 14%))",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite",
      }}
    >
      {/* Background audio - using environment variable for URL */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={import.meta.env.VITE_AUDIO_URL || "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1e44.mp3?filename=sweet-love-114416.mp3"}
      />

      <FloatingHearts />
      <SparkleParticles />
      
      {musicStarted && <MusicControl isMuted={isMuted} onToggle={toggleMute} />}

      <AnimatePresence mode="wait">
        {!accepted ? (
          <Suspense fallback={<LoadingFallback />}>
            <ProposalScreen key="proposal" onAccept={handleAccept} />
          </Suspense>
        ) : (
          <Suspense fallback={<LoadingFallback />}>
            <CelebrationScreen key="celebration" />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
