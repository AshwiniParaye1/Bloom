"use client";

import { BurnThoughtModal } from "@/components/BurnThought";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function BurnPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Only generate stars on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pre-defined star positions to avoid hydration issues
  const stars = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 17 + 5) % 100, // Deterministic spread
      top: (i * 23 + 11) % 100,
      duration: 2 + (i % 3),
      delay: (i % 4) * 0.5,
    }));
  }, [isMounted]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
      }}
    >
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft glow spots */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255, 165, 89, 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Subtle stars - only render on client */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </Link>

      {/* Main content */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon */}
        <motion.div
          className="inline-block mb-8"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(234, 88, 12, 0.2) 100%)",
              boxShadow: "0 0 40px rgba(251, 146, 60, 0.2)",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="text-orange-400"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="currentColor"
                opacity="0.3"
              />
              <path
                d="M12 6c-2.21 0-4 1.79-4 4 0 1.1.45 2.1 1.17 2.83L12 15.5l2.83-2.67C15.55 12.1 16 11.1 16 10c0-2.21-1.79-4-4-4zm0 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                fill="currentColor"
              />
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-medium text-white/90 mb-4">
          Let Go of What
          <br />
          <span className="text-orange-400">Weighs You Down</span>
        </h1>

        {/* Description */}
        <p className="text-white/50 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Write down what&apos;s troubling your mind, then watch it burn away.
          Nothing is saved. Nothing remains.
        </p>

        {/* Main CTA button */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="group relative px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
            color: "white",
            boxShadow: "0 4px 30px rgba(245, 158, 11, 0.4)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5 0.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
            </svg>
            Release a Thought
          </span>

          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
              filter: "blur(12px)",
              zIndex: -1,
            }}
          />
        </motion.button>

        {/* Privacy note */}
        <motion.p
          className="mt-8 text-white/30 text-sm flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
          Your thoughts are never saved or stored
        </motion.p>
      </motion.div>

      {/* Modal */}
      <BurnThoughtModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
