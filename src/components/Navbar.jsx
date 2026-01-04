import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "PROJECTS", path: "/projects" },
    { name: "ABOUT US", path: "/about" },
    { name: "CONTACT", path: "/contact" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  };

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setIsScrolled(latest > 20);
  });

  // --- REFINED NAVBAR HEIGHT ---
  // Py-3/py-4 keeps the bar slim while the logo sits inside it
  const glassClasses = isScrolled 
    ? "bg-[#F8F7F5]/90 backdrop-blur-lg border-b border-black/5 py-3 shadow-sm" 
    : "bg-[#F8F7F5]/40 backdrop-blur-md py-1 md:py-1 border-b border-white/10";

  return (
    <>
      {/* 1. THE MAIN NAVIGATION BAR */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${glassClasses}`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex justify-between items-center relative">
          
          {/* LOGO SECTION - HIGHLIGHTED & INCREASED SIZE */}
          <div className="relative flex items-center">
            <Link to="/" className="relative z-[70] block">
              <img
                src="https://res.cloudinary.com/dmtzmgbkj/image/upload/f_webp/v1767511092/logo_qztdnc.png"
                alt="Archizaid Logo"
                className={`object-contain transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
                  ${isScrolled 
                    ? "h-14 md:h-18 brightness-110 contrast-125" // Highlighted on scroll
                    : "h-14 md:h-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" // Glow highlight at top
                  }`}
                style={{
                  // Sharpness and visibility filter
                  filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"
                }}
              />
            </Link>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group h-4 overflow-hidden"
                >
                  <motion.div
                    className="flex flex-col h-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                  >
                    <div className="h-full flex items-center">
                       <span className={`text-[11px] font-bold tracking-[0.25em] transition-colors duration-300 ${isActive ? "text-[#BC4B32]" : "text-[#1A1A1A]"}`}>
                        {link.name}
                      </span>
                    </div>
                    <div className="h-full flex items-center">
                      <span className="text-[11px] font-bold tracking-[0.25em] text-[#BC4B32]">
                        {link.name}
                      </span>
                    </div>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute  bottom-0 left-0 w-full h-[2px] bg-[#BC4B32]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* MENU TRIGGER */}
          <button
            onClick={toggleMenu}
            className="group flex items-center gap-3 relative z-[70] text-[#1A1A1A] lg:hidden outline-none"
          >
            <div className="flex flex-col gap-[6px] items-end justify-center w-9">
              <span className="h-[1.5px] w-9 bg-current transition-all duration-300 group-hover:w-6"></span>
              <span className="h-[1.5px] w-6 bg-current transition-all duration-300 group-hover:w-9"></span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* 2. FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 95% 5%)" }}
            animate={{ clipPath: "circle(150% at 95% 5%)" }}
            exit={{ clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[#1A1A1A] flex flex-col h-screen w-screen overflow-hidden"
          >
            <div className="w-full flex justify-between items-center px-6 md:px-16 py-8">
               <span className="text-[#666666] text-[10px] font-mono tracking-widest uppercase hidden md:block">
                 Index / Archizaid
               </span>
               <button 
                onClick={toggleMenu}
                className="ml-auto flex items-center gap-4 text-[#F8F7F5] group"
               >
                 <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                   Close
                 </span>
                 <div className="relative w-9 h-9 flex items-center justify-center">
                    <span className="absolute h-[1.5px] w-full bg-current rotate-45"></span>
                    <span className="absolute h-[1.5px] w-full bg-current -rotate-45"></span>
                 </div>
               </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 md:px-32 max-w-[1800px] mx-auto w-full">
              {navLinks.map((item, i) => (
                <div key={item.name} className="relative group border-b border-white/5 last:border-none">
                  <Link to={item.path} onClick={toggleMenu} className="block py-7 md:py-10">
                    <div className="flex items-center gap-8 md:gap-16">
                      <span className="text-[11px] font-mono text-[#BC4B32] opacity-60">0{i + 1}</span>
                      <motion.span 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.7 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light text-[#F8F7F5] tracking-tighter group-hover:text-[#BC4B32] transition-colors duration-500"
                      >
                        {item.name}
                      </motion.span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="px-8 md:px-16 py-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-[#666666] text-[11px] font-mono uppercase tracking-[0.25em]">
               <div>© 2026 ARCHIZAID STUDIO</div>
               <div className="flex gap-10">
                 <a href="#" className="hover:text-white transition-colors">Instagram</a>
                 <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}