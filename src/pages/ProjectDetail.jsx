import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects"; // ✅ Import same data

const ProjectDetail = () => {
  const { id } = useParams();
  // Ensure 'id' is treated as a number for comparison
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      // UPDATED: Themed "Not Found" state
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
    // UPDATED: Changed background, text color, and base font
    <section className="min-h-screen bg-[#F5EFE6] text-[#1F1F1F] py-20 px-6 flex flex-col items-center pt-28 font-['Inter',_sans-serif]">
      
      {/* Project Images Grid */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Use project.images array, or fallback to the single project.image */}
        {(project.images || [project.image]).slice(0, 4).map((img, idx) => (
          <div
            key={idx}
            // UPDATED: Light theme for image card
            className="rounded-2xl shadow-lg overflow-hidden bg-white border border-[#C0B6A1]/50"
          >
            <img
              src={img}
              alt={`${project.title} ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* REMOVED the text caption from under the image. 
              It was redundant as the main project title is already below.
              This creates a cleaner, more minimalist look.
            */}
          </div>
        ))}
      </motion.div>

      {/* Details */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-12 max-w-3xl space-y-6 text-center"
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
          // UPDATED: Themed button (pill shape)
          className="inline-block mt-8 px-8 py-3 bg-[#C0B6A1] text-[#1F1F1F] font-semibold rounded-full hover:bg-[#D9CBB3] transition-colors"
        >
          ← Back to Projects
        </Link>
      </motion.div>
    </section>
  );
};

export default ProjectDetail;