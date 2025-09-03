// import { useParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { projects } from "./Projects"; // ✅ Import same data

// const ProjectDetail = () => {
//   const { id } = useParams();
//   const project = projects.find((p) => p.id === parseInt(id));

//   if (!project) {
//     return (
//       <div className="text-center text-white py-20">
//         <h2 className="text-3xl font-bold">Project Not Found</h2>
//         <Link to="/projects" className="text-green-400 underline mt-4 block">
//           Back to Projects
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 md:px-16 flex flex-col lg:flex-row gap-12 items-center">
//       {/* Left: Big Image */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="flex-1"
//       >
//         <img
//           src={project.image}
//           alt={project.title}
//           className="rounded-2xl shadow-2xl w-full max-h-[70vh] object-cover"
//         />
//       </motion.div>

//       {/* Right: Details */}
//       <motion.div
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="flex-1 space-y-6"
//       >
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-400">
//           {project.title}
//         </h1>
//         <p className="text-gray-300 text-lg">{project.description}</p>

//         <ul className="space-y-3 text-gray-400 list-disc pl-6">
//           {project.points.map((point, idx) => (
//             <li key={idx} className="text-base md:text-lg">
//               {point}
//             </li>
//           ))}
//         </ul>

//         <Link
//           to="/projects"
//           className="inline-block mt-6 px-6 py-3 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition"
//         >
//           ← Back to Projects
//         </Link>
//       </motion.div>
//     </section>
//   );
// };

// export default ProjectDetail;
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
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 flex flex-col items-center justify-center text-center pt-32">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl"
      >
        <img
          src={project.image}
          alt={project.title}
          className="rounded-2xl shadow-2xl w-full max-h-[70vh] object-cover mx-auto"
        />
      </motion.div>

      {/* Details */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-10 max-w-2xl space-y-6"
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
