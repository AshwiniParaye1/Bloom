"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const AshParticles = ({ isActive }) => {
  const shouldReduceMotion = useReducedMotion();

  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100, // percentage across width
      size: Math.random() * 4 + 2, // 2-6px
      duration: Math.random() * 2 + 2, // 2-4s
      delay: Math.random() * 1.5, // 0-1.5s delay
      drift: (Math.random() - 0.5) * 60, // -30 to 30px horizontal drift
      opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8 opacity
    }));
  }, []);

  if (!isActive) return null;

  // Simplified animation for reduced motion
  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.slice(0, 8).map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.startX}%`,
              bottom: "20%",
              width: particle.size,
              height: particle.size,
              backgroundColor: `rgba(80, 60, 50, ${particle.opacity})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, particle.opacity, 0] }}
            transition={{ duration: 2, delay: particle.delay }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.startX}%`,
            bottom: 0,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(60, 50, 45, ${particle.opacity}) 0%, rgba(40, 35, 30, ${particle.opacity * 0.5}) 100%)`,
            boxShadow: `0 0 ${particle.size / 2}px rgba(255, 150, 50, 0.3)`,
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: -350,
            x: particle.drift,
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0.5, 1, 0.8, 0.3],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay + 1, // Start after fire begins
            ease: "easeOut",
          }}
        />
      ))}

      {/* Ember glow particles */}
      {particles.slice(0, 10).map((particle) => (
        <motion.div
          key={`ember-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.startX}%`,
            bottom: "10%",
            width: particle.size * 0.6,
            height: particle.size * 0.6,
            background: "radial-gradient(circle, rgba(255, 180, 50, 0.8) 0%, rgba(255, 100, 30, 0.4) 50%, transparent 100%)",
          }}
          initial={{
            y: 0,
            opacity: 0,
          }}
          animate={{
            y: [-20, -150],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: particle.duration * 0.7,
            delay: particle.delay + 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default AshParticles;
