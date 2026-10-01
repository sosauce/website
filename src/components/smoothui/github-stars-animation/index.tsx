"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const TRANSITION_DURATION = 0.3;
const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1] as const;
const COUNTDOWN_DURATION = 2000;

export interface GitHubStarsAnimationProps {
  apiEndpoint?: string;
  className?: string;
  countClassName?: string;
  owner?: string;
  repo?: string;
  starCount?: number;
}

export default function GitHubStarsAnimation({
  owner = "educlopez",
  repo = "smoothui",
  starCount: providedStarCount,
  apiEndpoint,
  className = "",
  countClassName = "",
}: GitHubStarsAnimationProps) {
  const [starCount, setStarCount] = useState(providedStarCount || 0);
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(providedStarCount === undefined);
  const [error, setError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const countSpring = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });

  // Fetch star count
  useEffect(() => {
    if (providedStarCount !== undefined) {
      setStarCount(providedStarCount);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        // Try to fetch from custom API endpoint first
        if (apiEndpoint) {
          const response = await fetch(
            `${apiEndpoint}?owner=${owner}&repo=${repo}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.stars !== undefined) {
              setStarCount(data.stars);
            }
            setIsLoading(false);
            return;
          }
        }

        // Fallback to GitHub API directly (client-side)
        // Note: This has rate limits, so using a token is recommended
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };

        const repoResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
          { headers }
        );

        if (repoResponse.ok) {
          try {
            const repoData = await repoResponse.json();
            setStarCount(repoData.stargazers_count || 0);
          } catch {
            // Silently fail for star count
          }
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [owner, repo, apiEndpoint, providedStarCount]);

  // Animate countdown
  useEffect(() => {
    if (starCount === 0 || shouldReduceMotion) {
      if (shouldReduceMotion) {
        setDisplayCount(starCount);
        countSpring.set(starCount);
      }
      return;
    }

    const startTime = Date.now();
    const startValue = 0;
    const endValue = starCount;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / COUNTDOWN_DURATION, 1);

      // Ease-out function
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.floor(startValue + (endValue - startValue) * eased);

      setDisplayCount(current);
      countSpring.set(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayCount(endValue);
        countSpring.set(endValue);
      }
    };

    animate();
  }, [starCount, countSpring, shouldReduceMotion]);

  if (isLoading) {
    return (
      <div
        className={cn("flex items-center gap-3 text-foreground/60", className)}
      >
        <div className="h-6 w-20 animate-pulse rounded bg-foreground/20" />
      </div>
    );
  }

  if (error && starCount === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Star count */}
      <motion.div
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        className={cn("flex items-center gap-1.5 font-medium", countClassName)}
        initial={
          shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: TRANSITION_DURATION,
                ease: EASE_OUT_CUBIC,
              }
        }
      >
        <Star className="h-4 w-4 fill-current" />
        <motion.span
          animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
          className="tabular-nums"
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.3,
                  ease: EASE_OUT_CUBIC,
                }
          }
        >
          {displayCount.toLocaleString()}
        </motion.span>
        <span className="text-foreground/70 text-sm">
          {displayCount === 1 ? "star" : "stars"}
        </span>
      </motion.div>
    </div>
  );
}
