"use client"

import { AnimatePresence, motion } from "motion/react"
import { useMemo, useState } from "react"
import { projectCategories, site, type Project } from "@/content/site"
import { cn } from "@/lib/cn"
import { effects, fadeUp, spatial, stagger } from "@/lib/motion"
import { WavyDivider } from "../ui/wavy-divider"
import { FeaturedProject, ProjectCard } from "./project-card"

const ALL = "All"

function FilterChips({
  active,
  onChange,
  counts,
}: {
  active: string
  onChange: (category: string) => void
  counts: Record<string, number>
}) {
  const options = [ALL, ...projectCategories]
  return (
    <div
      role="group"
      aria-label={site.projectsPage.filterLabel}
      className="flex flex-wrap gap-2.5"
    >
      {options.map((option) => {
        const selected = active === option
        return (
          <motion.button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={selected}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92, borderRadius: 16 }}
            style={{ borderRadius: 24 }}
            transition={spatial.fast}
            className={cn(
              "relative inline-flex h-12 items-center gap-2 pr-2 pl-5 text-base font-bold transition-colors",
              selected
                ? "text-on-brand"
                : "bg-surface-container-high text-on-surface-variant ring-1 ring-outline-variant/60 hover:text-on-surface"
            )}
          >
            {selected && (
              <motion.span
                layoutId="filter-active"
                transition={spatial.bouncy}
                className="absolute inset-0 rounded-[inherit] bg-brand"
              />
            )}
            <span className="relative">
              {option === ALL ? site.projectsPage.allLabel : option}
            </span>
            <span
              className={cn(
                "relative flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm tabular-nums",
                selected ? "bg-on-brand/15" : "bg-surface-container-highest"
              )}
            >
              {option === ALL ? site.projects.length : (counts[option] ?? 0)}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

const itemMotion = {
  initial: { opacity: 0, y: 28, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

function AnimatedItem({
  index,
  className,
  children,
}: {
  index: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.li
      layout
      {...itemMotion}
      transition={{
        ...spatial.default,
        opacity: effects.default,
        delay: Math.min(index * 0.06, 0.36),
      }}
      className={className}
    >
      {children}
    </motion.li>
  )
}

export function ProjectsPage() {
  const [filter, setFilter] = useState(ALL)

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const p of site.projects) {
      if (p.category) map[p.category] = (map[p.category] ?? 0) + 1
    }
    return map
  }, [])

  const visible = useMemo<Project[]>(
    () =>
      filter === ALL
        ? site.projects
        : site.projects.filter((p) => p.category === filter),
    [filter]
  )
  const featured = visible.filter((p) => p.featured)
  const rest = visible.filter((p) => !p.featured)
  const { title, lead } = site.projectsPage

  return (
    <>
      <motion.header
        variants={stagger(0.1, 0.09)}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 pt-32 pb-12 sm:px-8 sm:pt-40"
      >
        <motion.h1
          id="projects-heading"
          variants={fadeUp}
          className="text-display font-display"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="max-w-3xl text-lead font-medium text-on-surface-variant"
        >
          {lead}
        </motion.p>
        <motion.div variants={fadeUp} className="pt-2">
          <FilterChips active={filter} onChange={setFilter} counts={counts} />
        </motion.div>
      </motion.header>

      <WavyDivider className="text-surface-container-low" />
      <section
        aria-labelledby="projects-heading"
        className="flex-1 bg-surface-container-low"
      >
        <div className="mx-auto w-full max-w-6xl px-5 pt-10 pb-24 sm:px-8 sm:pt-14">
          {featured.length > 0 && (
            <ul className="space-y-5">
              <AnimatePresence mode="popLayout" initial={false}>
                {featured.map((project, i) => (
                  <AnimatedItem key={project.name} index={i}>
                    <FeaturedProject project={project} index={i} />
                  </AnimatedItem>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {/* Cards with a longer story span two columns */}
          {rest.length > 0 && (
            <ul
              className={cn(
                "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3",
                featured.length > 0 && "mt-5"
              )}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {rest.map((project, i) => (
                  <AnimatedItem
                    key={project.name}
                    index={i}
                    className={cn(project.longDescription && "sm:col-span-2")}
                  >
                    <ProjectCard project={project} index={i + 1} />
                  </AnimatedItem>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
