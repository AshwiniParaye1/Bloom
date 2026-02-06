"use client";

import { useTheme } from "@/context/ThemeContext";

const DynamicBackground = ({ children, opacity = 0.8 }) => {
  const { backgroundImage } = useTheme();

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: opacity,
        }}
      />
      {children}
    </div>
  );
};

export default DynamicBackground;
