// import { useLayoutEffect, useRef, useState } from "react";
// import { gsap } from "gsap";

// const CardNav = ({
//   logo,
//   logoAlt = "Logo",
//   className = "",
//   ease = "power3.out",
//   menuColor,
// }) => {
//   const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const navRef = useRef(null);
//   const tlRef = useRef(null);

//   const calculateHeight = () => {
//     const navEl = navRef.current;
//     if (!navEl) return 160; // fallback

//     const isMobile = window.matchMedia("(max-width: 768px)").matches;
//     if (isMobile) {
//       const contentEl = navEl.querySelector(".card-nav-content");
//       if (contentEl) {
//         contentEl.style.visibility = "visible";
//         contentEl.style.position = "static";
//         contentEl.style.height = "auto";

//         const topBar = 60;
//         const padding = 16;
//         const contentHeight = contentEl.scrollHeight;

//         return topBar + contentHeight + padding;
//       }
//     }
//     return 160;
//   };

//   const createTimeline = () => {
//     const navEl = navRef.current;
//     if (!navEl) return null;

//     gsap.set(navEl, { height: 60, overflow: "hidden" });
//     gsap.set(".menu-btn", { y: 20, opacity: 0 });

//     const tl = gsap.timeline({ paused: true });

//     // Expand nav height
//     tl.to(navEl, {
//       height: calculateHeight,
//       duration: 0.5,
//       ease,
//     });

//     // Fade + slide buttons
//     tl.to(
//       ".menu-btn",
//       { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.1 },
//       "-=0.2"
//     );

//     return tl;
//   };

//   useLayoutEffect(() => {
//     const tl = createTimeline();
//     tlRef.current = tl;

//     return () => {
//       tl?.kill();
//       tlRef.current = null;
//     };
//   }, [ease]);

//   useLayoutEffect(() => {
//     const handleResize = () => {
//       if (!tlRef.current) return;

//       if (isExpanded) {
//         const newHeight = calculateHeight();
//         gsap.to(navRef.current, { height: newHeight, duration: 0.3 });
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [isExpanded]);

//   const toggleMenu = () => {
//     const tl = tlRef.current;
//     if (!tl) return;

//     if (!isExpanded) {
//       setIsHamburgerOpen(true);
//       setIsExpanded(true);
//       tl.play(0);
//     } else {
//       setIsHamburgerOpen(false);
//       tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
//       tl.reverse();
//     }
//   };

//   return (
//     <div
//       className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
//     >
//       <nav
//         ref={navRef}
//         className={`card-nav ${isExpanded ? "open" : ""} 
//            h-[60px] p-0 rounded-2xl shadow-lg relative 
//           overflow-hidden will-change-[height] 
//           flex items-center justify-center
//           backdrop-blur-lg bg-white/20
//           border border-white/20`}
//       >
//         {/* Top bar */}
//         <div
//           className="card-nav-top absolute inset-x-0 top-0  
//             h-[60px] flex items-center justify-between 
//             px-4 md:px-6 z-[2]"
//         >
//           {/* Hamburger */}
//           <div
//             className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} 
//               group h-full flex flex-col items-center 
//               justify-center cursor-pointer gap-[6px]`}
//             onClick={toggleMenu}
//             role="button"
//             aria-label={isExpanded ? "Close menu" : "Open menu"}
//             tabIndex={0}
//             style={{ color: menuColor || "#fff" }}
//           >
//             <div
//               className={`hamburger-line w-[26px] h-[2px] bg-current 
//                 transition-all duration-300 ease-linear 
//                 ${isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""}`}
//             />
//             <div
//               className={`hamburger-line w-[26px] h-[2px] bg-current 
//                 transition-all duration-300 ease-linear 
//                 ${isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""}`}
//             />
//           </div>

//           {/* Logo */}
//           <div
//             className="logo-container flex items-center justify-center 
//               absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
//           >
//             <img src={logo} alt={logoAlt} className="logo h-[32px]" />
//           </div>

//           {/* CTA */}
//           <a
//             href="/get-started"
//             className="hidden md:inline-block px-6 py-2 rounded-xl backdrop-blur-md     
//               text-white font-semibold text-base shadow-lg 
//               transition-all duration-300"
//           >
//             Get Started
//           </a>
//         </div>

//         {/* Menu items */}
//         <div
//           className={`card-nav-content absolute left-0 right-0 
//               top-[60px] bottom-0 p-4 flex flex-col items-center 
//               gap-4 justify-center z-[1] 
//               ${isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"} 
//               md:flex-row md:items-center md:gap-6`}
//           aria-hidden={!isExpanded}
//         >
//           <a
//             href="/projects"
//             className="menu-btn px-6 py-3 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 
//               text-white font-medium text-lg shadow-md hover:bg-white/30 
//               transition-all duration-300"
//           >
//             Projects
//           </a>

//           <a
//             href="/contact"
//             className="menu-btn px-6 py-3 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 
//               text-white font-medium text-lg shadow-md hover:bg-white/30 
//               transition-all duration-300"
//           >
//             Contact
//           </a>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default CardNav;
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
          <a href="/docs" className="nav-link rounded-full px-4 py-2">About</a>
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

