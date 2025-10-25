import { motion } from "framer-motion";
import { features } from "../data/features";

const WhyWorkWithMe = () => {
  return (
    <section
      className="relative w-full min-h-screen py-16 px-6 md:px-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F5EFE6 0%, #E8DFD1 35%, #D9CBB3 70%, #C0B6A1 100%)",
      }}
    >
      {/* Soft moving blurred shapes behind cards */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#E8DFD1] rounded-full blur-[150px] opacity-40 top-[-100px] left-[-150px] animate-[float_10s_ease-in-out_infinite_alternate]" />
        <div className="absolute w-[500px] h-[500px] bg-[#C0B6A1] rounded-full blur-[180px] opacity-30 bottom-[-150px] right-[-100px] animate-[float_12s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-14 text-gray-900 font-['Playfair_Display',_serif]"
      >
        Why Work With <span className="text-[#C0B6A1] font-['Playfair_Display',_serif]">Me</span>
      </motion.h2>

      {/* Cards */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              rotateX: 6,
              rotateY: -6,
              y: -8,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center text-center rounded-[2rem] p-8 
              border border-white/20 bg-white /5  backdrop-blur-[35px]
              shadow-[inset_0_0_20px_rgba(255,255,255,0.25),0_0_50px_rgba(208,193,162,0.25)]
              hover:shadow-[0_20px_60px_rgba(192,182,161,0.4)] 
              transition-all duration-700 ease-out"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(232,223,209,0.1) 40%, rgba(192,182,161,0.05) 100%)",
            }}
          >
            {/* Glass edge highlight */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/40 to-transparent opacity-40 mix-blend-overlay pointer-events-none"></div>

            {/* Gloss reflection at top */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-[2rem] pointer-events-none" />

            {/* ICON */}
            <div
              className="mb-5 text-5xl "
              style={{
                background: "linear-gradient(135deg, #C0B6A1, #E8DFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 8px 20px rgba(208,193,162,0.4))",
              }}
            >
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-3 text-[#1F1F1F] font-['Cormorant_Garamond',serif]">
              {feature.title}
            </h3>
            <p className="text-[#4A4A4A] font-['Rubik',cursive]  text-sm max-w-xs mx-auto">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(40px); }
        }
      `}</style>
    </section>
  );
};

export default WhyWorkWithMe;
