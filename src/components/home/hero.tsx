"use client"

import { motion } from "motion/react"
import { site } from "@/content/site"
import { fadeUp, popIn, spatial, stagger } from "@/lib/motion"
import { Button } from "../ui/button"
import { Icon } from "../ui/icon"
import { HeroArt } from "./hero-art"

export function Hero() {
  const { name, emojis, tagline, badges, primaryCta, githubCta } = site.home
  const words = name.split(" ")

  return (
    <section className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-32 pb-12 sm:px-8 sm:pt-40 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:pb-20">
      <motion.div variants={stagger(0.1, 0.09)} initial="hidden" animate="show">
        <h1
          aria-label={`${name} ${emojis.join(" ")}`}
          className="flex flex-wrap items-baseline gap-x-[0.25em] text-display font-display"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              variants={fadeUp}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
          <span aria-hidden="true" className="inline-flex gap-[0.1em]">
            {emojis.map((emoji, i) => (
              <motion.span
                key={i}
                variants={popIn}
                whileHover={{
                  rotate: [0, -16, 12, -6, 0],
                  scale: 1.2,
                  transition: {
                    rotate: { duration: 0.6, ease: "easeInOut" },
                    scale: spatial.bouncy,
                  },
                }}
                className="inline-block cursor-default"
              >
                {emoji}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lead font-medium text-on-surface-variant"
        >
          {tagline}
        </motion.p>

        <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap gap-2.5">
          {badges.map((badge) => (
            <li
              key={badge.label}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-surface-container-high pr-5 pl-1.5 text-base font-semibold text-on-surface ring-1 ring-outline-variant/50"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                <Icon name={badge.icon} className="size-4.5" />
              </span>
              {badge.label}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
          <Button href={primaryCta.href} icon="arrowRight">
            {primaryCta.label}
          </Button>
          <Button
            href={githubCta.href}
            external
            variant="tonal"
            icon="github"
            iconPosition="start"
          >
            {githubCta.label}
          </Button>
        </motion.div>
      </motion.div>

      <HeroArt />
    </section>
  )
}
