import { useEffect, useState } from "react";

export default function Preloader({ onLoaded }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const assets = [];

    // 1. Get all <img>
    document.querySelectorAll("img").forEach(img => {
      if (img.complete) loaded++;
      else assets.push(img);
    });

    // 2. Background images (CSS)
    document.querySelectorAll("*").forEach(el => {
      const bg = window.getComputedStyle(el).backgroundImage;
      if (bg && bg !== "none") {
        const url = bg.split('"')[1]?.split('"')[0];
        if (url) {
          const img = new Image();
          img.src = url;
          assets.push(img);
        }
      }
    });

    // 3. Videos
    document.querySelectorAll("video").forEach(video => {
      if (video.readyState >= 3) loaded++;
      else {
        video.addEventListener("loadeddata", () => update());
        assets.push(video);
      }
    });

    const total = loaded + assets.length;

    function update() {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded >= total) {
        setTimeout(() => {
          onLoaded();
        }, 300);
      }
    }

    assets.forEach(asset => {
      if (asset.tagName === "IMG") {
        asset.onload = update;
        asset.onerror = update;
      }
    });

    if (total === 0) onLoaded();
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-white text-xl font-bold z-[9999] transition-all">
      Loading {progress}%
    </div>
  );
}
