import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const GlassButton = () => {
  return (
    <Link to="/contact" className="relative z-30">
      <motion.button
        whileHover={{ scale: 1.07, y: -3 }}
        whileTap={{ scale: 0.97 }}
        className="relative px-8 py-3 rounded-full text-white font-semibold font-[Inter,sans-serif] transition-all duration-300 shadow-[0_8px_20px_rgba(255,255,255,0.15)] backdrop-blur-xl border border-white/20 bg-white/10 overflow-hidden"
      >
        {/* Glass Reflection Layer */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-[2px]"></div>

        {/* Inner Glow and Rim Light */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent opacity-60"></div>

        {/* Neon Border Effect */}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/30 shadow-[0_0_25px_rgba(255,255,255,0.15)]"></div>

        {/* Text Layer (Top Layer) */}
        <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          Schedule a consultation
        </span>
      </motion.button>
    </Link>
  );
};
