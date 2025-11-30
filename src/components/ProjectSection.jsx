import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Malabar Courtyard",
    location: "Calicut",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    year: "2024"
  },
  {
    id: 2,
    title: "Skyline Villa",
    location: "Cochin",
    image: "/images/projects/p-2-2.jpeg", 
    year: "2023"
  },
  {
    id: 3,
    title: "Urban Retreat",
    location: "Trivandrum",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    year: "2024"
  },
  {
    id: 4,
    title: "The Stone House",
    location: "Wayanad",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
    year: "2025"
  },
];

const coverImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop";

const ModernHorizontalStack = () => {
  const wrapperRef = useRef(null);
  const portalRef = useRef(null);
  const coverImageRef = useRef(null); 
  const coverContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const overlayTextRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const panels = gsap.utils.toArray(".project-panel");
      const totalPanels = panels.length;

      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=450%", // Total scroll distance
          pin: true,     
          scrub: 1,      
          anticipatePin: 1
        }
      });

      // --- PHASE 1: PORTAL EXPANSION & UNBLUR ---
      tl.to(
        portalRef.current, 
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px", 
          ease: "power2.inOut",
          duration: 1
        }, 
        "start"
      )
      .to(
        coverImageRef.current,
        {
            filter: "blur(0px) grayscale(0%) brightness(100%)", // Clear filters
            scale: 1, 
            duration: 1,
            ease: "power2.out"
        },
        "start"
      )
      .to(
        overlayTextRef.current,
        { opacity: 0, scale: 1.2, duration: 0.5 }, 
        "start"
      )
      
      // --- PHASE 2: REVEAL SLIDER (Fade out cover) ---
      .to(coverContainerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut"
      }, "reveal")

      // --- PHASE 3: HORIZONTAL SLIDE ---
      .to(
        panels, 
        {
          xPercent: -100 * (totalPanels - 1),
          ease: "none",
          duration: 4, // Sliding duration relative to expansion
          onUpdate: function() {
             const totalProgress = this.progress(); 
             gsap.set(progressBarRef.current, { width: `${totalProgress * 100}%` });
          }
        }, 
        "slide"
      );

      // --- INTERNAL PARALLAX ---
      panels.forEach((panel) => {
        const img = panel.querySelector("img");
        if(img) {
            gsap.fromTo(img, 
                { scale: 1.2, xPercent: -10 }, 
                { 
                    xPercent: 10,
                    scale: 1.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "+=450%",
                        scrub: 1
                    }
                }
            );
        }
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative bg-[#111]"> 
      
      {/* Sticky Container */}
      <div className="h-screen w-full flex items-center justify-center overflow-hidden sticky top-0 bg-[#F0EFEA]">
        
        {/* --- THE PORTAL WINDOW --- */}
        {/* Mobile: w-[90vw], Desktop: w-[30vw] -> Expands to 100vw */}
        <div 
            ref={portalRef}
            className="w-[90vw] h-[65vh] lg:w-[30vw] lg:h-[70vh] bg-white overflow-hidden relative z-20 rounded-[30px] shadow-2xl origin-center"
        >
            
            {/* --- COVER LAYER (Sits on top of slider initially) --- */}
            <div ref={coverContainerRef} className="absolute inset-0 w-full h-full z-30 bg-black">
                {/* Image with Initial Blur & Filters */}
                <img 
                    ref={coverImageRef} 
                    src={coverImage} 
                    alt="Cover" 
                    className="w-full h-full object-cover scale-110"
                    style={{ filter: "blur(10px) grayscale(100%) brightness(50%)" }}
                />
                
                {/* Text Overlay */}
                <div 
                    ref={overlayTextRef}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center"
                >
                    <div className="w-12 h-[2px] bg-[#BC4B32] mb-6"></div>
                    <h3 className="font-manrope text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-4 drop-shadow-md">
                        Enter
                    </h3>
                    <h2 className="font-serif text-5xl md:text-6xl drop-shadow-lg">
                        Gallery
                    </h2>
                    <p className="font-manrope text-[10px] md:text-xs opacity-80 mt-4 tracking-widest uppercase">
                        Scroll to Explore
                    </p>
                </div>
            </div>

            {/* --- SLIDER CONTENT (Behind Cover) --- */}
            <div ref={sliderRef} className="flex h-full w-[400%] absolute top-0 left-0 z-10">
                {projects.map((project, index) => (
                <div key={project.id} className="project-panel w-[100vw] h-full flex relative shrink-0 overflow-hidden">
                    <div className="w-full h-full overflow-hidden relative group">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover origin-center" />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80"></div>

                        {/* Text Content */}
                        <div className="absolute bottom-16 left-8 md:bottom-24 md:left-20 z-20 text-white max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-5 py-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full text-xs md:text-sm font-bold uppercase tracking-widest text-white">
                                    {project.location}
                                </span>
                                <span className="text-sm md:text-base font-bold text-[#BC4B32]"> — {project.year}</span>
                            </div>
                            <h2 className="font-serif text-5xl md:text-8xl leading-[0.9] tracking-tight mix-blend-overlay opacity-90 drop-shadow-2xl">
                                {project.title}
                            </h2>
                        </div>

                        {/* Index Number */}
                        <div className="absolute top-1/2 right-6 md:right-32 -translate-y-1/2 z-20 pointer-events-none mix-blend-overlay opacity-50">
                            <h1 className="font-serif text-[25vw] leading-none text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.5)" }}>
                                0{index + 1}
                            </h1>
                        </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#1A1A1A]/10 z-50">
                <div ref={progressBarRef} className="absolute top-0 left-0 h-full bg-[#BC4B32]" style={{ width: '0%' }}></div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default ModernHorizontalStack;