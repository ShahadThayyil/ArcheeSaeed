import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const scrollIndicatorRef = useRef(null); // Ref for scroll indicator
  
  // Mobile specific refs
  const mobileHeroRef = useRef(null);
  const mobileImageRef = useRef(null);

  const desktopVideo = "https://res.cloudinary.com/dmtzmgbkj/video/upload/11_r1mhql.mp4";
  // Premium architectural stock image for mobile
  const mobileStockImage = "https://res.cloudinary.com/dmtzmgbkj/image/upload/f_webp/v1767510730/mobile-hero_ljefwl.png"; 

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // ---------------------------------------------------------
    // DESKTOP: Original Pinning and Zoom Animation
    // ---------------------------------------------------------
    mm.add("(min-width: 768px)", () => {
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

      tl.to(textRef.current, {
        scale: 100,
        duration: 5,
        ease: "power2.inOut",
      })
      // Fade out scroll indicator as we zoom in
      .to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
      }, 0) 
      .to(textRef.current, {
        opacity: 0,
        duration: 1,
      }, "-=1")
      .to(overlayRef.current, {
        opacity: 1,
        duration: 1,
      }, "<");
    });

    // ---------------------------------------------------------
    // MOBILE: Clean Static Architectural Layout
    // ---------------------------------------------------------
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline();

      tl.fromTo(mobileImageRef.current, 
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" }
      )
      .from(".mobile-fade-up", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.6")
      .from(".scute-accent", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "expo.out"
      }, "-=0.4");
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-[#F8F7F5] overflow-hidden">
      
      {/* 1. DESKTOP VIEWPORT */}
      {!isMobile && (
        <div className="relative h-screen w-full flex items-center justify-center">
          <div ref={videoRef} className="absolute inset-0 z-0 w-full h-full">
            <video
              src={desktopVideo}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Desktop HUD Overlay */}
            <div ref={overlayRef} className="absolute inset-0 z-30 p-12 flex flex-col justify-between pointer-events-none opacity-0">
                <div className="flex justify-between items-start opacity-70">
                    <div className="font-mono text-white text-[9px] tracking-[0.2em] leading-loose">
                        PROJECT_V.01 <br/> STATUS: ACTIVE <span className="text-red-500 animate-pulse">●</span>
                    </div>
                    <div className="font-mono text-white text-[9px] tracking-[0.2em] text-right leading-loose">
                        KERALA, IN <br/> 2025-2028
                    </div>
                </div>
                <div className="flex justify-between items-end opacity-70 text-white">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-white/50"></div>
                        <div className="font-mono text-[9px] tracking-[0.2em]">ARCHIZAID</div>
                    </div>
                    <div className="font-mono text-[9px] tracking-[0.2em]">ARCHITECTURE • DESIGN</div>
                </div>
            </div>
          </div>

          {/* Desktop Mask Layer */}
          <div ref={textRef} className="relative z-10 w-full h-full flex items-center justify-center bg-[#F8F7F5] mix-blend-screen origin-center overflow-hidden">
             <h1 className="text-[12vw] font-black text-black leading-none tracking-tighter text-center uppercase select-none">
                ARCHIZAID
             </h1>
          </div>

          {/* --- SCROLL INDICATOR (Desktop Only) --- */}
          <div 
            ref={scrollIndicatorRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 pointer-events-none"
          >
             <span className="font-mono text-[14px] tracking-[0.5em] uppercase text-[#BC4B32]">Scroll To Explore</span>
             <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#BC4B32] -translate-y-full animate-[scroll-reveal_2s_ease-in-out_infinite]"></div>
             </div>
          </div>

          <style>{`
            @keyframes scroll-reveal {
              0% { transform: translateY(-100%); }
              50% { transform: translateY(0%); }
              100% { transform: translateY(100%); }
            }
          `}</style>
        </div>
      )}

      {/* 2. MOBILE VIEWPORT */}
      {isMobile && (
        <div className="min-h-screen w-full flex flex-col bg-[#F2F0ED] px-6 pt-24 pb-20">
          <div className="mb-10">
            <h1 className="mobile-fade-up text-[16vw] font-black text-[#2C3639] leading-[0.85] tracking-tighter uppercase">
              ARCHI
            </h1>
            <div className="flex items-center gap-4">
               <div className="scute-accent h-[2px] flex-grow bg-[#BC4B32]"></div>
               <h1 className="mobile-fade-up text-[16vw] font-black text-[#BC4B32] leading-[0.85] tracking-tighter uppercase">
                 ZAID
               </h1>
            </div>
          </div>

          <div ref={mobileImageRef} className="relative w-full aspect-[4/5] overflow-hidden rounded-sm mb-10 shadow-2xl">
            <img 
              src={mobileStockImage} 
              alt="Modern Architecture" 
              className="w-full h-full object-cover grayscale-[30%]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
               <p className="text-white font-mono text-[8px] tracking-[0.2em] uppercase bg-black/20 backdrop-blur-md p-2">
                 Ref. Concrete_Minimalism
               </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="mobile-fade-up col-span-2 border-l-2 border-[#BC4B32] pl-4 mb-2">
              <p className="text-[14px] leading-relaxed text-[#2C3639] font-semibold uppercase tracking-tight">
                Defining the silhouette of modern living through contextual and sustainable architecture.
              </p>
              <p className="text-[12px] leading-relaxed text-[#2C3639]/70 mt-2">
                At Archizaid, we believe that space should not only be functional but should tell a story of the people who inhabit it.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isMobile && <div ref={contentRef} className="h-10"></div>}
    </div>
  );
}