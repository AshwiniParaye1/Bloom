"use client";

import { useTheme } from "@/context/ThemeContext";

const DynamicBackground = ({ children, opacity = 0.8 }) => {
  const { backgroundImage, isLoading } = useTheme();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image Layer - always visible, no loading placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ease-in-out -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: isLoading ? opacity * 0.7 : opacity, // Slightly dim during transition, but never hide
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      />
      {children}
    </div>
  );
};

export default DynamicBackground;
