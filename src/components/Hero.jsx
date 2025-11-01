import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

// Image URLs and data are unchanged
const sections = [
  {
    title: "Archizaid",
    subtitle: "Turnkey, permit-ready, and built to withstand any storm.",
    imageUrl: "/images/projects/p-1-2.avif",
    showButtons: true,
  },
  {
    title: "Modern Interiors",
    subtitle: "Compact, efficient, and versatile for any location.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    showButtons: false,
  },
  {
    title: "Seamless Integration",
    subtitle: "Spacious living for the whole family, blending with nature.",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    showButtons: false,
  },
  {
    title: "Our Process",
    subtitle: "From design to delivery, we make it simple and seamless.",
    imageUrl: "https://cdn.prod.website-files.com/67e11c3c13c05881cdee49f3/682c93ed47a1a1a6f2a30732_682c934e75bb0176f46b076e_lumara__3d_design_EXT_20FT_view1.avif",
    showButtons: false,
  },
  {
    title: "Get Started",
    subtitle: "Schedule your consultation today and build your future.",
    imageUrl: "https://cdn.prod.website-files.com/67e11c3c13c05881cdee49f3/682c93ed47a1a1a6f2a30732_682c934e75bb0176f46b076e_lumara__3d_design_EXT_20FT_view1.avif",
    showButtons: false,
  },
];

const SectionLayer = ({ section }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Section enters at bottom, exits at top
  });

  // Unblur: Starts blurred (16px), becomes clear (0px) as it reaches the center
  const blur = useTransform(scrollYProgress, [0, 0.5], [16, 0]);
  
  // --- *** MAATTAM IVIDE *** ---
  // Zoom Out: Starts zoomed in (150%), zooms out to normal (100%) as it scrolls
  // Value 1.2-il ninnu 1.5 aakki (Zoom effect koottan)
  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1.0]);
  // --- *** MAATTAM AVASANICHU *** ---

  // Helper to convert number to CSS filter string
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  // Text movement (ithil maattamilla, ithu nallatha)
  const textY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section 
      ref={ref} 
      // overflow-hidden is CRITICAL for the zoom effect to work
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        // h-full will be 100vh, the scale transform makes it bigger
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${section.imageUrl})`,
          // Apply zoom effect
          scale: scale,   
          // Apply unblur effect
          filter: filter, 
        }}
      />
      {/* Dark overlay (ithil maattamilla) */}
      <div className="absolute inset-0 w-full h-full bg-black/40" />

      {/* Content (ithil maattamilla) */}
      <motion.div
        style={{ 
          y: textY, 
          opacity: opacity 
        }}
        // z-10 ensures text is on top of overlay and background
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-8"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          {section.title}
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl font-['Rubik',cursive]">
          {section.subtitle}
        </p>

        {section.showButtons && (
       <div className="flex flex-col sm:flex-row gap-4 mt-8">
  {/* START YOUR BUILD Button with Framer Motion and Shine Effect */}
  <motion.button
    // Add 'group/btn' to make the button a hover group
    className="relative group/btn overflow-hidden px-8 py-3 font-['Rubik',cursive] rounded-md bg-[#1F1F1F] text-[#F5EFE6] font-semibold hover:bg-[#3A3A3A] transition"
    whileHover={{ 
      scale: 1.05, 
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.4)" 
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {/* Button Text - Keep it relatively positioned for the shine to work */}
    <span className="relative z-10">START YOUR BUILD</span>

    {/* Hover shine effect */}
    {/* The transition will trigger when the parent button (group/btn) is hovered */}
    <span 
      className="absolute inset-0 block bg-gradient-to-r from-white/20 to-transparent
                 transform -skew-x-12 translate-x-[-150%] transition-transform duration-700
                 group-hover/btn:translate-x-[150%]"
      aria-hidden="true" // Best practice for purely decorative elements
    ></span>
  </motion.button>

  {/* DISCOVER Button (Unchanged) */}
  <Link to="/discover">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ 
        scale: 0.95, 
        rotate: -1, 
        y: 2
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="px-8 py-3 font-['Rubik',cursive] rounded-md bg-white/90 text-[#1F1F1F] font-semibold hover:bg-white transition"
    >
      DISCOVER
    </motion.button>
  </Link>
</div>
        )}
      </motion.div>
    </section>
  );
};


// Hero Component (ithil maattamilla)
const Hero = () => {
  return (
    <div className="bg-[#F5EFE6]">
      {sections.map((section, index) => (
        <SectionLayer
          key={index}
          section={section}
        />
      ))}
    </div>
  );
};

export default Hero;
