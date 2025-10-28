import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap"; // Use CDN import
import { Link, useLocation } from "react-router-dom";

/**
 * A responsive navbar component with a full-screen "Amali-style"
 * animated menu.
 */
const CardNav = ({
  logo = "https://placehold.co/150x50/FFFFFF/000000?text=LOGO", // Default placeholder logo
  logoAlt = "Logo",
  className = "",
  ease = "power3.out", // GSAP ease function
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null); // Ref for the background overlay
  const tlRef = useRef(null);
  const location = useLocation();

  /**
   * Creates the GSAP timeline for the full-screen menu.
   * --- UPDATED for full-screen layout & stagger ---
   */
  const createTimeline = () => {
    const menuEl = menuRef.current;
    const overlayEl = overlayRef.current;
    if (!menuEl || !overlayEl) return null;

    // Get the links inside the menu for staggering
    const links = gsap.utils.toArray(menuEl.querySelectorAll("nav > a"));
    // Get the close button
    const closeBtn = menuEl.querySelector("button");

    // Set initial state: menu invisible, overlay invisible
    gsap.set(menuEl, { opacity: 0, display: "none" });
    gsap.set(overlayEl, { opacity: 0, display: "none" });

    // Set initial state for links: invisible and slightly down
    gsap.set(links, { opacity: 0, y: 50 });
    gsap.set(closeBtn, { opacity: 0 }); // Hide close button initially

    const tl = gsap.timeline({ paused: true });

    // Animate overlay and menu container (now full screen)
    tl.to(
      overlayEl,
      {
        opacity: 1,
        display: "block",
        duration: 0.3,
        ease: "none",
      },
      0
    )
      .to(
        menuEl,
        {
          opacity: 1,
          display: "flex",
          duration: 0.5,
          ease,
        },
        0 // Start menu fade-in at the same time as overlay
      )
      .to(
        closeBtn,
        {
          opacity: 1,
          duration: 0.3,
        },
        0.2
      ); // Fade in close button shortly after

    // --- STAGGER ANIMATION for links ---
    tl.to(
      links,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1, // 0.1s delay between each link
        ease: "power3.out",
      },
      0.3 // Start this 0.3s after the menu starts fading in
    );

    return tl;
  };

  // Create or recreate timeline when 'ease' prop changes
  useLayoutEffect(() => {
    tlRef.current = createTimeline();
    return () => tlRef.current?.kill(); // Cleanup timeline on unmount
  }, [ease]);

  /**
   * Close the menu if the route (location) changes.
   */
  useLayoutEffect(() => {
    if (isOpen) {
      toggleMenu(); // This will run the reverse animation
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /**
   * Toggles the menu open or closed.
   */
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isOpen) {
      setIsOpen(true);
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
      tl.play(0);
    } else {
      // Restore scrolling
      document.body.style.overflow = "auto";
      // Reverse the animation and set isOpen to false on completion
      tl.reverse().eventCallback("onReverseComplete", () => {
        setIsOpen(false);
      });
    }
  };

  /**
   * Helper function to determine active link styles
   * --- UPDATED: For large, centered links with underline hover ---
   */
  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;

    let styles = `
      relative group text-4xl sm:text-5xl transition-colors duration-300
      ${
        isActive
          ? "text-white font-medium" // Active link
          : "text-gray-400 hover:text-white" // Inactive link
      }
    `;
    return styles;
  };

  /**
   * Underline span for the hover effect
   */
  const Underline = () => (
    <span
      className="absolute bottom-0 left-0 block w-full h-0.5
                 bg-white scale-x-0 group-hover:scale-x-100
                 transition-transform duration-500 ease-in-out
                 origin-left"
    />
  );

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${className}`}>
      {/* Navbar - Kept your original glass effect bar */}
      <nav
        className={`h-[70px] w-full flex items-center justify-between px-4 sm:px-6 
        bg-transparent`}
      >
        {/* Left Side: Hamburger + Enquire Button */}
        <div
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md 
                   rounded-full p-2 shadow-lg border border-white/20"
        >
          {/* Hamburger Icon */}
          <div
            className="cursor-pointer flex flex-col justify-center items-center w-10 h-10"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            role="button"
          >
            {/* --- UPDATED: Hamburger animation --- */}
            <div
              className={`h-0.5 w-5 bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <div
              className={`h-0.5 w-5 bg-white transition-all duration-300 mt-1.5 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`h-0.5 w-5 bg-white transition-all duration-300 mt-1.5 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>

          {/* Enquire Button - glass style */}
          <a
            href="#" // You can change this to a <Link to="/contact">
            className="bg-stone-200/80 backdrop-blur-sm text-blue-900 px-5 py-2 
                       rounded-full text-sm font-bold border border-white/30
                       hover:bg-white/90 transition-all shadow-sm"
          >
            ENQUIRE
          </a>
        </div>

        {/* Right Side: Logo */}
        <Link to="/">
          <div className="flex items-center cursor-pointer pr-2">
            <img src={logo} alt={logoAlt} className="h-12 sm:h-24" />
          </div>
        </Link>
      </nav>

      {/* Overlay: Dims the background (used by timeline) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={toggleMenu}
      />

      {/* --- UPDATED: Full-Screen Menu (Amali Style) --- */}
      <div
        ref={menuRef}
        className="fixed inset-0 w-full h-full flex-col gap-4
                   font-['Cormorant_Garamond',serif]
                   bg-black/80 backdrop-blur-lg shadow-2xl z-50 p-8
                   flex justify-center items-center" // Centered layout
        style={{ display: "none" }} // Initially hidden, GSAP controls this
      >
        {/* Close button (now styled like Amali site) */}
        <button
          onClick={toggleMenu}
          className="absolute top-5 right-5 sm:top-10 sm:right-10 text-gray-300 hover:text-white transition-colors
                     flex flex-col justify-center items-center w-12 h-12"
          aria-label="Close menu"
        >
          <span className="h-0.5 w-6 bg-white rotate-45 translate-y-[1px]" />
          <span className="h-0.5 w-6 bg-white -rotate-45 -translate-y-[1px]" />
        </button>

        {/* Navigation Links - new large, centered styles */}
        <nav className="flex flex-col gap-6 w-full items-center text-center">
          <Link to="/" className={getLinkClasses("/")}>
            HOME
            <Underline />
          </Link>
          <Link to="/projects" className={getLinkClasses("/projects")}>
            PROJECTS
            <Underline />
          </Link>
          <Link to="/about" className={getLinkClasses("/about")}>
            ABOUT
            <Underline />
          </Link>
          <Link
            to="/contact"
            className={getLinkClasses("/contact")} // All links styled the same
          >
            CONTACT
            <Underline />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default CardNav;