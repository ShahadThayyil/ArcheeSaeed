import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {projects} from '../data/projects';

const ProjectSection = ()=>{
   return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-16">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-14"
      >
        Elevating Spaces with <span className="text-green-400">Design Brilliance</span>
      </motion.h2>

      {/* Project Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group bg-gray-900/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-gray-700 perspective-1000"
          >
            {/* Project Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-700 ease-out"
              whileHover={{ rotateZ: 1 }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
              <h3 className="text-lg md:text-xl font-semibold">{project.title}</h3>
              <a
                href={project.link}
                className="mt-3 inline-flex items-center text-green-400 hover:text-green-300 transition"
              >
                View Project <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ProjectSection;