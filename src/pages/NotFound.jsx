// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 overflow-hidden px-6">
      
      {/* === ARCHITECTURAL BACKGROUND === */}
      {/* A subtle blueprint grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                            linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Optional: A faint architectural sketch overlay (You can add an SVG here if you have one) */}
      {/* <img src="/path-to-blueprint-sketch.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-5" /> */}


      {/* === MAIN CONTENT === */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Technical Label */}
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-zinc-400 mb-4">
          // ERROR CODE: MISSING_COORDINATES
        </p>

        {/* The 404 Number with "Dimension lines" */}
        <div className="relative">
          {/* Top measurement line */}
          <div className="absolute -top-6 left-0 w-full h-px bg-zinc-300 flex justify-between">
             <div className="h-3 w-px bg-zinc-300"></div>
             <div className="h-3 w-px bg-zinc-300"></div>
          </div>

          <h1 className="text-[8rem] md:text-[13rem] font-black text-zinc-900 leading-none tracking-tighter relative">
            <span className="relative z-10">404</span>
             {/* A subtle shadow/outline effect */}
            <span className="absolute top-1 left-1 text-zinc-300 -z-10" aria-hidden="true">404</span>
          </h1>

          {/* Bottom measurement label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-zinc-50 px-2 font-mono text-xs text-zinc-500">
            STRUCTURAL FAILURE
          </div>
        </div>
        

        <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 uppercase mt-12 mb-4">
          Page Off-Grid
        </h2>
        
        <p className="text-zinc-600 mb-10 max-w-md text-lg font-light leading-relaxed">
          The blueprint for this area hasn't been drawn yet. It seems you've ventured outside the site boundaries.
        </p>
        
        {/* Structural Button */}
        <Link 
          to="/" 
          className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-[0.2em] uppercase text-white bg-zinc-900 transition-all duration-300 hover:bg-zinc-800"
        >
          <span className="relative z-10 flex items-center gap-2">
           <i className="fa-solid fa-arrow-left-long"></i> BACK TO SITE PLAN
          </span>
          {/* Corner accent for architectural feel */}
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-zinc-500 group-hover:bg-white transition-colors duration-300"></div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;