import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projectsHome";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const coverImage = "https://res.cloudinary.com/dmtzmgbkj/image/upload/f_webp/v1765555470/F_CMPR_aqveqy.png";

// --- INTERNAL MODERN BUTTON COMPONENT ---
const ProjectButton = ({ isMobile = false }) => (
  <Link 
    to="/projects" 
    className={`group relative flex items-center justify-center gap-4 overflow-hidden rounded-sm border border-[#1A1A1A]/10 bg-transparent transition-all duration-500 hover:border-[#BC4B32]
      ${isMobile ? "w-full py-6 mt-10" : "px-12 py-6"}
    `}
  >
    {/* Liquid Fill Hover Effect */}
    <div className="absolute inset-0 z-0 h-full w-0 bg-[#BC4B32] transition-all duration-500 ease-out group-hover:w-full"></div>

    {/* Button Text */}
    <span className="relative z-10 font-manrope text-[10px] lg:text-xs font-bold uppercase tracking-[0.4em] text-[#1A1A1A] transition-colors duration-500 group-hover:text-white">
      View All Projects
    </span>

    {/* Architectural Arrow Icon */}
    <svg 
      width="18" height="18" viewBox="0 0 20 20" fill="none" 
      className="relative z-10 transition-all duration-500 group-hover:translate-x-2 group-hover:stroke-white stroke-[#1A1A1A]"
    >
      <path d="M4.16663 10H15.8333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.8333 5L15.8333 10L10.8333 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Link>
);

const ModernHorizontalStack = () => {
  const wrapperRef = useRef(null);
  const portalRef = useRef(null);
  const coverImageRef = useRef(null);
  const coverContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const overlayTextRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const panels = gsap.utils.toArray(".project-panel");
      const totalPanels = panels.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=500%", 
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      tl.to(portalRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        ease: "power2.inOut",
        duration: 1
      }, "start")
      .to(coverImageRef.current, {
        filter: "blur(0px) grayscale(0%) brightness(100%)",
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "start")
      .to(overlayTextRef.current, { opacity: 0, scale: 1.2, duration: 0.5 }, "start")
      .to(coverContainerRef.current, {
        opacity: 0,
        pointerEvents: "none", // FIX: Allow clicks to pass through after fade
        duration: 0.5,
        ease: "power1.inOut"
      }, "reveal")
      .to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        duration: 4,
        onUpdate: function() {
          gsap.set(progressBarRef.current, { width: `${this.progress() * 100}%` });
        }
      }, "slide");

      panels.forEach((panel) => {
        const img = panel.querySelector(".parallax-img");
        if(img) {
          gsap.fromTo(img, 
            { scale: 1.2, xPercent: -10 }, 
            { 
              xPercent: 10, scale: 1.2, ease: "none",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "+=500%",
                scrub: 1
              }
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative bg-[#111]">
      
      {/* --- DESKTOP VIEW (Sticky Portal) --- */}
      <div className="hidden lg:flex h-screen w-full items-center justify-center overflow-hidden sticky top-0 bg-[#F0EFEA]">
        <div ref={portalRef} className="w-[30vw] h-[70vh] bg-white overflow-hidden relative z-20 rounded-[30px] shadow-2xl origin-center">
          
          {/* Cover Layer */}
          <div ref={coverContainerRef} className="absolute inset-0 w-full h-full z-30 bg-black">
            <img ref={coverImageRef} src={coverImage} alt="Cover" className="w-full h-full object-cover scale-110" style={{ filter: "blur(10px) grayscale(100%) brightness(50%)" }} />
            <div ref={overlayTextRef} className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="w-12 h-[2px] bg-[#BC4B32] mb-6"></div>
              <h3 className="font-manrope text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-4 text-white">Enter</h3>
              <h2 className="font-serif text-5xl md:text-6xl text-white">Gallery</h2>
              <p className="font-manrope text-[10px] md:text-xs opacity-80 mt-4 tracking-widest uppercase text-white">Scroll to Explore</p>
            </div>
          </div>

          {/* Desktop Slider - FIX: Removed pointer-events-none */}
          <div ref={sliderRef} className="flex h-full absolute top-0 left-0 z-10" style={{ width: `${(projects.length + 1) * 100}vw` }}>
            {projects.map((project) => (
              <div key={project.id} className="project-panel w-[100vw] h-full flex relative shrink-0 overflow-hidden">
                <div className="w-full h-full overflow-hidden relative group">
                  <img src={project.image} alt={project.title} className="parallax-img w-full h-full object-cover origin-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80"></div>
                  <div className="absolute bottom-24 left-20 z-20 text-white max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-5 py-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold uppercase tracking-widest text-white">{project.location}</span>
                      <span className="text-base font-bold text-[#BC4B32]"> — {project.year}</span>
                    </div>
                    <h2 className="font-serif text-4xl leading-[0.9] tracking-tight opacity-90 text-white">{project.title}</h2>
                  </div>
                </div>
              </div>
            ))}

            {/* --- DESKTOP END BUTTON PANEL --- */}
            <div className="project-panel w-[100vw] h-full flex items-center justify-center bg-[#F0EFEA] shrink-0">
               <div className="flex flex-col items-center gap-8">
                  <div className="w-16 h-[2px] bg-[#BC4B32]"></div>
                  <ProjectButton />
               </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#1A1A1A]/10 z-50">
            <div ref={progressBarRef} className="absolute top-0 left-0 h-full bg-[#BC4B32]" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW: VERTICAL ARCHITECTURAL GALLERY --- */}
      <div className="lg:hidden flex flex-col bg-[#F0EFEA] px-6 py-20 gap-16">
        <div className="max-w-7xl">
            <div className="w-10 h-[2px] bg-[#BC4B32] mb-4"></div>
            <h4 className="font-manrope text-[10px] font-bold text-[#666666] uppercase tracking-[0.4em] mb-2">Our Portfolio</h4>
            <h2 className="font-serif text-4xl text-[#1A1A1A] leading-tight font-medium">Featured <br/><span className="italic text-[#BC4B32]">Architectural</span> Gallery.</h2>
        </div>

        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group relative w-full overflow-hidden rounded-2xl shadow-lg border border-[#1A1A1A]/5">
                <div className="aspect-[4/5] w-full">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-6 left-6 text-white pr-6">
                    <p className="font-manrope text-[10px] font-bold uppercase tracking-widest text-[#BC4B32] mb-2">{project.location} — {project.year}</p>
                    <h3 className="font-serif text-2xl leading-tight text-white">{project.title}</h3>
                </div>
            </div>
          ))}
        </div>

        <div className="w-full">
            <ProjectButton isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default ModernHorizontalStack;