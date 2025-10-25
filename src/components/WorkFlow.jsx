import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "../lib/utils";
import { Card, CardContent } from "./card";
import { WORKFLOW_EVENTS } from "../data/workflow";

export const WorkFlow = ({
  events = WORKFLOW_EVENTS,
  title = "My Creative Workflow",
  subtitle = "Scroll to explore my process",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  progressIndicator = true,
  parallaxIntensity = 0.1,
  progressLineWidth = 3,
  progressLineCap = "round",
  revealAnimation = "fade",
  className = "",
}) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.floor(v * events.length);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const getCardVariants = (index) => {
    // ... (This function is unchanged)
    const baseDelay =
      animationOrder === "simultaneous"
        ? 0
        : animationOrder === "staggered"
        ? index * 0.2
        : index * 0.3;

    const initialStates = {
      fade: { opacity: 0, y: 40 },
      slide: {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
      },
      scale: { scale: 0.8, opacity: 0 },
      none: { opacity: 1 },
    };

    return {
      initial: initialStates[revealAnimation],
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.2,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      },
      viewport: { once: false, margin: "-100px" },
    };
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden py-16 pt-24 scroll-mt-24",
        // This background color matches your image perfectly
        "bg-[#F5EFE6] text-gray-900",
        className
      )}
    >
      {/* Section Header */}
      <div className="text-center mb-12 px-4">
        <h3 className="text-[#C0B6A1] uppercase tracking-wider text-sm font-bold font-['Cormorant_Garamond',serif]">
          My Process
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 font-['Playfair_Display',_serif]">
          {title}
        </h2>
        <p className="text-[#C0B6A1] text-lg mt-2 font-['Cormorant_Garamond',serif]">{subtitle}</p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Vertical Progress Line */}
        {progressIndicator && (
          <>
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
              style={{
                height: progressHeight,
                width: progressLineWidth,
                borderRadius:
                  progressLineCap === "round" ? "9999px" : "0px",
                // CHANGED: Set to the subtle faded text color from your theme
                background: "#C0B6A1",
                boxShadow: `
                  0 0 15px rgba(192, 182, 161, 0.4),
                  0 0 25px rgba(192, 182, 161, 0.2)
                `,
              }}
            />
          </>
        )}

        {/* Events */}
        <div className="relative z-10">
          {events.map((event, index) => {
            const yOffset = useTransform(
              smoothProgress,
              [0, 1],
              [parallaxIntensity * 100, -parallaxIntensity * 100]
            );
            return (
              <motion.div
                key={index}
                className={cn(
                  "relative flex flex-col items-center mb-16",
                  cardAlignment === "alternating"
                    ? index % 2 === 0
                      ? "lg:flex-row lg:justify-start lg:items-center"
                      : "lg:flex-row-reverse lg:justify-start lg:items-center"
                    : cardAlignment === "left"
                    ? "lg:flex-row lg:justify-start lg:items-center"
                    : "lg:flex-row-reverse lg:justify-start lg:items-center"
                )}
                // ... (variants and parallax)
              >
                {/* Connector Dot */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 lg:top-1/2">
                  <motion.div
                    className={cn(
                      "w-6 h-6 rounded-full border-4 flex items-center justify-center",
                      // CHANGED: Colors updated for the light theme
                      "bg-white", // White dot background
                      index <= activeIndex
                        ? "border-gray-900" // Active border (dark)
                        : "border-gray-300" // Inactive border (light grey)
                    )}
                    animate={
                      index <= activeIndex
                        ? {
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0px rgba(68, 64, 60, 0)",
                              "0 0 12px rgba(68, 64, 60, 0.6)", // Dark glow (looks good)
                              "0 0 0px rgba(68, 64, 60, 0)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* --- CARD THEME CHANGED --- */}
                <Card
                  className={cn(
                    "shadow-xl w-full max-w-md lg:w-[calc(50%-40px)] mt-12 lg:mt-0",
                    // CHANGED: Removed blur, added solid white background
                    "bg-white"
                  )}
                >
                  <CardContent className="p-6 text-center lg:text-left">
                    {/* CHANGED: Text colors to dark */}
                    <h3 className="text-xl font-bold mb-2 text-gray-900 font-['Cormorant_Garamond',serif]">
                      {event.step}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-['Rubik',cursive]">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;