// 1. Import useRef, useScroll, and useTransform
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { testimonials } from '../data/testimonials'; // Assuming testimonials data is available

const Testimonials = () => {
  // 2. Create a ref to track the main section
  const parallaxRef = useRef(null);

  // 3. Set up the scroll tracking
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"], // Track from when bottom enters to when top leaves
  });

  // 4. Define different transforms for parallax (Kept your logic)
  const introY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    // 5. Add the ref and apply dark theme
    <section
      ref={parallaxRef}
      className="w-full py-20 md:py-32 px-6 md:px-12 bg-[#1a1a1a] text-white font-['Inter',_sans-serif] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Intro Card - RESTYLED as Standard Header */}
        <motion.div
          // 6. Apply the 'introY' parallax style
          style={{ y: introY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center" // Removed card styling
        >
          {/* --- STANDARD MODERN HEADER --- */}
          <div className="text-left">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-600 mb-6">
              (06)
            </h3>
            <h2 className="text-5xl md:text-7xl font-bold uppercase text-white font-['Playfair_Display',_serif]">
              WHAT <br /> THEY SAY
            </h2>
            <p className="font-sans font-light text-gray-400 text-lg md:text-xl mt-8 max-w-2xl">
              A selection of testimonials from clients and partners.
            </p>
          </div>
        </motion.div>

        {/* Testimonial Cards - RESTYLED */}
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            // 7. Apply the 'cardsY' parallax style
            style={{ y: cardsY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            // UPDATED: Removed shadow/rounding, applied flat styles
            className={`p-8 flex flex-col justify-between ${
              t.dark
                ? "bg-[#2a2a2a]" // Darker panel
                : "bg-transparent border border-gray-700" // Transparent w/ border
            }`}
          >
            {/* Stars (Gold color looks good) */}
            <div className="flex gap-1 text-[#C0B6A1] mb-4">
              {Array.from({ length: t.stars }).map((_, idx) => (
                <span key={idx}>★</span>
              ))}
            </div>

            {/* Quote (Font changed) */}
            <p className="text-sm leading-relaxed mb-6 font-sans font-light text-gray-400">
              "{t.text}"
            </p>

            {/* Profile (Fonts and borders updated) */}
            <div className="flex items-center gap-3 border-t pt-4 border-gray-700 font-sans">
              <img
                src={t.img}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;