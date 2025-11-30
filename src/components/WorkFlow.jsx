import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Check } from "lucide-react";

// --- DATA ---
const processSteps = [
  { id: "01", title: "Concept", description: "Analyzing topography & client aspirations.", specs: "PHASE: I" },
  { id: "02", title: "Drafting", description: "Transforming abstract ideas into blueprints.", specs: "PHASE: II" },
  { id: "03", title: "Modeling", description: "3D Fabrication & Light testing.", specs: "PHASE: III" },
  { id: "04", title: "Execution", description: "Construction & material integration.", specs: "PHASE: IV" },
  { id: "05", title: "Handover", description: "Final quality checks & key handover.", specs: "PHASE: V" },
];

// --- COMPONENTS (Same as before) ---
const GlassPipeHorizontal = ({ progress }) => {
  return (
    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-12 z-0">
      <div className="absolute inset-0 w-full h-full bg-white/40 rounded-full border border-white/80 shadow-inner backdrop-blur-md z-10 overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/90 to-transparent opacity-60"></div>
      </div>
      <div className="absolute inset-[3px] rounded-full overflow-hidden z-0">
         <motion.div 
            style={{ scaleX: progress }} 
            className="h-full w-full bg-gradient-to-r from-[#BC4B32] via-[#ff8f75] to-[#BC4B32] origin-left shadow-[0_0_20px_#BC4B32]"
         >
            <div className="w-full h-full animate-pulse opacity-50 bg-white/10"></div>
         </motion.div>
      </div>
    </div>
  );
};

const ProcessNode = ({ active }) => {
  return (
    <div className="relative z-20 -mb-[28px] md:-mb-[26px]"> 
       <motion.div 
         animate={{ scale: active ? 1.2 : 1, backgroundColor: active ? "#BC4B32" : "#E0E0E0" }}
         className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-white flex items-center justify-center transition-all duration-500 shadow-lg
           ${active ? 'shadow-[#BC4B32]/40' : ''}`}
       >
          {active && <Check className="text-white" size={20} strokeWidth={3} />}
       </motion.div>
    </div>
  );
};

const StepCard = ({ step, active }) => {
  return (
    <motion.div 
      animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 10, filter: active ? "blur(0px)" : "blur(1px)" }}
      transition={{ duration: 0.5 }}
      className="mt-14 w-[280px] md:w-[320px] text-center px-4"
    >
       <span className="font-mono text-[10px] text-[#BC4B32] tracking-[0.3em] font-bold block mb-2">
         {step.specs}
       </span>
       <h3 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] mb-3">{step.title}</h3>
       <p className="font-manrope text-sm text-[#666666] leading-relaxed">
         {step.description}
       </p>
    </motion.div>
  );
};

// --- LOGIC WRAPPERS ---
const StepGroup = ({ step, index, total, currentProgress }) => {
    const [isActive, setIsActive] = useState(false);
    useTransform(currentProgress, (value) => {
        const threshold = index / total; 
        if (value >= threshold && !isActive) setIsActive(true);
        if (value < threshold && isActive) setIsActive(false);
    });

    return (
        <div className="relative flex flex-col items-center justify-center pt-10 flex-shrink-0">
            <ProcessNode active={isActive} />
            <div className="h-10 w-1 bg-transparent"></div>
            <StepCard step={step} active={isActive} />
        </div>
    )
}

const MobileStep = ({ step, index }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative pl-10"
    >
        <div className="absolute -left-[22px] top-0 bg-[#F8F7F5] p-1">
             <div className="w-8 h-8 rounded-full bg-[#BC4B32] border-4 border-[#F8F7F5] shadow-md flex items-center justify-center text-white">
                <span className="font-mono text-[10px] font-bold">{index + 1}</span>
             </div>
        </div>
        <div>
            <span className="font-mono text-[10px] text-[#BC4B32] tracking-widest block mb-1">{step.specs}</span>
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">{step.title}</h3>
            <p className="font-manrope text-sm text-[#666666] leading-relaxed">{step.description}</p>
        </div>
    </motion.div>
);

// --- MAIN COMPONENT ---
const ProcessTimeline = () => {
  const targetRef = useRef(null);
  
  // 1. SCROLL TRACKING
  // This tracks how far we have scrolled within the 500vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });

  // 2. SMOOTHING
  // Acts like GSAP 'scrub: 1'
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  // 3. HORIZONTAL MOVEMENT LOGIC
  // 0% scroll = 5% x (Start slightly right)
  // 100% scroll = -95% x (Move fully left so last item is visible)
  const x = useTransform(smoothProgress, [0, 1], ["5%", "-95%"]);

  return (
    <div className="relative w-full bg-[#F8F7F5]">
        
      {/* =================================================
          DESKTOP VIEW (> 768px) - "PINNED" HORIZONTAL SCROLL
         ================================================= */}
      
      {/* CONTAINER HEIGHT (500vh):
          ഇതാണ് "Pinning Duration". ഈ 500vh ഹൈറ്റ് തീരുന്നത് വരെ 
          അകത്തുള്ള കണ്ടന്റ് 'sticky' ആയി നിൽക്കും.
      */}
      <section ref={targetRef} className="hidden md:block relative h-[500vh]">
        
        {/* STICKY WRAPPER:
            ഇതാണ് സ്ക്രീനിൽ ഒട്ടി നിൽക്കുന്ന ഭാഗം (Like GSAP pin).
            top-0 ഉം h-screen ഉം ഉള്ളതുകൊണ്ട് ഇത് വ്യൂപോർട്ടിൽ ഫിക്സഡ് ആയിരിക്കും.
        */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#F8F7F5] z-10">
            
            {/* Header (Static) */}
            <div className="absolute top-12 left-12 md:left-24 z-30 pointer-events-none">
                <h4 className="font-mono text-xs font-bold text-[#BC4B32] tracking-[0.4em] uppercase mb-2">Workflow</h4>
                <h2 className="font-serif text-5xl text-[#1A1A1A]">Process Map</h2>
            </div>

            {/* Horizontal Moving Track */}
            <div className="relative w-full h-[60vh] flex items-center">
                <motion.div style={{ x }} className="flex items-center gap-[25vw] pl-[10vw] pr-[10vw] w-max">
                   
                   {/* Background Pipe */}
                   <div className="absolute left-0 w-[120%] h-full pointer-events-none">
                      <GlassPipeHorizontal progress={smoothProgress} />
                   </div>

                   {/* Steps */}
                   {processSteps.map((step, index) => (
                      <StepGroup key={index} step={step} index={index} total={processSteps.length} currentProgress={scrollYProgress} />
                   ))}

                </motion.div>
            </div>

            {/* Progress Percentage */}
            <div className="absolute bottom-12 right-12 font-mono text-xs text-[#BC4B32]">
                <motion.span>{useTransform(smoothProgress, value => Math.round(value * 100))}</motion.span>% COMPLETE
            </div>
            
             {/* Scroll Hint */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#BC4B32]/40 animate-bounce">
               <span className="font-mono text-[10px] tracking-widest uppercase">Scroll Down</span>
            </div>
        </div>
      </section>

      {/* =================================================
          MOBILE VIEW (< 768px) - Vertical Stack
         ================================================= */}
      <section className="md:hidden py-20 px-6 relative min-h-screen bg-[#F8F7F5]">
          <div className="mb-16">
            <h4 className="font-mono text-xs font-bold text-[#BC4B32] tracking-[0.4em] uppercase mb-2">Workflow</h4>
            <h2 className="font-serif text-4xl text-[#1A1A1A]">Process Map</h2>
          </div>

          <div className="relative ml-4 border-l-4 border-[#E0E0E0] space-y-16 pb-20">
             {processSteps.map((step, index) => (
                 <MobileStep key={index} step={step} index={index} />
             ))}
          </div>
      </section>

    </div>
  );
};

export default ProcessTimeline;