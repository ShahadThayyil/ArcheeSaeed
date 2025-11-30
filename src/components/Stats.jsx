import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { stats } from "../data/stats"; // Assuming stats data is available

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      // UPDATED: Changed to dark theme, consistent padding
      className="w-full py-20 md:py-32 px-6 md:px-12 bg-[#1a1a1a] text-white font-['Inter',_sans-serif]"
    >
      {/* --- STANDARD MODERN HEADER --- */}
      <div className="max-w-6xl mx-auto mb-20 md:mb-24 text-left">
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-600 mb-6">
          (05)
        </h3>
        <h2 className="text-5xl md:text-7xl font-bold uppercase text-white font-['Playfair_Display',_serif]">
          BY THE <br /> NUMBERS
        </h2>
        <p className="font-sans font-light text-gray-400 text-lg md:text-xl mt-8 max-w-2xl">
          Our journey and impact, quantified.
        </p>
      </div>

      {/* --- STATS GRID --- */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-left">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            // UPDATED: items-start for left-alignment
            className="flex flex-col items-start space-y-3"
          >
            {/* Number */}
            <h2
              // UPDATED: Changed text to white, removed border-b
              className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display',_serif]"
            >
              {inView ? (
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
              ) : (
                "0" + (stat.suffix || "") // Added suffix fallback
              )}
            </h2>

            {/* Title / Label */}
            {/* UPDATED: Changed to thin, sans-serif, uppercase label */}
            <h3 className="text-sm font-sans font-light text-gray-400 uppercase tracking-widest">
              {stat.title}
            </h3>
            
            {/* Removed the <p> tag for a cleaner, more minimalist look */}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;