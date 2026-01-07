import { useLayoutEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Minus, ArrowUpRight } from "lucide-react"; 
import { projects as originalProjects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Residential", "Commercial", "Interior", "Landscape"];

// Updated pattern to handle different image orientations better
const getGridClass = (index) => {
  const pattern = [
    "md:col-span-2 md:row-span-2", // Big feature
    "md:col-span-1 md:row-span-1", // Standard
    "md:col-span-1 md:row-span-2", // Vertical/Portrait focus
    "md:col-span-2 md:row-span-1", // Horizontal/Landscape focus
    "md:col-span-1 md:row-span-1", // Standard
    "md:col-span-1 md:row-span-1", // Standard
  ];
  return pattern[index % pattern.length];
};

const Projects = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return originalProjects;
    return originalProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      const cards = gsap.utils.toArray(".project-card");
      
      gsap.set(cards, { opacity: 0, y: 60 });

      gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1, 
          ease: "expo.out", 
          overwrite: "auto",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#F8F7F5] selection:bg-[#BC4B32] selection:text-white overflow-x-hidden">
      {/* BACKGROUND GRID */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ 
            backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />

      {/* HEADER */}
      <header className="pt-24 md:pt-32 pb-8 md:pb-10 px-6 md:px-12 max-w-[1920px] mx-auto border-b border-[#E0E0E0]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div>
                <span className="text-[#BC4B32] font-mono text-[10px] md:text-xs tracking-widest uppercase block mb-2">
                    // Project Index
                </span>
                <h1 className="text-[#1A1A1A] font-serif text-4xl sm:text-5xl md:text-7xl leading-[0.9]">
                    My <span className="italic text-[#666666] font-light">Projects</span>
                </h1>
            </div>
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

      {/* CATEGORY BAR */}
      <div className="sticky top-0 z-40 bg-[#F8F7F5]/95 backdrop-blur-md border-b border-[#E0E0E0]">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-4"> 
            <div className="flex flex-wrap justify-start gap-x-8 gap-y-3">
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

      {/* BENTO GRID - Fixed for image visibility */}
      <section className="relative z-10 px-6 md:px-12 py-8 md:py-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 grid-flow-dense">
          
          {filteredProjects.map((project, index) => {
            const gridClass = getGridClass(index);

            return (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)} 
                className={`
                    project-card group relative bg-[#EAE8E4] overflow-hidden cursor-pointer
                    border border-transparent hover:border-[#BC4B32]/30 transition-all duration-500
                    flex flex-col
                    ${gridClass}
                `}
                style={{ minHeight: '350px' }} 
              >
                {/* Image Container - Adjusted to ensure visibility */}
                <div className="flex-grow w-full h-full relative overflow-hidden bg-[#D1D1D1]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out "
                    loading="lazy"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-end">
                        <div className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                    
                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-[#BC4B32] font-mono text-[9px] uppercase tracking-[0.3em] block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {project.category}
                        </span>
                        <h3 className="text-white font-serif text-xl md:text-2xl leading-tight">
                            {project.title || "Untitled Project"}
                        </h3>
                    </div>
                </div>
              </div>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-32 text-center border border-dashed border-[#E0E0E0]">
              <div className="inline-block p-4 bg-[#E0E0E0] mb-4">
                  <Minus size={24} className="text-[#666666]" />
              </div>
              <p className="text-[#666666] font-serif text-xl">No projects found in this sector.</p>
              <button onClick={() => setActiveCategory("All")} className="mt-6 px-8 py-3 bg-[#1A1A1A] text-white hover:bg-[#BC4B32] transition-colors font-mono text-xs uppercase tracking-[0.2em]">
                View All Works
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;