import { useLayoutEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Navigation വേണ്ടി ചേർത്തു
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Minus, ArrowUpRight } from "lucide-react"; 
import { projects as originalProjects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Residential", "Commercial", "Interior", "Landscape"];

const getGridClass = (index) => {
  const pattern = [
    "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2", 
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
    "md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2", 
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
    "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", 
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
  ];
  return pattern[index % pattern.length];
};

const Projects = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate(); // Navigation hook
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return originalProjects;
    return originalProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // --- GRID ANIMATION ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      const cards = gsap.utils.toArray(".project-card");
      
      gsap.set(cards, { opacity: 0, y: 100 });

      gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08, 
          ease: "power4.out", 
          overwrite: "auto",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#F8F7F5] selection:bg-[#BC4B32] selection:text-white">
      {/* BACKGROUND GRID */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ 
            backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />

      {/* HEADER */}
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

      {/* BENTO GRID */}
      <section className="relative z-10 px-4 md:px-12 py-8 md:py-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-dense">
          
          {filteredProjects.map((project, index) => {
            const gridClass = getGridClass(index);

            return (
              <div
                key={project.id}
                // Navigate to dynamic details page instead of popup
                onClick={() => navigate(`/projects/${project.id}`)} 
                className={`
                    project-card group relative bg-[#E0E0E0] overflow-hidden cursor-pointer
                    border border-transparent hover:border-[#BC4B32] transition-colors duration-500
                    aspect-square md:aspect-auto
                    ${gridClass}
                `}
                style={{ minHeight: '300px' }} 
              >
                {/* Image */}
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle Gradient only at the bottom for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-60 transition-opacity duration-300" />
                </div>

                {/* Project Title Overlay (Optional but recommended) */}
                <div className="absolute bottom-6 left-6 z-20">
                    <p className="text-white font-serif text-lg md:text-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        {project.title}
                    </p>
                </div>

                {/* Top Right Arrow */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20">
                        <ArrowUpRight size={16} />
                    </div>
                </div>
              </div>
            );
          })}

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
    </div>
  );
};

export default Projects;