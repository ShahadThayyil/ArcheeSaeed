import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { features } from "../data/features"; // Assuming features data is correct

// A separate component for each feature item to apply parallax
// ഒരു ഫീച്ചർ ഐറ്റം കാണിക്കുന്ന കമ്പോണന്റ്
const FeatureItem = ({ feature, index }) => {
  const ref = useRef(null);

  // ഈ ഐറ്റത്തിൻ്റെ സ്ക്രോൾ പുരോഗതി ട്രാക്ക് ചെയ്യുന്നു
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // എലമെൻ്റ് വ്യൂപോർട്ടിൽ വരുമ്പോൾ തുടങ്ങി പുറത്തുപോകുമ്പോൾ അവസാനിക്കുന്നു
  });

  // പാരലാക്സ് എഫക്റ്റിനായി y-axis ട്രാൻസ്ഫോം ചെയ്യുന്നു
  // സ്ക്രോൾ 0 ആയിരിക്കുമ്പോൾ -60px, 1 ആയിരിക്കുമ്പോൾ 60px
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Y-axis parallax കുറച്ചുകൂടി മൃദലമാക്കി

  // **പുതിയ 3D/Zoom എഫക്റ്റുകൾ (ചിത്രത്തിന്):**
  // സ്കെയിൽ: 0.98 ൽ നിന്ന് 1.02 ലേക്ക് സൂം ചെയ്യുന്നു (കൂടുതൽ subtle)
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]); 
  
  // റൊട്ടേഷൻ (3D): X-അക്ഷത്തിൽ ചെറുതായി കറങ്ങുന്നു
  const rotateX = useTransform(scrollYProgress, [0, 1], [2, -2]); 

  // തിരശ്ചീനമായ ചെരിവ് (Skew): ചിത്രത്തിന് ഒരു ഡൈനാമിക് ലുക്ക് നൽകുന്നു
  const skewX = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [1, -1] : [-1, 1]); // Skew കുറച്ചുകൂടി subtle ആക്കി


  // ഇരട്ട സംഖ്യയാണോ എന്ന് പരിശോധിക്കുന്നു (ലേഔട്ട് മാറ്റാൻ)
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-5xl mx-auto"
    >
      {/* 1. പാരലാക്സ്, 3D എഫക്റ്റുകളുള്ള ചിത്രം */}
      <motion.div
        className={`relative flex items-center justify-center perspective-[1000px] ${
          isEven ? "md:order-1" : "md:order-2" // ഓർഡർ മാറ്റുന്നു
        }`}
        style={{ 
            y, // <-- ലംബമായ പാരലാക്സ്
            skewX, // <-- തിരശ്ചീനമായ ചെരിവ്
        }}
      >
        {/* മോഡേൺ, റെസ്പോൺസീവ് ഇമേജ് കണ്ടെയ്നർ വിത്ത് കസ്റ്റം ഷേപ്പ് */}
        <motion.div 
            style={{ 
                scale, 
                rotateX,
                // കസ്റ്റം ഷേപ്പിനായി clip-path ഉപയോഗിക്കുന്നു
                clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)", // ഒരു അൺകൺവെൻഷണൽ ചതുരം
            }} 
            className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden 
                       border border-solid border-[#C0B6A1]/30" // നേരിയ ബോർഡർ
        >
          <img
            src={feature.image} // <-- ഡാറ്റയിൽ നിന്നുള്ള ചിത്രം
            alt={feature.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* ചിത്രത്തിന് മുകളിലുള്ള ആകർഷകമായ ഓവർലേ (കൂടുതൽ subtle ആക്കി) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </motion.div>
      </motion.div>

      {/* 2. ടെക്സ്റ്റ് കണ്ടന്റ് (പരിഷ്കരിച്ചത്) */}
      <motion.div
        className={`flex flex-col text-center md:text-left ${
          isEven ? "md:order-2" : "md:order-1" // ഓർഡർ മാറ്റുന്നു
        }`}
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* ടൈറ്റിൽ: സൈസ് കൂട്ടി, കളർ ഡാർക്ക് ആക്കി, ബോൾഡ്നെസ്സ് കൂട്ടി */}
        <h3 className="text-4xl md:text-5xl font-extrabold mb-5 text-[#1F1F1F] font-['Playfair_Display',serif] leading-tight">
          {feature.title}
        </h3>
        {/* ഡിസ്ക്രിപ്ഷൻ: സൈസ് കൂട്ടി, കളർ കോൺട്രാസ്റ്റ് കൂട്ടി */}
        <p className="text-[#333333] font-['Rubik',cursive] text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed">
          {feature.desc}
        </p>
      </motion.div>
    </div>
  );
};

// --- Main Component ---
const WhyWorkWithMe = () => {
  return (
    <section
      className="relative bg-[#F5EFE6] w-full min-h-screen py-24 px-6 md:px-16 overflow-hidden"
    >
      {/* Soft moving blurred shapes behind content */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#E8DFD1] rounded-full blur-[150px] opacity-40 top-[-100px] left-[-150px] animate-[float_10s_ease-in-out_infinite_alternate]" />
        <div className="absolute w-[500px] h-[500px] bg-[#C0B6A1] rounded-full blur-[180px] opacity-30 bottom-[-150px] right-[-100px] animate-[float_12s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Heading (പരിഷ്കരിച്ചത്) */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-extrabold text-center mb-20 md:mb-32 text-[#1F1F1F] font-['Playfair_Display',_serif]"
      >
        Why Work With{" "}
        <span className="text-[#A0937D] font-['Playfair_Display',_serif]">
          Me
        </span>
      </motion.h2>

      {/* Feature List Layout - സ്‌പേസിംഗ് കുറച്ചു */}
      <div className="space-y-16 md:space-y-24"> 
        {features.map((feature, idx) => (
          <FeatureItem key={idx} feature={feature} index={idx} />
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(20px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
      `}</style>
    </section>
  );
};

export default WhyWorkWithMe;