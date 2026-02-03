"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const PaperSheet = ({
  text,
  onTextChange,
  isBurning,
  isDisabled,
  maxLength = 500
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [burnProgress, setBurnProgress] = useState(0);

  // Animate burn progress
  useEffect(() => {
    if (!isBurning) {
      setBurnProgress(0);
      return;
    }

    const duration = 2500; // 2.5s burn
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setBurnProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isBurning]);

  // Calculate burn effects based on progress
  const getBurnStyles = () => {
    if (!isBurning || shouldReduceMotion) {
      return {};
    }

    const charLevel = Math.min(burnProgress * 1.5, 1);

    return {
      backgroundColor: `rgb(
        ${253 - charLevel * 180},
        ${248 - charLevel * 180},
        ${243 - charLevel * 180}
      )`,
      boxShadow: burnProgress > 0.3
        ? `0 0 ${20 + burnProgress * 30}px rgba(255, 100, 0, ${0.3 + burnProgress * 0.4})`
        : undefined,
    };
  };

  // Paper curl and fade animation
  const burnVariants = {
    idle: {
      rotateX: 0,
      scale: 1,
      opacity: 1,
    },
    burning: shouldReduceMotion
      ? {
          opacity: 0,
          transition: { duration: 2, ease: "easeOut" },
        }
      : {
          rotateX: [0, -2, -5, -8],
          scale: [1, 1.01, 0.99, 0.97],
          opacity: [1, 1, 0.8, 0],
          transition: {
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          },
        },
  };

  // Text fade animation (text disappears as fire reaches it)
  const textOpacity = isBurning
    ? Math.max(0, 1 - burnProgress * 1.8)
    : 1;

  // Burn edge height percentage
  const burnEdgeHeight = isBurning ? Math.min(burnProgress * 120, 100) : 0;

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      style={{ perspective: "1000px" }}
      variants={burnVariants}
      initial="idle"
      animate={isBurning ? "burning" : "idle"}
    >
      {/* Paper background with texture */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          backgroundColor: "#FDF8F3",
          boxShadow: `
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 0 60px rgba(0, 0, 0, 0.03)
          `,
          ...getBurnStyles(),
          transformStyle: "preserve-3d",
        }}
      >
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Paper edge lines */}
        <div className="absolute left-6 right-6 top-4 bottom-4 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-b"
              style={{
                top: `${(i + 1) * 8}%`,
                borderColor: "rgba(180, 160, 140, 0.2)",
              }}
            />
          ))}
        </div>

        {/* Realistic burn edge effect - like the reference image */}
        {isBurning && !shouldReduceMotion && (
          <>
            {/* Charred black edge */}
            <motion.div
              className="absolute left-0 right-0 bottom-0 pointer-events-none"
              initial={{ height: "0%" }}
              animate={{ height: `${burnEdgeHeight}%` }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              style={{
                background: `
                  linear-gradient(to top,
                    rgba(15, 10, 5, 0.98) 0%,
                    rgba(30, 20, 10, 0.95) 15%,
                    rgba(50, 35, 20, 0.85) 30%,
                    rgba(80, 50, 25, 0.7) 45%,
                    rgba(120, 70, 30, 0.5) 60%,
                    rgba(160, 100, 40, 0.3) 75%,
                    transparent 100%
                  )
                `,
              }}
            />

            {/* Glowing ember edge line */}
            <motion.div
              className="absolute left-0 right-0 pointer-events-none"
              initial={{ bottom: "0%" }}
              animate={{ bottom: `${Math.min(burnEdgeHeight - 5, 95)}%` }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              style={{
                height: "8px",
                background: `
                  linear-gradient(to top,
                    transparent 0%,
                    rgba(255, 80, 0, 0.9) 20%,
                    rgba(255, 150, 50, 1) 50%,
                    rgba(255, 200, 100, 0.9) 70%,
                    rgba(255, 120, 30, 0.6) 90%,
                    transparent 100%
                  )
                `,
                filter: "blur(2px)",
                boxShadow: "0 0 15px rgba(255, 120, 30, 0.8), 0 0 30px rgba(255, 80, 0, 0.5)",
              }}
            />

            {/* Flickering ember particles along the burn line */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`ember-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${5 + i * 8}%`,
                  width: "6px",
                  height: "6px",
                  background: "radial-gradient(circle, rgba(255, 220, 100, 1) 0%, rgba(255, 120, 30, 0.8) 50%, transparent 100%)",
                  boxShadow: "0 0 8px rgba(255, 150, 50, 0.9), 0 0 15px rgba(255, 100, 0, 0.6)",
                }}
                initial={{ bottom: "0%", opacity: 0 }}
                animate={{
                  bottom: `${Math.min(burnEdgeHeight - 3, 97)}%`,
                  opacity: [0, 1, 0.8, 1, 0.6, 1, 0],
                  scale: [0.5, 1.2, 0.8, 1.1, 0.9, 1, 0.3],
                }}
                transition={{
                  bottom: { duration: 2.5, ease: "easeInOut" },
                  opacity: { duration: 0.4, repeat: 6, ease: "easeInOut" },
                  scale: { duration: 0.3, repeat: 8, ease: "easeInOut" },
                }}
              />
            ))}

            {/* Sparks/embers flying off */}
            {[...Array(8)].map((_, i) => {
              const randomOffsetY = 20 + (i * 7) % 30;
              const randomOffsetX = ((i * 13) % 40) - 20;
              return (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                  style={{
                    left: `${15 + i * 10}%`,
                    background: "radial-gradient(circle, rgba(255, 200, 80, 1) 0%, rgba(255, 120, 30, 0.8) 50%, transparent 100%)",
                    boxShadow: "0 0 4px rgba(255, 150, 50, 0.9)",
                  }}
                  initial={{
                    bottom: "10%",
                    opacity: 0,
                    scale: 0.5,
                  }}
                  animate={{
                    bottom: ["10%", `${randomOffsetY}%`],
                    x: [randomOffsetX / 2, randomOffsetX],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.3],
                  }}
                  transition={{
                    duration: 0.6 + (i % 3) * 0.2,
                    delay: 0.5 + i * 0.15,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </>
        )}

        {/* Content area */}
        <div className="relative p-6 min-h-[300px]">
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            disabled={isDisabled}
            maxLength={maxLength}
            placeholder="Write your thought here... Let it go once you're ready."
            className="w-full h-64 bg-transparent resize-none outline-none text-lg leading-relaxed"
            style={{
              fontFamily: "'Sour Gummy', cursive",
              color: `rgba(60, 50, 45, ${textOpacity})`,
              caretColor: isDisabled ? "transparent" : "#3c322d",
              transition: "color 0.1s ease-out",
            }}
            aria-label="Write your stressful thought"
          />

          {/* Character counter */}
          <div
            className="absolute bottom-4 right-6 text-sm"
            style={{
              color: `rgba(140, 130, 120, ${textOpacity})`,
            }}
          >
            {text.length}/{maxLength}
          </div>
        </div>
      </div>

      {/* Paper shadow */}
      <motion.div
        className="absolute -bottom-2 left-4 right-4 h-4 -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
        animate={{
          opacity: isBurning ? 0 : 1,
          scaleX: isBurning ? 0.9 : 1,
        }}
        transition={{ duration: 2 }}
      />
    </motion.div>
  );
};

export default PaperSheet;
