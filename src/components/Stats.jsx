import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";


const stats = [
  {
    value: 5,
    suffix: "+",
    title: "Years of Experience",
    desc: "Decades of experience in delivering exceptional projects.",
  },
  {
    value: 50,
    suffix: "+",
    title: "Projects Delivered",
    desc: "Decades of experience in delivering exceptional projects.",
  },
  {
    value: 98,
    suffix: "%",
    title: "Client Satisfaction",
    desc: "I build long-term partnerships through proven results.",
  },
];
const StatsSection = ()=>{
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full py-16 px-6 bg-gradient-to-b from-[#0e0e0e] to-black text-white"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="flex flex-col items-center space-y-3"
          >
            {/* Number */}
            <h2 className="text-4xl md:text-5xl font-bold text-green-400 border-b border-gray-700 pb-2">
              {inView ? (
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
              ) : (
                "0" + stat.suffix
              )}
            </h2>

            {/* Title */}
            <h3 className="text-lg font-semibold">{stat.title}</h3>

            {/* Description */}
            <p className="text-gray-400 text-sm">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;