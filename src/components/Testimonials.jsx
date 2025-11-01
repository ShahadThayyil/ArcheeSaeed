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

  // 4. Define different transforms for parallax
  // The intro card will move slower
  const introY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // The testimonial cards will move faster
  const cardsY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    // 5. Add the ref and overflow-hidden to the main section
    <section 
      ref={parallaxRef}
      className="w-full py-20 px-6 bg-[#F5EFE6] text-[#1F1F1F] font-['Inter',_sans-serif] overflow-hidden"
    >
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Intro Card */}
        <motion.div
          // 6. Apply the 'introY' parallax style
          style={{ y: introY }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-[#C0B6A1] p-8 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[#1F1F1F] opacity-80 font-medium tracking-wider uppercase font-['Cormorant_Garamond',serif]">
              WILSON BROCK ®
            </h3>
            <h2 className="text-3xl font-bold mt-4 font-['Playfair_Display',_serif]">
              My Success Stories
            </h2>
          </div>
          <p className="text-[#1F1F1F] opacity-80 text-sm mt-6 font-light font-['Rubik',cursive]">
            I take pride in collaborating with a diverse range of clients, from
            ambitious startups to established enterprises.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            // 7. Apply the 'cardsY' parallax style to each card
            style={{ y: cardsY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className={`rounded-2xl p-8 flex flex-col justify-between shadow-lg ${
              t.dark
                ? "bg-[#1F1F1F] text-white" // Dark contrast card
                : "bg-white text-[#1F1F1F]" // Clean white card
            }`}
          >
            {/* Stars */}
            <div className="flex gap-1 text-[#C0B6A1] mb-4">
              {Array.from({ length: t.stars }).map((_, idx) => (
                <span key={idx}>★</span>
              ))}
            </div>

            {/* Quote */}
            <p className="text-sm leading-relaxed mb-6 font-light font-['Rubik',cursive]">"{t.text}"</p>

            {/* Profile */}
            <div className="flex items-center gap-3 border-t pt-4 border-[#C0B6A1]/50 font-['Cormorant_Garamond',serif]">
              <img
                src={t.img}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold">{t.name}</h4>
                <p className="text-xs opacity-70">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
};

export default Testimonials;