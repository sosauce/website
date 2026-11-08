/**
 * Decorative M3 Expressive shapes. All are aria-hidden, sized by className
 * and filled with currentColor, so color them with text-* role classes.
 */

/** Closed polar curve r(θ) = base + amp·cos(lobes·θ) in a 100×100 box. */
function polarPath(lobes: number, base: number, amp: number) {
  const steps = 240
  const points: string[] = []
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const r = base + amp * Math.cos(lobes * t)
    const x = 50 + r * Math.cos(t - Math.PI / 2)
    const y = 50 + r * Math.sin(t - Math.PI / 2)
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return `M${points.join("L")}Z`
}

const paths = {
  /** 12-scallop "cookie" */
  cookie: polarPath(12, 45, 4),
  /** 6-petal flower */
  flower: polarPath(6, 38, 11),
  /** soft 9-point burst */
  burst: polarPath(9, 43, 6),
  /** 4-lobe clover */
  clover: polarPath(4, 36, 13),
  heart:
    "M50 90C22 70 5 53 5 33 5 18 16 7 30 7c9 0 16 5 20 12 4-7 11-12 20-12 14 0 25 11 25 26 0 20-17 37-45 57Z",
  sparkle:
    "M50 2c3 28 19 45 48 48-29 3-45 20-48 48-3-28-19-45-48-48C31 47 47 30 50 2Z",
} as const

export type ShapeName = keyof typeof paths | "bow"

export function Shape({
  name,
  className,
}: {
  name: ShapeName
  className?: string
}) {
  if (name === "bow") return <Bow className={className} />
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  )
}

/** A ribbon bow: loops + tails in currentColor, knot in the primary tone. */
function Bow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M54 52 38 92l11-5 7 10 5-43Z" />
      <path d="M66 52 82 92l-11-5-7 10-5-43Z" />
      <path d="M60 46C44 20 14 6 7 28c-7 22 22 36 53 24Z" />
      <path d="M60 46c16-26 46-40 53-18 7 22-22 36-53 24Z" />
      <rect
        x="48"
        y="36"
        width="24"
        height="24"
        rx="10"
        className="fill-primary"
      />
    </svg>
  )
}
