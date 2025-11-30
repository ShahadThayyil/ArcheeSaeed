import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// --- THEME CONFIGURATION (Your Palette) ---
const THEME = {
  bg: "#F8F7F5",        // Soft Alabaster
  text: "#1A1A1A",      // Deep Charcoal
  secondary: "#666666", // Slate Grey
  accent: "#BC4B32",    // Modern Terracotta
  border: "#E0E0E0",    // Subtle Concrete
};

// --- DATA ---
const stats = [
  { id: 1, value: "05", label: "Years of Excellence", sub: "Since 2025" },
  { id: 2, value: "24", label: "Global Projects", sub: "Delivered" },
  { id: 3, value: "98", label: "Client Satisfaction", sub: "Percent" },
];

// --- PARTICLE NUMBER COMPONENT (Adapted for Light Theme) ---
const ParticleNumber = ({ value, label, sub, containerInView }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999, radius: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    // Canvas Dimensions
    const width = 400;
    const height = 200;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "200px"; // Fixed height for layout stability
    ctx.scale(dpr, dpr);

    let particles = [];
    let animationFrameId;

    class Particle {
      constructor(x, y) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.originX = x;
        this.originY = y;
        this.size = Math.random() * 2 + 1; // Slightly larger for "Architectural Block" feel
        // 30% Terracotta, 70% Charcoal
        this.color = Math.random() > 0.7 ? THEME.accent : THEME.text; 
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.92;
        this.ease = 0.08;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size); // Sharp squares
      }

      update() {
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = mouse.current.radius - distance;

        if (distance < mouse.current.radius) {
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force;
          const pushY = Math.sin(angle) * force;
          this.vx -= pushX * 0.08;
          this.vy -= pushY * 0.08;
        }

        if (containerInView) {
          this.x += (this.originX - this.x) * this.ease;
          this.y += (this.originY - this.y) * this.ease;
        } else {
            // Disperse downwards when out of view (Gravity effect)
           this.y += Math.random() * 2;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
      }
    }

    const init = () => {
      particles = [];
      
      // 1. Draw Text (Black text to scan pixels)
      ctx.fillStyle = "black";
      ctx.font = "900 120px 'Inter', sans-serif"; // Heavier, cleaner font
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(value, width / 2, height / 2);

      // 2. Scan
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 3. Create Particles
      const gap = 5 * dpr; // Tighter gap for denser look
      
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = imageData.data[index + 3];
          
          if (alpha > 128) {
            const posX = x / dpr;
            const posY = y / dpr;
            particles.push(new Particle(posX, posY));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.draw();
        p.update();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, containerInView]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouse.current.x = -9999;
    mouse.current.y = -9999;
  };

  return (
    <div 
        ref={containerRef} 
        className="flex flex-col items-center justify-center w-full h-full relative group cursor-crosshair py-12"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
        {/* Architectural Crosshairs */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#BC4B32]/30" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#BC4B32]/30" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#BC4B32]/30" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#BC4B32]/30" />

      <canvas ref={canvasRef} className="block w-full pointer-events-none z-10" />
      
      <div className="text-center mt-2 z-20">
        <h4 className="text-[#1A1A1A] text-lg font-bold uppercase tracking-widest font-sans">{label}</h4>
        <p className="text-[#BC4B32] font-serif italic mt-1">{sub}</p>
      </div>
    </div>
  );
};

// --- MAIN SECTION ---
const ModernStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10% 0px" });
  
  // Parallax Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]); // Fast Up
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 0]);       // Static
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);  // Faster Up

  return (
    <section 
        ref={containerRef}
        className="relative w-full min-h-screen py-24 px-4 md:px-12 overflow-hidden flex flex-col justify-center"
        style={{ backgroundColor: THEME.bg }}
    >
      {/* --- BACKGROUND GRIDS (Architectural Paper) --- */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(${THEME.border} 1px, transparent 1px), linear-gradient(90deg, ${THEME.border} 1px, transparent 1px)`, 
             backgroundSize: '120px 120px',
             opacity: 0.4
           }}>
      </div>
      
      {/* Decorative Noise for Paper Texture */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]"></div>

      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto w-full mb-20 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-b border-[#1A1A1A] pb-12">
        <div className="md:col-span-8">
            <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="block text-[#BC4B32] font-mono text-sm tracking-[0.3em] uppercase mb-4"
            >
                /// Architectural Data
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-bold text-[#1A1A1A] font-['Playfair_Display',_serif] leading-[0.9]">
                FROZEN <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC4B32] to-[#1A1A1A]">MUSIC</span>
            </h2>
        </div>
        <div className="md:col-span-4 pb-2">
            <p className="text-[#666666] text-lg leading-relaxed font-sans border-l-2 border-[#BC4B32] pl-6">
                Structure meets fluidity. Our impact quantified through the lens of modern architecture and digital precision.
            </p>
        </div>
      </div>

      {/* --- BENTO GRID PARALLAX --- */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            
            {/* Column 1 */}
            <motion.div style={{ y: y1 }} className="md:border-r border-[#E0E0E0] md:pr-8">
                <div className="bg-white/50 backdrop-blur-sm border border-[#E0E0E0] h-[400px] flex items-center justify-center hover:shadow-2xl transition-shadow duration-500">
                     <ParticleNumber {...stats[0]} containerInView={isInView} />
                </div>
            </motion.div>

            {/* Column 2 */}
            <motion.div style={{ y: y2 }} className="md:px-8 mt-12 md:mt-32">
                 <div className="bg-white/50 backdrop-blur-sm border border-[#E0E0E0] h-[400px] flex items-center justify-center hover:shadow-2xl transition-shadow duration-500 relative">
                     {/* Decorative Tag */}
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs px-3 py-1 font-mono uppercase">
                        Current Status
                     </div>
                     <ParticleNumber {...stats[1]} containerInView={isInView} />
                </div>
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: y3 }} className="md:border-l border-[#E0E0E0] md:pl-8 mt-24 md:mt-0">
                 <div className="bg-white/50 backdrop-blur-sm border border-[#E0E0E0] h-[400px] flex items-center justify-center hover:shadow-2xl transition-shadow duration-500">
                     <ParticleNumber {...stats[2]} containerInView={isInView} />
                </div>
            </motion.div>

        </div>
      </div>

      {/* --- FOOTER DECORATION --- */}
      <div className="absolute bottom-12 left-0 w-full overflow-hidden whitespace-nowrap opacity-10 pointer-events-none">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="text-[10rem] font-bold text-[#1A1A1A] font-['Inter'] leading-none"
          >
            EST. 2026 — ARCHITECTURE — DIGITAL — STRUCTURE — EST. 2026 —
          </motion.div>
      </div>

    </section>
  );
};

export default ModernStats;