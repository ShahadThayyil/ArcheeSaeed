import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react"; // Make sure you have lucide-react or use a simple SVG arrow

// --- CONFIGURATION ---
// Replace this with your actual Logo URL
const LOGO_URL = "/your-logo.png"; 

const CONSTRUCTION_STAGES = [
  "INITIALIZING GRID SYSTEM", // 0-20%
  "SURVEYING TERRAIN",        // 20-40%
  "POURING FOUNDATION",       // 40-60%
  "ERECTING STRUCTURE",       // 60-80%
  "POLISHING SURFACES"        // 80-100%
];

export default function Preloader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const assets = [];
    
    const safetyTimeout = setTimeout(() => {
        if(progress < 100) finishLoading();
    }, 5000);

    // 1. Gather Assets (Images, Backgrounds, Videos)
    document.querySelectorAll("img").forEach(img => {
      if (img.complete) loaded++; else assets.push(img);
    });
    
    document.querySelectorAll("*").forEach(el => {
      const bg = window.getComputedStyle(el).backgroundImage;
      if (bg && bg !== "none") {
        const url = bg.split('"')[1]?.split('"')[0];
        if (url) { const img = new Image(); img.src = url; assets.push(img); }
      }
    });

    document.querySelectorAll("video").forEach(video => {
      if (video.readyState >= 3) loaded++;
      else { video.addEventListener("loadeddata", () => update()); assets.push(video); }
    });

    const total = loaded + assets.length;

    function update() {
      loaded++;
      const currentProgress = total === 0 ? 100 : Math.round((loaded / total) * 100);
      setProgress(currentProgress);
      
      // Update Stage Text based on percentage
      const newStage = Math.min(
        Math.floor((currentProgress / 100) * CONSTRUCTION_STAGES.length), 
        CONSTRUCTION_STAGES.length - 1
      );
      setStageIndex(newStage);

      if (loaded >= total) finishLoading();
    }

    function finishLoading() {
        clearTimeout(safetyTimeout);
        setProgress(100);
        setStageIndex(CONSTRUCTION_STAGES.length - 1); // Ensure final stage
        setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onLoaded(), 800);
        }, 800);
    }

    assets.forEach(asset => {
      if (asset.tagName === "IMG") { asset.onload = update; asset.onerror = update; }
    });

    if (total === 0) finishLoading();

    return () => clearTimeout(safetyTimeout);
  }, []);

  return (
    <div 
        className={`
            fixed inset-0 z-[9999] flex flex-col justify-between
            bg-[#F8F7F5] text-[#1A1A1A]
            transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)]
            ${isExiting ? "-translate-y-full" : "translate-y-0"}
        `}
    >
      {/* --- BACKGROUND GRID --- */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]" 
        style={{ 
            backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
        }}
      />

      {/* --- TOP HEADER --- */}
      <div className="relative z-10 w-full p-8 flex justify-between items-start font-mono text-[10px] tracking-widest text-[#666666] uppercase">
        <div className="flex gap-2 items-center">
            <span className="w-2 h-2 bg-[#BC4B32] rounded-full animate-pulse"></span>
            <span>LIVE RENDER</span>
        </div>
        <span>COORD: 34.05°N</span>
      </div>

      {/* --- CENTER: LOGO & PHASES --- */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        
        {/* LOGO CONTAINER */}
        <div className={`relative transition-all duration-700 ${isExiting ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}>
             {/* If you don't have an image yet, this is a placeholder Text Logo */}
            <h1 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] tracking-tighter">
                ARCH<span className="text-[#BC4B32]">.</span>
            </h1>
            
            {/* UNCOMMENT THIS LINE TO USE YOUR IMAGE LOGO */}
            {/* <img src={LOGO_URL} alt="Logo" className="w-32 md:w-48 h-auto object-contain" /> */}

            {/* Subtle rotating ring behind logo */}
            <div className="absolute inset-[-20px] border border-dashed border-[#BC4B32]/30 rounded-full animate-[spin_10s_linear_infinite]" />
        </div>

        {/* LOADING TEXT (Replaces the Numbers) */}
        <div className="h-6 overflow-hidden flex flex-col items-center">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#BC4B32] uppercase animate-pulse">
                // {CONSTRUCTION_STAGES[stageIndex]}
            </span>
        </div>

      </div>

      {/* --- BOTTOM: DIMENSION LINE --- */}
      <div className="relative z-10 w-full p-8 md:p-12">
        <div className="flex justify-between items-end mb-2 font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">
            <span>Progress</span>
            <span>{progress.toString().padStart(3, '0')} / 100</span>
        </div>

        {/* The Line */}
        <div className="relative w-full h-[1px] bg-[#E0E0E0]">
            <div 
                className="absolute left-0 top-0 h-full bg-[#1A1A1A] transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
            >
                {/* The End Marker (Triangle or Tick) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-[#BC4B32]">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-[#BC4B32]" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}