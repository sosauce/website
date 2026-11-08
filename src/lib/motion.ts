import type { Transition, Variants } from "motion/react"

/**
 * Every spring of the site lives here so all motion shares one physics.
 * Spatial springs (position, scale, rotation, shape) may overshoot a little;
 * effect springs (opacity, color) settle without overshoot.
 */
export const spatial = {
  fast: { type: "spring", stiffness: 800, damping: 34 },
  default: { type: "spring", stiffness: 380, damping: 31 },
  slow: { type: "spring", stiffness: 200, damping: 23 },
  bouncy: { type: "spring", stiffness: 500, damping: 14 },
} satisfies Record<string, Transition>

export const effects = {
  fast: { type: "spring", stiffness: 3800, damping: 123 },
  default: { type: "spring", stiffness: 1600, damping: 80 },
  slow: { type: "spring", stiffness: 800, damping: 57 },
} satisfies Record<string, Transition>

export const viewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spatial.default, opacity: effects.default },
  },
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -14 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { ...spatial.bouncy, opacity: effects.fast },
  },
}

export const stagger = (
  delayChildren = 0.05,
  staggerChildren = 0.08
): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
})
