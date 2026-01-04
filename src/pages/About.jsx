import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/archizaid/", id: "01" },
  { name: "LinkedIn", url: "#", id: "02" },
  { name: "Twitter / X", url: "https://www.twitter.com", id: "03" },
  { name: "Email", url: "archizaidofficial@gmail.com", id: "04" },
];

const STATS = [
  { label: "Est.", value: "2020" },
  { label: "Built", value: "200" },
  { label: "Experience", value: "5" },
];

const PHILOSOPHY = [
  { id: "01", title: "Environment", desc: "We study every location to ensure our designs blend naturally with the surroundings, respecting the local climate and landscape." },
  { id: "02", title: "Quality", desc: "We select high-quality materials that not only look beautiful today but age gracefully, giving your space a lasting character." },
  { id: "03", title: "Efficiency", desc: "Our focus is on energy-efficient solutions and eco-friendly building practices to create a comfortable, healthy future." },
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
      
      {/* --- GRID BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="w-[1px] h-full bg-[#E0E0E0] grid-line" />
        <div className="w-[1px] h-full bg-[#E0E0E0] grid-line hidden md:block" />
        <div className="w-[1px] h-full bg-[#E0E0E0] grid-line hidden lg:block" />
        <div className="w-[1px] h-full bg-[#E0E0E0] grid-line" />
      </div>

      {/* --- SECTION 1: THE HEADLINE --- */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1920px] mx-auto min-h-[90vh] flex flex-col justify-between">
        
        <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4 mb-12">
            <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-[#BC4B32]">fig. 1.0 — Our Vision</span>
                <span className="font-mono text-xs text-[#666666]">DESIGNING BETTER WAYS TO LIVE</span>
            </div>
        </div> 

        <div className="relative z-10">
          <h1 className="font-serif text-[13vw] leading-[0.8] tracking-tight uppercase mix-blend-multiply">
            <span className="block hero-char">Inspired</span>
            <span className="block ml-[10vw] italic text-[#666666] hero-char">Design</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
            <div className="md:col-span-5 md:col-start-8">
                <p className="font-sans text-lg md:text-xl leading-relaxed text-[#1A1A1A] indent-12">
                    We believe that great architecture is more than just a structure. It is about creating 
                    <span className="text-[#BC4B32]"> meaningful environments</span> that improve your daily life through thoughtful design.
                </p>
            </div>
        </div>
      </section>


      {/* --- SECTION 2: BIO & IMAGE --- */}
      <section className="image-section relative border-t border-[#1A1A1A]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          
      

          <div className="lg:col-span-6 relative overflow-hidden h-[60vh] lg:h-auto border-r border-[#1A1A1A] group">
            <div className="absolute top-4 left-4 z-20 mix-blend-difference text-white font-mono text-xs uppercase">
                Studio_Vibe_01.JPG
            </div>
            <div ref={imageRef} className="w-[120%] h-[120%] -mt-[10%] -ml-[10%]">
                 <img 
                   src="./profile-about.avif" 
                   alt="Principal Architect" 
                   className="w-full h-full object-cover grayscale contrast-125"
                 />
            </div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          </div>

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
                    "Designing for <br/> living, built to last."
                </h2>
                <div className="space-y-6 font-sans text-[#666666] leading-relaxed max-w-md">
                    <p>
                        With years of expertise, our team treats every project as a partnership. We focus on what truly matters to you, turning complex ideas into simple, elegant realities.
                    </p>
                    <p>
                        We believe that the best spaces are those that reflect the people who use them. For us, the small details are what make a house feel like a home.
                    </p>
                </div>
             </div>

             {/* Social Links */}
             <div className="border-t border-[#1A1A1A]">
                {SOCIAL_LINKS.map((link) => (
                    <a key={link.name} href={link.url} target="_blank" className="flex items-center justify-between p-6 border-b border-[#E0E0E0] last:border-b-0 hover:pl-10 transition-all duration-300 group bg-white hover:bg-[#1A1A1A]">
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

      {/* --- SECTION 3: CORE PRINCIPLES --- */}
      <section className="px-6 md:px-12 py-32 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4 mb-16 grid-line-horz origin-left">
            <div className="h-[1px] w-12 bg-[#BC4B32]"></div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-[#1A1A1A]">Our Core Principles</h3>
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