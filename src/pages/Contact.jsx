import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// UPDATED: Icons for consistency
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  const [offsetY, setOffsetY] = useState(0);

  // Formspree integration
  const [state, handleSubmit] = useForm("mblazayk"); // Your Formspree ID
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
    return value.replace(/[<>\/"'`]/g, ""); // remove harmful characters
  };

  // Handle input change
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: sanitizeInput(e.target.value) });
  };

  // Validate form
  const validateForm = () => {
    const { name, email, message, website } = formValues;
    if (website) return false; // Honeypot filled → bot detected
    if (!name || !email || !message) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
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
      setFormValues({ name: "", email: "", message: "", website: "" }); // reset inputs
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  // Parallax effect
  const handleScroll = () => setOffsetY(window.scrollY);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // UPDATED: Changed background, text color, and base font
    <section className="relative w-full min-h-screen bg-[#F5EFE6] text-[#1F1F1F] overflow-hidden py-8 font-['Inter',_sans-serif]">
      {/* Subtle gradient background */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          transform: `translateY(${offsetY * 0.2}px)`,
          // UPDATED: Changed gradient to match theme
          background:
            "radial-gradient(circle at 30% 20%, rgba(217, 203, 179, 0.4), transparent 70%), radial-gradient(circle at 70% 80%, rgba(192, 182, 161, 0.3), transparent 70%)",
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
          {/* UPDATED: Changed font and color */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1F1F1F] font-['Playfair_Display',_serif]">
            Let’s Connect
          </h1>
          {/* UPDATED: Changed font and color */}
          <p className="text-lg md:text-xl text-[#1F1F1F] opacity-80 leading-relaxed font-light font-['Rubik',cursive]">
            Whether you’re looking to start a project, have a question, or just
            want to say hello — feel free to drop me a message. I’ll get back as
            soon as I can.
          </p>

          {/* Social Links */}
          {/* UPDATED: Restyled to match the theme's round buttons */}
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
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#C0B6A1] hover:bg-[#D9CBB3] text-white hover:text-white transition-colors text-xl"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right side – Contact Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          // UPDATED: Changed to light-theme "frosted glass" card
          className="w-full bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-[#C0B6A1]/50"
        >
          {/* Honeypot (hidden field) */}
          <input type="text" name="website" style={{ display: "none" }} value={formValues.website} onChange={handleChange} />

          <div className="space-y-6">
            <div>
              {/* UPDATED: Label color */}
              <label className="block mb-2 text-sm text-[#1F1F1F] opacity-80">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                placeholder="Your name"
                // UPDATED: Input styling
                className="w-full p-3 rounded-lg bg-white/50 border border-[#C0B6A1] focus:outline-none focus:ring-2 focus:ring-[#C0B6A1] focus:border-transparent text-[#1F1F1F] placeholder:text-[#1F1F1F]/60"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div>
              {/* UPDATED: Label color */}
              <label className="block mb-2 text-sm text-[#1F1F1F] opacity-80">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                placeholder="you@example.com"
                // UPDATED: Input styling
                className="w-full p-3 rounded-lg bg-white/50 border border-[#C0B6A1] focus:outline-none focus:ring-2 focus:ring-[#C0B6A1] focus:border-transparent text-[#1F1F1F] placeholder:text-[#1F1F1F]/60"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div>
              {/* UPDATED: Label color */}
              <label className="block mb-2 text-sm text-[#1F1F1F] opacity-80">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formValues.message}
                onChange={handleChange}
                onPaste={(e) => e.preventDefault()}
                placeholder="Write your message..."
                // UPDATED: Input styling
                className="w-full p-3 rounded-lg bg-white/50 border border-[#C0B6A1] focus:outline-none focus:ring-2 focus:ring-[#C0B6A1] focus:border-transparent text-[#1F1F1F] placeholder:text-[#1F1F1F]/60"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <motion.button
              type="submit"
              disabled={state.submitting}
              // UPDATED: Button styling
              className="w-full py-3 px-6 bg-[#C0B6A1] hover:bg-[#D9CBB3] disabled:opacity-50  text-white rounded-lg font-semibold tracking-wide transition shadow-md"
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
            // UPDATED: Themed popup (dark for high-contrast "toast")
            className="fixed top-5 right-5 bg-[#1F1F1F] text-white px-6 py-3 rounded-xl shadow-2xl z-50"
          >
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}