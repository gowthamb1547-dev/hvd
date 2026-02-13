import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const START_DATE = new Date("2021-11-08T00:00:00");

interface TimeUnit {
  value: number;
  label: string;
}

const RelationshipClock = () => {
  const [elapsed, setElapsed] = useState<TimeUnit[]>([]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setElapsed([
        { value: days, label: "Days" },
        { value: hours, label: "Hours" },
        { value: minutes, label: "Minutes" },
        { value: seconds, label: "Seconds" },
      ]);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-cursive text-4xl md:text-5xl text-center text-valentine-pink text-glow mb-4"
      >
        Together for...
      </motion.h2>
      <p className="text-center text-muted-foreground font-handwritten text-lg mb-8">
        Since November 8, 2021 💕
      </p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto"
      >
        {elapsed.map((unit) => (
          <div
            key={unit.label}
            className="glass rounded-2xl p-4 md:p-6 text-center min-w-[80px] md:min-w-[120px] box-glow"
          >
            <div className="font-handwritten text-3xl md:text-5xl text-valentine-gold text-glow-gold font-bold tabular-nums">
              {String(unit.value).padStart(unit.label === "Days" ? 1 : 2, "0")}
            </div>
            <div className="font-handwritten text-sm md:text-base text-valentine-pink mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default RelationshipClock;
