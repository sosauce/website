import type { SupportWay } from "@/content/site"
import { cn } from "@/lib/cn"
import { Button } from "../ui/button"
import { Shape } from "../ui/shapes"

/** Pink container sets, one per card. */
const tones = [
  {
    card: "bg-primary-container text-on-primary-container",
    tile: "text-brand",
    button: "brand",
  },
  {
    card: "bg-secondary-container text-on-secondary-container",
    tile: "text-secondary",
    button: "filled",
  },
  {
    card: "bg-tertiary-container text-on-tertiary-container",
    tile: "text-tertiary",
    button: "filled",
  },
] as const

export function SupportCard({
  way,
  index,
}: {
  way: SupportWay
  index: number
}) {
  const tone = tones[index % tones.length]
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl p-8 transition-transform duration-500 ease-bounce hover:-translate-y-1.5 sm:p-10",
        tone.card
      )}
    >
      <Shape
        name="flower"
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 size-56 opacity-25 motion-safe:animate-spin-slow",
          tone.tile
        )}
      />
      <span
        aria-hidden="true"
        className="relative flex size-24 items-center justify-center motion-safe:group-hover:animate-wiggle"
      >
        <Shape
          name="cookie"
          className={cn(
            "absolute inset-0 size-full transition-transform duration-700 ease-bounce group-hover:rotate-45",
            tone.tile
          )}
        />
        <span className="relative text-5xl">{way.emoji}</span>
      </span>
      <div className="relative">
        <h2 className="text-title font-extrabold tracking-tight font-wide">
          {way.title}
        </h2>
        <p className="mt-3 text-body">{way.body}</p>
      </div>
      <div className="relative mt-auto pt-2">
        <Button
          href={way.cta.href}
          external={way.cta.external}
          variant={tone.button}
          size="md"
          icon={way.cta.external ? "arrowUpRight" : "arrowRight"}
        >
          {way.cta.label}
        </Button>
      </div>
    </article>
  )
}
