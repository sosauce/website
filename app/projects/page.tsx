import type { Metadata } from "next"
import { ProjectsPage } from "@/components/projects/projects-page"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: site.projectsPage.metaTitle,
}

export default function ProjectsRoute() {
  return <ProjectsPage />
}
