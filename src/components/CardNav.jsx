import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CardNav = ({ logo, logoAlt = "Logo", className = "", ease = "power3.out" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const tlRef = useRef(null);

  // GSAP drawer animation
  const createTimeline = () => {
    const menuEl = menuRef.current;
    if (!menuEl) return null;

    gsap.set(menuEl, { height: 0, opacity: 0, display: "none" });

    const tl = gsap.timeline({ paused: true });
    tl.to(menuEl, {
      height: 220, // drawer height
      opacity: 1,
      display: "flex",
      duration: 0.5,
      ease,
    });

    return tl;
  };

  useLayoutEffect(() => {
    tlRef.current = createTimeline();
    return () => tlRef.current?.kill();
  }, [ease]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isOpen) {
      setIsOpen(true);
      tl.play(0);
    } else {
      tl.reverse().eventCallback("onReverseComplete", () => setIsOpen(false));
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${className}`}>
      {/* Navbar */}
      <nav
        className={`h-[70px] w-full flex items-center justify-between px-8 md:px-44 
        backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt={logoAlt} className="h-[24px]" />
          <span className="text-white font-medium text-sm md:text-base">
            Archeesaeed
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 text-white text-sm font-medium">
          <a href="/" className="nav-link rounded-full px-4 py-2 active">Home</a>
          <a href="/projects" className="nav-link rounded-full px-4 py-2">Projects</a>
          <a href="/about" className="nav-link rounded-full px-4 py-2">About</a>
          <a href="/contact" className="nav-link rounded-full px-4 py-2">Contact</a>
        </div>

        {/* Hamburger */}
        <div
          className="md:hidden cursor-pointer flex flex-col gap-[5px]"
          onClick={toggleMenu}
        >
          <div
            className={`h-[2px] w-6 bg-white transition-all ${
              isOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <div
            className={`h-[2px] w-6 bg-white transition-all ${
              isOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </div>
      </nav>

      {/* Drawer */}
      <div
        ref={menuRef}
        className="flex-col items-center justify-center gap-2 text-white 
                   font-medium text-base md:hidden 
                   backdrop-blur-lg bg-white/10 border-b border-white/20
                   overflow-hidden"
      >
        <a href="/" className="nav-link rounded-full px-4 py-2 active">Home</a>
        <a href="/projects" className="nav-link rounded-full px-4 py-2">Projects</a>
        <a href="/docs" className="nav-link rounded-full px-4 py-2">About</a>
        <a href="/contact" className="nav-link rounded-full px-4 py-2">Contact</a>
      </div>

      {/* Link styles */}
      <style jsx>{`
        .nav-link {
          position: relative;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .nav-link.active {
          background: white;
          color: black;
          border: 1px solid white;
        }
      `}</style>
    </div>
  );
};

export default CardNav;


// export default CardNav;

