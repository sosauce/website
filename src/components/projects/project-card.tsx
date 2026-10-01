import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  FolderGit2,
  Star,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import GitHubStarsAnimation from "../smoothui/github-stars-animation";
import { GithubIcon } from "../icons/github-icon";

type AccentStyle = CSSProperties & { "--project-accent": string };

function accentStyle(project: Project): AccentStyle | undefined {
  if (!project.accent) return undefined;
  return { "--project-accent": project.accent };
}

function ProjectActions({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener"
          aria-label={`${project.name} on GitHub`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <GithubIcon className="size-3.5" />
          GitHub
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover/action:translate-x-px group-hover/action:-translate-y-px"
            aria-hidden="true"
          />
        </a>
      )}
      {project.websiteUrl && (
        <a
          href={project.websiteUrl}
          target="_blank"
          rel="noopener"
          aria-label={`${project.name} live website`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <ExternalLink className="size-3.5" aria-hidden="true" />
          Live
        </a>
      )}
      {project.downloadUrl && (
        <a
          href={project.downloadUrl}
          target="_blank"
          rel="noopener"
          aria-label={`Download ${project.name}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <Download className="size-3.5" aria-hidden="true" />
          Download
        </a>
      )}
    </div>
  );
}

export function FeaturedProject({ project }: { project: Project }) {
  const Icon = project.icon ?? FolderGit2;

  return (
    <article
      aria-labelledby={`featured-${project.name}`}
      style={accentStyle(project)}
      className="group bg-card ring-foreground/10 focus-within:ring-ring relative grid gap-0 overflow-hidden rounded-3xl shadow-xl ring-1 shadow-black/5 transition-all duration-300 focus-within:ring-2 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 hover:ring-(--project-accent,var(--color-brand)) md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <div
        aria-hidden="true"
        className="bg-muted relative flex min-h-52 items-center justify-center overflow-hidden md:min-h-full"
      >
        <div className="absolute inset-0 bg-linear-to-br from-(--project-accent,var(--color-brand)) via-transparent to-transparent opacity-25" />
        <div className="absolute -top-10 -right-10 size-44 rounded-full bg-(--project-accent,var(--color-brand)) opacity-30 blur-3xl transition-transform duration-500 group-hover:scale-125" />
        <div className="absolute -bottom-12 -left-8 size-40 rounded-full bg-(--project-accent,var(--color-brand)) opacity-20 blur-3xl" />
        <div className="relative flex size-24 items-center justify-center rounded-[1.75rem] bg-(--project-accent,var(--color-brand)) text-5xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 md:size-28">
          {project.emoji ? (
            <span aria-hidden="true">{project.emoji}</span>
          ) : (
            <Icon className="size-12 text-white" aria-hidden="true" />
          )}
        </div>
        {project.featured && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
            <Star className="size-3 fill-current" aria-hidden="true" />
            Featured
          </span>
        )}
      </div>

      {/* Content side */}
      <div className="flex flex-col gap-3 p-6 md:p-8">
        <div>
          <h3
            id={`featured-${project.name}`}
            className="flex items-center gap-2.5 text-2xl font-bold tracking-tight"
          >
            {project.name}
          </h3>
          <p className="text-muted-foreground mt-1.5 text-[15px] leading-relaxed">
            {project.longDescription ?? project.description}
          </p>
        </div>
        {project.githubRepo && (
          <GitHubStarsAnimation
            owner={project.githubRepo.owner}
            repo={project.githubRepo.repo}
            className="text-sm"
          />
        )}
        <p className="text-muted-foreground text-[12px] leading-relaxed">
          {project.sha256 != null ? "SHA-256: " + project.sha256 : ""}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <span className="group/action contents">
            <ProjectActions project={project} />
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * `className` allows the grid to give certain cards more room (spans).
 */
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const Icon = project.icon ?? FolderGit2;

  return (
    <article
      aria-labelledby={`project-${project.name}`}
      style={accentStyle(project)}
      className={cn("group h-full", className)}
    >
      <Card className="focus-within:ring-ring relative h-full gap-3 overflow-hidden transition-all duration-300 focus-within:ring-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 hover:ring-(--project-accent,var(--color-brand))">
        <CardHeader className="flex-row items-start gap-3 space-y-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-row pb-2">
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-xl bg-(--project-accent,var(--color-brand))/15 text-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
              >
                {project.emoji ?? (
                  <Icon className="size-5" aria-hidden="true" />
                )}
              </span>
              <div className="flex flex-col pl-2">
              <h3
                id={`project-${project.name}`}
                className="truncate text-base font-bold tracking-tight"
              >
                {project.name}
              </h3>
              {project.category && (
                <p className="text-muted-foreground text-xs">
                  {project.category}
                </p>
              )}
              </div>
            </div>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener"
              aria-label={`${project.name} on GitHub (opens in new tab)`}
              className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring ml-auto shrink-0 rounded-lg p-1.5 transition-all focus-visible:ring-2 focus-visible:outline-none"
            ></a>
          )}
        </CardHeader>
        <CardFooter className="mt-auto border-0 bg-transparent p-(--card-spacing) pt-0">
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <span className="group/action contents">
              <ProjectActions project={project} />
            </span>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
}
