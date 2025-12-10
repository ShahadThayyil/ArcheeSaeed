import Hero from "../components/Hero";
import ProjectSection from "../components/ProjectSection";
import WorkFlow from "../components/WorkFlow";
import StatsSection from "../components/Stats";
import Testimonials from "../components/Testimonials";
import LogoSlider from "../components/LogoSlider";
import ServicesSection from "../components/ServicesSection";
import PhilosophySection from "../components/Philosophy";

const Home = () => {
  return (
    <main>
      <Hero />
      <PhilosophySection />
      <ProjectSection />
      <LogoSlider />
      <ServicesSection />
      <WorkFlow />
      <Testimonials />  
      <StatsSection />
    </main>
  );
};

export default Home;