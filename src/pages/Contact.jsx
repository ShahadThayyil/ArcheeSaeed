import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- Parallax Values (Unchanged) ---
  const leftY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // --- THEME VARIABLES (Updated to Dark Theme) ---
  const BACKGROUND_COLOR = "#1a1a1a";
  const HEADING_COLOR = "#FFFFFF";
  const ACCENT_COLOR = "#6b7280"; // Muted gray
  const TEXT_COLOR = "#9ca3af";    // Light gray
  const CARD_BG = "transparent"; // No more glassmorphism

  // Formspree integration (Unchanged)
  const [state, handleSubmit] = useForm("mblazayk"); // Keep your Formspree ID
  const [showPopup, setShowPopup] = useState(false);

  // Controlled inputs (Unchanged)
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field
  });

  // Sanitize input (Unchanged)
  const sanitizeInput = (value) => {
    return value.replace(/[<>\/"'`]/g, "");
  };

  // Handle input change (Unchanged)
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: sanitizeInput(e.target.value) });
  };

  // Validate form (Unchanged)
  const validateForm = () => {
    const { website } = formValues;
    if (website) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.name || !emailRegex.test(formValues.email) || !formValues.message) return false;
    return true;
  };

  // Handle submit (Unchanged)
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Use the modern popup instead of alert()
      setShowPopup(true); 
      // You might want a different message for validation failure
      return; 
    }
    handleSubmit(e);
  };

  // Clear + popup after success (Unchanged)
  useEffect(() => {
    if (state.succeeded) {
      setShowPopup(true);
      setFormValues({ name: "", email: "", message: "", website: "" });
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  return (
    <section
      ref={containerRef} // Attach ref
      className="relative w-full min-h-screen overflow-hidden py-8 font-['Inter',_sans-serif]"
      style={{ backgroundColor: BACKGROUND_COLOR, color: HEADING_COLOR }}
    >
      {/* Subtle gradient background (Updated for dark) */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(107, 114, 128, 0.1), transparent 70%), radial-gradient(circle at 70% 80%, rgba(156, 163, 175, 0.1), transparent 70%)",
        }}
      ></div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-16 py-20 items-center">
        
        {/* Left side – Text with Parallax */}
        <motion.div
          style={{ y: leftY }} // Apply Parallax
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white font-['Playfair_Display',_serif]">
            Let’s Connect
          </h1>
          {/* FONT UPDATED */}
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light font-sans">
            Whether you’re looking to start a project, have a question, or just
            want to say hello — feel free to drop me a message. I’ll get back as
            soon as I can.
          </p>

          {/* Social Links (Restyled for dark) */}
          <div className="flex gap-5 pt-6">
            {[
              { icon: <FaInstagram />, link: "https://www.instagram.com/archizaid/" },
              { icon: <FaFacebookF />, link: "https://facebook.com" },
              { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/mohammed-saeed-a7b494347?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors text-xl"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right side – Contact Form (Restyled for dark/flat) */}
        <motion.form
          style={{ y: rightY }} // Apply Parallax
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          // REMOVED glassmorphism, ADDED flat styles
          className="w-full border border-gray-700 p-8"
        >
          {/* Honeypot (hidden field) */}
          <input type="text" name="website" style={{ display: "none" }} value={formValues.website} onChange={handleChange} />

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-400">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                placeholder="Your name"
                // UPDATED input styles
                className="w-full p-3 bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder:text-gray-500"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                placeholder="you@example.com"
                // UPDATED input styles
                className="w-full p-3 bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder:text-gray-500"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formValues.message}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                placeholder="Write your message..."
                // UPDATED input styles
                className="w-full p-3 bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder:text-gray-500"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <motion.button
              type="submit"
              disabled={state.submitting}
              // UPDATED button styles
              className="w-full py-3 px-6 bg-white text-black disabled:opacity-50 font-semibold tracking-wide transition-all"
              whileHover={{ scale: 1.03, opacity: 0.8 }}
              whileTap={{ scale: 0.95 }}
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* Modern Popup (Already dark, looks good) */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-5 right-5 bg-[#2a2a2a] text-white px-6 py-3 shadow-2xl z-50" // Matched bg
          >
            {state.succeeded ? "Message sent successfully!" : "Please fill out all fields correctly."}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}