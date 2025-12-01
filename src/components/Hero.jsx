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
  
  // New Ref for the Video Overlay Text
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
    // Step B: Fade Out "ARCHIZAID" Text (Happens near end of zoom)
    .to(textRef.current, {
      opacity: 0, 
      duration: 1,
    }, "-=1")
    
    // Step C: Fade In Overlay Text (Happens AFTER text is gone)
    .to(overlayRef.current, {
      opacity: 1, // Make it visible
      duration: 1,
    });

  }, { scope: containerRef });


  // 2. NEXT SECTION PARALLAX ENTRY
  useGSAP(() => {
    gsap.fromTo(contentRef.current, 
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=10%",
          end: "top center",
          scrub: 1,
        }
      }
    );
  }, { scope: contentRef });

  return (
    <div className="relative bg-[#F8F7F5]">
      
      {/* CSS FOR SHADOW ANIMATION */}
      <style>{`
        @keyframes sway-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 30px) rotate(2deg); }
        }
        @keyframes sway-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 10px) scale(1.1); }
        }
        .shadow-blob {
          filter: blur(80px);
          background-color: #1A1A1A;
          opacity: 0.08;
          position: absolute;
          border-radius: 50%;
        }
      `}</style>

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
            <source src="/video.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-black/20"></div>

          {/* --- ARCHITECTURAL HUD OVERLAY (Initially Hidden) --- */}
          {/* Added ref={overlayRef} and opacity-0 */}
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

        {/* B. MASK LAYER */}
        <div 
          ref={textRef} 
          className="relative z-10 w-full h-full flex items-center justify-center bg-[#F8F7F5] mix-blend-screen origin-center overflow-hidden px-4 md:px-12 lg:px-24"
        >
            
            {/* 1. WALL TEXTURE */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply z-0"
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* 2. SHADOWS */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="shadow-blob w-[60vw] h-[60vw] top-[-20%] left-[-10%]" 
                     style={{ animation: 'sway-slow 15s ease-in-out infinite' }}></div>
                <div className="shadow-blob w-[50vw] h-[50vw] bottom-[-10%] right-[-10%]"
                     style={{ animation: 'sway-medium 20s ease-in-out infinite reverse' }}></div>
                <div className="shadow-blob w-[40vw] h-[40vw] top-[20%] left-[30%] opacity-[0.05]"
                     style={{ animation: 'sway-slow 25s ease-in-out infinite' }}></div>
            </div>
            
            {/* MAIN TEXT */}
            <h1 className="relative z-20 w-full text-[14vw] md:text-[12vw] font-black text-black leading-none tracking-tighter text-center uppercase select-none">
              ARCHIZAID
            </h1>
        </div>

        {/* C. SCROLL HINT */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 mix-blend-multiply opacity-60">
            <span className="text-xs font-bold tracking-[0.3em] text-[#1A1A1A] uppercase">Scroll to Enter</span>
            <div className="w-[1px] h-10 bg-[#1A1A1A] animate-bounce"></div>
        </div>

      </div>

     

    </div>
  );
}