import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowLeft, User, Layout, ArrowDown, PlayCircle } from "lucide-react";
import { projects } from "../data/projects";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const project = projects.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!project) return;
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });
      
      tl.from(".hero-container", { scale: 1.05, opacity: 0 })
        .from(".header-text", { y: 50, opacity: 0, stagger: 0.1 }, "-=1")
        .from(".info-block", { x: -20, opacity: 0, stagger: 0.1 }, "-=1")
        .from(".desc-block", { x: 20, opacity: 0 }, "-=1.2")
        .from(".video-feature", { y: 40, opacity: 0 }, "-=0.8");
    }, containerRef);
    
    return () => ctx.revert();
  }, [id, project]);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F8F7F5] font-serif">
        <h1 className="text-3xl mb-4">Project Not Found</h1>
        <button onClick={() => navigate("/projects")} className="text-[#BC4B32] underline tracking-widest uppercase text-xs">Return to Archive</button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[#F8F7F5] min-h-screen selection:bg-[#BC4B32] selection:text-white pb-32">
      
      {/* 1. MINIMAL HEADER */}
      <div className="pt-24 md:pt-32 px-6 md:px-12 max-w-[1800px] mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-3 text-[#666666] hover:text-[#BC4B32] mb-12 group transition-all duration-500"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Back to Archive</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="header-text max-w-4xl">
            <span className="text-[#BC4B32] font-mono text-[10px] uppercase tracking-[0.4em] block mb-4">// {project.category}</span>
            <h1 className="text-[#1A1A1A] font-serif text-5xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter italic">
              {project.title}
            </h1>
          </div>
          <div className="header-text hidden md:block">
            <div className="w-12 h-12 rounded-full border border-[#E0E0E0] flex items-center justify-center animate-bounce">
              <ArrowDown size={18} className="text-[#BC4B32]" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. CINEMATIC HERO SECTION */}
      <section className="px-6 md:px-12 max-w-[1800px] mx-auto mb-24 hero-container">
        <div className="relative w-full h-[60vh] md:h-[85vh] rounded-3xl overflow-hidden bg-[#E0E0E0] shadow-2xl">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        </div>
      </section>

      {/* 3. BRIEF DESCRIPTION & INFO */}
      <section className="px-6 md:px-12 max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-32">
        <div className="lg:col-span-4 space-y-12">
          <div className="info-block border-t border-[#E0E0E0] pt-8">
            <div className="flex items-center gap-4 text-[#BC4B32] mb-4">
              <User size={14} />
              <span className="font-mono text-[10px] uppercase tracking-widest">Client Partner</span>
            </div>
            <p className="text-[#1A1A1A] font-serif text-2xl lg:text-3xl italic">{project.client || "Private Residence"}</p>
          </div>
          <div className="info-block border-t border-[#E0E0E0] pt-8">
            <div className="flex items-center gap-4 text-[#BC4B32] mb-4">
              <Layout size={14} />
              <span className="font-mono text-[10px] uppercase tracking-widest">Architectural Concept</span>
            </div>
            <p className="text-[#1A1A1A] font-serif text-2xl lg:text-3xl italic">{project.category}</p>
          </div>
        </div>

        <div className="lg:col-span-8 lg:col-start-6 desc-block">
          <p className="text-[#1A1A1A] text-xl md:text-4xl font-serif leading-[1.2] md:leading-[1.1] tracking-tight opacity-90">
            {project.description}
          </p>
        </div>
      </section>

      {/* 4. VIDEO NARRATIVE SECTION (Only shown if videoUrl exists) */}
      {project.videoUrl && (
        <section className="video-feature px-6 md:px-12 max-w-[1800px] mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center bg-[#1A1A1A] rounded-[2rem] p-8 md:p-16 text-white overflow-hidden relative">
            
            {/* Left Content Side */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-[#BC4B32] mb-6">
                <PlayCircle size={20} />
                <span className="font-mono text-xs uppercase tracking-[0.3em]">Cinematic Walkthrough</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif italic mb-8 leading-tight">
                Visualizing <br /> <span className="text-[#666666]">The Narrative</span>
              </h2>
              <p className="text-[#A0A0A0] text-lg md:text-xl font-serif leading-relaxed max-w-md">
                This visual documentation captures the interplay of light and materiality within the space, offering a deeper perspective into our design philosophy.
              </p>
            </div>

            {/* Right Video Side (Portrait) */}
            <div className="flex justify-center lg:justify-end relative z-10">
              <div className="w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-[#2A2A2A]">
                <iframe 
                  src={project.videoUrl} 
                  className="w-full h-full grayscale-0 transition-all duration-1000" 
                  allowFullScreen 
                  title="Project Video"
                />
              </div>
            </div>

            {/* Background design element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#BC4B32]/5 -skew-x-12 translate-x-1/4" />
          </div>
        </section>
      )}

      {/* 5. MASONRY GALLERY */}
      <section className="px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex items-end justify-between mb-16 border-b border-[#E0E0E0] pb-8">
          <h2 className="font-serif text-3xl md:text-6xl italic text-[#1A1A1A]">Captured <br /> <span className="text-[#666666]">Atmosphere</span></h2>
          <div className="text-right">
             <span className="font-mono text-[10px] text-[#BC4B32] uppercase tracking-[0.3em] block mb-2">// Project Index</span>
             <span className="text-4xl font-serif italic text-[#1A1A1A]">{String(project.gallery?.length || 0).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {project.gallery && project.gallery.map((imgUrl, index) => (
            <div key={index} className="gallery-item overflow-hidden rounded-2xl bg-[#E0E0E0] group relative transition-all duration-700">
              <img 
                src={imgUrl} 
                alt={`${project.title} visualization ${index}`} 
                className="w-full h-auto object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;