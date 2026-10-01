"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useMemo, useState } from "react"
import { projectCategories, projects, type Project } from "@/data/projects"
import { cn } from "@/lib/utils"
import BlurOutUp from "../smoothui/blur-out-up"
import { FeaturedProject, ProjectCard } from "./project-card"

const EASE = [0.22, 1, 0.36, 1] as const

function FilterPills({
  active,
  onChange,
  counts,
}: {
  active: string | "All"
  onChange: (c: string | "All") => void
  counts: Record<string, number>
}) {
  const options = ["All", ...projectCategories]
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const selected = active === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={selected}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              selected
                ? "border-transparent bg-foreground text-background shadow-md"
                : "border-foreground/10 bg-card text-muted-foreground hover:border-foreground/25 hover:text-foreground"
            )}
          >
            {option}
            <span
              className={cn(
                "rounded-full px-1.5 text-xs tabular-nums",
                selected ? "bg-background/20" : "bg-muted"
              )}
            >
              {option === "All" ? projects.length : (counts[option] ?? 0)}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function AnimatedItem({
  index,
  children,
  itemKey,
}: {
  index: number
  itemKey: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      key={itemKey}
      layout={!reduceMotion}
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }
      }
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={
        reduceMotion
          ? { duration: 0.15 }
          : { duration: 0.45, delay: Math.min(index * 0.06, 0.36), ease: EASE }
      }
    >
      {children}
    </motion.div>
  )
}

export function ProjectsPage() {
  const [filter, setFilter] = useState<string | "All">("All")

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const p of projects) {
      if (p.category) map[p.category] = (map[p.category] ?? 0) + 1
    }
    return map
  }, [])

  const visible = useMemo<Project[]>(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  )
  const featured = useMemo(() => visible.filter((p) => p.featured), [visible])
  const rest = useMemo(() => visible.filter((p) => !p.featured), [visible])

  return (
    <section
      aria-labelledby="projects-heading"
      className="mx-auto w-full max-w-5xl px-4 pt-24 pb-16 sm:px-6"
    >
      {/* Header */}
      <div className="flex flex-col items-start gap-3">
        <BlurOutUp
          className="text-4xl font-bold tracking-tight text-balance sm:text-5xl"
          triggerOnView
        >
          My projects
        </BlurOutUp>
        <p className="max-w-2xl text-lg text-muted-foreground">
          From Android apps, Compose libraries to web experiments, I make a variety of experiences all feel like they belong into the same ecosystem!
        </p>
        <FilterPills active={filter} onChange={setFilter} counts={counts} />
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="mt-8 space-y-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {featured.map((project, i) => (
              <AnimatedItem key={project.name} itemKey={project.name} index={i}>
                <FeaturedProject project={project} />
              </AnimatedItem>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Grid — data-driven asymmetry: cards with a longer story span two columns */}
      {rest.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {rest.map((project, i) => (
              <AnimatedItem key={project.name} itemKey={project.name} index={i}>
                <ProjectCard
                  project={project}
                  className={cn(project.longDescription && "sm:col-span-2")}
                />
              </AnimatedItem>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
