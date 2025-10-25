import React from "react";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
  "/mc-logo.png",
  "../assets/logo.png",
];

export default function LogoSlider() {
  return (
    <div className="py-16 backdrop-blur-xl  pointer-events-none bg-[#F5EFE6]"
     
    >
      {/* Heading */}
      <h2 className="text-center text-gray-900 md:text-5xl  text-3xl font-bold mb-10 tracking-wide relative z-10">
        Our{" "}
        <span className="font-['Playfair_Display',_serif] bg-gradient-to-r from-[#1a1a1a] to-[#000000] bg-clip-text text-[#C0B6A1] ">
          Trusted Partners
        </span>
      </h2>

      {/* Soft background glow blobs for depth */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-[#E8DFD1]/60 rounded-full blur-[120px] top-[-120px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-[#C0B6A1]/50 rounded-full blur-[150px] bottom-[-100px] right-[-50px]" />
      </div>

      {/* Logo Row Animation */}
      <div className="group flex overflow-hidden relative">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-12 flex items-center justify-center relative"
            >
              <div className="p-6 rounded-2xl backdrop-blur-xl   hover:shadow-[0_0_40px_rgba(192,182,161,0.4)] transition-all duration-500">
                <img
                  src={logo}
                  alt={`logo-${index}`}
                  className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-500"
                  style={{
                    filter:
                      "drop-shadow(0 3px 8px rgba(192,182,161,0.4)) brightness(0.9)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(40px); }
        }
      `}</style>
    </div>
  );
}
