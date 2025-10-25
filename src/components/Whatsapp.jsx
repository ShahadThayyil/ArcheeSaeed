// src/components/WhatsAppButton.jsx
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "919400987747"; // replace with your WhatsApp number (with country code)
  const message = "Hello, I’d like to know more about your Architecture services!";

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
     className="fixed bottom-8 right-18 z-50 p-4 bg-green-500 rounded-full shadow-2xl flex items-center justify-center"
      whileHover={{ scale: 1.15, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      style={{
        boxShadow: "0 10px 25px rgba(37, 211, 102, 0.5)",
      }}
    >
      <FaWhatsapp className="text-white text-3xl" />
    </motion.a>
  );
}
