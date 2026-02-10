"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext();

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
};

const setCookie = (name, value, days = 365) => {
  if (typeof window === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

export const ThemeProvider = ({ children, initialBackground }) => {
  const [backgroundImage, setBackgroundImageState] = useState(initialBackground);
  const [displayedImage, setDisplayedImage] = useState(initialBackground);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const setBackgroundImage = useCallback(async (newImage) => {
    // Don't reload if it's the same image
    if (newImage === backgroundImage) return;
    
    setIsLoading(true);
    try {
      // Preload the new image first
      await preloadImage(newImage);
      
      // Update states only after image is loaded
      setBackgroundImageState(newImage);
      setDisplayedImage(newImage);
      setCookie("backgroundImage", newImage);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load background image:", error);
      // Even on error, update to show something
      setBackgroundImageState(newImage);
      setDisplayedImage(newImage);
      setCookie("backgroundImage", newImage);
      setIsLoading(false);
    }
  }, [backgroundImage]);

  useEffect(() => {
    setIsMounted(true);
    // Client-side: sync cookie with state on mount
    // This ensures consistency if cookie changed since SSR
    const cookieMatch = document.cookie.match(/backgroundImage=([^;]+)/);
    if (cookieMatch && cookieMatch[1] !== initialBackground) {
      const cookieBg = cookieMatch[1];
      preloadImage(cookieBg)
        .then(() => {
          setBackgroundImageState(cookieBg);
          setDisplayedImage(cookieBg);
        })
        .catch(() => {
          // Keep initial background on error
        });
    }
  }, [initialBackground]);

  return (
    <ThemeContext.Provider 
      value={{ 
        backgroundImage: displayedImage, 
        setBackgroundImage, 
        isLoading,
        rawBackgroundImage: backgroundImage 
      }}
    >
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
