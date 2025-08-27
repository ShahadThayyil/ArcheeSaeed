import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "../lib/utils";
import { Card, CardContent } from "./card";

const WORKFLOW_EVENTS = [
  {
    step: "1. Discovery",
    description:
      "I dive deep into understanding your brand, goals, and target audience. Through discovery sessions and market research, I gather essential insights to inform the entire design process.",
  },
  {
    step: "2. Design",
    description:
      "I transform strategy into captivating and strategic designs. This phase focuses on conceptualizing ideas into visuals that resonate strongly with your brand.",
  },
  {
    step: "3. Development",
    description:
      "I turn creative ideas into fully functional websites. This phase involves seamless coding, integration, and optimization to ensure your digital platform runs smoothly across all devices.",
  },
  {
    step: "4. Launch",
    description:
      "I prepare and launch the website to ensure everything functions smoothly before going live. Post-launch, I provide ongoing support and guidance to help you extract maximum value from your digital home.",
  },
];

export const ScrollTimeline = ({
  events = WORKFLOW_EVENTS,
  title = "My Creative Workflow",
  subtitle = "Scroll to explore my process",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  progressIndicator = true,
  darkMode = true,
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
        "relative min-h-screen w-full overflow-hidden py-16",
        darkMode ? "bg-black text-white" : "bg-white text-black",
        className
      )}
    >
      {/* Section Header */}
      <div className="text-center mb-12 px-4">
        <h3 className="text-green-400 uppercase tracking-wider text-sm font-bold">
          My Process
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">{title}</h2>
        <p className="text-gray-400 text-lg mt-2">{subtitle}</p>
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
                background: "linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)",
                boxShadow: `
                  0 0 15px rgba(99,102,241,0.5),
                  0 0 25px rgba(168,85,247,0.3)
                `,
              }}
            />
          </>
        )}

        {/* Events */}
        <div className="relative z-20">
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
    "relative flex flex-col items-center mb-16", // ✅ mobile = centered
    cardAlignment === "alternating"
      ? index % 2 === 0
        ? "lg:flex-row lg:justify-start lg:items-center"
        : "lg:flex-row-reverse lg:justify-start lg:items-center"
      : cardAlignment === "left"
      ? "lg:flex-row lg:justify-start lg:items-center"
      : "lg:flex-row-reverse lg:justify-start lg:items-center"
  )}
  variants={getCardVariants(index)}
  initial="initial"
  whileInView="whileInView"
  viewport={{ once: false, margin: "-100px" }}
  style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
>
  {/* Connector Dot */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 lg:top-1/2">
    <motion.div
      className={cn(
        "w-6 h-6 rounded-full border-4 bg-black flex items-center justify-center",
        index <= activeIndex ? "border-indigo-500" : "border-gray-600"
      )}
      animate={
        index <= activeIndex
          ? {
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0px rgba(99,102,241,0)",
                "0 0 12px rgba(99,102,241,0.6)",
                "0 0 0px rgba(99,102,241,0)",
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

  {/* Card */}
  <Card className="bg-gray-900 border border-gray-700 shadow-lg w-full max-w-md lg:w-[calc(50%-40px)] mt-12 lg:mt-0">
    <CardContent className="p-6 text-center lg:text-left">
      <h3 className="text-xl font-bold mb-2 text-white">{event.step}</h3>
      <p className="text-gray-400 leading-relaxed">{event.description}</p>
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
