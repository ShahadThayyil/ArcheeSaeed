// import React, { useRef, useState } from "react";
import "../css/Cards.css"; // move your CSS into Cards.css
// import { motion, useMotionValue, useTransform } from "framer-motion";
// import InteractiveCard from "../InteractiveCard";


const Cards = () => {
  return (

<div className="container pt-24 px-4">
  <div id="cards" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
{/* Card 1 */}
<div className="card relative bg-white/10 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden transition-all duration-500  hover:shadow-[5px_5px_20px_rgba(14,165,233,0.4)] mt-8">
  <div className="card-body flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
    <img
      src="/card_bg_01.jpg"
      alt="Modern House"
      className="h-64 sm:h-72 md:h-80 w-full md:w-[55%] object-cover rounded-xl shadow-lg hover:brightness-110 transition-all duration-300"
    />
    <div className="text-center md:text-left flex-1 md:ml-8">
      <h2 className="text-3xl font-extrabold mb-3 text-white">
        Modern Design
      </h2>
      <p className="text-gray-200 text-lg leading-relaxed">
        Sleek and elegant exteriors with innovative architectural lines, built for a futuristic lifestyle.
      </p>
    </div>
  </div>
</div>

{/* Card 2 */}
<div className="card relative bg-white/10 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden transition-all duration-500  hover:shadow-[5px_5px_20px_rgba(14,165,233,0.4)] mt-8">
  <div className="card-body flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
    <img
      src="/card_bg_02.jpg"
      alt="Minimalist Villa"
      className="h-64 sm:h-72 md:h-80 w-full md:w-[55%] object-cover rounded-xl shadow-lg hover:brightness-110 transition-all duration-300"
    />
    <div className="text-center md:text-left flex-1 md:ml-8">
      <h2 className="text-3xl font-extrabold mb-3 text-white">
        Minimalist Villa
      </h2>
      <p className="text-gray-200 text-lg leading-relaxed">
        Designed with simplicity, open spaces, and nature integration.
      </p>
    </div>
  </div>
</div>

{/* Card 3 */}
<div className="card relative bg-white/10 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden transition-all duration-500  hover:shadow-[5px_5px_20px_rgba(14,165,233,0.4)] mt-8">
  <div className="card-body flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
    <img
      src="/card_bg_03.jpg"
      alt="Office Building"
      className="h-64 sm:h-72 md:h-80 w-full md:w-[55%] object-cover rounded-xl shadow-lg hover:brightness-110 transition-all duration-300"
    />
    <div className="text-center md:text-left flex-1 md:ml-8">
      <h2 className="text-3xl font-extrabold mb-3 text-white">
        Innovative Office
      </h2>
      <p className="text-gray-200 text-lg leading-relaxed">
        Smart, futuristic office spaces for modern businesses.
      </p>
    </div>
  </div>
</div>

{/* Card 4 */}
<div className="card relative bg-white/10 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden transition-all duration-500  hover:shadow-[5px_5px_20px_rgba(14,165,233,0.4)] mt-8">
  <div className="card-body flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
    <img
      src="/card_bg_04.jpg"
      alt="Luxury Interior"
      className="h-64 sm:h-72 md:h-80 w-full md:w-[55%] object-cover rounded-xl shadow-lg hover:brightness-110 transition-all duration-300"
    />
    <div className="text-center md:text-left flex-1 md:ml-8">
      <h2 className="text-3xl font-extrabold mb-3 text-white">
        Luxury Interiors
      </h2>
      <p className="text-gray-200 text-lg leading-relaxed">
        Premium interiors designed for elegance and timeless appeal.
      </p>
    </div>
  </div>
</div>



  </div>
</div>



 

  );
};

export default Cards;
