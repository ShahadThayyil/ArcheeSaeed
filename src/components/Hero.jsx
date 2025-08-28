import { motion } from "framer-motion";

const Hero = () => {
  return (
   
   <section className="relative flex flex-col min-h-screen w-full bg-black overflow-hidden pt-[80px] px-6 py-8">
  {/* Navbar stays at the very top */}


  {/* Background Large Text */}
<h1 className="absolute top-28 left-1/2 -translate-x-1/2 text-white font-extrabold leading-none 
  text-[70px] md:text-[140px] lg:text-[200px] text-center z-0 opacity-90 tracking-tight pointer-events-none select-none">
  ARCHEE <br /> SAEED
</h1>

{/* Hero Content */}
<div className="relative z-0 flex flex-col items-center justify-center text-center flex-grow mt-10">
  
  {/* Profile Image */}
  <motion.img
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    src="/profile.png"
    alt="Profile"
    className="w-[220px] md:w-[320px] lg:w-[380px] rounded-xl object-cover shadow-lg"
  />

  {/* Subtitle Text */}
 <p className="mt-10 max-w-xl text-gray-300 text-sm md:text-base lg:text-lg px-4 relative z-20">
  We craft timeless architectural designs that blend creativity, functionality, and sustainability to shape spaces that inspire and endure.
</p>

  {/* CTA Button */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="mt-6 px-6 py-3 rounded-full bg-green-400 text-black font-semibold hover:bg-green-500 transition relative z-30"
  >
    Schedule a consultation
  </motion.button>
</div>

</section>

  );
};

export default Hero;