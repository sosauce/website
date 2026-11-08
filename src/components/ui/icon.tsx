import type { IconName } from "@/content/site"

const strokePaths: Record<Exclude<IconName, "github" | "star">, string[]> = {
  grid: [
    "M4 6.5A2.5 2.5 0 0 1 6.5 4h1A2.5 2.5 0 0 1 10 6.5v1A2.5 2.5 0 0 1 7.5 10h-1A2.5 2.5 0 0 1 4 7.5z",
    "M14 6.5A2.5 2.5 0 0 1 16.5 4h1A2.5 2.5 0 0 1 20 6.5v1a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 14 7.5z",
    "M4 16.5A2.5 2.5 0 0 1 6.5 14h1a2.5 2.5 0 0 1 2.5 2.5v1A2.5 2.5 0 0 1 7.5 20h-1A2.5 2.5 0 0 1 4 17.5z",
    "M14 16.5a2.5 2.5 0 0 1 2.5-2.5h1a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5z",
  ],
  pin: [
    "M19 10c0 4.6-5 9.4-6.4 10.7a.9.9 0 0 1-1.2 0C10 19.4 5 14.6 5 10a7 7 0 0 1 14 0",
    "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  ],
  plus: ["M5 12h14", "M12 5v14"],
  arrowRight: ["M5 12h14", "m12 5 7 7-7 7"],
  arrowLeft: ["M19 12H5", "m12 19-7-7 7-7"],
  arrowUpRight: ["M7 7h10v10", "M7 17 17 7"],
  external: [
    "M15 3h6v6",
    "M10 14 21 3",
    "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  ],
  download: [
    "M12 15V3",
    "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
    "m7 10 5 5 5-5",
  ],
}

const fillPaths: Record<"github" | "star", string> = {
  star: "M11.1 2.9a1 1 0 0 1 1.8 0l2.3 4.6 5.1.8a1 1 0 0 1 .6 1.7l-3.7 3.6.9 5.1a1 1 0 0 1-1.5 1l-4.6-2.4-4.6 2.4a1 1 0 0 1-1.5-1l.9-5.1-3.7-3.6a1 1 0 0 1 .6-1.7l5.1-.8z",
  github:
    "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3",
}

/** Inline SVG icon set (decorative: always aria-hidden). */
export function Icon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  if (name === "github" || name === "star") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className={className}
      >
        <path d={fillPaths[name]} />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {strokePaths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
