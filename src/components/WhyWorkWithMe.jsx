import { motion } from "framer-motion";
import { BorderBeam } from "../components/animations/BorderBeam";
import { features } from "../data/features";

const WhyWorkWithMe = ()=>{
return (
   <section className="w-full bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 md:px-16">
  {/* Heading */}
  <motion.h2
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-3xl md:text-5xl font-bold text-center mb-14"
  >
    Why Work With <span className="text-green-400">Me</span>
  </motion.h2>

  {/* Cards */}
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
    {features.map((feature, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative group bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-gray-700 flex flex-col items-center text-center transform perspective-1000 overflow-hidden"
      >
        {/* Animated Border Beam */}
        <BorderBeam
          size={45}
          duration={6}
          delay={0}
          colorFrom="#22c55e"
          colorTo="#10b981"
          reverse={false}
          initialOffset={0}
          borderThickness={2}
          opacity={1}
          glowIntensity={8}
          beamBorderRadius={45}
          pauseOnHover={false}
          speedMultiplier={1}
        />

        {/* Card Content */}
        <div className="relative z-10">
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-300 text-sm">{feature.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>

  );
}

export default WhyWorkWithMe;