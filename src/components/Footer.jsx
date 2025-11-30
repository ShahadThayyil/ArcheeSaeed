import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Correctly imported

const Footer = () => {
  return (
    // UPDATED: Changed to dark theme, left-aligned
    <footer className="w-full bg-[#1a1a1a] text-white py-20 px-6 md:px-12 font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto">
        
        {/* --- 1. CALL TO ACTION SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Title (matches other section headers) */}
          <h2 className="text-5xl md:text-7xl font-bold uppercase text-white font-['Playfair_Display',_serif]">
            LET'S TURN <br /> YOUR IDEAS INTO REALITY
          </h2>
          
          {/* Subtitle (thin, sans-serif) */}
          <p className="font-sans font-light text-gray-400 text-lg md:text-xl mt-8 max-w-2xl">
            Have a project in mind? I'm available for freelance work.
          </p>

          {/* Email Link (Large CTA) */}
          <a
            href="mailto:archizaidofficial@gmail.com"
            className="mt-10 inline-block text-lg md:text-xl font-sans font-light text-white border-b border-gray-600 hover:border-white transition-all"
          >
            ↳ archizaidofficial@gmail.com
          </a>
        </motion.div>

        {/* --- 2. BOTTOM BAR (NAV & COPYRIGHT) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 pt-10 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-center md:text-left"
        >
          {/* Copyright */}
          <p className="text-sm font-sans font-light text-gray-500 mb-4 md:mb-0">
            © 2025 ARCHIZAID. All rights reserved.
          </p>

          {/* Bottom Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-sans font-light text-gray-400">
            {["About", "Projects", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;