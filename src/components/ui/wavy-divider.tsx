import { cn } from "@/lib/cn"

const TILE = 720
const wavePath = (() => {
  let d = "M0 24"
  for (let x = 0; x < TILE * 4; x += TILE) {
    d += `C${x + 120} 0 ${x + 240} 0 ${x + 360} 24C${x + 480} 48 ${x + 600} 48 ${x + TILE} 24`
  }
  return `${d}L${TILE * 4} 48L0 48Z`
})()

/**
 * Soft drifting wave that leads into the next section. Color it with a
 * text-* class matching the background of the section below.
 */
export function WavyDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative -mb-px h-8 overflow-hidden sm:h-12", className)}
    >
      <svg
        viewBox={`0 0 ${TILE * 4} 48`}
        preserveAspectRatio="none"
        fill="currentColor"
        focusable="false"
        className="absolute inset-y-0 left-0 h-full w-[200%] motion-safe:animate-wave"
      >
        <path d={wavePath} />
      </svg>
    </div>
  )
}
