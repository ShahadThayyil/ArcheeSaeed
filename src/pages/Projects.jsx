import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
// Replace with your actual import
import { projects as originalProjects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Residential", "Commercial", "Interior", "Landscape"];

// --- ARCHITECTURAL GRID LOGIC ---
// Kept your existing pattern but ensured it only kicks in at 'md' breakpoint
const getGridClass = (index) => {
  const pattern = [
    "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2", // 0: Large Square (Hero)
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // 1: Standard
    "md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2", // 2: Tall Vertical
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // 3: Standard
    "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", // 4: Wide Horizontal
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // 5: Standard
  ];
  return pattern[index % pattern.length];
};

const Projects = () => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return originalProjects;
    return originalProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      const cards = gsap.utils.toArray(".project-card");
      
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          overwrite: true, // Prevents conflicts during rapid filtering
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F8F7F5] selection:bg-[#BC4B32] selection:text-white"
    >
      {/* --- TECHNICAL BACKGROUND GRID --- */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ 
            backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />

      {/* --- HEADER --- */}
      {/* Adjusted padding and text size for mobile responsiveness */}
      <header className="pt-24 md:pt-32 pb-8 md:pb-10 px-4 md:px-12 max-w-[1920px] mx-auto border-b border-[#E0E0E0]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div>
                <span className="text-[#BC4B32] font-mono text-[10px] md:text-xs tracking-widest uppercase block mb-2">
                    // Project Index
                </span>
                <h1 className="text-[#1A1A1A] font-serif text-4xl sm:text-5xl md:text-7xl leading-[0.9]">
                    Built <span className="italic text-[#666666] font-light">Environment</span>
                </h1>
            </div>
            
            {/* Total Count Display - Visible on Desktop, simplified for mobile */}
            <div className="flex items-center gap-2 md:block md:text-right">
                <span className="text-[#1A1A1A] font-mono text-lg md:text-xl block">
                    {filteredProjects.length.toString().padStart(2, '0')}
                </span>
                <span className="text-[#666666] text-[10px] md:text-xs uppercase tracking-widest">
                    Projects Displayed
                </span>
            </div>
        </div>
      </header>

      {/* --- RESPONSIVE CATEGORY BAR --- */}
      <div className="sticky top-0 z-40 bg-[#F8F7F5]/95 backdrop-blur-md border-b border-[#E0E0E0]">
        <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-4"> 
            <div className="flex flex-wrap justify-start gap-x-6 gap-y-3">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                            relative text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 pb-1
                            active:scale-95 origin-left
                            ${activeCategory === cat ? "text-[#BC4B32]" : "text-[#666666] hover:text-[#1A1A1A]"}
                        `}
                    >
                        {cat}
                        <span className={`
                            absolute bottom-[-2px] left-0 h-[2px] bg-[#BC4B32] transition-all duration-300
                            ${activeCategory === cat ? "w-full" : "w-0"}
                        `} />
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* --- ARCHITECTURAL BENTO GRID --- */}
      <section className="relative z-10 px-4 md:px-12 py-8 md:py-12 max-w-[1920px] mx-auto">
        {/* Mobile: 1 Col | Tablet: 2 Col | Desktop: 4 Col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-dense">
          
          {filteredProjects.map((project, index) => {
            const gridClass = getGridClass(index);

            return (
              <div
                key={project.id}
                className={`
                    project-card group relative bg-[#E0E0E0] overflow-hidden cursor-pointer
                    border border-transparent hover:border-[#BC4B32] transition-colors duration-500
                    /* Mobile: Square aspect ratio is cleaner. Desktop: Auto based on grid */
                    aspect-square md:aspect-auto
                    ${gridClass}
                `}
                style={{ minHeight: '300px' }} // Ensures cards aren't too small on any screen
              >
                {/* 1. IMAGE LAYER */}
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Darker overlay on mobile to ensure text pop */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/30 md:bg-[#1A1A1A]/20 group-hover:bg-[#1A1A1A]/40 transition-colors duration-500" />
                </div>

                {/* 2. CORNER MARKERS */}
                <div className="absolute top-4 left-4 text-white/50 group-hover:opacity-0 transition-opacity duration-300">
                    <Plus size={12} strokeWidth={3} />
                </div>
                <div className="absolute bottom-4 right-4 text-white/50 group-hover:opacity-0 transition-opacity duration-300">
                    <Plus size={12} strokeWidth={3} />
                </div>

                {/* 3. DESKTOP HOVER OVERLAY (Slide Up) */}
                <div className="
                    hidden md:block
                    absolute inset-x-4 bottom-4 top-auto
                    z-20 p-6
                    bg-[#1A1A1A]/90 backdrop-blur-xl saturate-150
                    border border-white/5 group-hover:border-white/20
                    border-t-white/10 group-hover:border-t-white/40
                    shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]
                    translate-y-[120%] group-hover:translate-y-0
                    transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1)
                ">
                    <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#BC4B32] transition-all duration-700 ease-out delay-100"></div>
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <span className="text-[#BC4B32] font-mono text-[10px] uppercase tracking-widest">
                                {project.category || "ARCH"}
                            </span>
                            <h3 className="text-[#F8F7F5] font-serif text-xl leading-none">
                                {project.title}
                            </h3>
                            <p className="text-white/60 text-[10px] mt-1 uppercase tracking-wider font-mono">
                                {project.location} • {project.year || "2027"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. MOBILE / IDLE STATE CARD (Visible on Mobile) */}
                {/* On desktop, this fades out on hover. On mobile, it stays. */}
                <div className="absolute bottom-4 left-4 z-10 group-hover:opacity-0 transition-opacity duration-300 delay-75 max-w-[85%]">
                    <div className="
                        bg-[#1A1A1A]/80 backdrop-blur-md 
                        border border-white/10 
                        px-4 py-3
                        shadow-lg
                    ">
                        <h3 className="text-white font-serif text-lg leading-none tracking-wide">
                            {project.title}
                        </h3>
                        {/* Location visible on mobile for context */}
                        <p className="md:hidden text-[#BC4B32] text-[10px] font-mono uppercase mt-1 tracking-wider">
                            {project.location}
                        </p>
                    </div>
                </div>

              </div>
            );
          })}

          {/* EMPTY STATE */}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-24 md:py-32 text-center border border-dashed border-[#E0E0E0] mx-4 md:mx-0">
              <div className="inline-block p-4 bg-[#E0E0E0] mb-4">
                  <Minus size={24} className="text-[#666666]" />
              </div>
              <p className="text-[#666666] font-serif text-lg md:text-xl">No projects in this sector.</p>
              <button onClick={() => setActiveCategory("All")} className="mt-6 px-6 py-2 bg-[#1A1A1A] text-white hover:bg-[#BC4B32] transition-colors font-mono text-xs uppercase tracking-widest">
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="border-t border-[#E0E0E0] bg-[#F8F7F5] py-16 md:py-24 px-6 md:px-12 text-center">
          <h2 className="text-[#1A1A1A] font-serif text-3xl md:text-6xl mb-6 md:mb-8">
              Have a vision?
          </h2>
          <button className="group relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#1A1A1A] hover:bg-[#BC4B32] transition-colors duration-300 rounded-none">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#BC4B32] rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span className="relative uppercase tracking-widest text-[10px] md:text-xs">Start Discussion</span>
          </button>
      </section>
    </div>
  );
};

export default Projects;