/**
 * ALL user-visible text and links of the site live in this file.
 * Edit copy, links and projects here; components contain no strings.
 */

export type IconName =
  | "star"
  | "grid"
  | "pin"
  | "plus"
  | "arrowRight"
  | "arrowLeft"
  | "arrowUpRight"
  | "external"
  | "download"
  | "github"
  | "heart"

export type Project = {
  name: string
  description: string
  longDescription?: string
  emoji?: string
  /** e.g. "Android", "Library", "Web". Used for filtering. */
  category?: string
  /** e.g. "Android", "Web", "Multiplatform". */
  platform?: string
  year?: string
  githubUrl?: string
  githubRepo?: { owner: string; repo: string }
  websiteUrl?: string
  downloadUrl?: string
  featured?: boolean
  sha256?: string
}

export type SupportWay = {
  emoji: string
  title: string
  body: string
  cta: { label: string; href: string; external: boolean }
}

export type NavLink = {
  href: string
  label: string
  icon: IconName
  /** Only active on an exact path match. */
  exact?: boolean
}

export const site = {
  meta: {
    title: "sosauce",
    titleTemplate: "%s - sosauce",
    description: "sosauce developer",
    favicon:
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎀</text></svg>",
    themeColor: "#1C1015",
  },

  a11y: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
  },

  nav: [
    { href: "/", label: "Me", icon: "star", exact: true },
    { href: "/projects", label: "Projects", icon: "grid" },
    { href: "/support", label: "Support", icon: "heart" },
  ] satisfies NavLink[],

  home: {
    name: "I'm sosauce",
    emojis: ["🫰🏼", "🎀"],
    tagline:
      "An Android first developer who focuses on building unforgettable experiences with Kotlin & Jetpack Compose.",
    badges: [
      { icon: "pin", label: "Based in France 🇫🇷" },
      { icon: "plus", label: "American citizenship 🇺🇸" },
    ] satisfies { icon: IconName; label: string }[],
    primaryCta: { label: "See my projects", href: "/projects" },
    githubCta: { label: "GitHub", href: "https://github.com/sosauce" },
    featured: {
      title: "Featured",
      viewAll: { label: "View all", href: "/projects" },
    },
  },

  projectsPage: {
    metaTitle: "Projects",
    title: "My projects",
    lead: "From Android apps, Compose libraries to web experiments, I make a variety of experiences all feel like they belong into the same ecosystem!",
    filterLabel: "Filter projects by category",
    allLabel: "All",
    featuredBadge: "Featured",
  },

  projectActions: {
    github: "GitHub",
    live: "Live",
    download: "Download",
    githubAria: (name: string) => `${name} on GitHub`,
    liveAria: (name: string) => `${name} live website`,
    downloadAria: (name: string) => `Download ${name}`,
    sha256Prefix: "SHA-256: ",
  },

  stars: {
    one: "star",
    other: "stars",
  },

  supportPage: {
    metaTitle: "Support",
    title: "Support me",
    lead: "Love what I make? Here are a few ways to help me keep building cute & delightful apps, every little bit means a lot!",
    ways: [
      {
        emoji: "📣",
        title: "Talk about my apps",
        body: "Tell your friends, family or anyone who'd love them! Word of mouth is the sweetest support and it's totally free :3",
        cta: { label: "See my projects", href: "/projects", external: false },
      },
      {
        emoji: "💸",
        title: "PayPal",
        body: "Send a one-time tip through PayPal, any amount helps me keep going!",
        cta: {
          label: "Donate with PayPal",
          href: "https://bit.ly/sosaucePayPal",
          external: true,
        },
      },
      {
        emoji: "☕",
        title: "Ko-fi",
        body: "Buy me a coffee on Ko-fi to fuel late night coding sessions~",
        cta: {
          label: "Support on Ko-fi",
          href: "https://ko-fi.com/sosauce",
          external: true,
        },
      },
    ] satisfies SupportWay[],
  },

  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist.",
    cta: { label: "Back home", href: "/" },
  },

  projects: [
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
      sha256:
        "7ad65abb70c3b33d0d301affcef8f1c5c22bcada53f770ffbe66df8d33058335",
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
      sha256:
        "fd2d95cdb348b2f1aebedbab879ced737385ee13c305a139d6580d4cf2c0d65a",
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
      sha256:
        "b8c88bd41bc8ac24051d15e70d18d8b1919a261eb87fd86db6882d2192887a55",
    },
    {
      name: "NekoBites",
      description:
        "The Compose UI kit that makes users want to come back to an app :3",
      emoji: "🍰",
      category: "Library",
      platform: "Android",
      year: "2025",
      githubUrl: "https://github.com/sosauce/NekoBites",
      githubRepo: { owner: "sosauce", repo: "NekoBites" },
    },
    {
      name: "SweetSelect",
      description:
        "A Compose library that makes multi-selection easy and highly optimized!",
      longDescription:
        "A Compose library that makes multi-selection really easy and highly optimized, with support for a finite amount of selectable elements!",
      emoji: "🛠️",
      category: "Library",
      platform: "Android",
      year: "2025",
      githubUrl: "https://github.com/sosauce/SweetSelect",
      githubRepo: { owner: "sosauce", repo: "SweetSelect" },
    },
    {
      name: "ChocolaForWeb",
      description:
        "A web preview of the Chocola Android app. The same flavor, in the browser!",
      emoji: "🍫",
      category: "Web",
      platform: "Web",
      year: "2025",
      githubUrl: "https://github.com/sosauce/ChocolaForWeb",
      githubRepo: { owner: "sosauce", repo: "ChocolaForWeb" },
      websiteUrl: "https://sosauce.github.io/ChocolaForWeb",
    },
    {
      name: "This portfolio",
      description: "This experience! Built with React!",
      emoji: "✨",
      category: "Web",
      platform: "Web",
      year: "2026",
      githubUrl: "https://github.com/sosauce/sosauce.github.io",
      githubRepo: { owner: "sosauce", repo: "sosauce.github.io" },
    },
  ] satisfies Project[] as Project[],
}

/** Distinct categories derived from the data: drives the filter chips. */
export const projectCategories: string[] = Array.from(
  new Set(
    site.projects.map((p) => p.category).filter((c): c is string => Boolean(c))
  )
)

export const featuredProjects: Project[] = site.projects.filter(
  (p) => p.featured
)
