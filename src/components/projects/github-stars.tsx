"use client"

import { animate, motion } from "motion/react"
import { useEffect, useState } from "react"
import { site } from "@/content/site"
import { popIn } from "@/lib/motion"
import { Icon } from "../ui/icon"

type State =
  | { status: "loading" }
  | { status: "done"; stars: number }
  | { status: "error" }

/** Live GitHub star count for a repo, counted up in a little pill. */
export function GithubStars({ owner, repo }: { owner: string; repo: string }) {
  const [state, setState] = useState<State>({ status: "loading" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { stargazers_count?: number }) =>
        setState({ status: "done", stars: data.stargazers_count ?? 0 })
      )
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error" })
      })
    return () => controller.abort()
  }, [owner, repo])

  useEffect(() => {
    if (state.status !== "done") return
    const controls = animate(0, state.stars, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [state])

  if (state.status === "error") return null

  if (state.status === "loading") {
    return (
      <span
        aria-hidden="true"
        className="inline-block h-10 w-28 animate-pulse rounded-full bg-current/10"
      />
    )
  }

  const label = state.stars === 1 ? site.stars.one : site.stars.other
  return (
    <motion.span
      variants={popIn}
      initial="hidden"
      animate="show"
      aria-label={`${state.stars.toLocaleString()} ${label}`}
      className="inline-flex h-10 items-center gap-2 rounded-full bg-current/10 pr-4 pl-1.5 font-bold"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-brand text-on-brand">
        <Icon name="star" className="size-4" />
      </span>
      <span aria-hidden="true" className="tabular-nums">
        {display.toLocaleString()}
      </span>
      <span aria-hidden="true" className="text-sm font-medium opacity-80">
        {label}
      </span>
    </motion.span>
  )
}
