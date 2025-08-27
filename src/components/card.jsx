// src/components/card.jsx
import React from "react";
import { cn } from "../lib/utils"; // if you created utils.js as I explained before

// Card wrapper
export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// CardContent
export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};
