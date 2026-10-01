import {
  CakeSlice,
  Globe,
  LibraryBig,
  ListChecks,
  type LucideIcon,
} from "lucide-react"

export type Project = {
  name: string
  description: string
  longDescription?: string
  icon?: LucideIcon
  emoji?: string
  /** e.g. "Android", "Library", "Web". Used for filtering. */
  category?: string
  /** e.g. "Android", "Web", "Multiplatform". Shown as a badge. */
  platform?: string
  year?: string
  githubUrl?: string
  githubRepo?: { owner: string; repo: string }
  websiteUrl?: string
  downloadUrl?: string
  featured?: boolean
  accent?: string
  sha256?: string
}

export const projects: Project[] = [
  {
    name: "Chocola",
    description:
      "Chocola does it all with it's unique UI paired with it's load of features!",
    longDescription:
      "Chocola is an app that modernizes the way we feel apps, with content focused UI while sprinkling animations in the right places, there's so much to love about her!",
    emoji: "🍫",
    category: "Android",
    platform: "Android",
    year: "2024",
    githubUrl: "https://github.com/sosauce/Chocola",
    githubRepo: { owner: "sosauce", repo: "Chocola" },
    featured: true,
    accent: "#c76b4a",
    sha256: "7ad65abb70c3b33d0d301affcef8f1c5c22bcada53f770ffbe66df8d33058335"
  },
  {
    name: "Vanilla",
    description:
      "A cute calculator app for Android, who thought math would be cute?",
    longDescription:
      "Like he little sisters, Vanilla proves even the simplest utility apps can bring delight to everyday task, math, but cute~!",
    emoji: "🍨",
    category: "Android",
    platform: "Android",
    year: "2024",
    githubUrl: "https://github.com/sosauce/Vanilla",
    githubRepo: { owner: "sosauce", repo: "Vanilla" },
    featured: true,
    accent: "#e8b4a0",
    sha256: "fd2d95cdb348b2f1aebedbab879ced737385ee13c305a139d6580d4cf2c0d65a"
  },
  {
    name: "Cinnamon",
    description:
      "A 3 in 1 messages, contacts and dialer app. Communication in one cohesive, beautiful design!",
    longDescription:
      "The youngest yet the boldest, Cinnamon merges the messages, contacts and dialer apps into 1 continous experience, she learned alot from Chocola, also making her a super fun and delightful app to use!",
    emoji: "🥨",
    category: "Android",
    platform: "Android",
    year: "2025",
    githubUrl: "https://github.com/sosauce/Cinnamon",
    githubRepo: { owner: "sosauce", repo: "Cinnamon" },
    featured: true,
    accent: "#d99a3d",
    sha256: "b8c88bd41bc8ac24051d15e70d18d8b1919a261eb87fd86db6882d2192887a55"
  },
  {
    name: "NekoBites",
    description:
      "The Compose UI kit that makes users want to come back to an app :3",
    icon: CakeSlice,
    emoji: "🍰",
    category: "Library",
    platform: "Android",
    year: "2025",
    githubUrl: "https://github.com/sosauce/NekoBites",
    githubRepo: { owner: "sosauce", repo: "NekoBites" },
    accent: "#f472b6"
  },
  {
    name: "SweetSelect",
    description:
      "A Compose library that makes multi-selection easy and highly optimized!",
    longDescription:
      "A Compose library that makes multi-selection really easy and highly optimized, with support for a finite amount of selectable elements!",
    icon: ListChecks,
    emoji: "🛠️",
    category: "Library",
    platform: "Android",
    year: "2025",
    githubUrl: "https://github.com/sosauce/SweetSelect",
    githubRepo: { owner: "sosauce", repo: "SweetSelect" },
    accent: "#a78bfa"
  },
  {
    name: "ChocolaForWeb",
    description:
      "A web preview of the Chocola Android app. The same flavor, in the browser!",
    icon: Globe,
    emoji: "🍫",
    category: "Web",
    platform: "Web",
    year: "2025",
    githubUrl: "https://github.com/sosauce/ChocolaForWeb",
    githubRepo: { owner: "sosauce", repo: "ChocolaForWeb" },
    websiteUrl: "https://sosauce.github.io/ChocolaForWeb",
    accent: "#7c5cbf",
  },
  {
    name: "This portfolio",
    description:
      "This experience! Built with React!",
    icon: LibraryBig,
    emoji: "✨",
    category: "Web",
    platform: "Web",
    year: "2026",
    githubUrl: "https://github.com/sosauce/sosauce.github.io",
    githubRepo: { owner: "sosauce", repo: "sosauce.github.io" },
    accent: "var(--color-brand)",
  },
]

/** Distinct categories derived from the data — drives the filter pills. */
export const projectCategories: string[] = Array.from(
  new Set(
    projects.map((p) => p.category).filter((c): c is string => Boolean(c))
  )
)

export const featuredProjects: Project[] = projects.filter((p) => p.featured)
