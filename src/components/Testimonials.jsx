import { motion } from "framer-motion";
import { testimonials } from '../data/testimonials'; // Assuming testimonials data is available

const Testimonials = () => {
  return (
    // UPDATED: Changed background, base text color, and base font
    <section className="w-full py-20 px-6 bg-[#F5EFE6] text-[#1F1F1F] font-['Inter',_sans-serif] ">
     
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          // UPDATED: Changed border color
          className="rounded-2xl border border-[#C0B6A1] p-8 flex flex-col justify-between"
        >
          <div>
            {/* UPDATED: Changed styling to be a muted, uppercase "badge" */}
            <h3 className="text-[#1F1F1F] opacity-80 font-medium tracking-wider uppercase font-['Cormorant_Garamond',serif]">
              WILSON BROCK ®
            </h3>
            {/* UPDATED: Added Playfair Display font for the main heading */}
            <h2 className="text-3xl  font-bold mt-4 font-['Playfair_Display',_serif]">
              My Success Stories
            </h2>
          </div>
          {/* UPDATED: Changed text to be light and slightly transparent */}
          <p className="text-[#1F1F1F] opacity-80 text-sm mt-6 font-light font-['Rubik',cursive]">
            I take pride in collaborating with a diverse range of clients, from
            ambitious startups to established enterprises.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            // UPDATED: Changed card logic to fit the new theme
            // t.dark will now be a high-contrast dark card
            // !t.dark will be a clean white card
            className={`rounded-2xl p-8 flex flex-col justify-between shadow-lg ${
              t.dark
                ? "bg-[#1F1F1F] text-white" // Dark contrast card
                : "bg-white text-[#1F1F1F]" // Clean white card
            }`}
          >
            {/* Stars */}
            {/* UPDATED: Changed star color to the theme's accent */}
            <div className="flex gap-1 text-[#C0B6A1] mb-4">
              {Array.from({ length: t.stars }).map((_, idx) => (
                <span key={idx}>★</span>
              ))}
            </div>

            {/* Quote */}
            {/* UPDATED: Added font-light for the quote text */}
            <p className="text-sm leading-relaxed mb-6 font-light font-['Rubik',cursive]">"{t.text}"</p>

            {/* Profile */}
            {/* UPDATED: Changed border color to a muted accent */}
            <div className="flex items-center gap-3 border-t pt-4 border-[#C0B6A1]/50 font-['Cormorant_Garamond',serif]">
              <img
                src={t.img}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold">{t.name}</h4>
                {/* UPDATED: Changed text color to use opacity for flexibility on light/dark cards */}
                <p className="text-xs opacity-70">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
};

export default Testimonials;