"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState("/vintage1.jpeg");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedBg = localStorage.getItem("backgroundImage");
    if (savedBg) {
      setBackgroundImage(savedBg);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("backgroundImage", backgroundImage);
    }
  }, [backgroundImage, isMounted]);

  return (
    <ThemeContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
