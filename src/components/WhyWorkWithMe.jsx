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
    offset: ["start end", "end start"],
  });

  // പാരലാക്സ് എഫക്റ്റിനായി y-axis ട്രാൻസ്ഫോം ചെയ്യുന്നു
  // സ്ക്രോൾ 0 ആയിരിക്കുമ്പോൾ -60px, 1 ആയിരിക്കുമ്പോൾ 60px
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  // ഇരട്ട സംഖ്യയാണോ എന്ന് പരിശോധിക്കുന്നു (లేఅவுட் മാറ്റാൻ)
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-5xl mx-auto"
    >
      {/* 1. പാരലാക്സ് എഫക്റ്റുള്ള ചിത്രം */}
      <motion.div
        className={`relative flex items-center justify-center ${
          isEven ? "md:order-1" : "md:order-2" // ഓർഡർ മാറ്റുന്നു
        }`}
        style={{ y }} // <-- പാരലാക്സ് എഫക്റ്റ് ഇവിടെയാണ് നൽകുന്നത്
      >
        {/* മോഡേൺ, റെസ്പോൺസീവ് ഇമേജ് കണ്ടെയ്നർ */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
          <img
            src={feature.image} // <-- ഡാറ്റയിൽ നിന്നുള്ള ചിത്രം
            alt={feature.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* വേണമെങ്കിൽ ചിത്രത്തിന് മുകളിൽ ഒരു ഓവർലേ നൽകാം */}
          {/* <div className="absolute inset-0 bg-black opacity-10" /> */}
        </div>
      </motion.div>

      {/* 2. ടെക്സ്റ്റ് കണ്ടന്റ് (പഴയത് പോലെ തന്നെ) */}
      <motion.div
        className={`flex flex-col text-center md:text-left ${
          isEven ? "md:order-2" : "md:order-1" // ഓർഡർ മാറ്റുന്നു
        }`}
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-[#1F1F1F] font-['Cormorant_Garamond',serif]">
          {feature.title}
        </h3>
        <p className="text-[#4A4A4A] font-['Rubik',cursive] text-base max-w-md mx-auto md:mx-0">
          {feature.desc}
        </p>
      </motion.div>
    </div>
  );
};

const WhyWorkWithMe = () => {
  return (
    <section
      className="relative w-full min-h-screen py-24 px-6 md:px-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F5EFE6 0%, #E8DFD1 35%, #D9CBB3 70%, #C0B6A1 100%)",
      }}
    >
      {/* Soft moving blurred shapes behind content */}
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
        className="text-3xl md:text-5xl font-bold text-center mb-20 md:mb-32 text-gray-900 font-['Playfair_Display',_serif]"
      >
        Why Work With{" "}
        <span className="text-[#A0937D] font-['Playfair_Display',_serif]">
          Me
        </span>
      </motion.h2>

      {/* New Feature List Layout */}
      <div className="space-y-28 md:space-y-40">
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