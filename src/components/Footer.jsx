import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

// --- THEME CONFIGURATION ---
const THEME = {
  bg: "#F8F7F5",        // Soft Alabaster
  text: "#1A1A1A",      // Deep Charcoal
  secondary: "#666666", // Slate Grey
  accent: "#BC4B32",    // Modern Terracotta
  border: "#E0E0E0",    // Subtle Concrete
};

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = () => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth "Magnetic" movement
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (isClicked) return; // Stop movement if clicking

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate center
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance from center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Apply magnetic pull (0.3 means move 30% of the mouse distance)
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
    window.location.href = "/contact";
  }, 800); 
    // Optional: Add navigation logic here after a delay
    // setTimeout(() => window.location.href = 'mailto:archizaidofficial@gmail.com', 800);
  };

  return (
    <div className="relative flex items-center justify-center py-20">
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ x: springX, y: springY }}
        className="relative z-20 flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-full cursor-pointer focus:outline-none group"
      >
        {/* 1. The Exploding Background (Ripple) */}
        <motion.div
          animate={{
            scale: isClicked ? 50 : isHovered ? 1.1 : 1,
            backgroundColor: isClicked ? THEME.accent : isHovered ? THEME.accent : THEME.text
          }}
          transition={{
            scale: { duration: isClicked ? 0.8 : 0.3, ease: isClicked ? "easeInOut" : "easeOut" },
            backgroundColor: { duration: 0.3 }
          }}
          className="absolute inset-0 rounded-full"
        />

        {/* 2. The Text */}
        <motion.span
          animate={{
            opacity: isClicked ? 0 : 1,
            color: isHovered ? "#FFFFFF" : "#FFFFFF"
          }}
          className="relative z-10 text-lg md:text-xl font-sans font-medium uppercase tracking-widest pointer-events-none"
        >
          {isClicked ? "Opening..." : "Start A Project"}
        </motion.span>
      </motion.button>
      
      {/* Visual Cue: Magnetic Field Ring (Decorative) */}
      <motion.div 
        style={{ x: springX, y: springY, opacity: isHovered ? 1 : 0.3 }}
        className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-[#BC4B32] pointer-events-none transition-opacity duration-300"
      />
    </div>
  );
};

// --- MAIN FOOTER COMPONENT ---
const Footer = () => {
  return (
    <footer 
        className="w-full relative overflow-hidden font-['Inter',_sans-serif]"
        style={{ backgroundColor: THEME.bg, color: THEME.text }}
    >
      {/* Background Grid & Texture */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(${THEME.border} 1px, transparent 1px), linear-gradient(90deg, ${THEME.border} 1px, transparent 1px)`, 
             backgroundSize: '80px 80px',
             opacity: 0.5
           }}>
      </div>
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- TOP SECTION: CTA --- */}
        <div className="pt-24 pb-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h5 className="font-mono text-sm text-[#BC4B32] tracking-[0.3em] uppercase mb-6">
                    /// Contact
                </h5>
                <h2 className="text-6xl md:text-8xl font-bold uppercase font-['Playfair_Display',_serif] leading-[0.9] mb-8">
                    Let's <br/> Build
                </h2>
                <p className="font-sans text-[#666666] text-lg md:text-xl max-w-md leading-relaxed border-l-2 border-[#BC4B32] pl-6">
                    Have an idea? Let's turn your vision into a structural reality. I am available for freelance work.
                </p>
                
                <div className="mt-12">
                   <a 
                    href="mailto:archizaidofficial@gmail.com" 
                    className="font-mono text-sm md:text-base text-[#1A1A1A] border-b border-[#1A1A1A] hover:text-[#BC4B32] hover:border-[#BC4B32] transition-colors pb-1"
                   >
                     archizaidofficial@gmail.com
                   </a>
                </div>
            </motion.div>

            {/* Right: Magnetic Button Interaction */}
            <div className="flex justify-center md:justify-end">
                <MagneticButton />
            </div>
        </div>

        {/* --- BOTTOM BAR: NAV & COPYRIGHT --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="border-t border-[#E0E0E0] py-10 mt-12 flex flex-col md:flex-row justify-between items-center"
        >
            {/* Left: Copyright */}
            <div className="mb-6 md:mb-0 text-center md:text-left">
                <p className="text-sm text-[#666666] font-medium tracking-wide">
                    © 2025 ARCHIZAID.
                </p>
                <p className="text-xs text-[#BC4B32]/60 mt-1 font-mono">
                    DESIGNED IN KERALA
                </p>
            </div>

            {/* Right: Links */}
            <nav className="flex gap-8 text-sm font-sans font-bold uppercase tracking-widest text-[#1A1A1A]">
                {["About", "Projects", "Contact"].map((item) => (
                    <Link 
                        key={item} 
                        to={`/${item.toLowerCase()}`} 
                        className="relative group overflow-hidden"
                    >
                        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                            {item}
                        </span>
                        <span className="absolute top-0 left-0 block text-[#BC4B32] transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                            {item}
                        </span>
                    </Link>
                ))}
            </nav>
        </motion.div>

      </div>
      
      {/* Giant Background Watermark (Clipped) */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03]">
          <h1 className="text-[15vw] font-black uppercase text-[#1A1A1A] leading-none tracking-tighter">
              ARCHIZAID
          </h1>
      </div>

    </footer>
  );
};

export default Footer;