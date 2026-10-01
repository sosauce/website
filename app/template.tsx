"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        id="main-content"
        key={pathname}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
        transition={
          reduceMotion
            ? { duration: 0.1 }
            : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
        }
        className="relative z-10 flex min-h-screen flex-col"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
