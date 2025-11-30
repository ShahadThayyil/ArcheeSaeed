import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// import Tilt from "react-parallax-tilt"; // Removed
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Subtle Parallax effect (Unchanged)
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // --- THEME VARIABLES (Updated to Dark) ---
  const BACKGROUND_COLOR = "#1a1a1a";
  const HEADING_COLOR = "#FFFFFF";
  const ACCENT_COLOR = "#6b7280"; // Muted gray (like numbered headers)
  const TEXT_COLOR = "#9ca3af"; // Light gray
  
  // Removed Glassmorphism variables

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative overflow-hidden pt-28 pb-16 px-6 md:px-16"
      style={{
        backgroundColor: BACKGROUND_COLOR,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* 1. REMOVED GLASSMORPHISM BACKGROUND GRADIENTS */}
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-left"
        >
          <h1
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter"
            style={{ color: HEADING_COLOR }}
          >
            ARCHITECTURAL{" "}
            <span
              className="text-6xl md:text-8xl font-serif"
              style={{ color: ACCENT_COLOR }} // Muted accent
            >
              DESIGN
            </span>
          </h1>
          <p
            className="mt-6 text-xl max-w-lg  font-sans font-light" // Font changed
            style={{ color: TEXT_COLOR }}
          >
            Crafting timeless spaces with creativity, innovation, and a focus on
            modern aesthetic brilliance.
          </p>
          
          {/* 2. BUTTON RESTYLED to minimal link */}
          <motion.a
            href="/projects" // Assuming this links to projects
            className="mt-8 px-1 py-2 font-sans font-light text-lg" // Class changes
            style={{
              color: HEADING_COLOR,
              borderBottom: `1px solid ${TEXT_COLOR}`, // Underline
            }}
            whileHover={{
              borderColor: HEADING_COLOR, // Hover effect
              color: HEADING_COLOR,
            }}
          >
            Explore Projects →
          </motion.a>
        </motion.div>

        {/* Right Card */}
        <motion.div
          style={{ y: cardY, rotateZ: cardRotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full max-w-sm mx-auto"
        >
          {/* 3. REMOVED TILT COMPONENT */}
          <div
            // 4. REMOVED Glassmorphism styles (blur, shadow, rounded-2xl, etc.)
            // ADDED flat, sharp, bordered style
            className="p-8 border border-gray-700 min-h-[450px] flex flex-col justify-between"
            style={{
              background: "transparent", // Flat background
              color: TEXT_COLOR,
            }}
          >
            <div>
              <h2
                className="text-2xl font-bold mb-5 font-['Playfair_Display',_serif]"
                style={{ color: HEADING_COLOR }}
              >
                About Me
              </h2>

              <motion.img
                style={{ y: imageY }}
                src="/profile-about.avif" // Make sure this image path is correct
                alt="Profile"
                // 5. REMOVED rounded-full, updated border
                className="w-32 h-32 object-cover mx-auto mb-6 border-4 border-gray-700 shadow-lg"
              />

              <p
                className="leading-relaxed mb-6 text-center font-sans font-light text-md" // Font changed
                style={{ color: TEXT_COLOR }}
              >
                I am a creative professional specializing in architecture and
                interior design, crafting spaces that seamlessly blend
                aesthetics and functionality.
              </p>

              {/* Contact Info (Colors updated) */}
              <div className="space-y-3 font-sans font-light text-sm mb-6">
                <div
                  className="flex items-center gap-3"
                  style={{ color: TEXT_COLOR }}
                >
                  <FiMail className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                  archizaidofficial@gmail.com
                </div>
                <div
                  className="flex items-center gap-3"
                  style={{ color: TEXT_COLOR }}
                >
                  <FiPhone className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                  +91 95675 43636
                </div>
                <div
                  className="flex items-center gap-3"
                  style={{ color: TEXT_COLOR }}
                >
                  <FiMapPin className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                  Malappuram, Kerala
                </div>
              </div>
            </div>
            
            {/* Social Links (Colors updated) */}
            <div className="flex justify-center gap-4 border-t pt-4 border-gray-700">
              {[
                { icon: <FaLinkedinIn />, link: "..." },
                {
                  icon: <FaInstagram />,
                  link: "https://www.instagram.com/archizaid/",
                },
                { icon: <FaFacebookF />, link: "..." },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, backgroundColor: "#3a3a3a" }} // Dark hover
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white transition-all duration-300 text-lg"
                  style={{ backgroundColor: "#2a2a2a" }} // Dark base
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;