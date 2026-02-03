"use client";

import { motion, useReducedMotion } from "framer-motion";

const FireAnimation = ({ isActive, progress = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (!isActive) return null;

  // Simplified fire for reduced motion
  if (shouldReduceMotion) {
    return (
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full"
          style={{
            background: "linear-gradient(to top, rgba(255, 100, 0, 0.6), rgba(255, 200, 0, 0.3), transparent)",
          }}
        />
      </motion.div>
    );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden">
      {/* Main fire gradient that rises */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ height: "0%" }}
        animate={{ height: "110%" }}
        transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Base fire layer - orange/red */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 80, 0, 0.95)" />
                <stop offset="30%" stopColor="rgba(255, 140, 0, 0.85)" />
                <stop offset="60%" stopColor="rgba(255, 200, 50, 0.7)" />
                <stop offset="85%" stopColor="rgba(255, 220, 100, 0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              <filter id="fireBlur">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>
            <rect width="100" height="100" fill="url(#fireGradient)" />
          </svg>
        </div>

        {/* Animated flame tongues */}
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${10 + i * 12}%`,
              width: "15%",
              height: "100%",
            }}
            animate={{
              scaleY: [1, 1.15, 0.95, 1.1, 1],
              scaleX: [1, 0.95, 1.05, 0.98, 1],
            }}
            transition={{
              duration: 0.4 + Math.random() * 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 30 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`flameGrad${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255, 100, 0, 0.9)" />
                  <stop offset="40%" stopColor="rgba(255, 180, 0, 0.7)" />
                  <stop offset="70%" stopColor="rgba(255, 220, 50, 0.4)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <ellipse
                cx="15"
                cy="70"
                rx="15"
                ry="50"
                fill={`url(#flameGrad${i})`}
              />
            </svg>
          </motion.div>
        ))}

        {/* Inner bright core */}
        <motion.div
          className="absolute bottom-0 left-1/4 right-1/4"
          style={{ height: "60%" }}
          animate={{
            opacity: [0.7, 0.9, 0.75, 0.85, 0.7],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(ellipse at bottom, rgba(255, 255, 200, 0.8) 0%, rgba(255, 200, 50, 0.5) 40%, transparent 70%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Glow effect around fire */}
      <motion.div
        className="absolute -bottom-4 -left-4 -right-4"
        initial={{ height: "0%", opacity: 0 }}
        animate={{ height: "120%", opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(255, 150, 50, 0.4) 0%, transparent 60%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
};

export default FireAnimation;
