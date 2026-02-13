import { motion } from "framer-motion";
import HeroCelebration from "./HeroCelebration";
import PhotoMemoryWall from "./PhotoMemoryWall";
import LoveQuotes from "./LoveQuotes";
import HeartCatcherGame from "./HeartCatcherGame";
import RelationshipClock from "./RelationshipClock";
import LoveLetter from "./LoveLetter";

const CelebrationScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative z-10"
    >
      <HeroCelebration />
      <PhotoMemoryWall />
      <LoveQuotes />
      <HeartCatcherGame />
      <RelationshipClock />
      <LoveLetter />

      {/* Footer */}
      <footer className="text-center py-8 font-handwritten text-valentine-pink/60">
        <p>Made with ❤️ for you </p>
      </footer>
    </motion.div>
  );
};

export default CelebrationScreen;
