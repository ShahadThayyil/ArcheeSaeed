import CardNav from "../components/CardNav";
import logo from "../assets/logo.png"; 
import LightRays from "../components/LightRays";
import TextPressure from "../components/TextPressure";
import StackedCards from "../components/cards/StackedCards";
import Cards from "../components/cards/Cards";


const Home = () => {
  return (
    <main>
      <LandingPage />
      <SectionOne />
      <div className="ma h-screen">
        <h1>HELLO WORLD</h1>
      </div>
    </main>
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
      <div className="hero flex items-center justify-center min-h-screen relative z-10">
        <div className="texts text-center px-4">
          <h1
            style={{ fontFamily: "Italiana, serif" }}
            className="text-6xl md:text-7xl lg:text-9xl text-white transition-transform duration-500 hover:scale-105 hover:text-indigo-600"
          >
           <TextPressure
    text="Archeesaeed"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={36}
  />

            

          </h1>
        
          <h3
            style={{ fontFamily: "Italiana, serif" }}
            className="mt-4 text-lg md:text-2xl lg:text-3xl text-white transition-colors duration-500 hover:text-indigo-500"
          >
            It's the best architecture company
          </h3>
        </div>
      </div>
    </div> 
  )
}
const SectionOne = () => {
    return(
     <Cards />
    )
};
export default Home;