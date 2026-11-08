import { Button } from "@/components/ui/button"
import { Float, Reveal, RevealItem } from "@/components/ui/motion-primitives"
import { Shape } from "@/components/ui/shapes"
import { site } from "@/content/site"

export default function NotFound() {
  const { title, body, cta } = site.notFound
  return (
    <div className="flex flex-1 items-center">
      <Reveal className="relative mx-auto flex w-full max-w-6xl flex-col items-start px-5 pt-32 pb-16 sm:px-8">
        <Float
          className="absolute -top-2 right-6 hidden text-primary-container sm:block"
          duration={8}
          rotate={-10}
        >
          <Shape name="cookie" className="size-40 lg:size-56" />
        </Float>
        <RevealItem>
          <h1 className="relative text-display font-display text-balance">
            {title}
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="relative mt-5 max-w-2xl text-lead font-medium text-on-surface-variant">
            {body}
          </p>
        </RevealItem>
        <RevealItem className="mt-10">
          <Button href={cta.href} icon="arrowLeft" iconPosition="start">
            {cta.label}
          </Button>
        </RevealItem>
      </Reveal>
    </div>
  )
}
