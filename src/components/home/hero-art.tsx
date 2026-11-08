"use client"

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useRef } from "react"
import { popIn, spatial, stagger } from "@/lib/motion"
import { Float } from "../ui/motion-primitives"
import { Shape, type ShapeName } from "../ui/shapes"

type Piece = {
  name: ShapeName
  /** position + size inside the square stage */
  className: string
  color: string
  /** parallax strength: px moved over the hero's scroll range */
  depth: number
  float: { duration: number; delay: number; rotate: number; y: number }
  spin?: boolean
}

const pieces: Piece[] = [
  {
    name: "cookie",
    className: "top-[0%] left-[2%] size-[44%]",
    color: "text-primary-container",
    depth: 40,
    float: { duration: 9, delay: 0.3, rotate: 8, y: 10 },
  },
  {
    name: "flower",
    className: "top-[12%] left-[12%] size-[78%]",
    color: "text-brand",
    depth: 90,
    float: { duration: 11, delay: 0, rotate: 0, y: 8 },
    spin: true,
  },
  {
    name: "clover",
    className: "bottom-[2%] left-[0%] size-[26%]",
    color: "text-secondary-container",
    depth: 160,
    float: { duration: 8, delay: 1, rotate: -12, y: 14 },
  },
  {
    name: "bow",
    className: "top-[33%] left-[24%] size-[54%]",
    color: "text-primary-container",
    depth: 130,
    float: { duration: 6, delay: 0.5, rotate: -6, y: 12 },
  },
  {
    name: "heart",
    className: "right-[0%] bottom-[6%] size-[24%]",
    color: "text-tertiary",
    depth: 200,
    float: { duration: 7, delay: 1.4, rotate: 12, y: 16 },
  },
  {
    name: "sparkle",
    className: "top-[4%] right-[8%] size-[12%]",
    color: "text-primary",
    depth: 240,
    float: { duration: 5, delay: 0.8, rotate: 45, y: 10 },
  },
  {
    name: "sparkle",
    className: "top-[52%] left-[-4%] size-[8%]",
    color: "text-tertiary",
    depth: 260,
    float: { duration: 4.5, delay: 2, rotate: -45, y: 8 },
  },
  {
    name: "sparkle",
    className: "right-[30%] bottom-[-2%] size-[6%]",
    color: "text-on-surface",
    depth: 220,
    float: { duration: 5.5, delay: 1.2, rotate: 30, y: 8 },
  },
]

function ParallaxPiece({
  piece,
  progress,
}: {
  piece: Piece
  progress: MotionValue<number>
}) {
  const y = useSpring(
    useTransform(progress, [0, 1], [0, -piece.depth]),
    spatial.slow
  )
  return (
    <motion.div style={{ y }} className={`absolute ${piece.className}`}>
      <motion.div variants={popIn} className="size-full">
        <Float className={`size-full ${piece.color}`} {...piece.float}>
          <Shape
            name={piece.name}
            className={
              piece.spin
                ? "size-full motion-safe:animate-spin-slow"
                : "size-full"
            }
          />
        </Float>
      </motion.div>
    </motion.div>
  )
}

/** Decorative sticker cluster next to the hero text, with scroll parallax. */
export function HeroArt() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      variants={stagger(0.35, 0.07)}
      initial="hidden"
      animate="show"
      className="relative mx-auto hidden aspect-square w-full max-w-[480px] lg:block"
    >
      {pieces.map((piece, i) => (
        <ParallaxPiece key={i} piece={piece} progress={scrollYProgress} />
      ))}
    </motion.div>
  )
}
