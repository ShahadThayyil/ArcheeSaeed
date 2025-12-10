import React, { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Layers, Compass, Cuboid, Ruler, FileCheck } from "lucide-react";

// --- DATA ---
const processSteps = [
  { 
    id: "01", 
    title: "Site Analysis & Concept", 
    description: "Decoding topography and zoning. Generating initial massing models to test volume constraints.", 
    specs: "PHASE: I",
    duration: "4 Weeks",
    deliverables: ["Survey", "Massing"],
    icon: <Compass size={20} />
  },
  { 
    id: "02", 
    title: "Schematic Drafting", 
    description: "Transforming abstract concepts into CAD blueprints. Defining spatial flow and structural grids.", 
    specs: "PHASE: II",
    duration: "6 Weeks",
    deliverables: ["Plans", "Elevations"],
    icon: <Ruler size={20} />
  },
  { 
    id: "03", 
    title: "BIM Modeling", 
    description: "Developing a digital twin. Simulating lighting, material textures, and structural loads.", 
    specs: "PHASE: III",
    duration: "4 Weeks",
    deliverables: ["3D Renders", "VR"],
    icon: <Cuboid size={20} />
  },
  { 
    id: "04", 
    title: "Material Execution", 
    description: "Coordinating with contractors and selecting premium materials for onsite integration.", 
    specs: "PHASE: IV",
    duration: "8 Months",
    deliverables: ["Material Board"],
    icon: <Layers size={20} />
  },
  { 
    id: "05", 
    title: "Handover", 
    description: "Final quality inspections, systems testing, and delivery of As-Built documentation.", 
    specs: "PHASE: V",
    duration: "2 Weeks",
    deliverables: ["As-Built Docs", "Keys"],
    icon: <FileCheck size={20} />
  },
];

// --- COMPONENT: Background Grid ---
const BlueprintGrid = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
         style={{ 
             backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)', 
             backgroundSize: '60px 60px' 
         }}>
    </div>
);

// --- COMPONENT: The Vacuum Tube ---
const GlowingGaugeTube = ({ scrollYProgress }) => {
    const liquidHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        // Adjusted for Mobile: visible on all screens
        <div className="absolute left-0 md:left-8 top-8 bottom-32 w-8 md:w-12 z-10">
            
            {/* Measurement Ticks (Hidden on very small screens to reduce clutter) */}
            <div className="absolute right-full mr-1 md:mr-2 top-0 bottom-0  flex-col justify-between py-4 opacity-30 hidden sm:flex">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-2 h-[1px] bg-[#BC4B32]"></div>
                ))}
            </div>

            {/* The Glass Tube Shell */}
            <div className="w-3 md:w-4 mx-auto h-full rounded-full overflow-hidden backdrop-blur-sm border border-[#BC4B32]/20 bg-white/5 shadow-inner">
                {/* The Glowing Liquid */}
                <motion.div
                    style={{ height: liquidHeight }}
                    className="w-full bg-gradient-to-b from-[#BC4B32] via-[#ff8f75] to-[#BC4B32] origin-top relative rounded-b-full shadow-[0_0_15px_#BC4B32]"
                >
                    <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
                    <div className="absolute bottom-0 w-full h-4 bg-white/50 blur-[2px]"></div>
                </motion.div>
            </div>
        </div>
    );
};

// --- COMPONENT: The Card ---
const ArchitectCard = ({ step, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start 90%", "end 30%"]
    });

    const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const yMove = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        // Adjusted padding for mobile: pl-10 instead of pl-24
        <div ref={cardRef} className="flex items-start w-full mb-16 md:mb-32 relative pl-10 md:pl-24">
            
            {/* --- Dynamic Connector Line --- */}
            {/* Now visible on mobile, adjusted length/position */}
            <div className="absolute left-4 md:left-8 top-12 md:top-16 w-6 md:w-24 h-[2px] z-0">
                <motion.div 
                    style={{ scaleX: lineScale }}
                    className="h-full w-full bg-[#BC4B32]/50 origin-left"
                />
                <motion.div 
                    style={{ scale: lineScale }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#BC4B32] rounded-full" 
                />
            </div>

            {/* --- The Card --- */}
            <motion.div 
                style={{ 
                    y: yMove, 
                    opacity: opacityFade,
                    clipPath: "polygon(0 0, 100% 0, 100% 120%, 0% 120%)" 
                }}
                className="relative w-full max-w-4xl bg-[#F0F0F0]/90 backdrop-blur-md border border-white/60 shadow-xl overflow-hidden group rounded-lg md:rounded-none"
            >
                {/* Blueprint Crosshairs */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#BC4B32]/50"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#BC4B32]/50"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#BC4B32]/50"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#BC4B32]/50"></div>

                {/* Header Bar */}
                <div className="flex justify-between items-center px-4 md:px-6 py-2 md:py-3 border-b border-[#BC4B32]/10 bg-white/40">
                    <span className="font-mono text-[8px] md:text-[10px] text-[#BC4B32] tracking-widest font-bold">REF: {step.id}</span>
                    <span className="font-mono text-[8px] md:text-[10px] text-[#666666] tracking-widest">{step.specs}</span>
                </div>

                <div className="p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Icon & Specs */}
                    <div className="flex-shrink-0 flex row md:flex-col items-center md:items-start gap-4 md:border-r border-[#BC4B32]/10 md:pr-8">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-white border border-[#BC4B32]/20 flex items-center justify-center text-[#BC4B32] shadow-sm">
                            {step.icon}
                        </div>
                        <div className="text-left md:text-left">
                            <div className="font-mono text-[8px] md:text-[10px] text-[#666666] uppercase mb-1">Duration</div>
                            <div className="font-serif text-sm md:text-lg text-[#1A1A1A]">{step.duration}</div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div>
                        <h3 className="font-serif text-2xl md:text-4xl text-[#1A1A1A] mb-3 md:mb-4">{step.title}</h3>
                        <p className="font-manrope text-xs md:text-base text-[#666666] leading-relaxed max-w-xl">
                            {step.description}
                        </p>
                        
                        <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
                            {step.deliverables.map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-white/60 border border-[#BC4B32]/10 text-[8px] md:text-[10px] font-mono text-[#666666] uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ArchitectureProcess = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    return (
        <div className="relative w-full bg-[#F8F7F5] z-10 py-16 md:py-32 border-t border-[#BC4B32]/10">
            <BlueprintGrid />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="mb-12 md:mb-24 pl-4 md:pl-24">
                    <h4 className="font-mono text-xs font-bold text-[#BC4B32] tracking-[0.4em] uppercase mb-2 md:mb-4">Workflow</h4>
                    <h2 className="font-serif text-4xl md:text-6xl text-[#1A1A1A]">Design Protocol</h2>
                </div>

                {/* RELATIVE CONTAINER FOR TUBE & CARDS */}
                <div ref={containerRef} className="relative max-w-6xl mx-auto">
                    {/* Progress Tube - Now visible on mobile */}
                    <GlowingGaugeTube scrollYProgress={scrollYProgress} />

                    <div className="flex flex-col pt-8">
                        {processSteps.map((step, index) => (
                            <ArchitectCard 
                                key={index} 
                                step={step} 
                                index={index} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchitectureProcess;