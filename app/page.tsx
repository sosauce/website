import { Hero } from "@/components/home/hero"
import { ProjectCard } from "@/components/projects/project-card"
import { Button } from "@/components/ui/button"
import { Reveal, RevealItem } from "@/components/ui/motion-primitives"
import { WavyDivider } from "@/components/ui/wavy-divider"
import { featuredProjects, site } from "@/content/site"

export default function HomePage() {
  const { title, viewAll } = site.home.featured
  return (
    <>
      <Hero />

      <WavyDivider className="text-surface-container-low" />
      <section
        aria-labelledby="featured-preview-heading"
        className="relative flex-1 bg-surface-container-low"
      >
        <div className="mx-auto w-full max-w-6xl px-5 pt-12 pb-24 sm:px-8 sm:pt-16">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <RevealItem>
              <h2
                id="featured-preview-heading"
                className="text-headline font-display"
              >
                {title}
              </h2>
            </RevealItem>
            <RevealItem>
              <Button
                href={viewAll.href}
                variant="tonal"
                size="md"
                icon="arrowRight"
              >
                {viewAll.label}
              </Button>
            </RevealItem>
          </Reveal>

          <Reveal
            as="ul"
            delay={0.1}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            {featuredProjects.map((project, i) => (
              <RevealItem as="li" key={project.name}>
                <ProjectCard project={project} index={i} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
