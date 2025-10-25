import { motion } from "framer-motion";
import React from "react";

export const ThreeDMarquee = ({ images, className = "", cols = 2, onImageClick }) => {
  // Duplicate images for seamless looping
  const duplicatedImages = [...images, ...images];

  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image, globalIndex) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

  return (
    <section
      className={`mx-auto block h-[300px] max-sm:h-[400px]  backdrop-blur-xl pointer-events-none
        overflow-hidden py-16  ${className} bg-[#F5EFE6]`}
         style={{
         }}
    >
       
      <div
        className="flex w-full h-full items-center justify-center"
        style={{ transform: "rotateX(55deg) rotateY(0deg) rotateZ(45deg)" }}
      >
        <div className="w-[350px] overflow-hidden scale-90 sm:scale-100">
          <div
            className={`relative grid h-full w-full origin-center 
              grid-cols-2 sm:grid-cols-${cols} gap-4 transform`}
          >
            {imageGroups.map((imagesInGroup, idx) => (
              <motion.div
                key={`column-${idx}`}
                // CHANGED: All columns now move to y: -100 (up) together
                animate={{ y: -100 }}
                transition={{
                  duration: idx % 2 === 0 ? 10 : 15, // Different durations retained for effect
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="items-center gap-2 relative flex flex-col"
              >
                {/* REMOVED: Vertical line div was here */}
                {imagesInGroup.map((image, imgIdx) => {
                  const globalIndex = idx * groupSize + imgIdx;
                  const isClickable = image.href || onImageClick;

                  return (
                    <div key={`img-${imgIdx}`} className="relative">
                      {/* REMOVED: Horizontal line div was here */}
                      <motion.img
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        src={image.src}
                        alt={image.alt}
                        width={970}
                        height={700}
                        className={`aspect-[970/700] w-full max-w-[200px] rounded-lg object-cover ring ring-gray-300/30 dark:ring-gray-800/50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
                          isClickable ? "cursor-pointer" : ""
                        }`}
                        onClick={() => handleImageClick(image, globalIndex)}
                      />
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};