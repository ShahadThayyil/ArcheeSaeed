import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { name: "Instagram", url: "#", id: "01" },
  { name: "LinkedIn", url: "#", id: "02" },
  { name: "Twitter / X", url: "#", id: "03" },
  { name: "Email", url: "mailto:hello@arch.com", id: "04" },
];

const STATS = [
  { label: "Est.", value: "2016" },
  { label: "Built", value: "42" },
  { label: "Awards", value: "12" },
];

const PHILOSOPHY = [
  { id: "01", title: "Context", desc: "We build with the site, not just on it. Analyzing wind, sun, and soil." },
  { id: "02", title: "Materiality", desc: "Honest textures. Exposed concrete, laterite, and timber that age well." },
  { id: "03", title: "Sustainability", desc: "Passive cooling and carbon-negative practices embedded in the DNA." },
];

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Grid Line Animation
      gsap.fromTo(".grid-line", 
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.5, ease: "power3.out", stagger: 0.1 }
      );
      
      gsap.fromTo(".grid-line-horz", 
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.5, ease: "power3.out", stagger: 0.1 }
      );

      // 2. Hero Text Reveal
      gsap.from(".hero-char", {
        y: 100, opacity: 0, duration: 1, stagger: 0.05, ease: "power4.out", delay: 0.2
      });

      // 3. Parallax Image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".image-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 4. Philosophy Items
      gsap.utils.toArray(".philosophy-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#F8F7F5] text-[#1A1A1A] selection:bg-[#BC4B32] selection:text-white overflow-hidden">
      
      {/* --- GRID BACKGROUND (Visible Architectural Lines) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="w-[1px] h-full bg-[#E0E0E0] grid-line" />
        <div className="w-[1px] h-full bg-[#E0E0E0] grid-line hidden md:block" />
        <div className="w-[1px] h-full bg-[#E0E0E0] grid-line hidden lg:block" />
        <div className="w-[1px] h-full bg-[#E0E0E0] grid-line" />
      </div>

      {/* --- SECTION 1: THE ARCHITECTURAL HEADLINE --- */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1920px] mx-auto min-h-[90vh] flex flex-col justify-between">
        
        {/* Technical Header Data */}
        <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4 mb-12">
            <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-[#BC4B32]">fig. 1.0 — Introduction</span>
                <span className="font-mono text-xs text-[#666666]">N 34° 01' 44" / W 118° 28' 22"</span>
            </div>
           
        </div>

        {/* Massive Typography */}
        <div className="relative z-10">
          <h1 className="font-serif text-[13vw] leading-[0.8] tracking-tight uppercase mix-blend-multiply">
            <span className="block hero-char">Sculpting</span>
            <span className="block ml-[10vw] italic text-[#666666] hero-char">The Void</span>
          </h1>
        </div>

        {/* Bottom Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
            <div className="md:col-span-5 md:col-start-8">
                <p className="font-sans text-lg md:text-xl leading-relaxed text-[#1A1A1A] indent-12">
                    Architecture is not about buildings; it is about framing life. 
                    Operating at the intersection of <span className="text-[#BC4B32]">precision engineering</span> and poetic space.
                </p>
            </div>
        </div>
      </section>


      {/* --- SECTION 2: ASYMMETRICAL GRID (BIO & IMAGE) --- */}
      <section className="image-section relative border-t border-[#1A1A1A]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          
          {/* COL 1: Sticky Sidebar (Technical) */}
          <div className="hidden lg:block lg:col-span-1 border-r border-[#1A1A1A] relative bg-[#F8F7F5] z-20">
             <div className="sticky top-0 h-screen flex items-center justify-center">
                <span className="writing-vertical-rl rotate-180 font-mono text-xs tracking-[0.3em] text-[#BC4B32] uppercase">
                    Profile / Ar. John Doe
                </span>
             </div>
          </div>

          {/* COL 2: Image (Parallax) */}
          <div className="lg:col-span-6 relative overflow-hidden h-[60vh] lg:h-auto border-r border-[#1A1A1A] group">
            <div className="absolute top-4 left-4 z-20 mix-blend-difference text-white font-mono text-xs">
                IMG_REF_001.JPG
            </div>
            <div ref={imageRef} className="w-[120%] h-[120%] -mt-[10%] -ml-[10%]">
                 <img 
                   src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" 
                   alt="Architect" 
                   className="w-full h-full object-cover grayscale contrast-125"
                 />
            </div>
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          </div>

          {/* COL 3: Content (Scrolls) */}
          <div className="lg:col-span-5 bg-[#F8F7F5] flex flex-col">
             
             {/* Stats Row */}
             <div className="grid grid-cols-3 border-b border-[#1A1A1A]">
                {STATS.map((stat, i) => (
                    <div key={i} className={`p-6 md:p-10 border-r border-[#1A1A1A] ${i === 2 ? 'border-r-0' : ''} hover:bg-[#BC4B32] hover:text-white transition-colors duration-300 group cursor-crosshair`}>
                        <span className="block font-mono text-xs mb-2 opacity-50 group-hover:opacity-80">// {stat.label}</span>
                        <span className="block font-serif text-3xl md:text-4xl">{stat.value}</span>
                    </div>
                ))}
             </div>

             {/* Manifesto / Bio */}
             <div className="p-8 md:p-16 flex-grow flex flex-col justify-center">
                <Plus className="mb-6 text-[#BC4B32]" />
                <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">
                    "Frozen music <br/> of our time."
                </h2>
                <div className="space-y-6 font-sans text-[#666666] leading-relaxed max-w-md">
                    <p>
                        With over a decade of experience, John approaches every project as a unique narrative. 
                        We strip away the non-essential to reveal the structural truth.
                    </p>
                    <p>
                        The void is as important as the solid. The silence between the notes.
                    </p>
                </div>
             </div>

             {/* Social Links (Table Style) */}
             <div className="border-t border-[#1A1A1A]">
                {SOCIAL_LINKS.map((link) => (
                    <a key={link.name} href={link.url} className="flex items-center justify-between p-6 border-b border-[#E0E0E0] last:border-b-0 hover:pl-10 transition-all duration-300 group bg-white hover:bg-[#1A1A1A]">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs text-[#BC4B32] group-hover:text-white">{link.id}</span>
                            <span className="font-sans text-sm uppercase tracking-wider font-bold text-[#1A1A1A] group-hover:text-white">{link.name}</span>
                        </div>
                        <ArrowUpRight size={14} className="text-[#1A1A1A] group-hover:text-[#BC4B32]" />
                    </a>
                ))}
             </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: THE SPEC SHEET (PHILOSOPHY) --- */}
      <section className="px-6 md:px-12 py-32 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4 mb-16 grid-line-horz origin-left">
            <div className="h-[1px] w-12 bg-[#BC4B32]"></div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-[#1A1A1A]">Core Principles</h3>
        </div>

        <div className="space-y-0">
            {PHILOSOPHY.map((item) => (
                <div key={item.id} className="philosophy-item group relative border-t border-[#E0E0E0] py-12 transition-all duration-500 hover:bg-white">
                    <div className="absolute left-0 top-0 w-0 h-[2px] bg-[#BC4B32] transition-all duration-500 group-hover:w-full"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
                        <div className="md:col-span-2">
                            <span className="font-mono text-sm text-[#BC4B32]">({item.id})</span>
                        </div>
                        <div className="md:col-span-4">
                            <h4 className="font-serif text-4xl text-[#1A1A1A] group-hover:translate-x-4 transition-transform duration-300">{item.title}</h4>
                        </div>
                        <div className="md:col-span-5 md:col-start-8 flex items-start gap-4">
                            <Minus size={12} className="mt-2 text-[#BC4B32] hidden md:block" />
                            <p className="font-sans text-[#666666] leading-relaxed max-w-sm">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="border-t border-[#E0E0E0]"></div>
        </div>
      </section>


    </div>
  );
};

export default About;