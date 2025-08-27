import CardNav from "../components/CardNav";
import logo from "../assets/logo.png"; 
import LightRays from "../components/LightRays";
import TextPressure from "../components/TextPressure";
import StackedCards from "../components/cards/StackedCards";
import Cards from "../components/cards/Cards";
import { motion } from "framer-motion";
import { Building2, Users, Lightbulb , ExternalLink } from "lucide-react";
import { FaBehance, FaDribbble, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

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
      <WhyWorkWithMe />
      <ProjectSection />
      <Workflow />
      <Profile />
      <StatsSection />
      <Testimonials />  
      <Footer />
      {/* <SectionOne /> */}
     
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
<div className="relative z-0 flex flex-col items-center justify-center text-center flex-grow mt-10">
  
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
const features = [
  {
    title: "Timeless Design",
    desc: "I create architectural spaces that blend aesthetics, innovation, and functionality to stand the test of time.",
    icon: <Building2 className="w-10 h-10 text-green-400" />,
  },
  {
    title: "Collaborative Process",
    desc: "From concept to construction, I work closely with clients to transform visions into inspiring architectural realities.",
    icon: <Users className="w-10 h-10 text-green-400" />,
  },
  {
    title: "Innovative Thinking",
    desc: "Merging creativity with technology, I design forward-looking spaces that push the boundaries of modern architecture.",
    icon: <Lightbulb className="w-10 h-10 text-green-400" />,
  },
];
const WhyWorkWithMe = ()=>{
return (
    <section className="w-full bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 md:px-16">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-14"
      >
        Why Work With <span className="text-green-400">Me</span>
      </motion.h2>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-gray-700 flex flex-col items-center text-center transform perspective-1000"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
const projects = [
  {
    title: "Modern Villa Design",
    image: "/card_bg_02.jpg",
    link: "#",
  },
  {
    title: "Urban Apartment Complex",
    image: "/images/apartment.jpg",
    link: "#",
  },
  {
    title: "Cultural Pavilion",
    image: "/images/pavilion.jpg",
    link: "#",
  },
  {
    title: "Luxury Interior Concept",
    image: "/images/interior.jpg",
    link: "#",
  },
];
const ProjectSection = ()=>{
   return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-16">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-14"
      >
        Elevating Spaces with <span className="text-green-400">Design Brilliance</span>
      </motion.h2>

      {/* Project Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group bg-gray-900/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-gray-700 perspective-1000"
          >
            {/* Project Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-700 ease-out"
              whileHover={{ rotateZ: 1 }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
              <h3 className="text-lg md:text-xl font-semibold">{project.title}</h3>
              <a
                href={project.link}
                className="mt-3 inline-flex items-center text-green-400 hover:text-green-300 transition"
              >
                View Project <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
const steps = [
  {
    title: "Discovery",
    description:
      "I dive deep into understanding your brand, goals, and target audience. Through discussions and research, I gather essential insights to inform the entire design process.",
  },
  {
    title: "Design",
    description:
      "I begin crafting ideas by conceptualizing and sketching designs. This phase focuses on bringing creative concepts to life and translating them into tangible visuals.",
  },
  {
    title: "Development",
    description:
      "I transform the static visuals into fully functional websites. This phase involves clean coding, seamless integration, and ensuring the platform runs smoothly across all devices.",
  },
  {
    title: "Launch",
    description:
      "I prepare and launch the website to ensure everything functions flawlessly before going live. Post-launch, I provide support and guidance to help you scale your brand’s presence.",
  },
];
const Workflow = () => {
   return (
    <section className="bg-black text-gray-200 min-h-screen flex items-center px-6 py-12">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between gap-12">
        
        {/* Left Side */}
        <div className="md:w-1/3">
          <p className="text-sm tracking-wide text-green-400 uppercase">
            My Process
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-snug mt-3">
            My Creative <br /> Workflow
          </h2>
          <button className="mt-6 px-5 py-2 rounded-full bg-green-500 text-black font-medium hover:bg-green-400 transition">
            Schedule a Consultation
          </button>
        </div>

        {/* Right Side */}
        <div className="md:w-2/3 flex flex-col gap-8">
          <div>
            <h3 className="text-lg font-semibold">1. Discovery</h3>
            <p className="text-gray-400 text-sm md:text-base">
              I dive deep into understanding your brand, goals, and target
              audience. Through discovery sessions and market research, I gather
              essential insights to inform the entire design process.
            </p>
            <hr className="border-gray-700 mt-4" />
          </div>

          <div>
            <h3 className="text-lg font-semibold">2. Design</h3>
            <p className="text-gray-400 text-sm md:text-base">
              I transform strategy into captivating and strategic designs. This
              phase focuses on conceptualizing ideas into visuals that resonate
              strongly with your brand.
            </p>
            <hr className="border-gray-700 mt-4" />
          </div>

          <div>
            <h3 className="text-lg font-semibold">3. Development</h3>
            <p className="text-gray-400 text-sm md:text-base">
              I turn creative ideas into fully functional websites. This phase
              involves seamless coding, integration, and optimization to ensure
              your digital platform runs smoothly across all devices.
            </p>
            <hr className="border-gray-700 mt-4" />
          </div>

          <div>
            <h3 className="text-lg font-semibold">4. Launch</h3>
            <p className="text-gray-400 text-sm md:text-base">
              I prepare and launch the website to ensure everything functions
              smoothly before going live. Post-launch, I provide ongoing support
              and guidance to help you extract maximum value from your digital
              home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
const Profile = ()=>{
   return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* Profile Card with 3D Hover */}
        <motion.div
          whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="rounded-2xl shadow-2xl overflow-hidden"
        >
          <img
            src="/card_bg_02.jpg" // replace with your image
            alt="profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Badge */}
          <span className="px-4 py-1 text-sm border border-gray-700 rounded-full inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            ABOUT ME
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover My <br /> Design Journey
          </h1>

          {/* Paragraph */}
          <p className="text-gray-400 text-base leading-relaxed">
            Hello! I’m Wilson Brock, a passionate Web Designer with over 5+ years
            of experience in creating visually appealing and user-friendly
            websites. My mission is to bring your brand to life through innovative
            design solutions tailored to your unique needs.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 pt-4">
            {[
              { icon: <FaBehance />, link: "#" },
              { icon: <FaDribbble />, link: "#" },
              { icon: <FaLinkedin />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-400 hover:text-black transition-colors text-xl"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
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
const testimonials = [
  {
    stars: 5,
    text: "Working with Wilson was a game-changer for our online presence. The new website exceeded our expectations in both design and functionality.",
    name: "Jerome Bell",
    role: "CTO, Waverio",
    img: "https://i.pravatar.cc/100?img=32",
    dark: true,
  },
  {
    stars: 5,
    text: "Wilson delivered a stunning website that truly reflects our brand's essence. He continuously involves in feedbacks. Highly recommend his expertise!",
    name: "Wade Warren",
    role: "Founder, Creaty",
    img: "https://i.pravatar.cc/100?img=12",
    dark: false,
  },
];
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
          {["Home", "About", "Projects", "Services", "Contact"].map((item, i) => (
            <a
              key={i}
              href={`#${item.toLowerCase()}`}
              className="hover:text-green-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </motion.nav>
      </div>
    </footer>
  );
}
export default Home;