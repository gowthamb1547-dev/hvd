import { motion } from "framer-motion";

// Your actual photos from the assets folder
const PHOTOS = [
  { id: 1, url: "/assets/1.jpeg", caption: "Our first date 💕" },
  { id: 8, url: "/assets/8.jpeg", caption: "Best moments 💞" },
  { id: 3, url: "/assets/3.jpeg", caption: "My favorite person ❤️" },
  { id: 4, url: "/assets/4.jpeg", caption: "Adventures with you 🌹" },
  { id: 5, url: "/assets/5.jpeg", caption: "Love of my life 💘" },
  { id: 6, url: "/assets/6.jpeg", caption: "Always & forever 💗" },
  { id: 7, url: "/assets/7.jpeg", caption: "My sunshine ☀️" },
  { id: 2, url: "/assets/2.jpeg", caption: "Together forever 💖" },
];

const CLIP_COLORS = ["#e53935", "#43a047", "#fb8c00", "#e53935", "#1e88e5", "#e53935", "#fb8c00", "#43a047"];
const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4];

// Positions on the grid for each photo (row, col) on a ~8x6 grid
const GRID_POSITIONS = [
  { row: 0, col: 0 },
  { row: 0, col: 3 },
  { row: 0, col: 5 },
  { row: 1, col: 1 },
  { row: 1, col: 4 },
  { row: 2, col: 0 },
  { row: 2, col: 3 },
  { row: 2, col: 6 },
];

// Fairy light positions along the wire grid border
const LIGHT_POSITIONS = [
  // Top edge
  ...Array.from({ length: 10 }, (_, i) => ({ x: (i / 9) * 100, y: 0 })),
  // Right edge
  ...Array.from({ length: 6 }, (_, i) => ({ x: 100, y: ((i + 1) / 6) * 100 })),
  // Bottom edge
  ...Array.from({ length: 10 }, (_, i) => ({ x: ((9 - i) / 9) * 100, y: 100 })),
  // Left edge
  ...Array.from({ length: 5 }, (_, i) => ({ x: 0, y: ((5 - i) / 6) * 100 })),
];

const PhotoMemoryWall = () => {
  return (
    <section className="py-16 px-4 relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-cursive text-4xl md:text-5xl text-center text-valentine-pink text-glow mb-12"
      >
        Our Memories 📸
      </motion.h2>

      <div className="max-w-5xl mx-auto relative">
        {/* Container with fairy lights but no wire grid */}
        <div
          className="relative rounded-lg p-6 md:p-10"
          style={{ minHeight: "500px" }}
        >
          {/* Fairy lights along the border */}
          {LIGHT_POSITIONS.map((pos, i) => (
            <div
              key={`light-${i}`}
              className="absolute z-30 pointer-events-none"
              style={{
                left: `calc(${pos.x}% - 6px)`,
                top: `calc(${pos.y}% - 6px)`,
              }}
            >
              {/* Wire to bulb */}
              <div
                className="absolute w-[1px] h-3 bg-valentine-gold/40"
                style={{
                  left: "5px",
                  top: pos.y === 0 ? "6px" : pos.y === 100 ? "-6px" : "0",
                  transform: pos.y === 100 ? "rotate(180deg)" : "",
                }}
              />
              {/* Bulb */}
              <div
                className="w-3 h-3 rounded-full animate-led-glow"
                style={{
                  backgroundColor: ["#ffd93d", "#fff5c0", "#ffe082", "#fff9c4", "#ffecb3"][i % 5],
                  boxShadow: `0 0 8px 3px ${["#ffd93d80", "#fff5c080", "#ffe08280", "#fff9c480", "#ffecb380"][i % 5]}`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${1.5 + (i % 3) * 0.5}s`,
                }}
              />
            </div>
          ))}

          {/* Photos with white borders and pins */}
          {PHOTOS.map((photo, i) => {
            const pos = GRID_POSITIONS[i];
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 20 }}
                className="absolute z-10"
                style={{
                  left: `${(pos.col / 8) * 100 + 2}%`,
                  top: `${(pos.row / 3) * 100 + 4}%`,
                  width: "140px",
                  height: "160px",
                  transform: `rotate(${ROTATIONS[i]}deg)`,
                }}
              >
                {/* Pin / clothespin */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div
                    className="w-4 h-6 rounded-sm"
                    style={{
                      background: `linear-gradient(180deg, ${CLIP_COLORS[i]}, ${CLIP_COLORS[i]}cc)`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      clipPath: "polygon(15% 0%, 85% 0%, 100% 30%, 85% 100%, 15% 100%, 0% 30%)",
                    }}
                  />
                </div>

                {/* Photo with simple white border */}
                <div
                  className="bg-white p-1 shadow-lg transition-shadow hover:shadow-xl"
                  style={{ boxShadow: "2px 4px 12px rgba(0,0,0,0.3)" }}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PhotoMemoryWall;
