import React from "react";
// import useSpotlightEffect from ""; // adjust path if needed
import useSpotlightEffect from "./animations/useSpotlightEffect";

const SpotlightCursor = ({ config = {}, className, ...rest }) => {
  const spotlightConfig = {
    radius: 200,
    brightness: 0.15,
    color: "#ffffff",
    smoothing: 0.1,
    ...config,
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className}`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
