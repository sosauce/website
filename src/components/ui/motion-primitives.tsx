"use client"

import { motion, useInView } from "motion/react"
import { useRef, type ReactNode } from "react"
import { fadeUp, popIn, stagger, viewport } from "@/lib/motion"

/** Staggered scroll reveal: children should be <RevealItem>s. */
export function Reveal({
  children,
  className,
  delay = 0.05,
  as = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "ul"
}) {
  const Component = as === "ul" ? motion.ul : motion.div
  return (
    <Component
      className={className}
      variants={stagger(delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </Component>
  )
}

export function RevealItem({
  children,
  className,
  as = "div",
  pop = false,
}: {
  children: ReactNode
  className?: string
  as?: "div" | "li"
  pop?: boolean
}) {
  const Component = as === "li" ? motion.li : motion.div
  return (
    <Component className={className} variants={pop ? popIn : fadeUp}>
      {children}
    </Component>
  )
}

/**
 * Idle float loop for decorative shapes. Only runs while on screen, and
 * MotionConfig's reducedMotion="user" turns it off for reduced motion.
 */
export function Float({
  children,
  className,
  duration = 7,
  delay = 0,
  y = 14,
  rotate = 6,
}: {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
  y?: number
  rotate?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={className}
      animate={
        inView ? { y: [0, -y, 0], rotate: [0, rotate, 0] } : { y: 0, rotate: 0 }
      }
      transition={{
        duration,
        delay,
        repeat: inView ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
