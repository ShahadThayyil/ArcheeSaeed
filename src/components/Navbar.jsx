import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {Link} from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const navLinks = [
  { name: "THE STUDIO", path: "/" },
  { name: "SHOWCASE", path: "/projects" },
  { name: "INSIDE US", path: "/about" },
  { name: "SAY HELLO", path: "/contact" }
];
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- SMART SCROLL LOGIC ---
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  const bottomOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  
  const [bottomPointerEvents, setBottomPointerEvents] = useState("auto");
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setBottomPointerEvents(latest > 50 ? "none" : "auto");
    });
  }, [scrollY]);

  // --- STYLES ---
  const topItemStyle = "pointer-events-auto text-white mix-blend-difference z-50 flex items-center";
  const accentHover = "hover:text-[#BC4B32] transition-colors duration-300";

  // --- MENU ANIMATION VARIANTS ---
  const menuContainerVars = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const linkVars = {
    initial: { y: 30, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { y: 30, opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
  };

  const lineVars = {
    initial: { scaleX: 0, originX: 0 },
    open: { scaleX: 1, transition: { duration: 0.8, ease: "easeInOut" } },
    exit: { scaleX: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      {/* 1. THE ARCHITECTURAL FRAME (Fixed Corners on Main Page) */}
      <motion.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isVisible ? "visible" : "hidden"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed inset-0 z-50 pointer-events-none p-6 md:p-8 lg:p-12 flex flex-col justify-between supports-[padding:max(0px)]:p-[max(24px,env(safe-area-inset-top))_max(24px,env(safe-area-inset-right))_max(24px,env(safe-area-inset-bottom))_max(24px,env(safe-area-inset-left))]"
      >
        
        {/* ================= TOP ROW ================= */}
        <div className="flex justify-between items-start -mt-2">
            {/* --- TOP LEFT: LOGO --- */}
            <div className={topItemStyle}>
                <Link to="/" className="block group">
                    <img 
                        src="/logo.png" 
                        alt="AZ Logo" 
                        className="w-16 h-10 md:w-24 md:h-24 object-contain transition-transform group-hover:scale-105"
                    />
                </Link>
            </div>
  

            {/* --- TOP RIGHT: MENU BUTTON --- */}
            <div className={`${topItemStyle} pt-2`}>
                <button 
                    onClick={toggleMenu}
                    className={`text-[#1A1A1A] group flex items-center gap-3 ${accentHover}`}
                >
                    <span className="hidden md:block text-xs font-bold tracking-[0.2em] uppercase">Menu</span>
                    <div className="flex flex-col gap-1.5 items-end justify-center h-full">
                        <span className="w-8 h-[2px] bg-current group-hover:w-6 transition-all duration-300"></span>
                        <span className="w-6 h-[2px] bg-current group-hover:w-8 transition-all duration-300"></span>
                    </div>
                </button>
            </div>
        </div>

        {/* ================= BOTTOM ROW ================= */}
        <motion.div 
            animate={{ opacity: isVisible && scrollY.get() < 100 ? 1 : 0 }}
            className="flex justify-between items-end text-[#1A1A1A] pointer-events-auto" 
            style={{ pointerEvents: bottomPointerEvents }}
        >
            {/* --- BOTTOM LEFT: LOCATION --- */}
            <div className="block max-w-[50%]">
                <div className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] leading-relaxed opacity-90">
                    <p className="whitespace-nowrap">KERALA, INDIA</p>
                    <p className="whitespace-nowrap">LAT: 10.85°N</p>
                </div>
            </div>

            {/* --- BOTTOM RIGHT: INQUIRY CTA --- */}
            <div>
                <Link to="/contact"
                    
                    className="group flex items-center gap-2 md:gap-3 pb-1 relative overflow-hidden"
                >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BC4B32] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BC4B32]"></span>
                    </span>
                    <div className="relative flex flex-col">
                        <span className={`text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase ${accentHover}`}>
                            Inquiry
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#BC4B32] transition-all duration-300 group-hover:w-full"></span>
                    </div>
                </Link>
            </div>
        </motion.div>
      </motion.div>

      {/* 2. FULL SCREEN ARCHITECTURAL MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            // FIX: h-[100dvh] ensures full height on mobile browsers. overflow-hidden removes scrollbar.
            className="fixed inset-0 z-[60] bg-[#1A1A1A] flex flex-col h-[100dvh] w-screen overflow-hidden pointer-events-auto"
          >
             
             {/* --- MENU HEADER (Logo & Close) --- */}
             <div className="flex justify-between items-center px-6 md:px-12 py-6 shrink-0">
                 <div className="text-[#666666] text-xs font-mono tracking-widest hidden md:block">
                     NAVIGATION INDEX
                 </div>
                 {/* Mobile Logo in Menu (Optional visibility) */}
                 <div className="md:hidden opacity-50 w-10">
                    {/* Placeholder to balance flex layout if needed, or put logo here */}
                 </div>

                 <button 
                    onClick={toggleMenu}
                    className="ml-auto text-[#F8F7F5] p-2 hover:text-[#BC4B32] transition-colors group"
                 >
                    <div className="relative w-8 h-8 group-hover:rotate-90 transition-transform duration-500">
                        <span className="absolute top-1/2 left-0 w-full h-[1px] bg-current -rotate-45"></span>
                        <span className="absolute top-1/2 left-0 w-full h-[1px] bg-current rotate-45"></span>
                    </div>
                 </button>
             </div>

             {/* --- MENU LINKS CONTAINER --- */}
             {/* FIX: flex-1 and justify-evenly distributes space perfectly without overflow */}
             <motion.div 
                variants={menuContainerVars}
                initial="initial"
                animate="open"
                exit="exit"
                className="flex-1 flex flex-col justify-evenly px-6 md:px-24 lg:px-32 w-full max-w-[1400px] mx-auto py-2"
             >
                {navLinks.map((item, i) => (
                    <div key={item.name} className="relative group cursor-pointer w-full">
                        
                        {/* Top Line Divider */}
                        <motion.div 
                            variants={lineVars} 
                            className="absolute top-0 left-0 w-full h-[1px] bg-[#666666]/30 group-hover:bg-[#BC4B32] transition-colors duration-500" 
                        />

                        {/* Link Container - Padding adjusted for tight fit */}
                       {/* Change this specific line inside the map loop */}
                        <Link to={item.path} onClick={toggleMenu} className="block w-full py-3 md:py-6">
                            <div className="flex items-center justify-between">
                                
                                {/* Link Content Wrapper */}
                                <motion.div variants={linkVars} className="flex items-baseline gap-4 md:gap-10">
                                    {/* Number Index */}
                                    <span className="text-[10px] md:text-sm font-mono text-[#BC4B32] opacity-70 group-hover:opacity-100 group-hover:text-[#F8F7F5] transition-colors duration-500">
                                        0{i + 1}
                                    </span>
                                    
                                    {/* Main Text - Adjusted sizes to fit one screen */}
                                    <span className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-light text-[#F8F7F5] tracking-tighter group-hover:translate-x-4 group-hover:text-[#BC4B32] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                        {item.name}
                                    </span>
                                </motion.div>

                                {/* Arrow Icon */}
                                <div className="hidden md:block opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-500 delay-100 text-[#BC4B32]">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        
                        {/* Bottom Line (Only for last item) */}
                        {i === navLinks.length - 1 && (
                             <motion.div variants={lineVars} className="absolute bottom-0 left-0 w-full h-[1px] bg-[#666666]/30" />
                        )}
                    </div>
                ))}
             </motion.div>

             {/* --- MENU FOOTER --- */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="p-6 md:px-12 pb-8 md:pb-12 flex justify-between items-end text-[#666666] text-[10px] md:text-xs font-mono tracking-widest uppercase shrink-0"
             >
                 <div className="flex flex-col gap-1 md:gap-2">
                     <span className="text-[#BC4B32] hidden md:block">Contact</span>
                     <a href="mailto:hello@archizaid.com" className="hover:text-white transition-colors">hello@archizaid.com</a>
                     <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 987 654 3210</a>
                 </div>
                 
                 <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-right md:text-left">
                     <a href="#" className="hover:text-white transition-colors">Instagram</a>
                     <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                 </div>
             </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}