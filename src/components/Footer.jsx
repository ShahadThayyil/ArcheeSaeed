import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Correctly imported

const Footer = () => {
  return (
    // UPDATED: Changed background, text color, and base font
    <footer className="w-full bg-[#F5EFE6] text-[#1F1F1F] py-20 px-6 font-['Inter',_sans-serif]">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          // UPDATED: Changed border, dot color, and font style
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C0B6A1] text-xs uppercase tracking-wider font-light"
        >
          <span className="w-2 h-2 bg-[#D9CBB3] rounded-full font-['Cormorant_Garamond',serif]"></span>
          Have Project in Mind?
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          // UPDATED: Added Playfair Display font
          className="text-3xl  md:text-5xl font-bold leading-tight mt-6 font-['Playfair_Display',_serif]"
        >
          Let’s Turn your Ideas <br /> into Reality
        </motion.h2>

        {/* Email Link */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          href="mailto:archizaidofficial@gmail.com"
          // UPDATED: Changed text, border, and hover colors
          className="mt-8 inline-block text-lg md:text-xl font-['Cormorant_Garamond',serif] text-[#1F1F1F] opacity-90 border-b border-[#C0B6A1] hover:opacity-70 transition-opacity"
        >
          ↳ archizaidofficial@gmail.com
        </motion.a>

        {/* Bottom Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          // UPDATED: Changed gap and text styling
          className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-light opacity-80"
        >
          {["About", "Projects", "Contact"].map((item) => (
            // UPDATED: Applied styles directly to Link component for proper routing
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="hover:opacity-100 transition-opacity" // On hover, become fully opaque
            >
              {item}
            </Link>
          ))}
        </motion.nav>
      </div>
    </footer>
  );
};

export default Footer;