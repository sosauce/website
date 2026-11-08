"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { site } from "@/content/site"
import { cn } from "@/lib/cn"
import { spatial } from "@/lib/motion"
import { Icon } from "./ui/icon"

const MotionLink = motion.create(Link)

/** Floating pill navigation; the active pill slides between items. */
export function SiteNav() {
  const pathname = usePathname()
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        aria-label={site.a11y.primaryNav}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={spatial.slow}
        className="pointer-events-auto flex items-center gap-1 rounded-full bg-surface-container-high/80 p-1.5 shadow-lg ring-1 shadow-black/20 ring-outline-variant/60 backdrop-blur-md"
      >
        {site.nav.map(({ href, label, icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <MotionLink
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              whileTap={{ scale: 0.92 }}
              transition={spatial.fast}
              className={cn(
                "group relative flex h-12 min-w-12 items-center justify-center gap-2 rounded-full px-3.5 text-base font-bold transition-colors min-[420px]:px-5",
                isActive
                  ? "text-on-brand"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  transition={spatial.bouncy}
                  className="absolute inset-0 rounded-full bg-brand"
                />
              )}
              {!isActive && (
                <span className="absolute inset-0 scale-75 rounded-full bg-on-surface/0 transition-all duration-300 ease-bounce group-hover:scale-100 group-hover:bg-on-surface/8" />
              )}
              <Icon
                name={icon}
                className="relative size-5 transition-transform duration-300 ease-bounce group-hover:scale-115 group-hover:-rotate-12"
              />
              <span className="relative max-[419px]:sr-only">{label}</span>
            </MotionLink>
          )
        })}
      </motion.nav>
    </header>
  )
}
