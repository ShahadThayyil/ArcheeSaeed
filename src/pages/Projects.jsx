import { useEffect } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "../components/animations/BorderBeam";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { projects } from "../data/projects"; // Assuming projects data is available

const Projects = () => {
  // 🔹 Always scroll to top when this component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    // UPDATED: Changed background, text color, and base font
    <section className="min-h-screen bg-[#F5EFE6] text-[#1F1F1F] py-28 px-6 md:px-16 font-['Inter',_sans-serif]">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-['Playfair_Display',_serif]">
          Elevating Spaces with{" "}
          {/* UPDATED: Changed span to be italic to add emphasis */}
          <span className="italic">Design Brilliance</span>
        </h1>
        {/* UPDATED: Changed text color and font weight */}
        <p className="text-[#1F1F1F] font-['Rubik',cursive] opacity-80 mt-4 text-lg md:text-xl max-w-3xl mx-auto font-light">
          Explore my curated collection of architectural & interior design
          projects that blend creativity, innovation, and modern aesthetics.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            // UPDATED: Simplified hover effect
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            // UPDATED: Changed to light theme card styles
            className="relative group rounded-2xl overflow-hidden bg-white shadow-lg border border-[#C0B6A1]/50"
          >
            {/* This Link now wraps the entire card content */}
            <Link to={`/projects/${project.id}`} className="block">
              {/* Border Beam Glow */}
              <BorderBeam
                size={45}
                duration={6}
                // UPDATED: Changed beam colors to match theme
                colorFrom="#C0B6A1"
                colorTo="#D9CBB3"
                glowIntensity={4} // Softened glow
                beamBorderRadius={20}
                speedMultiplier={1.2}
              />

              {/* Project Image */}
              <div className="overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-60 object-cover"
                  // This inner hover scale gives a nice parallax effect with the card scale
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* UPDATED: Content section replaces the dark overlay */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#1F1F1F] font-['Playfair_Display',_serif]">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-[#1F1F1F] opacity-70 font-light text-sm group-hover:opacity-100 transition-opacity">
                  <span>View Project</span>
                  <FiExternalLink />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Removed the 'export { projects }' as it's unconventional to export data from a component file.
export default Projects;