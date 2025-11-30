import React from "react";
import { Menu, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

// Theme Colors (Tailwind Arbitrary Values set for clarity)
const colors = {
  primaryText: "text-[#1A1A1A]",
  secondaryText: "text-[#666666]",
  accent: "bg-[#BC4B32]",
  accentHover: "hover:bg-[#D65A31]",
};

const FourCornerNav = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none p-6 md:p-10 mix-blend-difference text-white">
      {/* Top Left: Logo */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 pointer-events-auto">
        <a href="#" className={`text-2xl font-black tracking-tighter uppercase ${colors.primaryText} mix-blend-difference`}>
          Archizaid<span className="text-[#BC4B32]">.</span>
        </a>
      </div>

      {/* Top Right: Hamburger Menu */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 pointer-events-auto">
        <button className="group flex items-center gap-4">
          <span className={`hidden md:block text-sm font-bold tracking-[0.2em] uppercase ${colors.primaryText} mix-blend-difference group-hover:text-[#BC4B32] transition-colors`}>Menu</span>
          <div className={`w-12 h-12 rounded-full border border-[#E0E0E0]/30 flex items-center justify-center group-hover:border-[#BC4B32] transition-colors`}>
             <Menu size={20} className={`${colors.primaryText} mix-blend-difference`} />
          </div>
        </button>
      </div>

      {/* Bottom Left: Scroll Indicator */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pointer-events-auto flex items-center gap-4">
         <div className="w-[1px] h-16 bg-[#E0E0E0] mix-blend-difference relative overflow-hidden">
             <motion.div 
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-[#BC4B32]"
             ></motion.div>
         </div>
         <span className={`text-xs font-bold tracking-[0.2em] uppercase writing-vertical-lr rotate-180 ${colors.secondaryText} mix-blend-difference`}>Scroll to Explore</span>
      </div>

      {/* Bottom Right: CTA Button (Terracotta Accent) */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-auto">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${colors.accent} ${colors.accentHover} text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg`}
        >
          Let's Talk
        </motion.button>
      </div>
    </div>
  );
};

export default FourCornerNav;