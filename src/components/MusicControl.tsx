import { Volume2, VolumeX } from "lucide-react";

interface MusicControlProps {
  isMuted: boolean;
  onToggle: () => void;
}

const MusicControl = ({ isMuted, onToggle }: MusicControlProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-valentine-pink hover:text-primary transition-colors animate-pulse-glow"
      aria-label={isMuted ? "Unmute music" : "Mute music"}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
};

export default MusicControl;
