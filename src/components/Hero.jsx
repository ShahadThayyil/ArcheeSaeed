import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative flex flex-col min-h-screen w-full bg-[#F5EFE6] overflow-hidden pt-[80px] px-6 py-8 text-[#1F1F1F]">
      {/* Subtle Background Gradient & Texture */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#E8DFD1]/50 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:45px_45px]" />
      </div>

      {/* Background Large Text */}
      <h1
        className={`absolute top-28 left-1/2 -translate-x-1/2 font-extrabold leading-none 
        text-[90px] md:text-[120px] lg:text-[170px] text-center z-0 tracking-tight pointer-events-none select-none 
        font-['Gravitas_One',cursive] uppercase transition-all duration-700   
        ${hovered ? "text-[#C0B6A1]/60" : "text-[#D9CBB3]/50"} `}
      >
        ARCHI <br /> ZAID
      </h1>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center flex-grow mt-10">
        {/* Profile Image */}
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src="/hero.png"
          alt="Profile"
          className="w-[220px] md:w-[320px] lg:w-[380px] rounded-2xl object-cover cursor-pointer "
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />

        {/* Subtitle */}
        <p className="mt-10 max-w-xl font-['Rubik',cursive]   text-[#3A3A3A] text-sm md:text-base lg:text-lg px-4 relative z-20 leading-relaxed">
          We craft timeless architectural designs that blend creativity,
          functionality, and sustainability to shape spaces that inspire and
          endure.
        </p>

        {/* CTA Button (Minimal Glass Style) */}
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-3 font-['Rubik',cursive]   rounded-full bg-[#1F1F1F] text-[#F5EFE6] font-semibold hover:bg-[#3A3A3A] transition relative z-30 shadow-md "
          >
            Schedule a consultation
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
