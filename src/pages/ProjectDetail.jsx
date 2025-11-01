import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion"; // ✅ Import useScroll, useTransform
import { projects } from "../data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  // Ensure 'id' is treated as a number for comparison
  const project = projects.find((p) => p.id === parseInt(id));

  // 1. Setup Scroll Hook
  const { scrollYProgress } = useScroll();

  // 2. Define Parallax Transforms for Content Blocks
  // Image Grid (moves slightly up on scroll)
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]); // Moves up by 100px total

  // Details Section (moves slightly down on scroll, or slower up)
  const detailsY = useTransform(scrollYProgress, [0, 1], [0, 50]); // Moves down by 50px total

  if (!project) {
    return (
      // Themed "Not Found" state
      <div className="min-h-screen bg-[#F5EFE6] text-[#1F1F1F] flex flex-col items-center justify-center p-6 font-['Inter',_sans-serif]">
        <h2 className="text-3xl font-bold font-['Playfair_Display',_serif]">
          Project Not Found
        </h2>
        <Link
          to="/projects"
          className="text-[#1F1F1F] opacity-80 underline hover:opacity-100 mt-4 block"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    // Added 'relative overflow-hidden' to section to manage parallax elements
    <section className="min-h-screen bg-[#F5EFE6] text-[#1F1F1F] py-20 px-6 flex flex-col items-center pt-28 font-['Inter',_sans-serif] relative overflow-hidden">
      
      {/* Project Images Grid - Apply parallax to the entire grid */}
      <motion.div
        // Apply Parallax Y transform
        style={{ y: imageY }}
        
        // Initial entrance animation remains
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6 z-10"
      >
        {/* Image Cards */}
        {(project.images || [project.image]).slice(0, 4).map((img, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-lg overflow-hidden bg-white border border-[#C0B6A1]/50"
          >
            <img
              src={img}
              alt={`${project.title} ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </motion.div>

      {/* Details - Apply parallax to the details block */}
      <motion.div
        // Apply Parallax Y transform (moves slower or in the opposite direction)
        style={{ y: detailsY }}
        
        // Initial entrance animation remains
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        
        className="mt-12 max-w-3xl space-y-6 text-center z-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] font-['Playfair_Display',_serif]">
          {project.title}
        </h1>
        <p className="text-[#1F1F1F] opacity-90 text-lg font-light">
          {project.description}
        </p>

        {/* List items */}
        <ul className="space-y-3 text-[#1F1F1F] opacity-80 list-disc list-inside text-left font-light">
          {project.points.map((point, idx) => (
            <li key={idx} className="text-base md:text-lg">
              {point}
            </li>
          ))}
        </ul>

        <Link
          to="/projects"
          className="inline-block mt-8 px-8 py-3 bg-[#C0B6A1] text-[#1F1F1F] font-semibold rounded-full hover:bg-[#D9CBB3] transition-colors"
        >
          ← Back to Projects
        </Link>
      </motion.div>
    </section>
  );
};

export default ProjectDetail;