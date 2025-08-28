import { motion } from "framer-motion";
import {testimonials} from '../data/testimonials';

const Testimonials = ()=>{
   return (
    <section className="w-full py-20 px-6 bg-[#0e0e0e] text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-gray-700 p-8 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-green-400 font-semibold">WILSON BROCK ®</h3>
            <h2 className="text-3xl font-bold mt-4">My Success Stories</h2>
          </div>
          <p className="text-gray-400 text-sm mt-6">
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
            className={`rounded-2xl p-8 flex flex-col justify-between shadow-lg ${
              t.dark ? "bg-[#111111]" : "bg-white text-black"
            }`}
          >
            {/* Stars */}
            <div className="flex gap-1 text-green-400 mb-4">
              {Array.from({ length: t.stars }).map((_, idx) => (
                <span key={idx}>★</span>
              ))}
            </div>

            {/* Quote */}
            <p className="text-sm leading-relaxed mb-6">"{t.text}"</p>

            {/* Profile */}
            <div className="flex items-center gap-3 border-t pt-4 border-gray-500/30">
              <img
                src={t.img}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold">{t.name}</h4>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;