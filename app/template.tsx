"use client"

import { motion } from "motion/react"
import { effects, spatial } from "@/lib/motion"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      id="main-content"
      tabIndex={-1}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spatial.default, opacity: effects.default }}
      className="relative z-10 flex min-h-screen flex-col outline-none"
    >
      {children}
    </motion.main>
  )
}
