// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// export default function ContactPage() {
//   const [offsetY, setOffsetY] = useState(0);

//   // Track scroll for parallax effect
//   const handleScroll = () => setOffsetY(window.scrollY);
//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="relative w-full min-h-screen bg-black text-gray-200 overflow-hidden">
//       {/* Subtle gradient background */}
//       <div
//         className="absolute top-0 left-0 w-full h-full"
//         style={{
//           transform: `translateY(${offsetY * 0.2}px)`,
//           background:
//             "radial-gradient(circle at 30% 20%, rgba(34,197,94,0.15), transparent 70%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.1), transparent 70%)",
//         }}
//       ></div>

//       {/* Content Grid */}
//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-16 py-20 items-center">
//         {/* Left side – Text */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="space-y-6"
//         >
//           <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white">
//             Let’s Connect
//           </h1>
//           <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
//             Whether you’re looking to start a project, have a question, or just
//             want to say hello — feel free to drop me a message. I’ll get back as
//             soon as I can.
//           </p>

//           {/* Social Links */}
//           <div className="flex space-x-6 pt-6">
//             <a
//               href="mailto:example@email.com"
//               className="text-gray-500 hover:text-green-400 text-2xl transition"
//             >
//               <FaEnvelope />
//             </a>
//             <a
//               href="https://github.com"
//               target="_blank"
//               rel="noreferrer"
//               className="text-gray-500 hover:text-green-400 text-2xl transition"
//             >
//               <FaGithub />
//             </a>
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noreferrer"
//               className="text-gray-500 hover:text-green-400 text-2xl transition"
//             >
//               <FaLinkedin />
//             </a>
//           </div>
//         </motion.div>

//         {/* Right side – Form */}
//         <motion.form
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="w-full bg-gray-900/40 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-800"
//         >
//           <div className="space-y-6">
//             <div>
//               <label className="block mb-2 text-sm text-gray-400">Name</label>
//               <input
//                 type="text"
//                 placeholder="Your name"
//                 className="w-full p-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm text-gray-400">Email</label>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full p-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm text-gray-400">Message</label>
//               <textarea
//                 rows="5"
//                 placeholder="Write your message..."
//                 className="w-full p-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
//               ></textarea>
//             </div>
//             <motion.button
//               type="submit"
//               className="w-full py-3 px-6 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium tracking-wide transition shadow-md"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Send Message
//             </motion.button>
//           </div>
//         </motion.form>
//       </div>
//     </section>
//   );
// }


// ContactPage.jsx
import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  const [offsetY, setOffsetY] = useState(0);

  // Formspree integration
  const [state, handleSubmit] = useForm("xzzadlde");

  const handleScroll = () => setOffsetY(window.scrollY);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black text-gray-200 overflow-hidden py-8">
      {/* Subtle gradient background */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          transform: `translateY(${offsetY * 0.2}px)`,
          background:
            "radial-gradient(circle at 30% 20%, rgba(34,197,94,0.15), transparent 70%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.1), transparent 70%)",
        }}
      ></div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-16 py-20 items-center">
        {/* Left side – Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white">
            Let’s Connect
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Whether you’re looking to start a project, have a question, or just
            want to say hello — feel free to drop me a message. I’ll get back as
            soon as I can.
          </p>

          {/* Social Links */}
          <div className="flex space-x-6 pt-6">
            <a
              href="mailto:example@email.com"
              className="text-gray-500 hover:text-green-400 text-2xl transition"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-green-400 text-2xl transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-green-400 text-2xl transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {/* Right side – Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full bg-gray-900/40 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-800"
        >
          {state.succeeded ? (
            <p className="text-green-400 text-lg">✅ Thanks for your message!</p>
          ) : (
            <div className="space-y-6 ">
              <div>
                <label className="block mb-2 text-sm text-gray-400">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full p-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full p-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                ></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <motion.button
                type="submit"
                disabled={state.submitting}
                className="w-full py-3 px-6 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-lg font-medium tracking-wide transition shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </motion.button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
