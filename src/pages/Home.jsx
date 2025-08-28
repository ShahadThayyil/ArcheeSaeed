import Hero from "../components/Hero";
import WhyWorkWithMe from "../components/WhyWorkWithMe";
import ProjectSection from "../components/ProjectSection";
import WorkFlow from "../components/WorkFlow";
import Profile from "../components/Profile";
import StatsSection from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

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
      
    </main>
  );
};

export default Home;