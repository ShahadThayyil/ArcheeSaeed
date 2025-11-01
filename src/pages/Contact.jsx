import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  const containerRef = useRef(null); 
  // Get scroll progress relative to the container, starting when the section enters the viewport
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start end", "end start"] 
  });

  // --- Parallax Values (to match the previous subtle parallax) ---
  // Left Text: Moves up slightly (negative Y) over the scroll distance
  const leftY = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Reduced movement
  // Right Form: Moves down slightly (positive Y) over the scroll distance
  const rightY = useTransform(scrollYProgress, [0, 1], [50, -50]); // Reduced movement

  // --- THEME VARIABLES (Restored to the light, earthy, glassmorphism theme) ---
  const BACKGROUND_COLOR = "#F5EFE6"; // Light background used in your initial code
  const HEADING_COLOR = "#1F1F1F";   // Dark text/heading color
  const ACCENT_COLOR = "#C0B6A1";    // Muted light brown/tan for buttons/accents
  const TEXT_COLOR = "#1F1F1F";
  const CARD_BG = "rgba(255, 255, 255, 0.7)"; // Light Glassmorphism background

  // Formspree integration
  const [state, handleSubmit] = useForm("mblazayk");
  const [showPopup, setShowPopup] = useState(false);

  // Controlled inputs
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field
  });

  // Sanitize input
  const sanitizeInput = (value) => {
    return value.replace(/[<>\/"'`]/g, ""); 
  };

  // Handle input change
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: sanitizeInput(e.target.value) });
  };

  // Validate form
  const validateForm = () => {
    const { website } = formValues;
    if (website) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.name || !emailRegex.test(formValues.email) || !formValues.message) return false;
    return true;
  };

  // Handle submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please enter valid details!");
      return;
    }
    handleSubmit(e);
  };

  // Clear + popup after success
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
      ref={containerRef} // Attach ref for scroll tracking
      className="relative w-full min-h-screen overflow-hidden py-8 font-['Inter',_sans-serif]"
      style={{ backgroundColor: BACKGROUND_COLOR, color: HEADING_COLOR }}
    >
      
      {/* Subtle gradient background (Static - using the original colors) */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(217, 203, 179, 0.4), transparent 70%), radial-gradient(circle at 70% 80%, rgba(192, 182, 161, 0.3), transparent 70%)",
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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1F1F1F] font-['Playfair_Display',_serif]">
            Let’s Connect
          </h1>
          <p className="text-lg md:text-xl text-[#1F1F1F] opacity-80 leading-relaxed font-light font-['Rubik',cursive]">
            Whether you’re looking to start a project, have a question, or just
            want to say hello — feel free to drop me a message. I’ll get back as
            soon as I can.
          </p>

          {/* Social Links (Original colors and styling restored) */}
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
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#C0B6A1] hover:bg-[#D9CBB3] text-white transition-colors text-xl"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right side – Contact Form with Parallax (Original Glassmorphism styling restored) */}
        <motion.form
          style={{ y: rightY }} // Apply Parallax
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-[#C0B6A1]/50"
          // style={{ background: CARD_BG }}
        >
          {/* Honeypot (hidden field) */}
          <input type="text" name="website" style={{ display: "none" }} value={formValues.website} onChange={handleChange} />

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-[#1F1F1F] opacity-80">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                placeholder="Your name"
                className="w-full p-3 rounded-lg bg-white/50 border border-[#C0B6A1] focus:outline-none focus:ring-2 focus:ring-[#C0B6A1] focus:border-transparent text-[#1F1F1F] placeholder:text-[#1F1F1F]/60"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div>
              <label className="block mb-2 text-sm text-[#1F1F1F] opacity-80">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg bg-white/50 border border-[#C0B6A1] focus:outline-none focus:ring-2 focus:ring-[#C0B6A1] focus:border-transparent text-[#1F1F1F] placeholder:text-[#1F1F1F]/60"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div>
              <label className="block mb-2 text-sm text-[#1F1F1F] opacity-80">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formValues.message}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                placeholder="Write your message..."
                className="w-full p-3 rounded-lg bg-white/50 border border-[#C0B6A1] focus:outline-none focus:ring-2 focus:ring-[#C0B6A1] focus:border-transparent text-[#1F1F1F] placeholder:text-[#1F1F1F]/60"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <motion.button
              type="submit"
              disabled={state.submitting}
              className="w-full py-3 px-6 bg-[#C0B6A1] hover:bg-[#D9CBB3] disabled:opacity-50 text-white rounded-lg font-semibold tracking-wide transition shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* Modern Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-5 right-5 bg-[#1F1F1F] text-white px-6 py-3 rounded-xl shadow-2xl z-50"
          >
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}