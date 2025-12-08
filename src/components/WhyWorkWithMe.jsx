import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PhilosophySection = () => {
  const containerRef = useRef(null);
  const largeTextRef = useRef(null);
  const glassCardRef = useRef(null);
  
  // Lens Refs
  const imageWrapperRef = useRef(null);
  const lensRef = useRef(null);
  const innerImageRef = useRef(null);

  // GSAP QuickTo for smooth performance
  const xToLens = useRef(null);
  const yToLens = useRef(null);
  const xToImg = useRef(null);
  const yToImg = useRef(null);

  // ----------------- 1. GSAP ANIMATIONS -----------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Setup QuickTo
      xToLens.current = gsap.quickTo(lensRef.current, "x", { duration: 0.1, ease: "power3" });
      yToLens.current = gsap.quickTo(lensRef.current, "y", { duration: 0.1, ease: "power3" });
      
      // Counter-movement for the inner image to make it look "static"
      xToImg.current = gsap.quickTo(innerImageRef.current, "x", { duration: 0.1, ease: "power3" });
      yToImg.current = gsap.quickTo(innerImageRef.current, "y", { duration: 0.1, ease: "power3" });

      // --- SCROLL ANIMATIONS ---
      gsap.to(largeTextRef.current, {
        xPercent: -20, 
        ease: "none",
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: "top bottom", 
          end: "bottom top", 
          scrub: 1 
        }
      });

      gsap.fromTo(glassCardRef.current, 
        { y: 50 }, 
        { 
          y: -50, 
          ease: "none",
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top bottom", 
            end: "bottom top", 
            scrub: 1.2 
          }
        }
      );

      // Image Entrance
      gsap.fromTo(imageWrapperRef.current, 
        { clipPath: "inset(100% 0% 0% 0%)" }, 
        { 
          clipPath: "inset(0% 0% 0% 0%)", 
          duration: 1.5, 
          ease: "power4.out",
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top 70%" 
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ----------------- 2. SMOOTH LENS LOGIC -----------------
  const handleMouseMove = (e) => {
    if (!imageWrapperRef.current || !lensRef.current) return;
    
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const lensSize = 100; // Half of 200px width

    // Move Lens Circle
    xToLens.current(mouseX - lensSize);
    yToLens.current(mouseY - lensSize);

    // Move Inner Image Opposite (To keep it fixed in place)
    xToImg.current(-(mouseX - lensSize));
    yToImg.current(-(mouseY - lensSize));
  };

  const handleMouseEnter = () => {
    gsap.to(lensRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
  };

  const handleMouseLeave = () => {
    gsap.to(lensRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[120vh] bg-[#F0EFEA] overflow-hidden flex flex-col justify-center items-center py-20"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap');
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
        .sketch-filter { filter: grayscale(100%) contrast(120%) brightness(110%) sepia(20%); }
      `}</style>

      {/* --- BACKGROUND TEXT --- */}
      <div className="absolute top-[10%] left-0 w-full pointer-events-none select-none z-0 overflow-visible opacity-[0.15]">
        <h1 ref={largeTextRef} className="font-serif-display text-[15vw] md:text-[13vw] whitespace-nowrap leading-none text-[#1A1A1A] translate-x-[10%]">
          Philosophy — Vision — Reality —
        </h1>
      </div>

      <div className="container mx-auto max-w-[95%] md:max-w-[90%] relative z-10 flex flex-col md:flex-row items-center md:items-start justify-center h-full">
        
        {/* --- IMAGE CANVAS (The Magic Lens Area) --- */}
        <div className="w-full md:w-[65%] h-[60vh] md:h-[85vh] relative md:ml-auto">
          <div 
            ref={imageWrapperRef} 
            onMouseMove={handleMouseMove} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            className="w-full h-full relative cursor-none overflow-hidden rounded-sm shadow-xl md:shadow-none bg-[#E0E0E0] group"
          >
             {/* 1. Base Layer: The Sketch */}
             <img 
                src="/sketch.png" 
                alt="Sketch" 
                className="absolute inset-0 w-full h-full object-cover sketch-filter opacity-90 pointer-events-none" 
             />
             <div className="absolute inset-0 border-[1px] border-white/30 m-4 pointer-events-none"></div>

             {/* 2. The Moving Lens (Window) */}
             <div 
                ref={lensRef}
                className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full border-[2px] border-white/50 shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden z-20 opacity-0 scale-0 pointer-events-none bg-[#F0EFEA]"
             >
                {/* 3. The Real Image (Inside the Lens) */}
                <div 
                    ref={innerImageRef}
                    className="absolute top-0 left-0 w-full h-full"
style={{
  width: imageWrapperRef.current?.offsetWidth || '100%',
  height: imageWrapperRef.current?.offsetHeight || '100%'
}}                > 
                    <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
                        alt="Real" 
                        // 🔥 CHANGED: Removed scale-125. Now it's normal size.
                        className="w-full h-full object-cover" 
                    />
                </div>
                
                {/* Lens Gloss */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none"></div>
             </div>

             {/* Cursor Hint */}
             <div className="absolute top-4 right-4 z-10 mix-blend-difference pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-manrope text-white text-xs uppercase tracking-[0.2em] font-bold">
                    [ Explore Reality ]
                </span>
             </div>

          </div>
        </div>

        {/* --- GLASS CARD --- */}
        <div ref={glassCardRef} className="w-[90%] md:w-[450px] relative -mt-24 md:mt-0 md:absolute md:left-[5%] md:bottom-[15%] z-20">
          <div className="relative p-6 md:p-10 backdrop-blur-3xl bg-white/70 md:bg-white/60 border border-white/50 shadow-2xl rounded-sm">
             <div className="w-12 h-[2px] bg-[#BC4B32] mb-6"></div>
             <h2 className="font-serif-display text-3xl md:text-5xl text-[#1A1A1A] leading-tight mb-4 md:mb-6">
               Frozen <br/> <span className="italic font-light">Music.</span>
             </h2>
             <p className="font-manrope text-[#444] text-sm md:text-base leading-relaxed mb-6 md:mb-8">
               At Archizaid, we don't just build walls. We sculpt light and shadow to create spaces that breathe. 
               Blending Kerala’s heritage with futuristic minimalism.
             </p>
             <div className="flex justify-between items-end border-t border-black/10 pt-4">
                <div>
                  <span className="block font-manrope text-[10px] text-gray-500 uppercase tracking-widest">Architect</span>
                  <span className="block font-manrope text-sm font-bold text-[#1A1A1A]">Ar. Zaid</span>
                </div>
                <button className="group flex items-center gap-2">
                  <span className="font-manrope text-xs font-bold uppercase tracking-widest group-hover:text-[#BC4B32] transition-colors">Read Story</span>
                  <span className="w-8 h-[1px] bg-black group-hover:w-12 group-hover:bg-[#BC4B32] transition-all duration-300"></span>
                </button>
             </div>
          </div>
        </div>

      </div>

      {/* Decorative Lines */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-black/5 hidden md:block"></div>
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-black/5 hidden md:block"></div>
      <div className="absolute bottom-6 left-12 font-manrope text-[10px] text-black/30 rotate-180 hidden md:block" style={{ writingMode: 'vertical-rl' }}>
          EST. 2025 — ARCHIZAID STUDIO
      </div>

    </section>
  );
};

export default PhilosophySection;