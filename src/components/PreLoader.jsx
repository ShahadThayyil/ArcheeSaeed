import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";

// Replace this with your actual logo file
const LOGO_URL = "/your-logo.png";

const CONSTRUCTION_STAGES = [
  "INITIALIZING GRID SYSTEM",
  "SURVEYING TERRAIN",
  "POURING FOUNDATION",
  "ERECTING STRUCTURE",
  "POLISHING SURFACES"
];

export default function Preloader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  // -------------------------
  // GLOBAL finishLoading()
  // -------------------------
  const finishLoading = () => {
    setProgress(100);
    setStageIndex(CONSTRUCTION_STAGES.length - 1);

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onLoaded) onLoaded();
      }, 100);
    }, 800);
  };

  useEffect(() => {
    let loaded = 0;
    const assets = [];

    // Safety fallback: max 5 seconds
    const safetyTimeout = setTimeout(() => {
      if (progress < 100) finishLoading();
    }, 5000);

    // -------------------------
    // Detect IMG tags
    // -------------------------
    document.querySelectorAll("img").forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        assets.push(img);
      }
    });

    // -------------------------
    // Detect CSS background images
    // -------------------------
    document.querySelectorAll("*").forEach(el => {
      const bg = window.getComputedStyle(el).backgroundImage;
      if (bg && bg !== "none") {
        const url = bg.split('"')[1]?.split('"')[0];
        if (url) {
          const img = new Image();
          img.src = url;
          assets.push(img);
        }
      }
    });

    // -------------------------
    // Detect VIDEOS
    // -------------------------
    document.querySelectorAll("video").forEach(video => {
      if (video.readyState >= 3) {
        loaded++;
      } else {
        video.addEventListener("loadeddata", update);
        assets.push(video);
      }
    });

    const total = loaded + assets.length;

    function update() {
      loaded++;
      const current = total === 0 ? 100 : Math.round((loaded / total) * 100);
      setProgress(current);

      const stage = Math.min(
        Math.floor((current / 100) * CONSTRUCTION_STAGES.length),
        CONSTRUCTION_STAGES.length - 1
      );
      setStageIndex(stage);

      if (loaded >= total) finishLoading();
    }

    // Attach load events for image/background/video
    assets.forEach(asset => {
      if (asset.tagName === "IMG") {
        asset.onload = update;
        asset.onerror = update;
      }
    });

   
    
    const handleWindowLoad = () => finishLoading();
    window.addEventListener("load", handleWindowLoad);

    if (total === 0) finishLoading();

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      clearTimeout(safetyTimeout);
    };
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
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Top Header */}
      <div className="relative z-10 w-full p-8 flex justify-between items-start font-mono text-[10px] tracking-widest text-[#666] uppercase">
        <div className="flex gap-2 items-center">
          <span className="w-2 h-2 bg-[#BC4B32] rounded-full animate-pulse"></span>
          <span>LIVE RENDER</span>
        </div>
        <span>COORD: 34.05°N</span>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <div
          className={`relative transition-all duration-700 ${
            isExiting ? "scale-90 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {/* Text Logo */}
          <img 
  src="https://res.cloudinary.com/dmtzmgbkj/image/upload/f_webp/v1767511092/logo_qztdnc.png"      // <-- path to your logo
  alt="Archizaid Logo"
  className="h-12 md:h-16 lg:h-20 w-auto object-contain"
/>

          {/* Rotating ring */}
          <div className="absolute inset-[-20px] border border-dashed border-[#BC4B32]/30 rounded-full animate-[spin_10s_linear_infinite]" />
        </div>

        {/* Stage Text */}
        <div className="h-6 overflow-hidden flex flex-col items-center">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#BC4B32] uppercase animate-pulse">
            // {CONSTRUCTION_STAGES[stageIndex]}
          </span>
        </div>
      </div>

      {/* Bottom Progress Line */}
      <div className="relative z-10 w-full p-8 md:p-12">
        <div className="flex justify-between items-end mb-2 font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">
          <span>Progress</span>
          <span>{progress.toString().padStart(3, "0")} / 100</span>
        </div>

        <div className="relative w-full h-[1px] bg-[#E0E0E0]">
          <div
            className="absolute left-0 top-0 h-full bg-[#1A1A1A] transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-[#BC4B32]">
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-[#BC4B32]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}