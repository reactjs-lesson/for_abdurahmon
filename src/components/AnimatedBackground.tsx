"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="animated-gradient-bg absolute inset-0" />

      <motion.div
        className="absolute -top-28 -left-24 h-96 w-96 rounded-full bg-sky-600/20 blur-3xl"
        animate={{
          x: [0, 90, -40, 0],
          y: [0, 50, 80, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[20%] -right-24 h-[30rem] w-[30rem] rounded-full bg-violet-600/20 blur-3xl"
        animate={{
          x: [0, -120, -40, 0],
          y: [0, 70, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-32 left-[28%] h-[26rem] w-[26rem] rounded-full bg-cyan-600/20 blur-3xl"
        animate={{
          x: [0, 50, -80, 0],
          y: [0, -60, -10, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
