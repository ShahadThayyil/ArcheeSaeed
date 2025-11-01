import { useEffect } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "../components/animations/BorderBeam";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const Projects = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="min-h-screen bg-[#F5EFE6] text-[#1F1F1F] py-28 px-6 md:px-16 font-['Inter',_sans-serif] relative overflow-hidden">
      
      {/* Background decorative glass orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-[#C0B6A1]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-96 right-20 w-96 h-96 bg-[#9A9184]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-[#D9CBB3]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-['Playfair_Display',_serif]">
            Elevating Spaces with{" "}
            <span className="text-[#C0B6A1] italic">Design Brilliance</span>
          </h1>
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
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative group rounded-3xl cursor-pointer"
            >
              <Link to={`/projects/${project.id}`} className="block">
                {/* Glassmorphism Card */}
                <div className="relative h-full rounded-3xl overflow-hidden
                               bg-gradient-to-br from-[#C0B6A1]/30 via-white/25 to-[#9A9184]/20
                               backdrop-blur-xl backdrop-saturate-150
                               border border-white/40
                               shadow-[0_8px_32px_0_rgba(192,182,161,0.2)]
                               hover:shadow-[0_20px_60px_0_rgba(192,182,161,0.4)]
                               hover:border-white/60
                               transition-all duration-500
                               before:absolute before:inset-0 
                               before:rounded-3xl
                               before:bg-gradient-to-br before:from-white/40 before:via-transparent before:to-[#C0B6A1]/20
                               before:opacity-0 before:transition-opacity before:duration-500
                               hover:before:opacity-100">
                  
                  {/* Border Beam Glow */}
                  <BorderBeam
                    size={45}
                    duration={6}
                    colorFrom="#C0B6A1"
                    colorTo="#D9CBB3"
                    glowIntensity={4}
                    beamBorderRadius={20}
                    speedMultiplier={1.2}
                  />

                  {/* Project Image */}
                  <div className="overflow-hidden relative">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/40 via-transparent to-transparent 
                                   opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  </div>

                  {/* Content Area with Glass Effect */}
                  <div className="relative p-6 
                                 bg-gradient-to-b from-white/60 via-white/50 to-[#F5EFE6]/60
                                 backdrop-blur-md">
                    
                    {/* Shine effect separator */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] 
                                   bg-gradient-to-r from-transparent via-[#C0B6A1]/50 to-transparent"></div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-[#1F1F1F] font-['Playfair_Display',_serif]">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-[#C0B6A1] font-semibold text-sm 
                                   group-hover:text-[#9A9184] group-hover:translate-x-1 
                                   transition-all duration-300">
                      <span>View Project</span>
                      <FiExternalLink className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Glossy reflection effect */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 
                                 bg-gradient-to-b from-white/20 to-transparent 
                                 opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Outer glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                               transition-opacity duration-500 pointer-events-none -z-10
                               bg-gradient-to-br from-[#C0B6A1]/30 via-[#9A9184]/20 to-transparent 
                               blur-2xl scale-105"></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;