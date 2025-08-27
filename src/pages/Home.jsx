import CardNav from "../components/CardNav";
import logo from "../assets/logo.png"; 
import LightRays from "../components/LightRays";
import TextPressure from "../components/TextPressure";
import StackedCards from "../components/cards/StackedCards";
import Cards from "../components/cards/Cards";
import { motion } from "framer-motion";
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
      ],
    },
  ];

const Home = () => {
  return (
    <main>

   
        
      <Hero />
      {/* <LandingPage /> */}
      <SectionOne />
      <div className="ma h-screen">
        <h1>HELLO WORLD</h1>
      </div>
    </main>
  );
};

const Hero = () => {
  return (
   
   <section className="relative flex flex-col min-h-screen w-full bg-black overflow-hidden pt-[80px] px-6 py-8">
  {/* Navbar stays at the very top */}
  <div className="absolute top-0 left-0 w-full z-20">
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#ffffffff"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  </div>

  {/* Background Large Text */}
<h1 className="absolute top-28 left-1/2 -translate-x-1/2 text-white font-extrabold leading-none 
  text-[70px] md:text-[140px] lg:text-[200px] text-center z-0 opacity-90 tracking-tight pointer-events-none select-none">
  ARCHEE <br /> SAEED
</h1>

{/* Hero Content */}
<div className="relative z-20 flex flex-col items-center justify-center text-center flex-grow mt-10">
  
  {/* Profile Image */}
  <motion.img
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    src="/profile_img.png"
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


const LandingPage = ()=>{
    const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
      ],
    },
  ];
  return(
   <div className="home relative w-full min-h-screen overflow-hidden">
  <div className="absolute inset-0">
  {/* Background image */}
  <img src="/bg-img.jpg" 
    alt="Background image"
    aria-label="Hero-page-background-image"
    className="w-full h-screen object-cover"
  />

  {/* Light rays on top */}
  <div className="absolute inset-0 z-10">
    <LightRays
      raysOrigin="top-center"
      raysColor="#ffff"
      raysSpeed={1.5}
      lightSpread={0.8}
      rayLength={1.2}
      followMouse={true}
      mouseInfluence={0.1}
      noiseAmount={0.1}
      distortion={0.05}
      className="custom-rays"
    />
  </div>
</div>

      {/* Navbar */}
      <div className="navbar ">
       
        <CardNav
          logo={logo}
          logoAlt="Company Logo"
          items={items}
          baseColor="#fff"
          menuColor="#ffffffff"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </div>

      {/* Hero Section */}
<div className="hero flex items-center justify-center min-h-screen relative z-10  px-4">
  {/* Center Text */}
  <div className="texts text-center">
    <h1
      style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "2px" }}
      className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-widest transition-transform duration-500 hover:scale-105 hover:text-indigo-500"
    >
      ARCHEESAEED
    </h1>

    <h3
      style={{ fontFamily: "Raleway, sans-serif" }}
      className="mt-3 text-sm sm:text-base md:text-xl lg:text-2xl text-gray-200 transition-colors duration-500 hover:text-indigo-400"
    >
      It's the best architecture company
    </h3>
  </div>

  {/* Bottom-Right Contact Info */}
  <div className="absolute bottom-4 right-4 text-right space-y-1">
    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 text-white text-xs sm:text-sm">
      {/* Phone */}
      <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-indigo-400">
        <i className="fas fa-phone-alt"></i>
        +91 98765 43210
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com/yourid"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-indigo-400"
      >
        <i className="fab fa-instagram"></i>
        @archeesaeed
      </a>
    </div>
  </div>

  {/* Bottom-Left Designer Name */}
  <div className="absolute bottom-4 left-4 text-left">
    <p
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="text-gray-300 text-xs sm:text-sm tracking-wide"
    >
      Designed by <span className="font-semibold text-white">Saeed</span>
    </p>
  </div>
</div>




    </div> 
  )
}
const SectionOne = () => {
    return(
      <section className="bg-gradient-to-r from-black via-gray-900 to-[#1a0f0f]  ">
           <Cards />
      </section>
    
    )
};
export default Home;