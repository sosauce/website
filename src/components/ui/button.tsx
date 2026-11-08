"use client"

import { motion } from "motion/react"
import Link from "next/link"
import type { ReactNode } from "react"
import type { IconName } from "@/content/site"
import { cn } from "@/lib/cn"
import { spatial } from "@/lib/motion"
import { Icon } from "./icon"

const MotionLink = motion.create(Link)

const variants = {
  brand: "bg-brand text-on-brand",
  filled: "bg-primary text-on-primary",
  tonal: "bg-primary-container text-on-primary-container",
  outlined:
    "border-2 border-current/35 text-current hover:border-current/60 hover:bg-current/10",
} as const

/** Height, padding and the pill -> squircle radii used by the press morph. */
const sizes = {
  lg: {
    base: "h-16 gap-3 text-xl font-bold max-sm:h-14",
    pad: {
      end: "pr-3 pl-8 max-sm:pl-6",
      start: "pr-8 pl-3 max-sm:pr-6",
      plain: "px-8 max-sm:px-6",
    },
    iconBubble: "size-11 max-sm:size-9",
    iconSize: "size-6 max-sm:size-5",
    radius: 32,
    pressed: 20,
  },
  md: {
    base: "h-14 gap-2.5 text-lg font-bold",
    pad: { end: "pr-2.5 pl-6", start: "pr-6 pl-2.5", plain: "px-6" },
    iconBubble: "size-10",
    iconSize: "size-5",
    radius: 28,
    pressed: 18,
  },
  sm: {
    base: "h-12 gap-2 text-base font-bold",
    pad: { end: "pr-2 pl-5", start: "pr-5 pl-2", plain: "px-5" },
    iconBubble: "size-8",
    iconSize: "size-4",
    radius: 24,
    pressed: 14,
  },
} as const

export type ButtonProps = {
  href: string
  children: ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  icon?: IconName
  iconPosition?: "start" | "end"
  /** Opens in a new tab. */
  external?: boolean
  ariaLabel?: string
  className?: string
}

/**
 * Big M3 Expressive pill button. Squishes and morphs toward a squircle on
 * press, bounces up on hover; the icon sits in its own round bubble.
 */
export function Button({
  href,
  children,
  variant = "brand",
  size = "lg",
  icon,
  iconPosition = "end",
  external = false,
  ariaLabel,
  className,
}: ButtonProps) {
  const s = sizes[size]
  const iconBubble = icon && (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-current/15 transition-transform duration-300 ease-bounce",
        iconPosition === "end"
          ? "group-hover:translate-x-0.5 group-hover:-rotate-12"
          : "group-hover:-translate-x-0.5 group-hover:rotate-12",
        s.iconBubble
      )}
    >
      <Icon name={icon} className={s.iconSize} />
    </span>
  )

  const classes = cn(
    "group inline-flex items-center justify-center whitespace-nowrap select-none",
    s.base,
    icon ? s.pad[iconPosition] : s.pad.plain,
    icon && iconPosition === "start" && "flex-row-reverse",
    variants[variant],
    className
  )

  const motionProps = {
    className: classes,
    "aria-label": ariaLabel,
    style: { borderRadius: s.radius },
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.94, borderRadius: s.pressed },
    transition: spatial.fast,
  }

  const content = (
    <>
      <span>{children}</span>
      {iconBubble}
    </>
  )

  if (external) {
    return (
      <motion.a href={href} target="_blank" rel="noopener" {...motionProps}>
        {content}
      </motion.a>
    )
  }
  return (
    <MotionLink href={href} {...motionProps}>
      {content}
    </MotionLink>
  )
}
