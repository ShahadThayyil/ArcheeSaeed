import { useLayoutEffect, useRef, useState, useMemo, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, X, MapPin } from "lucide-react"; 
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null); 

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

  // --- POPUP ANIMATION ---
  useEffect(() => {
    if (selectedProject) {
        document.body.style.overflow = "hidden"; 
        
        const tl = gsap.timeline();
        
        // 1. Fade in Backdrop
        tl.fromTo(".popup-overlay", 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.4, ease: "power2.out" }
        )
        // 2. Zoom in Glass Modal
        .fromTo(".popup-content",
            { scale: 0.95, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "expo.out" },
            "-=0.2"
        )
        // 3. Stagger Text Elements inside
        .fromTo(".popup-text", 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            "-=0.3"
        );

    } else {
        document.body.style.overflow = "auto"; 
    }
  }, [selectedProject]);

  const handleClosePopup = () => {
    const tl = gsap.timeline({
        onComplete: () => setSelectedProject(null)
    });

    tl.to(".popup-content", { scale: 0.95, opacity: 0, duration: 0.3, ease: "power2.in" })
      .to(".popup-overlay", { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F8F7F5] selection:bg-[#BC4B32] selection:text-white"
    >
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
                onClick={() => setSelectedProject(project)} 
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
                    className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/30 md:bg-[#1A1A1A]/20 group-hover:bg-[#1A1A1A]/40 transition-colors duration-500" />
                </div>

                {/* Corner Markers */}
                <div className="absolute top-4 left-4 text-white/50 group-hover:opacity-0 transition-opacity duration-300">
                    <Plus size={12} strokeWidth={3} />
                </div>
                <div className="absolute bottom-4 right-4 text-white/50 group-hover:opacity-0 transition-opacity duration-300">
                    <Plus size={12} strokeWidth={3} />
                </div>



                {/* Mobile Card Label */}
              <div className="absolute bottom-4 left-4 z-10 group-hover:opacity-0 transition-opacity duration-300 delay-75 max-w-[85%]">
  <div
    className="
      relative
      px-4 py-3

      /* iOS Glass Core */
      bg-white/10
      backdrop-blur-2xl
      backdrop-saturate-200
      border border-white/20
      rounded-xl
      shadow-[0_8px_32px_rgba(0,0,0,0.25)]

      /* Subtle Glow Ring */
      before:absolute before:inset-0 before:rounded-xl
      before:p-[1px]
      before:bg-gradient-to-br before:from-white/40 before:to-white/5
      before:opacity-40
      before:pointer-events-none
    "
  >
    <h3 className="relative z-10 text-white font-serif text-lg leading-none tracking-wide">
      {project.title}
    </h3>

    <p className="relative z-10 md:hidden text-[#BC4B32] text-[10px] font-mono uppercase mt-1 tracking-wider">
      {project.location}
    </p>
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

      {/* --- GLASSMORPHIC POPUP --- */}
      {selectedProject && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
        >
            {/* Backdrop */}
            <div 
                className="popup-overlay absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                onClick={handleClosePopup}
            />

            {/* Glass Content Container */}
            <div className="
                popup-content 
                relative w-full max-w-5xl max-h-[85vh] 
                bg-[#1A1A1A]/85 backdrop-blur-2xl 
                border border-white/10 shadow-2xl
                flex flex-col md:flex-row 
                overflow-hidden rounded-sm
            ">
                
                {/* Close Button (Floating) */}
                <button 
                    onClick={handleClosePopup}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-[#BC4B32] text-white border border-white/10 backdrop-blur-md transition-colors rounded-full"
                >
                    <X size={18} />
                </button>

                {/* Left: Image (Hero) */}
                <div className="w-full md:w-[65%] h-[40vh] md:h-auto relative bg-[#1A1A1A]">
                    <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay for text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent md:hidden" />
                </div>

                {/* Right: Info (Glass Pane) */}
                <div className="w-full md:w-[35%] p-6 md:p-10 flex flex-col justify-center relative">
                    
                    {/* Decoration Line */}
                    <div className="popup-text w-10 h-[2px] bg-[#BC4B32] mb-6" />

                    {/* Category */}
                    <span className="popup-text font-mono text-[#BC4B32] text-[10px] uppercase tracking-[0.2em] mb-3 block">
                        {selectedProject.category}
                    </span>

                    {/* Title */}
                    <h2 className="popup-text font-serif text-3xl md:text-4xl text-[#F8F7F5] leading-[1.1] mb-4">
                        {selectedProject.title}
                    </h2>

                    {/* Metadata */}
                    <div className="popup-text flex items-center gap-3 text-white/40 text-[10px] font-mono uppercase tracking-wider mb-6 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-1">
                            <MapPin size={10} />
                            <span>{selectedProject.location}</span>
                        </div>
                        <span>•</span>
                        <span>{selectedProject.year || "2027"}</span>
                    </div>

                    {/* Short Description */}
                    <p className="popup-text text-white/70 text-sm leading-relaxed font-light">
                        A modern approach to {selectedProject.category.toLowerCase()} design. 
                        Focusing on sustainable materials and open spaces to create a seamless flow between the interior and the built environment.
                    </p>

                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Projects;