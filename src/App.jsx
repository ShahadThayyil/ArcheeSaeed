import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
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

function App() {
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
      lenis.destroy(); // Cleanup when component unmounts
    };
  }, []);

  return (
    <Router>
     
      <div className="main">
         <ScrollToTop />
        {/* <SplashCursor /> */}
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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
