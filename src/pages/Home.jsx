import Hero from "../components/Hero";
import WhyWorkWithMe from "../components/WhyWorkWithMe";
import ProjectSection from "../components/ProjectSection";
import WorkFlow from "../components/WorkFlow";
import Profile from "../components/Profile";
import StatsSection from "../components/Stats";
import Testimonials from "../components/Testimonials";
import WhatsAppButton from "../components/Whatsapp";

const Home = () => {
  return (
    <main>
      <Hero />
      <WhyWorkWithMe />
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