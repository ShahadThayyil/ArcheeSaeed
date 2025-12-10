import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {logos } from "../data/contributers";
gsap.registerPlugin(ScrollTrigger);



// Create Columns data
const col1 = [...logos, ...logos];
const col2 = [...logos, ...logos].reverse(); 
const col3 = [...logos, ...logos];

const CollaboratorsParallax = () => {
  const sectionRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", 
          end: "bottom top",   
          scrub: 1.5,          
        }
      });

      // Column 1: Moves UP
      tl.to(col1Ref.current, { y: "-20%", ease: "none" }, "move");
      
      // Column 2: Moves DOWN
      tl.fromTo(col2Ref.current, 
        { y: "-20%" }, 
        { y: "10%", ease: "none" }, 
        "move"
      );

      // Column 3: Moves UP (Desktop only)
      if (col3Ref.current) {
          tl.to(col3Ref.current, { y: "-20%", ease: "none" }, "move");
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#F0EFEA] overflow-hidden py-24 px-4 md:px-12">
      
      {/* --- HEADER (Left Aligned) --- */}
      <div className="max-w-7xl mx-auto mb-16 pl-2 md:pl-4">
            <div className="w-12 h-[3px] bg-[#BC4B32] mb-6"></div>
            <h4 className="font-manrope text-xs font-bold text-[#666666] uppercase tracking-[0.4em] mb-4">
                Trusted By
            </h4>
            <h2 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] leading-[1.1]">
                Our <span className="italic text-[#BC4B32]">Partners.</span>
            </h2>
      </div>

      {/* --- THE KINETIC COLUMNS --- */}
      {/* 🔥 FIX: grid-cols-2 for Mobile, grid-cols-3 for Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 h-[80vh] overflow-hidden relative">
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#F0EFEA] to-transparent z-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#F0EFEA] to-transparent z-20"></div>

        {/* COLUMN 1 (Up) */}
        <div ref={col1Ref} className="flex flex-col gap-4 md:gap-10 will-change-transform">
          {col1.map((logo, i) => (
            <LogoCard key={i} logo={logo} />
          ))}
        </div>

        {/* COLUMN 2 (Down) */}
        <div ref={col2Ref} className="flex flex-col gap-4 md:gap-10 will-change-transform -translate-y-1/4">
          {col2.map((logo, i) => (
            <LogoCard key={i} logo={logo} />
          ))}
        </div>

        {/* COLUMN 3 (Up) - 🔥 HIDDEN ON MOBILE */}
        <div ref={col3Ref} className="hidden md:flex flex-col gap-4 md:gap-10 will-change-transform">
          {col3.map((logo, i) => (
            <LogoCard key={i} logo={logo} />
          ))}
        </div>

      </div>
    </section>
  );
};

// Separate Card Component
const LogoCard = ({ logo }) => (
  <div className="w-full aspect-square bg-white rounded-xl md:rounded-2xl flex items-center justify-center p-4 md:p-8 shadow-sm border border-[#1A1A1A]/5 group hover:border-[#BC4B32]/30 transition-all duration-300 hover:shadow-md">
     <div className="text-center flex flex-col items-center">
        <img 
            src={logo.img} 
            alt={logo.name} 
            className="w-12 h-12 md:w-24 md:h-24 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 mb-3 md:mb-4" 
        />
        <p className="font-manrope text-[8px] md:text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/40 group-hover:text-[#BC4B32] transition-colors">
            {logo.name}
        </p>
     </div>
  </div>
);

export default CollaboratorsParallax;