import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation, Outlet } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState, lazy, Suspense } from "react";

// Components
import Preloader from "./components/PreLoader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* -------------------- GLOBAL PROTECTION -------------------- */
function useSiteProtection() {
  useEffect(() => {
    // Disable right click
    const disableContextMenu = (e) => e.preventDefault();

    // Disable key shortcuts
    const disableKeys = (e) => {
      if (
        (e.ctrlKey && ["s", "u", "c", "x"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);
}

/* -------------------- SCROLL MANAGER -------------------- */
function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);
  return null;
}

/* -------------------- LAYOUT -------------------- */
const MainLayout = () => (
  <>
    <Navbar noMotion={true} />
    <Outlet />
    <Footer />
  </>
);

function App() {
  const [loaded, setLoaded] = useState(false);

  // Enable global protection
  useSiteProtection();

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <Router>
      <ScrollManager />

      {!loaded && <Preloader onLoaded={() => setLoaded(true)} />}

      <main
        className={`transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Suspense fallback={<div className="h-screen w-full bg-[#F8F7F5]" />}>
          <Routes>
            {/* WITH NAVBAR + FOOTER */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* WITHOUT NAVBAR */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
