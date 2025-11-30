import Hero from "../components/Hero";
import WhyWorkWithMe from "../components/WhyWorkWithMe";
import ProjectSection from "../components/ProjectSection";
import WorkFlow from "../components/WorkFlow";
import Profile from "../components/Profile";
import StatsSection from "../components/Stats";
import Testimonials from "../components/Testimonials";
import WhatsAppButton from "../components/Whatsapp";
import LogoSlider from "../components/LogoSlider";
import { ThreeDMarquee } from "../components/animations/ThreeMarque";
import ServicesSection from "../components/ServicesSection";

const images = [
  {
    src: "/mc-logo.png",
    alt: "Description 1"
  },
  {
    src: "/mc-logo.png",
    alt: "Description 2"
  }
];
const clickableImages = [
  {
    src: "/profile-ai.png",
    alt: "Portfolio Item 1",
    href: "https://example.com/project1",
    target: "_blank"
  },
  {
    src: "/profile-about.avif",
    alt: "Portfolio Item 2",
    href: "https://example.com/project2",
    target: "_blank"
  },
   {
    src: "/profile-about.avif",
    alt: "Portfolio Item 2",
    href: "https://example.com/project2",
    target: "_blank"
  },
     {
    src: "/profile-about.avif",
    alt: "Portfolio Item 2",
    href: "https://example.com/project2",
    target: "_blank"
  },
    {
    src: "/profile-about.avif",
    alt: "Portfolio Item 2",
    href: "https://example.com/project2",
    target: "_blank"
  },
     {
    src: "/profile-about.avif",
    alt: "Portfolio Item 2",
    href: "https://example.com/project2",
    target: "_blank"
  },
    {
    src: "/profile-about.avif",
    alt: "Portfolio Item 2",
    href: "https://example.com/project2",
    target: "_blank"
  },
    {
    src: "/profile-about.avif",
    alt: "Portfolio Item 2",
    href: "https://example.com/project2",
    target: "_blank"
  },

];
const Home = () => {
  return (
    <main>
      <Hero />
      <WhyWorkWithMe />
    
      <ProjectSection />
       {/* <ThreeDMarquee
        images={clickableImages}
        onImageClick={(image, index) => {
          console.log("Clicked:", image.alt, "at index:", index);
          }}
          /> */}
          <LogoSlider />
          <ServicesSection />
      <WorkFlow />
      <Testimonials />  
      {/* <Profile/> */}
      <StatsSection />
      {/* <WhatsAppButton /> */}
    </main>
  );
};

export default Home;