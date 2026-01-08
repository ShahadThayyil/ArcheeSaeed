import React, { useEffect, useRef, useState } from "react";
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
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (imageWrapperRef.current) {
        setImgSize({
          w: imageWrapperRef.current.offsetWidth,
          h: imageWrapperRef.current.offsetHeight
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    const observer = new ResizeObserver(handleResize);
    if (imageWrapperRef.current) observer.observe(imageWrapperRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  // ----------------- GSAP ANIMATIONS -----------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // QuickTo setup
      xToLens.current = gsap.quickTo(lensRef.current, "x", { duration: 0.1, ease: "power3" });
      yToLens.current = gsap.quickTo(lensRef.current, "y", { duration: 0.1, ease: "power3" });
      xToImg.current = gsap.quickTo(innerImageRef.current, "x", { duration: 0.1, ease: "power3" });
      yToImg.current = gsap.quickTo(innerImageRef.current, "y", { duration: 0.1, ease: "power3" });

      // --- DESKTOP ONLY SCROLL ANIMATIONS ---
      mm.add("(min-width: 768px)", () => {
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
      });

      // --- MOBILE: Static Entrance (No Scroll Scrub) ---
      mm.add("(max-width: 767px)", () => {
        gsap.set(imageWrapperRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(glassCardRef.current, { y: 0 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ----------------- LENS LOGIC -----------------
  const handleMouseMove = (e) => {
    if (!imageWrapperRef.current || !lensRef.current) return;
    
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const lensSize = 100;

    xToLens.current(mouseX - lensSize);
    yToLens.current(mouseY - lensSize);
    xToImg.current(-(mouseX - lensSize));
    yToImg.current(-(mouseY - lensSize));
  };

  const handleInteractionStart = () => {
    gsap.to(lensRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
  };

  const handleInteractionEnd = () => {
    gsap.to(lensRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100vh] md:min-h-[120vh] bg-[#F0EFEA] overflow-hidden flex flex-col justify-center items-center py-12 md:py-20"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap');
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
        .sketch-filter { filter: grayscale(100%) contrast(110%) brightness(105%) sepia(10%); }
      `}</style>

      <div className="container mx-auto max-w-[95%] md:max-w-[90%] relative z-10 flex flex-col md:flex-row items-center md:items-start justify-center h-full">
        
        {/* --- IMAGE CANVAS --- */}
        <div className="w-full md:w-[65%] h-[50vh] md:h-[85vh] relative md:ml-auto">
          {/* INTERACTION INDICATOR */}
          <div className="absolute -top-8 left-0 z-30 flex items-center gap-2">
            <span className="w-2 h-2 md:hidden rounded-full bg-[#BC4B32] animate-pulse"></span>
            <span className="font-manrope text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-bold">
              {isMobile ? "Touch & Drag to reveal reality" : ""}
            </span>
          </div>

          <div 
            ref={imageWrapperRef} 
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseEnter={handleInteractionStart}
            onTouchStart={handleInteractionStart}
            onMouseLeave={handleInteractionEnd} 
            onTouchEnd={handleInteractionEnd}
            className="w-full h-full relative cursor-none overflow-hidden rounded-sm shadow-xl md:shadow-none bg-[#E0E0E0] group"
          >
            {/* 1. Base Layer: Sketch */}
            <img 
              loading="lazy"
              src="https://res.cloudinary.com/dmtzmgbkj/image/upload/f_webp/v1765554617/1_n83oyj.jpg"
              alt="Architectural Sketch"
              className="absolute inset-0 w-full h-full object-cover sketch-filter opacity-80 pointer-events-none"
            />

            <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none"></div>

            {/* 2. The Moving Lens */}
            <div 
                ref={lensRef}
                className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full border-[2px] border-white/50 shadow-[0_0_30px_rgba(0,0,0,0.4)] overflow-hidden z-20 opacity-0 scale-0 pointer-events-none bg-[#F0EFEA]"
            >
                <div 
                    ref={innerImageRef}
                    className="absolute top-0 left-0"
                    style={{ width: imgSize.w, height: imgSize.h }}
                > 
                    <img 
                        src="https://res.cloudinary.com/dmtzmgbkj/image/upload/f_webp/v1765554617/1_n83oyj.jpg" 
                        loading="lazy"
                        alt="Real Construction" 
                        className="w-full h-full object-cover" 
                    /> 
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-40 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* --- PHILOSOPHY CARD --- */}
        <div ref={glassCardRef} className="w-[92%] md:w-[450px] relative -mt-16 md:mt-0 md:absolute md:left-[5%] md:bottom-[15%] z-20">
          <div className="relative p-8 md:p-10 backdrop-blur-3xl bg-white/80 md:bg-white/60 border border-white/50 shadow-2xl rounded-sm">
             <div className="w-12 h-[2px] bg-[#BC4B32] mb-6"></div>
             <h2 className="font-serif-display text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-4 md:mb-6">
                Our <br/> <span className="italic font-light text-[#BC4B32]">Philosophy.</span>
             </h2>
             <p className="font-manrope text-[#2C3639] text-sm md:text-base leading-relaxed mb-6 md:mb-8 font-medium">
               Architecture is the bridge between human aspiration and the physical world. At Archizaid, we treat every line as a dialogue between 
               site context and structural poetry.
             </p>
             <p className="font-manrope text-[#444] text-[12px] md:text-sm leading-relaxed mb-8 opacity-80">
               We don't just build enclosures; we curate light, shadow, and materiality to foster environments that resonate with the Earth-Tech aesthetic.
             </p>
             <div className="flex justify-between items-end border-t border-black/10 pt-6">
                <div>
                  <span className="block font-manrope text-[10px] text-gray-500 uppercase tracking-widest mb-1">Lead Architect</span>
                  <span className="block font-manrope text-sm font-extrabold text-[#1A1A1A] tracking-tight">Mohammmed Saeed</span>
                </div>
                <button className="group flex items-center gap-2">
                  <span className="font-manrope text-[10px] font-bold uppercase tracking-widest group-hover:text-[#BC4B32] transition-colors">Manifesto</span>
                  <span className="w-6 h-[1px] bg-black group-hover:w-10 group-hover:bg-[#BC4B32] transition-all duration-300"></span>
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute bottom-6 left-8 font-manrope text-[9px] text-black/30 rotate-180 hidden md:block" style={{ writingMode: 'vertical-rl' }}>
          ARCHIZAID • CONCEPTUAL INTEGRITY • 2026
      </div>
    </section>
  );
};

export default PhilosophySection;