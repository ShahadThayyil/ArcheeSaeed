import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";

// --- SUB-COMPONENT: Individual Parallax Card ---
const ParallaxCard = ({ data, index }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- THE 3D EFFECT LOGIC ---
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-[80vh] flex items-center justify-center py-20 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col gap-0 md:gap-10`}
    >
      {/* --- LAYER 1: THE PHOTO (Background) --- */}
      <motion.div
        style={{ y: yImage, opacity }}
        className="w-full md:w-3/5 h-[50vh] md:h-[70vh] relative z-0"
      >
        <div className="w-full h-full overflow-hidden rounded-none md:rounded-sm shadow-xl">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
          />
        </div>
        
        {/* Decorative Border Line */}
        <div className={`absolute -bottom-6 ${isEven ? "-left-6" : "-right-6"} w-full h-full border border-[#BC4B32] opacity-30 z-[-1] hidden md:block`}></div>
      </motion.div>

      {/* --- LAYER 2: THE TEXT (Floating Glass Card) --- */}
      <motion.div
        style={{ y: yText }}
        className={`w-[90%] md:w-2/5 z-10 absolute md:relative ${
          isEven ? "bottom-[-10%] md:bottom-auto md:-ml-24" : "bottom-[-10%] md:bottom-auto md:-mr-24"
        }`}
      >
        {/* GLASSMORPHISM STYLES APPLIED HERE:
          - bg-[#F8F7F5]/80: Semi-transparent background
          - backdrop-blur-md: The frosted glass effect
          - border-white/40: Subtle, glassy border
          - shadow-xl shadow-black/5: Soft, diffused shadow for depth
        */}
        <div className="bg-[#F8F7F5]/80 backdrop-blur-md p-8 md:p-12 shadow-xl shadow-black/5 border border-white/40 relative rounded-sm">
          
          {/* Quote Icon - Kept solid for contrast */}
          <div className="absolute -top-6 left-8 bg-[#BC4B32] p-3 text-white shadow-lg rounded-sm">
            <Quote size={24} fill="currentColor" />
          </div>

          {/* Review Text */}
          <p className="font-manrope text-[#666666] text-lg md:text-xl leading-relaxed italic mb-8">
            "{data.text}"
          </p>

          {/* Client Details */}
          <div className="border-t border-[#BC4B32]/20 pt-6 flex flex-col">
            <h4 className="font-serif text-2xl text-[#1A1A1A] mb-1">
              {data.name}
            </h4>
            <span className="font-mono text-xs text-[#BC4B32] tracking-widest uppercase">
              {data.location}
            </span>
          </div>

          {/* Page Number aesthetic */}
          <span className="absolute bottom-4 right-4 font-mono text-[10px] text-[#BC4B32]/40">
            0{index + 1}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const ClientDiaries = () => {
  return (
    <section className="w-full bg-[#F8F7F5] py-32 px-6 overflow-hidden">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-20 md:mb-32">
        <h3 className="font-mono text-xs font-bold text-[#BC4B32] tracking-[0.4em] uppercase mb-4">
          Testimonials
        </h3>
        <h2 className="font-serif text-5xl md:text-7xl text-[#1A1A1A]">
          Client <span className="italic font-light">Diaries</span>
        </h2>
      </div> 

      {/* List of Parallax Cards */}
      <div className="max-w-7xl mx-auto flex flex-col gap-20 md:gap-0">
        {testimonials.map((item, index) => (
          <ParallaxCard key={item.id} data={item} index={index} />
        ))}
      </div>

    </section>
  );
};

export default ClientDiaries;