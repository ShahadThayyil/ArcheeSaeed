// import React from "react";
// import { motion } from "framer-motion";
// import { BorderBeam } from "../components/animations/BorderBeam"; // adjust path
// import { FiExternalLink } from "react-icons/fi";

// const projects = [
//   {
//     title: "Luxury Interior Design",
//     image: "/images/project1.jpg",
//     link: "#",
//   },
//   {
//     title: "Urban Apartment Complex",
//     image: "/images/project2.jpg",
//     link: "#",
//   },
//   {
//     title: "Modern Villa",
//     image: "/images/project3.jpg",
//     link: "#",
//   },
//   {
//     title: "Contemporary Architecture",
//     image: "/images/project4.jpg",
//     link: "#",
//   },
// ];

// const Projects = () => {
//   return (
//     <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 md:px-16">
//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center mb-16"
//       >
//         <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
//           Elevating Spaces with{" "}
//           <span className="text-green-400">Design Brilliance</span>
//         </h1>
//         <p className="text-gray-400 mt-4 text-lg md:text-xl max-w-3xl mx-auto">
//           Explore my curated collection of architectural & interior design
//           projects that blend creativity, innovation, and modern aesthetics.
//         </p>
//       </motion.div>

//       {/* Projects Grid */}
//       <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
//         {projects.map((project, idx) => (
//           <motion.a
//             key={idx}
//             href={project.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.05, rotateY: 5 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             viewport={{ once: true }}
//             className="relative group rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-lg shadow-xl border border-gray-700 transform perspective-1000"
//           >
//             {/* Border Beam Glow */}
//             <BorderBeam
//               size={45}
//               duration={6}
//               colorFrom="#22c55e"
//               colorTo="#10b981"
//               glowIntensity={8}
//               beamBorderRadius={20}
//               speedMultiplier={1.2}
//             />

//             {/* Project Image */}
//             <div className="overflow-hidden rounded-2xl">
//               <motion.img
//                 src={project.image}
//                 alt={project.title}
//                 className="w-full h-60 object-cover rounded-2xl"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>

//             {/* Overlay Content */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
//               <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//               <div className="flex items-center gap-2 text-green-400 font-medium">
//                 <span>View Project</span>
//                 <FiExternalLink />
//               </div>
//             </div>
//           </motion.a>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Projects;

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "../components/animations/BorderBeam"; // adjust path
import { FiExternalLink } from "react-icons/fi";

const projects = [
  {
    title: "Luxury Interior Design",
    image: "/images/project1.jpg",
    link: "#",
  },
  {
    title: "Urban Apartment Complex",
    image: "/images/project2.jpg",
    link: "#",
  },
  {
    title: "Modern Villa",
    image: "/images/project3.jpg",
    link: "#",
  },
  {
    title: "Contemporary Architecture",
    image: "/images/project4.jpg",
    link: "#",
  },
];

const Projects = () => {
  // 🔹 Always scroll to top when this component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-28 px-6 md:px-16 ">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Elevating Spaces with{" "}
          <span className="text-green-400">Design Brilliance</span>
        </h1>
        <p className="text-gray-400 mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          Explore my curated collection of architectural & interior design
          projects that blend creativity, innovation, and modern aesthetics.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {projects.map((project, idx) => (
          <motion.a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-lg shadow-xl border border-gray-700 transform perspective-1000"
          >
            {/* Border Beam Glow */}
            <BorderBeam
              size={45}
              duration={6}
              colorFrom="#22c55e"
              colorTo="#10b981"
              glowIntensity={8}
              beamBorderRadius={20}
              speedMultiplier={1.2}
            />

            {/* Project Image */}
            <div className="overflow-hidden rounded-2xl">
              <motion.img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-60 object-cover rounded-2xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <div className="flex items-center gap-2 text-green-400 font-medium">
                <span>View Project</span>
                <FiExternalLink />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;


