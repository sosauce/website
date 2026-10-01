import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { About } from "@/components/About";
import { ProjectCard } from "@/components/projects/project-card";
import { GithubIcon } from "@/components/icons/github-icon";
import { buttonVariants } from "@/components/ui/button";
import { featuredProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-4 pt-28 pb-16 sm:px-6">
        <div className="flex w-full flex-col items-start text-left">
          <div className="flex w-full max-w-2xl justify-start">
            <About />
          </div>

          <div className="flex flex-wrap items-center justify-start gap-2 pt-6">
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "group rounded-full px-6"
              )}
            >
              See my projects
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href="https://github.com/sosauce"
              target="_blank"
              rel="noopener"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-6"
              )}
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Featured preview — data-driven, same cards as the Projects page */}
        <section
          aria-labelledby="featured-preview-heading"
          className="mt-16 w-full"
        >
          <div className="flex items-end justify-between gap-4">
            <h2
              id="featured-preview-heading"
              className="text-xl font-bold tracking-tight"
            >
              Featured
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              View all
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
