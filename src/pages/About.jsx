import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from "react-icons/fi";

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 md:px-16">
      {/* Hero Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          About <span className="text-green-400">Me</span>
        </h1>
        <p className="text-gray-400 mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          A passionate designer & developer crafting immersive digital
          experiences with creativity, innovation, and modern technology.
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
            src="/profile-about.png" // your profile picture path
            alt="Profile"
            className="w-72 h-72 md:w-96 md:h-96 rounded-3xl object-cover shadow-2xl border-4 border-green-500/30"
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
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            Who Am I?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            I am a creative professional with a strong focus on architecture,
            interior design, and modern web development. My approach combines
            aesthetics with functionality, delivering designs that inspire and
            leave lasting impressions.
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiMail className="text-green-400" />
              <a href="mailto:yourmail@example.com" className="hover:text-green-400 transition">
                yourmail@example.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-green-400" />
              <a href="tel:+1234567890" className="hover:text-green-400 transition">
                +1 234 567 890
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="text-green-400" />
              <span>Dubai, UAE</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 mt-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
              <FiLinkedin size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
              <FiGithub size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
