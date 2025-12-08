import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import Preloader from "./components/PreLoader";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function ScrollToTopWithLenis() {
  const location = useLocation();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return null;
}

function App() {
  const [loaded, setLoaded] = useState(false);

  // Smooth scroll using Lenis
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

    // expose lenis globally
    window.lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>

      {/* Route scroll fix */}
      <ScrollToTopWithLenis />

      {/* PRELOADER */}
      {!loaded && <Preloader onLoaded={() => setLoaded(true)} />}

      {/* MAIN CONTENT */}
      <div
        className={`${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
      >
        {/* Navbar - animation OFF */}
        <Navbar noMotion={true} />

        {/* DIRECT ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
