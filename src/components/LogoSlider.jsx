import React from "react";
import { logos } from "../data/contributers";

const CollaboratorsGrid = () => {
  return (
    <section className="relative w-full bg-[#F0EFEA] py-20 md:py-32 px-6 md:px-12">
      
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
            <div className="w-12 h-[3px] bg-[#BC4B32] mb-6"></div>
            <h4 className="font-manrope text-[10px] md:text-xs font-bold text-[#666666] uppercase tracking-[0.4em] mb-4">
                Trusted By
            </h4>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h2 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] leading-[1.1]">
                    Our <span className="italic text-[#BC4B32]">Partners.</span>
                </h2>
                <p className="font-manrope text-sm md:text-base text-[#1A1A1A]/60 max-w-md pb-2">
                    Collaborating with industry leaders to build meaningful digital experiences through design and technology.
                </p>
            </div>
      </div>

      {/* --- MODERN STATIC GRID --- */}
      {/* Mobile: 2 columns 
          Tablet: 3 columns
          Desktop: 4 or 5 columns depending on logo count
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-[#1A1A1A]/5 border border-[#1A1A1A]/5">
        
        {logos.map((logo, i) => (
          <div 
            key={i} 
            className="group relative bg-[#F0EFEA] flex flex-col items-center justify-center p-8 md:p-12 transition-all duration-500 hover:z-10"
          >
            {/* Subtle Hover Background Effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl"></div>
            
            <div className="relative z-10 text-center flex flex-col items-center">
                {/* Logo Image */}
                <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                    <img 
                        src={logo.img} 
                        alt={logo.name} 
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-110" 
                    />
                </div>

                {/* Name - Always Visible */}
                <span className="block h-[1px] w-0 group-hover:w-8 bg-[#BC4B32] transition-all duration-500 mb-3"></span>
                <p className="font-manrope text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#1A1A1A]/40 group-hover:text-[#1A1A1A] transition-colors duration-300">
                    {logo.name}
                </p>
            </div>
            
            {/* Corner Accent for the "Earth-Tech" feel */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[1px] border-r-[1px] border-[#BC4B32]/0 group-hover:w-4 group-hover:h-4 group-hover:border-[#BC4B32]/40 transition-all duration-500"></div>
          </div>
        ))}

      </div>

      {/* Background Aesthetic Element */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none translate-y-1/4">
          <h1 className="font-serif text-[20vw] select-none uppercase">Partners</h1>
      </div>
    </section>
  );
};

export default CollaboratorsGrid;