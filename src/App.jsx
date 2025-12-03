import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useEffect, useLayoutEffect } from "react"; // useLayoutEffect impoted
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedPage from "./components/AnimatedPage";

// 🔹 Routes Logic + Scroll To Top Fix
function AnimatedRoutes() {
  const location = useLocation();

  // ✅ FIX: പേജ് മാറുമ്പോൾ മുകളിലേക്ക് സ്ക്രോൾ ചെയ്യാൻ
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
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
  // 🔹 Smooth Scroll Logic (Lenis)
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

  return (
    <Router>
      <div className="main">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <AnimatedRoutes />
      </div>
      
      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;