import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    // 1. MAIN HERO TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%", 
        scrub: 1, 
        pin: true, 
        anticipatePin: 1,
      },
    });

    // Step A: Zoom In Text
    tl.to(textRef.current, {
      scale: 100, 
      duration: 5, 
      ease: "power2.inOut",
    })
    
    // Step B: Fade Out "ARCHIZAID" Text & Background
    .to(textRef.current, {
      opacity: 0, 
      duration: 1,
    }, "-=1")
    
    // Step C: Fade In Overlay HUD
    .to(overlayRef.current, {
      opacity: 1, 
      duration: 1,
    }, "<");

  }, { scope: containerRef });


  // 2. NEXT SECTION PARALLAX ENTRY
  useGSAP(() => {
    gsap.fromTo(contentRef.current, 
      { y: 150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        }
      }
    );
  }, { scope: contentRef });

  return (
    // THEME BACKGROUND
    <div className="relative bg-[#F8F7F5]">
      
      {/* 1. HERO PINNED CONTAINER */}
      <div 
        ref={containerRef} 
        className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#F8F7F5]"
      >
        
        {/* A. VIDEO LAYER */}
        <div ref={videoRef} className="absolute inset-0 z-0 w-full h-full">
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
          >
            {/* Keeping your video */}
            <source src="/video.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-black/20"></div>

          {/* --- ARCHITECTURAL HUD OVERLAY (Initially Hidden) --- */}
          <div 
            ref={overlayRef}
            className="absolute inset-0 z-10 p-6 md:p-12 flex flex-col justify-between pointer-events-none opacity-0"
          >
              {/* Top Row */}
              <div className="flex justify-between items-start opacity-70">
                  <div className="font-mono text-white text-[10px] tracking-[0.2em] leading-loose">
                      CAM_01 <br/> 
                      REC <span className="text-red-500 animate-pulse">●</span>
                  </div>
                  <div className="font-mono text-white text-[10px] tracking-[0.2em] text-right leading-loose">
                      ISO 800 <br/> 
                      4K RAW
                  </div>
              </div>

              {/* Center Element */}
              <div className="flex items-center justify-center">
                  <div className="text-center">
                      <p className="text-white/80 font-light text-xs md:text-sm tracking-[0.6em] uppercase mb-2">
                          Kerala • Modernist
                      </p>
                      <div className="h-[1px] w-12 bg-white/50 mx-auto"></div>
                  </div>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-end opacity-70">
                  <div className="flex items-center gap-4">
                      <div className="h-[1px] w-12 bg-white/50"></div>
                      <div className="font-mono text-white text-[10px] tracking-[0.2em]">
                          ELEVATION: +45m
                      </div>
                  </div>
                  <div className="font-mono text-white text-[10px] tracking-[0.2em]">
                      10.85°N / 76.27°E
                  </div>
              </div>
          </div>
          {/* --- END OVERLAY --- */}

        </div>

        {/* B. MASK LAYER (CLEAN ARCHITECTURAL BACKGROUND) */}
        <div 
          ref={textRef} 
          className="relative z-10 w-full h-full flex items-center justify-center bg-[#F8F7F5] mix-blend-screen origin-center overflow-hidden"
        >
            
            {/* --- 1. CLEAN GRID (AutoCAD Style) --- */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/* Small Grid Unit */}
                    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1A1A1A" strokeWidth="0.5"/>
                    </pattern>
                    {/* Large Grid Block (100x100) */}
                    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                        <rect width="100" height="100" fill="url(#smallGrid)"/>
                        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1A1A1A" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* --- 2. TECHNICAL MARKERS (Clean Lines) --- */}
            {/* Left Vertical Ruler */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-[#1A1A1A] opacity-20 hidden md:block">
                <div className="absolute top-0 left-[-4px] w-3 h-[1px] bg-[#1A1A1A]"></div>
                <div className="absolute bottom-0 left-[-4px] w-3 h-[1px] bg-[#1A1A1A]"></div>
                <div className="absolute top-1/2 left-[-8px] w-5 h-[1px] bg-[#1A1A1A]"></div>
            </div>
            
            {/* Right Vertical Ruler */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-[#1A1A1A] opacity-20 hidden md:block">
                <div className="absolute top-0 right-[-4px] w-3 h-[1px] bg-[#1A1A1A]"></div>
                <div className="absolute bottom-0 right-[-4px] w-3 h-[1px] bg-[#1A1A1A]"></div>
                <div className="absolute top-1/2 right-[-8px] w-5 h-[1px] bg-[#1A1A1A]"></div>
            </div>

            {/* --- MAIN TEXT --- */}
            <h1 className="relative z-20 w-full text-[14vw] md:text-[12vw] font-black text-black leading-none tracking-tighter text-center uppercase select-none px-4 md:px-12">
              ARCHIZAID
            </h1>
        </div>

     

      </div>

     
    </div>
  );
}