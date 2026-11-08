import { site, type Project } from "@/content/site"
import { cn } from "@/lib/cn"
import { Button } from "../ui/button"
import { Icon } from "../ui/icon"
import { Shape } from "../ui/shapes"
import { GithubStars } from "./github-stars"

/** Container color sets cycled across cards so the grid isn't monochrome. */
const tones = [
  {
    card: "bg-primary-container text-on-primary-container",
    tile: "text-brand",
  },
  {
    card: "bg-surface-container-high text-on-surface",
    tile: "text-primary-container",
  },
  {
    card: "bg-secondary-container text-on-secondary-container",
    tile: "text-secondary",
  },
  {
    card: "bg-tertiary-container text-on-tertiary-container",
    tile: "text-tertiary",
  },
] as const

const toneFor = (index: number) => tones[index % tones.length]
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-")

function ProjectActions({
  project,
  emphasize = false,
}: {
  project: Project
  emphasize?: boolean
}) {
  const t = site.projectActions
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.githubUrl && (
        <Button
          href={project.githubUrl}
          external
          size="sm"
          variant={emphasize ? "brand" : "outlined"}
          icon="github"
          iconPosition="start"
          ariaLabel={t.githubAria(project.name)}
        >
          {t.github}
        </Button>
      )}
      {project.websiteUrl && (
        <Button
          href={project.websiteUrl}
          external
          size="sm"
          variant="outlined"
          icon="external"
          iconPosition="start"
          ariaLabel={t.liveAria(project.name)}
        >
          {t.live}
        </Button>
      )}
      {project.downloadUrl && (
        <Button
          href={project.downloadUrl}
          external
          size="sm"
          variant="outlined"
          icon="download"
          iconPosition="start"
          ariaLabel={t.downloadAria(project.name)}
        >
          {t.download}
        </Button>
      )}
    </div>
  )
}

/** Emoji sitting on a scalloped cookie that wiggles when the card is hovered. */
function EmojiTile({
  emoji,
  color,
  className,
  emojiClassName,
}: {
  emoji?: string
  color: string
  className: string
  emojiClassName: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex shrink-0 items-center justify-center motion-safe:group-hover:animate-wiggle",
        className
      )}
    >
      <Shape
        name="cookie"
        className={cn(
          "absolute inset-0 size-full transition-transform duration-700 ease-bounce group-hover:rotate-45",
          color
        )}
      />
      {emoji ? (
        <span className={cn("relative", emojiClassName)}>{emoji}</span>
      ) : (
        <Shape name="sparkle" className="relative size-1/2 text-on-brand" />
      )}
    </span>
  )
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const tone = toneFor(index)
  const id = `project-${slug(project.name)}`
  return (
    <article
      aria-labelledby={id}
      className={cn(
        "group flex h-full flex-col gap-6 rounded-xl p-7 transition-transform duration-500 ease-bounce hover:-translate-y-1.5 sm:p-8",
        tone.card
      )}
    >
      <div className="flex items-center gap-4">
        <EmojiTile
          emoji={project.emoji}
          color={tone.tile}
          className="size-16"
          emojiClassName="text-3xl"
        />
        <div className="min-w-0">
          <h3
            id={id}
            className="text-[clamp(1.375rem,1vw+1rem,1.875rem)] leading-tight font-extrabold tracking-tight break-words font-wide"
          >
            {project.name}
          </h3>
          {project.category && (
            <p className="mt-1 inline-flex rounded-full bg-current/10 px-3 py-0.5 text-sm font-semibold">
              {project.category}
            </p>
          )}
        </div>
      </div>
      <p className="text-body">{project.description}</p>
      <div className="mt-auto">
        <ProjectActions project={project} />
      </div>
    </article>
  )
}

export function FeaturedProject({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const tone = toneFor(index)
  const id = `featured-${slug(project.name)}`
  return (
    <article
      aria-labelledby={id}
      className="group grid overflow-hidden rounded-2xl bg-surface-container text-on-surface transition-transform duration-500 ease-bounce hover:-translate-y-1.5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <div
        className={cn(
          "relative flex min-h-64 items-center justify-center overflow-hidden md:min-h-full",
          tone.card
        )}
      >
        <Shape
          name="flower"
          className={cn(
            "absolute size-72 opacity-40 motion-safe:animate-spin-slow md:size-96",
            tone.tile
          )}
        />
        <Shape
          name="sparkle"
          className="absolute top-[18%] right-[16%] size-6 text-on-surface/70 transition-transform duration-500 ease-bounce group-hover:scale-150 group-hover:rotate-90"
        />
        <Shape
          name="sparkle"
          className="absolute bottom-[20%] left-[14%] size-4 text-on-surface/60 transition-transform duration-500 ease-bounce group-hover:scale-150 group-hover:-rotate-90"
        />
        <EmojiTile
          emoji={project.emoji}
          color={tone.tile}
          className="size-36 md:size-44"
          emojiClassName="text-6xl md:text-7xl"
        />
        {project.featured && (
          <span className="absolute top-5 left-5 inline-flex h-9 items-center gap-1.5 rounded-full bg-surface/80 pr-3.5 pl-2 text-sm font-bold text-on-surface backdrop-blur-md">
            <span className="flex size-6 items-center justify-center rounded-full bg-brand text-on-brand">
              <Icon name="star" className="size-3.5" />
            </span>
            {site.projectsPage.featuredBadge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-5 p-7 sm:p-10">
        <div>
          <h3
            id={id}
            className="text-title font-extrabold tracking-tight font-wide"
          >
            {project.name}
          </h3>
          <p className="mt-3 text-body text-on-surface-variant">
            {project.longDescription ?? project.description}
          </p>
        </div>
        {project.githubRepo && (
          <div>
            <GithubStars
              owner={project.githubRepo.owner}
              repo={project.githubRepo.repo}
            />
          </div>
        )}
        {project.sha256 && (
          <p className="rounded-lg bg-surface-container-highest px-4 py-3 font-mono text-xs leading-relaxed break-all text-on-surface-variant">
            {site.projectActions.sha256Prefix + project.sha256}
          </p>
        )}
        <div className="mt-auto pt-1">
          <ProjectActions project={project} emphasize />
        </div>
      </div>
    </article>
  )
}
