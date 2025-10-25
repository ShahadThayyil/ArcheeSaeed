import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom"; 
import { projects } from "../data/projects";

const latestProjects = [...projects]
  .sort((a, b) => b.id - a.id)
  .slice(0, 6);

const ProjectSection = () => {
  return (
    <section
      className="w-full py-20 px-6 md:px-16 bg-[#F5EFE6]"
      style={{
       
        color: "#1F1F1F",
      }}
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl font-['Playfair_Display',_serif] md:text-5xl font-bold text-gray-900 text-center mb-14"
      >
        Elevating Spaces with{" "}
        <span className="text-[#C0B6A1] font-['Playfair_Display',_serif]">Design Brilliance</span>
      </motion.h2>

      {/* Project Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {latestProjects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group rounded-2xl overflow-hidden shadow-lg
              border border-white/20 bg-white/20 backdrop-blur-xl
              hover:shadow-2xl transition-all duration-500
              perspective-1000"
          >
            {/* Project Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-700 ease-out rounded-xl"
              whileHover={{ rotateZ: 1 }}
            />

            {/* Overlay / Always visible on mobile */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t from-white/30 via-white/10 to-transparent
                flex flex-col justify-end p-6
                opacity-100 md:opacity-0 md:group-hover:opacity-100
                transition duration-500
              "
            >
              <h3 className="text-sm md:text-sm font-semibold text-[#1f1f1f]">
                {project.title}
              </h3>
              <Link
                to={`/projects/${project.id}`}
                className="mt-3 inline-flex items-center text-[#ffffff] hover:text-[#D9CBB3] transition"
              >
                View Project <ExternalLink className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
