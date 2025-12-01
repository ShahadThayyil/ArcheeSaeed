import "./App.css";
// 🔹 നമ്മൾക്ക് ആവശ്യമുള്ള പുതിയ കാര്യങ്ങൾ ഇമ്പോർട്ട് ചെയ്യുന്നു
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation, // 1. useLocation ഇമ്പോർട്ട് ചെയ്തു
} from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Footer from "./components/Footer";

import ProjectDetail from "./pages/ProjectDetail";

import { AnimatePresence } from "framer-motion"; // 2. AnimatePresence ഇമ്പോർട്ട് ചെയ്തു
import AnimatedPage from "./components/AnimatedPage"; // 3. നമ്മുടെ പുതിയ AnimatedPage കമ്പോണന്റ് ഇമ്പോർട്ട് ചെയ്തു

// 🔹 ആനിമേഷനോടുകൂടിയ റൂട്ടുകൾ കൈകാര്യം ചെയ്യാൻ ഒരു പുതിയ കമ്പോണന്റ്
// ഇത് useLocation ഉപയോഗിക്കുന്നതുകൊണ്ടാണ് <Router>-നുള്ളിൽ വെക്കുന്നത്
function AnimatedRoutes() {
  const location = useLocation();

  return (
    // 🔹 ഇവിടെയാണ് AnimatePresence ചേർക്കുന്നത്
    <AnimatePresence mode="wait">
      {/* 🔹 റൂട്ട് മാറുമ്പോൾ ആനിമേറ്റ് ചെയ്യാൻ key നിർബന്ധമാണ് */}
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />
        <Route
          path="/projects"
          element={
            <AnimatedPage>
              <Projects />
            </AnimatedPage>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <AnimatedPage>
              <ProjectDetail />
            </AnimatedPage>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatedPage>
              <About />
            </AnimatedPage>
          }
        />
        <Route
          path="/contact"
          element={
            <AnimatedPage>
              <Contact />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // 🔒 നിങ്ങളുടെ പഴയ കോഡുകൾക്കൊന്നും മാറ്റം വരുത്തിയിട്ടില്ല
  // useEffect(() => {
  // ...
  // }, []);

  // if (loading) return <Loader speed={10000} />;

  return (
    <Router>
      <div className="main ">
        {/* <ScrollToTop /> */}
        {/* <SplashCursor /> */}
        {/* <UseSpotlightEffect /> */}
        {/* <SpotlightCursor /> */}

        {/* Navbar always visible */}
        {/* <div className="absolute top-0 left-0 w-full z-20">
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
        </div> */}

        {/* 🔹 Routes എന്നതിന് പകരം നമ്മൾ AnimatedRoutes ഉപയോഗിക്കുന്നു */}
        <AnimatedRoutes />
      </div>
      <Footer />
    </Router>
  );
}

export default App;