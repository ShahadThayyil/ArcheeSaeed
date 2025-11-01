// 1. useRef, useScroll, and useTransform import cheyyuka
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { FaFacebook, FaDribbble, FaLinkedin, FaInstagram } from "react-icons/fa";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  // 2. Section-ine track cheyyan oru ref create cheyyuka
  const sectionRef = useRef(null);

  // 3. Ee section-inte scroll progress track cheyyuka
  // "start end" = section-inte 'start' viewport-inte 'end'-il ethumbol
  // "end start" = section-inte 'end' viewport-inte 'start'-il ethumbol
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 4. Parallax transformations define cheyyuka
  // Image (left side) slower aayi neenganam (scroll-inte 20% mathram)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  // Text (right side) kurach koodi fast aayi neenganam (scroll-inte 30%)
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    // 5. Ref-ine main section-il add cheyyuka
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#F5EFE6] text-[#1F1F1F] flex items-center justify-center px-6 py-12 font-['Inter',_sans-serif] overflow-hidden" // overflow-hidden add cheythu
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* 6. ProfileCard-ine oru motion.div-il wrap cheyyuka */}
        {/* Ithu fade-in aavum, oppam parallax apply cheyyum */}
        <motion.div
          style={{ y: imageY }} // Parallax ivide apply cheythu
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ProfileCard className=" text-[#1F1F1F] " />
        </motion.div>

        {/* 7. Text-inte motion.div-il parallax apply cheyyuka */}
        <motion.div
          style={{ y: textY }} // Parallax ivide apply cheythu
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Badge */}
          <span className="px-4 py-1 text-sm border border-[#C0B6A1] rounded-full inline-flex items-center gap-2 text-[#1F1F1F] font-light tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#D9CBB3]"></span>
            ABOUT ME
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1F1F1F] font-['Playfair_Display',_serif]">
            Discover My <br /> Design Journey
          </h1>

          {/* Paragraph */}
          <p className="text-[#1F1F1F] text-base leading-relaxed font-light font-['Rubik',cursive]">
            Hello! I’m Archizaid, a passionate Architectural Designer dedicated to shaping modern, functional, and timeless spaces. With years of experience in blending creativity and precision, my mission is to transform ideas into structures that inspire and endure. At Archizaid, every design is tailored to reflect individuality, innovation, and excellence in architecture.
          </p>

          {/* Social Icons (Ningalude code-il maattamilla) */}
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
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#C0B6A1] hover:bg-[#D9CBB3] hover:text-[#1F1F1F] transition-colors text-xl text-white"
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