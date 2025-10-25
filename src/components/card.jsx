import { cn } from "../lib/utils"; // if you created utils.js as I explained before

// Card wrapper
export const Card = ({ className, children, ...props }) => {
return (
    <div
      className={cn(
        // CHANGED: Glassmorphism theme aakki
        "rounded-xl border  bg-[#C0B6A1] backdrop-blur-md border-white/75 shadow-xl   transition-all duration-300",
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
