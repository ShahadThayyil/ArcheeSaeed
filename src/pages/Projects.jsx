import { useEffect } from "react";
import { motion } from "framer-motion";
// import { BorderBeam } from "../components/animations/BorderBeam"; // Removed
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const Projects = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    // 1. APPLIED DARK THEME
    <section className="min-h-screen bg-[#1a1a1a] text-white py-28 px-6 md:px-16 font-['Inter',_sans-serif] relative overflow-hidden">
      
      {/* Background decorative glass orbs (Made slightly more subtle) */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-[#C0B6A1]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-96 right-20 w-96 h-96 bg-[#9A9184]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-[#D9CBB3]/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* 2. REPLACED WITH STANDARD MODERN HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-20 md:mb-24" // Changed alignment
        >
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-600 mb-6">
            (07)
          </h3>
          <h1 className="text-5xl md:text-7xl font-bold uppercase text-white font-['Playfair_Display',_serif]">
            ELEVATING <br /> SPACES
          </h1>
          {/* 3. UPDATED FONT FOR SUBTITLE */}
          <p className="text-gray-400 font-sans font-light mt-8 text-lg md:text-xl max-w-3xl">
            Explore my curated collection of architectural & interior design
            projects that blend creativity, innovation, and modern aesthetics.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              // 4. REMOVED HOVER (y: -8) for a flatter look
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              // 5. REMOVED ALL GLASS/SHADOW/ROUNDED STYLES
              className="relative group border border-gray-700"
            >
              <Link to={`/projects/${project.id}`} className="block">
                
                {/* 6. REMOVED Glassmorphism wrapper div */}
                {/* 7. REMOVED BorderBeam */}

                {/* Project Image */}
                <div className="overflow-hidden relative">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* 8. REMOVED Gradient overlay */}
                </div>

                {/* Content Area */}
                {/* 9. REMOVED Glass effects from content area */}
                <div className="relative p-6">
                  
                  {/* 10. REMOVED Shine effect separator */}
                  
                  <h3 className="text-xl font-semibold mb-3 text-white font-['Playfair_Display',_serif]">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-[#C0B6A1] font-sans font-light text-sm 
                                    group-hover:text-white group-hover:translate-x-1 
                                    transition-all duration-300">
                    <span>View Project</span>
                    <FiExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* 11. REMOVED Glossy reflection & Outer glow */}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;