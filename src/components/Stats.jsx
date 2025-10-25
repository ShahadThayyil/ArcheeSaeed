import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { stats } from "../data/stats"; // Assuming stats data is available

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      // UPDATED: Changed background to beige, text to dark, and set base font
      className="w-full py-16 px-6 bg-[#F5EFE6] text-[#1F1F1F] font-['Inter',_sans-serif]"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="flex flex-col items-center space-y-3"
          >
            {/* Number */}
            <h2
              // UPDATED: Changed text color, border color, and heading font
              className="text-4xl md:text-5xl  font-bold text-[#1F1F1F] font-['Playfair_Display',_serif] border-b border-[#C0B6A1] pb-2"
            >
              {inView ? (
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
              ) : (
                "0" + (stat.suffix || "") // Added suffix fallback
              )}
            </h2>

            {/* Title */}
            {/* This inherits the correct font and color */}
            <h3 className="text-lg font-semibold font-['Cormorant_Garamond',serif]">{stat.title}</h3>

            {/* Description */}
            {/* UPDATED: Changed to light font and slight opacity for a muted feel */}
            <p className="text-sm font-light opacity-80 font-['Rubik',cursive]">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;