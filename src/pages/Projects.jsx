import { useLayoutEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Minus, ArrowUpRight } from "lucide-react"; 
import { projects as originalProjects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Residential", "Commercial", "Interior", "Landscape"];

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
      
      gsap.set(cards, { opacity: 0, y: 50 });

      gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1, 
          ease: "power3.out", 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
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
                    Built <span className="italic text-[#666666] font-light">Works</span>
                </h1>
            </div>
            <div className="flex items-center gap-2 md:block md:text-right">
                <span className="text-[#1A1A1A] font-mono text-lg md:text-xl block leading-none">
                    {filteredProjects.length.toString().padStart(2, '0')}
                </span>
                <span className="text-[#666666] text-[10px] md:text-xs uppercase tracking-widest">
                    Archive List
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

      {/* MASONRY LAYOUT WITH BORDER ANIMATION */}
      <section className="relative z-10 px-6 md:px-12 py-12 md:py-20 max-w-[1920px] mx-auto">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
  {filteredProjects.map((project) => (
    <div
      key={project.id}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="project-card group relative cursor-pointer flex flex-col"
    >
      {/* Image Container */}
      <div className="w-full h-auto overflow-hidden bg-[#EAE8E4] rounded-sm relative">

        {/* Animated Border Lines */}
        <span className="absolute top-0 left-0 h-[2px] w-0 bg-[#BC4B32] z-20 transition-all duration-300 group-hover:w-full" />
        <span className="absolute top-0 right-0 w-[2px] h-0 bg-[#BC4B32] z-20 transition-all duration-300 delay-150 group-hover:h-full" />
        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#BC4B32] z-20 transition-all duration-300 delay-300 group-hover:w-full" />
        <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-[#BC4B32] z-20 transition-all duration-300 delay-[450ms] group-hover:h-full" />

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto block transition-transform duration-1000 ease-out"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-[#1A1A1A] shadow-sm translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-30">
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* Meta */}
      <div className="mt-5 flex justify-between items-start">
        <div className="max-w-[85%]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#BC4B32]"></span>
            <span className="text-[#BC4B32] font-mono text-[9px] uppercase tracking-[0.3em]">
              {project.category}
            </span>
          </div>
          <h3 className="text-[#1A1A1A] font-serif text-2xl md:text-3xl leading-tight group-hover:text-[#BC4B32] transition-colors duration-500">
            {project.title || "Selected Works"}
          </h3>
        </div>
        <div className="pt-2">
          <span className="font-mono text-[10px] text-[#999]">
            // 0{project.id}
          </span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#E0E0E0] mt-6 origin-left scale-x-[0.2] group-hover:scale-x-100 group-hover:bg-[#BC4B32]/30 transition-all duration-700 ease-in-out" />
    </div>
  ))}
</div>


        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="w-full py-40 text-center border border-dashed border-[#E0E0E0]">
            <Minus size={24} className="text-[#666666] mx-auto mb-4" />
            <p className="text-[#666666] font-serif text-xl italic">No works found in this sector.</p>
            <button onClick={() => setActiveCategory("All")} className="mt-8 px-10 py-4 bg-[#1A1A1A] text-white hover:bg-[#BC4B32] transition-colors font-mono text-[10px] uppercase tracking-[0.2em]">
              Return to Full Archive
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;