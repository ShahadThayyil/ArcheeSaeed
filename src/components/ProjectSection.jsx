import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

// --- Data Preparation ---
const latestProjects = [...projects]
  .sort((a, b) => b.id - a.id)
  .slice(0, 6);

// --- Parallax Card Component with Dramatic 3D Effect ---
const ParallaxProjectCard = ({ project, index }) => {
  const { scrollYProgress } = useScroll();

  // 1. Vertical Parallax (Staggered up/down movement)
  const transformRangeY = index % 2 === 0 ? [0, 100] : [0, -100];
  const y = useTransform(scrollYProgress, [0, 1], transformRangeY);

  // 2. 3D Scroll Transformation (Fly-in/Scale/Rotation)
  // This transformation makes the card look like it's rotating into view from the bottom.
  // We use the scrollYProgress, but adjust the input range to apply the effect only near the bottom of the viewport.
  // The input range is a guess and may need slight tuning based on screen size.
  const inputRange = [0, 0.5]; // Apply the effect until roughly 50% of the page is scrolled

  // Scale: starts smaller (0.8) and grows to full size (1)
  const scale = useTransform(scrollYProgress, inputRange, [0.8, 1]);

  // Rotation: starts tilted (e.g., 5 degrees) and straightens out (0 degrees)
  // This gives the card a subtle 3D spin effect.
  const rotateRange = index % 2 === 0 ? [5, 0] : [-5, 0]; // Alternating rotation based on column
  const rotateZ = useTransform(scrollYProgress, inputRange, rotateRange);
  
  // Opacity: starts low (0) and fades in (1)
  const opacity = useTransform(scrollYProgress, inputRange, [0.3, 1]);


  const description = project.description || "A stunning example of modern interior design and architectural brilliance.";
  const isLeftColumn = index % 2 === 0;

  return (
    // Apply combined motion styles: vertical offset (y), scale, rotation, and opacity
    <motion.div
      style={{ y, scale, rotateZ, opacity }}
      className={`relative group rounded-3xl overflow-hidden cursor-pointer w-full 
                  perspective-[1000px] transition-transform duration-500 ease-out
                  ${isLeftColumn ? 'lg:mr-auto' : 'lg:ml-auto'}`}
    >
      {/* Enhanced Glassmorphism card with theme gradient (Same as before) */}
      <div className="relative h-full rounded-3xl overflow-hidden
                       bg-gradient-to-br from-[#C0B6A1]/40 via-white/30 to-[#9A9184]/25
                       backdrop-blur-xl backdrop-saturate-180
                       border border-white/50
                       shadow-[0_12px_40px_0_rgba(31,31,31,0.15)]
                       hover:shadow-[0_24px_60px_0_rgba(31,31,31,0.25)]
                       hover:border-white/70
                       transition-all duration-700 ease-out">

        {/* Project Image */}
        <motion.div className="relative overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-72 object-cover transform group-hover:scale-105
                         transition-transform duration-700 ease-out"
            whileHover={{ rotate: 0.5, scale: 1.05 }}
          />
          {/* Subtle dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
                           opacity-70 transition-opacity duration-500"></div>
        </motion.div>

        {/* Content Area with Glass Effect */}
        <div className="relative p-8 text-[#1F1F1F]">
          {/* Shine effect separator */}
          <div className="absolute top-0 left-0 right-0 h-[2px]
                           bg-gradient-to-r from-transparent via-[#C0B6A1]/80 to-transparent"></div>

          <h3 className="text-2xl font-bold font-['Playfair_Display',_serif] mb-3 leading-snug">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-base text-[#1F1F1F]/80 mb-6 h-12 overflow-hidden line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* View Project Link - styled as a modern button-link */}
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center justify-center min-w-[150px]
                        px-5 py-2 border-2 border-[#C0B6A1] rounded-full
                        text-[#C0B6A1] font-semibold transition-all duration-300
                        hover:bg-[#C0B6A1] hover:text-white hover:shadow-lg"
          >
            Explore Details <ExternalLink className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Subtle Outer glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                      transition-opacity duration-700 pointer-events-none -z-10
                      bg-gradient-to-br from-[#C0B6A1]/40 via-[#9A9184]/30 to-transparent
                      blur-3xl scale-105"></div>
    </motion.div>
  );
};

// --- Main Project Section Component (Layout is kept the same) ---
const ProjectSection = () => {
  const column1Projects = latestProjects.filter((_, idx) => idx % 2 === 0);
  const column2Projects = latestProjects.filter((_, idx) => idx % 2 !== 0);

  return (
    <section
      className="w-full py-24 px-6 md:px-12 bg-[#F5EFE6] relative overflow-hidden"
      style={{
        color: "#1F1F1F",
      }}
    >
      {/* Background decorative glass orbs (same as before) */}
      <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-[#C0B6A1]/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-[#9A9184]/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading (same as before) */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-['Playfair_Display',_serif] md:text-6xl font-extrabold text-[#1F1F1F] text-center mb-20"
        >
          Featured <span className="text-[#C0B6A1]">Works</span>
        </motion.h2>

        {/* New Staggered Two-Column Layout (same as before) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24">
          {/* Column 1 (Left) */}
          <div className="space-y-16 lg:space-y-24">
            {column1Projects.map((project, idx) => (
              <ParallaxProjectCard key={project.id} project={project} index={idx * 2} />
            ))}
          </div>

          {/* Column 2 (Right) - Starts lower for a more dynamic, modern look */}
          <div className="space-y-16 lg:space-y-24 lg:pt-24">
            {column2Projects.map((project, idx) => (
              <ParallaxProjectCard key={project.id} project={project} index={idx * 2 + 1} />
            ))}
          </div>
        </div>

        {/* Call to action (same as before) */}
        <div className="text-center mt-24">
          <Link
            to="/projects"
            className="inline-block px-10 py-4 text-xl font-bold rounded-full
                        text-white bg-[#C0B6A1] hover:bg-[#9A9184] transition duration-500
                        shadow-xl hover:shadow-2xl
                        relative overflow-hidden group/btn tracking-wider"
          >
            <span className="relative z-10">View All Projects</span>
            {/* Hover shine effect */}
            <span className="absolute inset-0 block bg-gradient-to-r from-white/20 to-transparent
                             transform -skew-x-12 translate-x-[-150%] transition-transform duration-700
                             group-hover/btn:translate-x-[150%]"></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;