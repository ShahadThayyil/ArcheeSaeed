import Hero from "../components/Hero";
import WhyWorkWithMe from "../components/WhyWorkWithMe";
import ProjectSection from "../components/ProjectSection";
import WorkFlow from "../components/WorkFlow";
import Profile from "../components/Profile";
import StatsSection from "../components/Stats";
import Testimonials from "../components/Testimonials";
import WhatsAppButton from "../components/Whatsapp";
import LogoSlider from "../components/LogoSlider";

const Home = () => {
  return (
    <main>
      <Hero />
      <WhyWorkWithMe />
      <LogoSlider />
      <ProjectSection />
      <WorkFlow />
      <Profile/>
      <StatsSection />
      <Testimonials />  
      <WhatsAppButton />
    </main>
  );
};

export default Home;