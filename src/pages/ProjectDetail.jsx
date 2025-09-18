import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "./Projects"; // ✅ Import same data

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-3xl font-bold">Project Not Found</h2>
        <Link to="/projects" className="text-green-400 underline mt-4 block">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 flex flex-col items-center pt-28">
      {/* Project Images Grid */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {(project.images || [project.image]).slice(0, 4).map((img, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-2xl overflow-hidden bg-gray-800"
          >
            <img
              src={img}
              alt={`${project.title} ${idx + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-green-400">
                {project.title}
              </h3>
            </div>
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400">
          {project.title}
        </h1>
        <p className="text-gray-300 text-lg">{project.description}</p>

        <ul className="space-y-3 text-gray-400 list-disc list-inside text-left">
          {project.points.map((point, idx) => (
            <li key={idx} className="text-base md:text-lg">
              {point}
            </li>
          ))}
        </ul>

        <Link
          to="/projects"
          className="inline-block mt-6 px-6 py-3 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition"
        >
          ← Back to Projects
        </Link>
      </motion.div>
    </section>
  );
};

export default ProjectDetail;
