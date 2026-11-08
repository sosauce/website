import { Float } from "./ui/motion-primitives"
import { Shape, type ShapeName } from "./ui/shapes"

type FloatingShape = {
  name: ShapeName
  position: string
  size: string
  color: string
  duration: number
  delay: number
  rotate: number
}

/** Fixed, precomputed positions: no randomness, so no hydration mismatch. */
const shapes: FloatingShape[] = [
  {
    name: "flower",
    position: "top-[12%] left-[3%]",
    size: "size-16 sm:size-24",
    color: "text-primary-container",
    duration: 8,
    delay: 0,
    rotate: 18,
  },
  {
    name: "clover",
    position: "top-[9%] right-[6%]",
    size: "size-14 sm:size-20",
    color: "text-secondary-container",
    duration: 11,
    delay: 0.6,
    rotate: -14,
  },
  {
    name: "sparkle",
    position: "top-[27%] left-[1.5%] max-sm:hidden",
    size: "size-7",
    color: "text-primary",
    duration: 5,
    delay: 0.8,
    rotate: 30,
  },
  {
    name: "bow",
    position: "top-[44%] right-[3%]",
    size: "size-12 sm:size-16",
    color: "text-primary-container",
    duration: 9,
    delay: 1.4,
    rotate: 10,
  },
  {
    name: "burst",
    position: "top-[52%] left-[2%] max-sm:hidden",
    size: "size-12",
    color: "text-surface-container-highest",
    duration: 12,
    delay: 0.2,
    rotate: 40,
  },
  {
    name: "sparkle",
    position: "top-[96%] left-[32%]",
    size: "size-5",
    color: "text-tertiary",
    duration: 6,
    delay: 2,
    rotate: -30,
  },
  {
    name: "heart",
    position: "top-[72%] right-[10%]",
    size: "size-12 sm:size-16",
    color: "text-tertiary-container",
    duration: 9,
    delay: 1.2,
    rotate: -10,
  },
  {
    name: "cookie",
    position: "top-[84%] left-[7%]",
    size: "size-20 sm:size-28",
    color: "text-secondary-container",
    duration: 10,
    delay: 0.4,
    rotate: 20,
  },
  {
    name: "heart",
    position: "top-[90%] left-[58%] max-sm:hidden",
    size: "size-8",
    color: "text-primary-container",
    duration: 7,
    delay: 1.8,
    rotate: 12,
  },
]

/** Cute pastel shapes drifting behind the whole site. */
export function FloatingShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-70"
    >
      {shapes.map((s, i) => (
        <Float
          key={i}
          className={`absolute ${s.position} ${s.color}`}
          duration={s.duration}
          delay={s.delay}
          rotate={s.rotate}
        >
          <Shape name={s.name} className={s.size} />
        </Float>
      ))}
    </div>
  )
}
