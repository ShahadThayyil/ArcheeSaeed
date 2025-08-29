import { motion } from "framer-motion";
import {Link} from "react-router-dom"

const Footer = ()=>{
   return (
    <footer className="w-full bg-[#121212] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gray-600 text-xs uppercase tracking-wide"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          Have Project in Mind?
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold leading-tight mt-6"
        >
          Let’s Turn your Ideas <br /> into Reality
        </motion.h2>

        {/* Email Link */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          href="mailto:hello@wilsonbrock.com"
          className="mt-8 inline-block text-lg md:text-xl text-gray-200 border-b border-gray-600 hover:text-green-400 hover:border-green-400 transition-colors"
        >
          ↳ hello@wilsonbrock.com
        </motion.a>

        {/* Bottom Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
        >
          {[ "About", "Projects", "Contact"].map((item, i) => (
              <Link to={`/${item.toLowerCase()}`}>
                 <a href="" className="hover:text-green-400 transition-colors">{item}</a>
              </Link>
          ))}
        </motion.nav>
      </div>
    </footer>
  );
}

export default Footer;