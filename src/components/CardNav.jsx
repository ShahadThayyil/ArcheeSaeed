import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link, useLocation } from "react-router-dom";

const CardNav = ({
  logo,
  logoAlt = "Logo",
  className = "",
  ease = "power3.out",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const tlRef = useRef(null);
  const location = useLocation();

  // GSAP drawer animation
  const createTimeline = () => {
    const menuEl = menuRef.current;
    if (!menuEl) return null;

    gsap.set(menuEl, { height: 0, opacity: 0, display: "none" });

    const tl = gsap.timeline({ paused: true });
    tl.to(menuEl, {
      height: 220,
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
    <div className={`fixed top-0 left-0 w-full  z-50 ${className}`}>
      {/* Navbar */}
      <nav
        className={`h-[70px] w-full flex items-center justify-between px-8 md:px-44 
        bg-[#F5EFE6] border-b border-[#D7CEC2] shadow-sm transition-all duration-300`}
      >
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt={logoAlt} className="h-[80px]" />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-[#1F1F1F] text-sm font-['Cormorant_Garamond',serif] tracking-wide">
          <Link
            to="/"
            className={`nav-link px-4 py-2 ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            HOME
          </Link>
          <Link
            to="/projects"
            className={`nav-link px-4 py-2 ${
              location.pathname === "/projects" ? "active" : ""
            }`}
          >
            PROJECTS
          </Link>
          <Link
            to="/about"
            className={`nav-link px-4 py-2 ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            className={`nav-link border border-[#D7CEC2] px-4 py-2 rounded-md font-medium transition-all duration-300 ${
              location.pathname === "/contact" ? "active-btn" : "hover-btn"
            }`}
          >
            CONTACT US
          </Link>
        </div>

        {/* Hamburger */}
        <div
          className="md:hidden cursor-pointer flex flex-col gap-[5px]"
          onClick={toggleMenu}
        >
          <div
            className={`h-[2px] w-6 bg-[#1F1F1F] transition-all ${
              isOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <div
            className={`h-[2px] w-6 bg-[#1F1F1F] transition-all ${
              isOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </div>
      </nav>

      {/* Drawer (mobile menu) */}
      <div
        ref={menuRef}
        className="flex-col items-center justify-center gap-3 text-[#1F1F1F]
                   font-medium text-base md:hidden font-['Cormorant_Garamond',serif]
                   bg-[#F5EFE6] border-b border-[#D7CEC2] overflow-hidden"
      >
        <Link to="/" className="nav-link px-4 py-2" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/projects" className="nav-link px-4 py-2" onClick={toggleMenu}>
          Projects
        </Link>
        <Link to="/about" className="nav-link px-4 py-2" onClick={toggleMenu}>
          About
        </Link>
        <Link
          to="/contact"
          className="border border-[#D7CEC2] px-4 py-2 rounded-md font-medium hover:bg-[#EAE2D8] transition-all"
          onClick={toggleMenu}
        >
          Contact Us
        </Link>
      </div>

      {/* Styles */}
      <style jsx>{`
        .nav-link {
          color: #1f1f1f;
          text-decoration: none;
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: #000;
          opacity: 0.8;
        }

        .hover-btn:hover {
          background: #eae2d8;
        }

        .active {
          font-weight: 600;
          color: #000;
        }

        .active-btn {
          background: #1f1f1f;
          color: #f5efe6;
          border: 1px solid #1f1f1f;
        }
      `}</style>
    </div>
  );
};

export default CardNav;
