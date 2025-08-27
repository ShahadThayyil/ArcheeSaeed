import './App.css'
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import Home from './pages/Home'
import SplashCursor from './components/SplashCursor'

function App() {
    useEffect(() => {
    // Create a new Lenis instance
    const lenis = new Lenis({
      duration: 1.5, // 1.2 Scroll speed (higher = slower)
      easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth easing curve
      smooth: true,
    });

    // Animation frame loop
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
    <div className="">
      <SplashCursor />

  
    <Home />
    </div>
  )
}

export default App
