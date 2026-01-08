import { motion } from "framer-motion";
import { Box, Layers, Triangle, Ruler, Plus, Scan, Compass } from "lucide-react";
const WireframeAbstract = () => (
  <svg className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100">
    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
    </pattern>
    <rect width="100" height="100" fill="url(#grid)" />
  </svg>
);

const ArchCard = ({ id, title, subtitle, description, icon: Icon, meta, className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: id * 0.1 }}
      className={`relative group flex flex-col justify-between border border-[#E0E0E0] bg-[#F8F7F5] hover:bg-white hover:border-[#BC4B32] transition-all duration-500 cursor-crosshair overflow-hidden ${className}`}
    >
      {/* --- Hover Overlay: Technical Grid --- */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* --- Top Section: Header & Icon --- */}
      <div className="flex justify-between items-start p-6 relative z-10">
        <div>
           {/* ID & Technical Meta */}
           <div className="flex items-center gap-3 mb-2">
             <span className="font-mono text-[10px] text-[#BC4B32] font-bold tracking-widest">0{id}</span>
             <span className="font-mono text-[9px] text-[#666666]/60 uppercase tracking-widest hidden md:block">REF: A-{100 + parseInt(id)}</span>
           </div>
           
           {/* Title */}
           <h3 className="font-serif text-3xl text-[#1A1A1A] leading-[0.9] group-hover:translate-x-2 transition-transform duration-500">
             {title}
           </h3>
           <span className="block mt-1 font-mono text-[10px] text-[#666666] uppercase tracking-[0.2em]">{subtitle}</span>
        </div>

        {/* Icon with animated border */}
        <div className="relative p-2 text-[#1A1A1A] group-hover:text-[#BC4B32] transition-colors duration-300">
           <Icon size={24} strokeWidth={1} />
           <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50"></div>
           <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-50"></div>
        </div>
      </div>

      {/* --- Middle: Abstract Wireframe / Space Filler --- */}
      <div className="flex-grow relative w-full h-20 md:h-auto">
         <WireframeAbstract />
         {/* Technical Crosshairs in corners */}
         <Plus size={10} className="absolute top-1/2 left-4 text-[#BC4B32] opacity-0 group-hover:opacity-100 transition-opacity" />
         <Plus size={10} className="absolute top-1/2 right-4 text-[#BC4B32] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* --- Bottom: Description & Meta --- */}
      <div className="p-6 pt-0 relative z-10">
        <p className="font-manrope text-[#666666] text-sm leading-relaxed text-justify md:text-left group-hover:text-[#1A1A1A] transition-colors duration-300">
          {description}
        </p>
        
        {/* Footer Meta Data (Architectural Specs) */}
        <div className="mt-4 pt-4 border-t border-[#E0E0E0] group-hover:border-[#BC4B32]/30 flex justify-between items-end opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="font-mono text-[9px] uppercase text-[#1A1A1A]">{meta}</span>
            <Scan size={14} className="text-[#BC4B32] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

    </motion.div>
  );
};

// --- 3. Main Section ---
const ServicesSection = () => {
  return (
    <section className="relative w-full bg-[#F8F7F5] py-20 px-4 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Global CSS for Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Manrope:wght@300;400;500&family=JetBrains+Mono:wght@300;400&display=swap');
        .font-serif { font-family: 'Cinzel', serif; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Background Grid Lines (Fixed) */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(#E0E0E0 1px, transparent 1px), linear-gradient(90deg, #E0E0E0 1px, transparent 1px)`, 
             backgroundSize: '80px 80px' 
           }}>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 pb-6 border-b border-[#1A1A1A]">
           <div>
              <div className="flex items-center gap-2 mb-3">
                 <div className="w-2 h-2 bg-[#BC4B32]"></div>
                 <h4 className="font-mono text-xs font-bold text-[#1A1A1A] tracking-[0.3em] uppercase">Services Overview</h4>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl text-[#1A1A1A]">
                 Our <span className="italic text-[#666666]">Services</span>
              </h2>
           </div>
           <p className="font-manrope text-sm text-[#666666] max-w-sm text-right mt-4 md:mt-0">
              We construct narratives through space, light, and material precision.
           </p>
        </div>

        {/* --- THE BENTO GRID (Tight & Modern) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-[#E0E0E0] border border-[#E0E0E0]">
           {/* Using gap-1px with a bg color creates perfect thin borders between cards */}

           {/* 1. Architecture (Wide) */}
           <ArchCard 
             id="1"
             className="md:col-span-2 md:row-span-2 min-h-[420px]"
             title="Architecture"
             subtitle="Master Planning"
             description="Comprehensive design services ranging from residential villas to large-scale commercial complexes. We focus on sustainable integration with the local topography."
             meta="PHASE: STRUCTURAL // ZN-01"
             icon={Box}
           />

           {/* 2. Interior (Tall) */}
           <ArchCard 
             id="2"
             className="md:col-span-1 md:row-span-2 min-h-[420px]"
             title="Interiors"
             subtitle="Spatial Flow"
             description="Curating atmospheres through lighting, acoustic treatment, and bespoke joinery."
             meta="PHASE: FINISHING // ZN-02"
             icon={Layers}
           />

           {/* 3. Landscape (Standard) */}
           <ArchCard 
             id="3"
             className="md:col-span-1 min-h-[210px]"
             title="Landscape"
             subtitle="Exterior"
             description="Blurring lines between built & organic."
             meta="PHASE: ORGANIC // ZN-03"
             icon={Compass}
           />

           {/* 4. Consultation (Standard) */}
           <ArchCard 
             id="4"
             className="md:col-span-1 min-h-[210px]"
             title="Consulting"
             subtitle="Feasibility"
             description="Urban analysis & sustainability reports."
             meta="PHASE: PRE-Design // ZN-04"
             icon={Ruler}
           />

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;