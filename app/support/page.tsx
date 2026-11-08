import type { Metadata } from "next"
import { SupportCard } from "@/components/support/support-card"
import { Reveal, RevealItem } from "@/components/ui/motion-primitives"
import { WavyDivider } from "@/components/ui/wavy-divider"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: site.supportPage.metaTitle,
}

export default function SupportPage() {
  const { title, lead, ways } = site.supportPage
  return (
    <>
      <Reveal className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 pt-32 pb-12 sm:px-8 sm:pt-40">
        <RevealItem>
          <h1 id="support-heading" className="text-display font-display">
            {title}
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="max-w-3xl text-lead font-medium text-on-surface-variant">
            {lead}
          </p>
        </RevealItem>
      </Reveal>

      <WavyDivider className="text-surface-container-low" />
      <section
        aria-labelledby="support-heading"
        className="flex-1 bg-surface-container-low"
      >
        <Reveal
          as="ul"
          delay={0.1}
          className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-5 pt-10 pb-24 sm:gap-5 sm:px-8 sm:pt-14 md:grid-cols-3"
        >
          {ways.map((way, i) => (
            <RevealItem as="li" key={way.title}>
              <SupportCard way={way} index={i} />
            </RevealItem>
          ))}
        </Reveal>
      </section>
    </>
  )
}
