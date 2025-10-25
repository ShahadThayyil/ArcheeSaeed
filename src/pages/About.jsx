import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
// UPDATED: Imported theme-appropriate icons
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const About = () => {
  return (
    // UPDATED: Changed background, text color, and base font
    <section className="min-h-screen bg-[#F5EFE6] text-[#1F1F1F] py-28 px-6 md:px-16 font-['Inter',_sans-serif]">
      
      {/* Hero Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-['Playfair_Display',_serif]">
          {/* UPDATED: Changed span to be italic for emphasis */}
          About <span className="italic">Me</span>
        </h1>
        {/* UPDATED: Changed text color and font weight */}
        <p className="text-[#1F1F1F] opacity-80 mt-4 text-lg md:text-xl max-w-3xl mx-auto font-light">
          Crafting timeless spaces with creativity, innovation, and modern design.
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        
        {/* Profile Image with 3D Tilt */}
        <Tilt
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          scale={1.05}
          transitionSpeed={1000}
          gyroscope={true}
          className="w-full flex justify-center"
        >
          <motion.img
            src="/profile-about.avif" // your profile picture path
            alt="Profile"
            loading="lazy"
            // UPDATED: Changed border color to match theme
            className="w-72 h-72 md:w-96 md:h-96 rounded-3xl object-cover shadow-2xl border-4 border-[#C0B6A1]/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </Tilt>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          // UPDATED: Changed to a light-theme card
          className="bg-white/70 backdrop-blur-xl rounded-2xl font-['Rubik',cursive] shadow-xl p-8 border border-[#C0B6A1]/50"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#1F1F1F] font-['Playfair_Display',_serif]">
            Who Am I?
          </h2>
          <p className="text-[#1F1F1F] opacity-90 leading-relaxed mb-6 font-light">
            I am a creative professional specializing in architecture and interior design, with a vision to craft spaces that seamlessly blend aesthetics and functionality. At Archizaid, every project is designed to inspire, elevate lifestyles, and leave a lasting impression through timeless and innovative architectural solutions.
          </p>

          {/* Contact Info */}
          <div className="space-y-4 font-light">
            <div className="flex items-center gap-3">
              {/* UPDATED: Changed icon color */}
              <FiMail className="text-[#C0B6A1]" />
              <a
                href="mailto:archizaidofficial@gmail.com"
                className="hover:opacity-70 transition-opacity"
              >
                archizaidofficial@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              {/* UPDATED: Changed icon color */}
              <FiPhone className="text-[#C0B6A1]" />
              <a
                href="tel:+919567543636"
                className="hover:opacity-70 transition-opacity"
              >
                +91 95675 43636
              </a>
            </div>
            <div className="flex items-center gap-3">
              {/* UPDATED: Changed icon color */}
              <FiMapPin className="text-[#C0B6A1]" />
              <span>Malappuram, Kerala</span>
            </div>
          </div>

          {/* Social Links */}
          {/* UPDATED: Changed icons and styling to match the theme's round buttons */}
          <div className="flex gap-5 pt-6">
            {[
              { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/mohammed-saeed-a7b494347?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/archizaid/" },
              { icon: <FaFacebookF />, link: "https://facebook.com/" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#C0B6A1] hover:bg-[#D9CBB3] text-white hover:text-white transition-colors text-xl"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;