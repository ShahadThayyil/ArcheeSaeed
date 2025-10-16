import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import SplashCursor from "./components/animations/SplashCursor";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CardNav from "./components/CardNav";
import logo from "./assets/logo.png";
import { items } from "./data/items";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProjectDetail from "./pages/ProjectDetail";
import UseSpotlightEffect from "./components/animations/useSpotlightEffect";
import SpotlightCursor from "./components/SpotlightCursor";
import Loader from "./components/Loader";
import { Grid } from 'ldrs/react'

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

  // 🔒 Global right-click, selection, copy, cut, drag, and image protection
  useEffect(() => {
    // Disable right-click anywhere
    const handleContextMenu = (e) => {
      e.preventDefault();
      // alert("Right-click is disabled on this website!");
    };

    // Disable image dragging
    const handleDragStart = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    // Disable text selection
    document.body.style.userSelect = "none";

    // Disable copy and cut
    const preventActions = (e) => e.preventDefault();

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("copy", preventActions);
    document.addEventListener("cut", preventActions);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("copy", preventActions);
      document.removeEventListener("cut", preventActions);
      document.body.style.userSelect = "auto";
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="main ">
        <ScrollToTop />
        <SplashCursor />
        {/* <UseSpotlightEffect /> */}
        {/* <SpotlightCursor /> */}

        {/* Navbar always visible */}
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

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
