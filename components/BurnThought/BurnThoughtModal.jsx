"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import AshParticles from "./AshParticles";
import BurningSound from "./BurningSound";
import FireAnimation from "./FireAnimation";
import PaperSheet from "./PaperSheet";
import Image from "next/image";

// State machine: idle | writing | burning | completed
const STATES = {
  IDLE: "idle",
  WRITING: "writing",
  BURNING: "burning",
  COMPLETED: "completed",
};

const BurnThoughtModal = ({ isOpen, onClose }) => {
  const [state, setState] = useState(STATES.IDLE);
  const [text, setText] = useState("");
  const shouldReduceMotion = useReducedMotion();

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setState(STATES.WRITING);
      setText("");
    } else {
      setState(STATES.IDLE);
    }
  }, [isOpen]);

  // Handle escape key (only when not burning)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && state !== STATES.BURNING) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, state]);

  const handleClose = useCallback(() => {
    if (state === STATES.BURNING) return; // Cannot close during burn
    setText(""); // Clear text immediately
    setState(STATES.IDLE);
    onClose();
  }, [state, onClose]);

  const handleBurn = useCallback(() => {
    if (!text.trim() || state !== STATES.WRITING) return;

    setState(STATES.BURNING);

    // Animation duration
    const burnDuration = shouldReduceMotion ? 2000 : 3500;

    setTimeout(() => {
      setText(""); // CRITICAL: Clear text - no storage!
      setState(STATES.COMPLETED);
    }, burnDuration);
  }, [text, state, shouldReduceMotion]);

  const handleReset = useCallback(() => {
    setText("");
    setState(STATES.WRITING);
  }, []);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget && state !== STATES.BURNING) {
        handleClose();
      }
    },
    [state, handleClose]
  );

  // Modal animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const completionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.5 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="burn-thought-title"
        >
          {/* Burning sound effect */}
          <BurningSound isPlaying={state === STATES.BURNING} volume={0.25} />

          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background:
                state === STATES.BURNING
                  ? "radial-gradient(circle at center, rgba(20, 10, 5, 0.3) 0%, rgba(10, 5, 0, 0.6) 100%)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(6px)",
              transition: "all 0.5s ease-out",
            }}
          />

          {/* Modal content */}
          <motion.div
            className="relative w-full max-w-lg"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h2
                id="burn-thought-title"
                className="text-2xl font-medium text-white/90 mb-2"
              >
                {state === STATES.COMPLETED
                  ? "Released"
                  : state === STATES.BURNING
                  ? "Letting go..."
                  : "Release a Thought"}
              </h2>
              {state === STATES.WRITING && (
                <p className="text-white/60 text-sm">
                  Write what&apos;s weighing on your mind. When you&apos;re
                  ready, let it burn away.
                </p>
              )}
            </div>

            {/* Paper + Fire container */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {state !== STATES.COMPLETED ? (
                  <motion.div
                    key="paper"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <PaperSheet
                      text={text}
                      onTextChange={setText}
                      isBurning={state === STATES.BURNING}
                      isDisabled={state !== STATES.WRITING}
                    />

                    {/* Fire overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <FireAnimation isActive={state === STATES.BURNING} />
                      <AshParticles isActive={state === STATES.BURNING} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="completion"
                    className="text-center py-16"
                    variants={completionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Completion icon */}
                    <motion.div
                      className="inline-block mb-6"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-amber-400/80"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          fill="currentColor"
                        />
                      </svg>
                    </motion.div>

                    <h3 className="text-2xl text-white/90 font-medium mb-2">
                      You&apos;ve let it go.
                    </h3>
                    <p className="text-white/50 text-sm mb-8">
                      That thought is gone. It no longer has power over you.
                    </p>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-full text-white/70 border border-white/20 hover:border-white/40 hover:text-white/90 transition-all duration-200"
                      >
                        Write another
                      </button>
                      <button
                        onClick={handleClose}
                        className="px-6 py-2.5 rounded-full bg-amber-600/80 text-white hover:bg-amber-600 transition-all duration-200"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Burn button */}
            {state === STATES.WRITING && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={handleBurn}
                  disabled={!text.trim()}
                  className="group relative px-8 py-3 rounded-full font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: text.trim()
                      ? "linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)"
                      : "rgba(255,255,255,0.1)",
                    color: "white",
                    boxShadow: text.trim()
                      ? "0 4px 20px rgba(245, 158, 11, 0.4)"
                      : "none",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Image
                      src="/fire.gif"
                      alt="fire"
                      width={20}
                      height={20}
                      className="group-hover:animate-pulse"
                    />
                    Release this thought
                  </span>

                  {/* Hover glow effect */}
                  {text.trim() && (
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, #fbbf24 0%, #ef4444 100%)",
                        filter: "blur(8px)",
                        zIndex: -1,
                      }}
                    />
                  )}
                </button>
              </motion.div>
            )}

            {/* Close button (hidden during burning) */}
            {state !== STATES.BURNING && state !== STATES.COMPLETED && (
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all duration-200"
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BurnThoughtModal;
