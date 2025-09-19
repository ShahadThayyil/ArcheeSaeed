import React, { useState, useEffect } from "react";

export default function LoaderWave({ size = 150, speed = 2 }) {
  const text = "ARCHIZAID";
  const [loadedLetters, setLoadedLetters] = useState([]);

  // Colors for each letter (green theme 🌿)
  const colors = [
    "#ffff", // A - bright green
    "#ffff", // R - medium green
    "#ffff", // C - light green
    "#ffff", // H - dark green
    "#ffff", // I - teal-green
    "#ffff", // Z - mint green
    "#ffff", // A - lime green
    "#ffff", // I - forest green
    "#ffff", // D - pastel green
  ];

  useEffect(() => {
    const totalTime = 5000; // 5 seconds
    const delay = totalTime / text.length; // per letter
    text.split("").forEach((char, i) => {
      setTimeout(() => {
        setLoadedLetters((prev) => [...prev, char]);
      }, i * delay);
    });
  }, []);

  const styleVars = {
    ["--speed"]: `${speed}s`,
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black space-y-12">
      <div className="loader-text" style={styleVars}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            style={{
              ["--i"]: i,
              color: loadedLetters.includes(char) ? colors[i] : "white",
            }}
            className="letter"
          >
            {loadedLetters.includes(char) ? (
              char
            ) : (
              <span className={`loader loader-${i % 4}`}></span>
            )}
          </span>
        ))}
      </div>

      <style>{`
        .loader-text {
          display: flex;
          font-size: 4rem;
          font-weight: 900;
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
        }

        .letter {
          display: inline-block;
          width: 4rem;
          height: 4rem;
          text-align: center;
          animation: wave var(--speed) ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.15s);
          transform-origin: bottom center;
        }

        @keyframes wave {
          0%, 100% { transform: translateY(0) rotateX(0deg) scale(1); opacity: 0.7; }
          50% { transform: translateY(-20px) rotateX(25deg) scale(1.1); opacity: 1; }
        }

        /* Loader styles */
        .loader {
          display: inline-block;
        }

        /* Spinner */
        .loader-0 {
          width: 1.5rem;
          height: 1.5rem;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid #00ff00;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Grid */
        .loader-1 {
          display: grid;
          grid-template-columns: repeat(2, 0.5rem);
          grid-gap: 0.3rem;
          width: 1.5rem;
          height: 1.5rem;
        }
        .loader-1::before, .loader-1::after, .loader-1 span {
          content: "";
          width: 0.5rem;
          height: 0.5rem;
          background: #33cc33;
          animation: pulse 1s infinite alternate;
        }

        /* Bars */
        .loader-2 {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 0.2rem;
          width: 1.5rem;
          height: 1.5rem;
        }
        .loader-2 div {
          width: 0.3rem;
          height: 100%;
          background: #66ff66;
          animation: bounce 0.6s infinite alternate;
        }

        /* Dot */
        .loader-3 {
          width: 1rem;
          height: 1rem;
          background: #00cc66;
          border-radius: 50%;
          animation: pulse 0.8s ease-in-out infinite;
        }

        /* Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0% { transform: scale(0.7); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes bounce {
          0% { height: 0.3rem; }
          100% { height: 1.5rem; }
        }

        /* ========= RESPONSIVE STYLES ========= */

        @media (max-width: 1024px) {
          .loader-text { font-size: 3rem; }
          .letter { width: 3rem; height: 3rem; }
          .loader-0, .loader-1, .loader-2, .loader-3 { transform: scale(0.85); }
        }

        @media (max-width: 768px) {
          .loader-text { font-size: 2.5rem; }
          .letter { width: 2.5rem; height: 2.5rem; }
          .loader-0, .loader-1, .loader-2, .loader-3 { transform: scale(0.7); }
        }

        @media (max-width: 480px) {
          .loader-text { font-size: 1.8rem; }
          .letter { width: 2rem; height: 2rem; }
          .loader-0, .loader-1, .loader-2, .loader-3 { transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}
