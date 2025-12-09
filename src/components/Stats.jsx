import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// --- THEME CONFIGURATION ---
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

// --- UPDATED PARTICLE NUMBER COMPONENT ---
const ParticleNumber = ({ value, label, sub, containerInView }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999, radius: 100 });
  
  // Ref to store the animation frame so we can cancel it cleanly
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let particles = [];
    
    // --- PARTICLE CLASS ---
    class Particle {
      constructor(x, y, canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.originX = x;
        this.originY = y;
        this.size = Math.random() * 2 + 1; // Slight size variation
        this.color = Math.random() > 0.7 ? THEME.accent : THEME.text;
        
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.92;
        this.ease = 0.08;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
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

        // Return to origin if in view, else float
        if (containerInView) {
          this.x += (this.originX - this.x) * this.ease;
          this.y += (this.originY - this.y) * this.ease;
        } else {
          // Subtle float when out of view
          this.y -= Math.random() * 0.5;
          this.x += (Math.random() - 0.5) * 0.5;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
      }
    }

    // --- INITIALIZATION LOGIC ---
    const initParticles = async () => {
      // 1. Get exact dimensions from the container
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height; // Use ACTUAL container height
      const dpr = window.devicePixelRatio || 1;

      // 2. Set Canvas Size
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Reset scale for new drawing
      ctx.setTransform(1, 0, 0, 1, 0, 0); 
      ctx.scale(dpr, dpr);

      particles = [];

      // Wait for font to ensure accurate pixel scanning
      await document.fonts.ready;

      // 3. Draw Text to Scan
      // Increase font scaling slightly for better visibility on mobile
      const fontSize = Math.min(width, height) * 0.5; 
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `900 ${fontSize}px 'Inter', sans-serif`;
      ctx.fillText(value, width / 2, height / 2);

      // 4. Scan Pixels
      const imageData = ctx.getImageData(0, 0, width * dpr, height * dpr);
      // We clear immediately after scanning
      ctx.clearRect(0, 0, canvas.width, canvas.height); 

      // Adjust gap based on screen size (denser particles on mobile for legibility)
      const gap = width < 500 ? 4 : 5; 

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = imageData.data[index + 3];

          if (alpha > 128) {
            // Convert back to CSS coordinates
            const posX = x / dpr;
            const posY = y / dpr;
            particles.push(new Particle(posX, posY, width, height));
          }
        }
      }
    };

    // --- ANIMATION LOOP ---
    const animate = () => {
      // Clear using raw canvas dimensions to be safe
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.draw();
        p.update();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // --- RESIZE OBSERVER ---
    // This ensures if the browser resizes or layout changes, we rebuild the particles
    const resizeObserver = new ResizeObserver(() => {
        initParticles();
    });
    
    resizeObserver.observe(container);

    // Start
    initParticles().then(() => {
        animate();
    });

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [value, containerInView]); // Re-run if value changes

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
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
      // h-full ensures it takes the parent's 400px height
      className="flex flex-col items-center justify-center w-full h-full relative group cursor-crosshair overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block w-full h-full pointer-events-none z-10" 
      />

      {/* Label is positioned absolute bottom or relative to ensure it doesn't conflict with canvas flow */}
      <div className="absolute bottom-12 left-0 w-full text-center z-20 pointer-events-none">
        <h4 className="text-[#1A1A1A] text-lg font-bold uppercase tracking-widest font-sans">
          {label}
        </h4>
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
      {/* --- BACKGROUND GRIDS --- */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(${THEME.border} 1px, transparent 1px), linear-gradient(90deg, ${THEME.border} 1px, transparent 1px)`, 
             backgroundSize: '120px 120px',
             opacity: 0.4
           }}>
      </div>
      
      {/* Decorative Noise */}
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
                <div className="bg-white/50 backdrop-blur-sm border border-[#E0E0E0] h-[300px] md:h-[400px] flex items-center justify-center hover:shadow-2xl transition-shadow duration-500 w-full">
                     <ParticleNumber {...stats[0]} containerInView={isInView} />
                </div>
            </motion.div>

            {/* Column 2 */}
            <motion.div style={{ y: y2 }} className="md:px-8 mt-12 md:mt-32">
                 <div className="bg-white/50 backdrop-blur-sm border border-[#E0E0E0] h-[300px] md:h-[400px] flex items-center justify-center hover:shadow-2xl transition-shadow duration-500 relative w-full">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs px-3 py-1 font-mono uppercase z-30">
                        Current Status
                     </div>
                     <ParticleNumber {...stats[1]} containerInView={isInView} />
                </div>
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: y3 }} className="md:border-l border-[#E0E0E0] md:pl-8 mt-24 md:mt-0">
                 <div className="bg-white/50 backdrop-blur-sm border border-[#E0E0E0] h-[300px] md:h-[400px] flex items-center justify-center hover:shadow-2xl transition-shadow duration-500 w-full">
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