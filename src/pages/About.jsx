import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Subtle Parallax effect
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 20]); 
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // --- THEME VARIABLES ---
  const BACKGROUND_COLOR = "#F7F5F0";
  const HEADING_COLOR = "#333333";
  const ACCENT_COLOR = "#A28859"; // Warm Brown/Tan
  const TEXT_COLOR = "#555555";
  
  // Glassmorphism effect requires a semi-transparent background
  const CARD_GLASS_BG = "rgba(255, 255, 255, 0.4)"; // 40% opaque White

  // Gradient Colors for the background blur effect
  const GRADIENT_1_COLOR = "rgba(162, 136, 89, 0.4)"; // ACCENT_COLOR with transparency
  const GRADIENT_2_COLOR = "rgba(51, 51, 51, 0.1)"; // HEADING_COLOR with transparency

  return (
    <section 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden pt-28 pb-16 px-6 md:px-16"
      style={{
        backgroundColor: BACKGROUND_COLOR,
        fontFamily: "'Inter', sans-serif" 
      }}
    >
      
      {/* 1. GLASSMORHPISM BACKGROUND GRADIENTS (New) */}
      {/* Gradient 1 - Warm Accent Color */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring" }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full filter blur-3xl z-0 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${GRADIENT_1_COLOR} 0%, transparent 70%)` }}
      />
      {/* Gradient 2 - Darker Shade */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring", delay: 0.2 }}
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full filter blur-3xl z-0 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${GRADIENT_2_COLOR} 0%, transparent 70%)` }}
      />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content remains the same */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter"
              style={{ color: HEADING_COLOR }}>
            ARCHITECTURAL <span className="text-6xl md:text-8xl font-serif" 
                                style={{ color: ACCENT_COLOR }}>DESIGN</span>
          </h1>
          <p className="mt-6 text-xl max-w-lg font-normal" style={{ color: TEXT_COLOR }}>
            Crafting timeless spaces with creativity, innovation, and a focus on modern aesthetic brilliance.
          </p>
          <motion.button
            className="mt-8 px-10 py-4 font-semibold rounded-lg shadow-md transition-all duration-300"
            style={{ 
                backgroundColor: ACCENT_COLOR,
                color: 'white',
                border: `2px solid ${ACCENT_COLOR}`
            }}
            whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'transparent',
                color: ACCENT_COLOR,
                boxShadow: `0 8px 20px rgba(0, 0, 0, 0.1)` 
            }}
          >
            Explore Projects →
          </motion.button>
        </motion.div>

        {/* Right Card with Glassmorphism */}
        <motion.div
          style={{ y: cardY, rotateZ: cardRotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full max-w-sm mx-auto" 
        >
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={800}
            scale={1.02}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <div
              className="p-8 rounded-2xl min-h-[450px] shadow-2xl border border-white/40 flex flex-col justify-between" // Border changed to white/40
              style={{
                background: CARD_GLASS_BG, // Semi-transparent background
                color: TEXT_COLOR,
                backdropFilter: 'blur(20px)', // The core Glassmorphism property
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-5" style={{ color: ACCENT_COLOR }}>About Me</h2>
                
                <motion.img
                  style={{ y: imageY }}
                  src="/profile-about.avif"
                  alt="Profile"
                  // Removed style={{ borderColor: ACCENT_COLOR }}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
                />

                <p className="leading-relaxed mb-6 text-center font-normal text-md" style={{ color: HEADING_COLOR }}>
                  I am a creative professional specializing in architecture and interior design, crafting spaces that seamlessly blend aesthetics and functionality.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 font-normal text-sm mb-6">
                  <div className="flex items-center gap-3" style={{ color: TEXT_COLOR }}>
                    <FiMail className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                    archizaidofficial@gmail.com
                  </div>
                  <div className="flex items-center gap-3" style={{ color: TEXT_COLOR }}>
                    <FiPhone className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                    +91 95675 43636
                  </div>
                  <div className="flex items-center gap-3" style={{ color: TEXT_COLOR }}>
                    <FiMapPin className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                    Malappuram, Kerala
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center gap-4 border-t pt-4 border-white/50">
                {[
                  { icon: <FaLinkedinIn />, link: "..." },
                  { icon: <FaInstagram />, link: "https://www.instagram.com/archizaid/" },
                  { icon: <FaFacebookF />, link: "..." },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, backgroundColor: HEADING_COLOR }}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-white transition-all duration-300 text-lg"
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
};

export default About;