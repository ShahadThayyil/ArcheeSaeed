// 1. Import useRef, useScroll, and useTransform
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { FaFacebook, FaDribbble, FaLinkedin, FaInstagram } from "react-icons/fa";
import ProfileCard from "./ProfileCard"; // Assuming ProfileCard is also styled for dark mode

const Profile = () => {
  // 2. Create a ref to track the section
  const sectionRef = useRef(null);

  // 3. Track the scroll progress of this section
  // "start end" = when the 'start' of the section hits the 'end' of the viewport
  // "end start" = when the 'end' of the section hits the 'start' of the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 4. Define parallax transformations
  // Image (left side) moves slower (only 20% of scroll)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  // Text (right side) moves a bit faster (30% of scroll)
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    // 5. Add the ref to the main section
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-6 py-12 font-['Inter',_sans-serif] overflow-hidden" // overflow-hidden added
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* 6. Wrap ProfileCard in a motion.div */}
        {/* This will fade-in and apply parallax */}
        <motion.div
          style={{ y: imageY }} // Parallax applied here
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }} // Changed to whileInView for better scroll triggering
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Assuming ProfileCard is built to handle dark mode */}
          <ProfileCard className=" text-white " />
        </motion.div>

        {/* 7. Apply parallax to the text's motion.div */}
        <motion.div
          style={{ y: textY }} // Parallax applied here
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }} // Changed to whileInView
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Badge - Recolored for dark mode */}
          <span className="px-4 py-1 text-sm border border-gray-700 rounded-full inline-flex items-center gap-2 text-gray-400 font-light tracking-wider">
            <span className="w-2 h-2 rounded-full bg-gray-600"></span>
            ABOUT ME
          </span>

          {/* Heading - Recolored */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white font-['Playfair_Display',_serif]">
            Discover My <br /> Design Journey
          </h1>

          {/* Paragraph - Recolored and font changed */}
          <p className="text-gray-400 text-base leading-relaxed font-light font-sans">
            Hello! I’m Archizaid, a passionate Architectural Designer dedicated
            to shaping modern, functional, and timeless spaces. With years of
            experience in blending creativity and precision, my mission is to
            transform ideas into structures that inspire and endure. At
            Archizaid, every design is tailored to reflect individuality,
            innovation, and excellence in architecture.
          </p>

          {/* Social Icons - Recolored for dark mode */}
          <div className="flex gap-5 pt-4">
            {[
              { icon: <FaFacebook />, link: "https://facebook.com/" },
              { icon: <FaDribbble />, link: "https://issuu.com/mohammedsaeed./docs/mohammed_saeed_portfolio" },
              { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/mohammed-saeed-a7b494347?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/archizaid/" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-xl text-gray-400 hover:text-white"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;