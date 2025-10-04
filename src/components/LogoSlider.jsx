import React from "react";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a1/Amazon_Web_Services_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4f/Visual_Studio_Code_1.35_icon.svg",
];

export default function LogoSlider() {
  return (
    <div className="w-full py-16 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden relative">
      <h2 className="text-center text-white text-3xl font-bold mb-10 tracking-wide relative z-10">
        Our <span className="text-green-400">Trusted Partners</span>
      </h2>

      <div className="group flex overflow-hidden relative">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-12 flex items-center justify-center relative"
            >
              <img
                src={logo}
                alt={`logo-${index}`}
                className="h-16 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}


// import React from "react";
// import Slider from "react-slick";
// import { motion } from "framer-motion";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function LogoSlider() {
//   const logos = [
//     "/mc-logo.png",
//     "/logos/logo2.png",
//     "/logos/logo3.png",
//     "/logos/logo4.png",
//     "/logos/logo5.png",
//     "/logos/logo6.png",
//   ];

//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     speed: 3000,
//     cssEase: "linear",
//     pauseOnHover: true,
//     arrows: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bg-black py-10">
//       <h2 className="text-center text-white text-2xl font-semibold mb-6">
//         Our Partners
//       </h2>
//       <div className="max-w-6xl mx-auto px-4">
//         <Slider {...settings}>
//           {logos.map((logo, index) => (
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               key={index}
//               className="flex items-center justify-center"
//             >
//               <img
//                 src={logo}
//                 alt={`logo-${index}`}
//                 className="w-32 h-32 object-contain filter invert opacity-80 hover:opacity-100 transition-all duration-500"
//               />
//             </motion.div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }
