import type { Metadata, Viewport } from "next"
import { Google_Sans_Flex } from "next/font/google"
import { FloatingShapes } from "@/components/floating-shapes"
import { Providers } from "@/components/providers"
import { SiteNav } from "@/components/site-nav"
import { site } from "@/content/site"
import "./globals.css"

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  axes: ["ROND", "wdth"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-rounded", "system-ui", "sans-serif"],
  variable: "--font-google-sans-flex",
})

export const metadata: Metadata = {
  title: {
    default: site.meta.title,
    template: site.meta.titleTemplate,
  },
  description: site.meta.description,
  icons: {
    icon: site.meta.favicon,
  },
}

export const viewport: Viewport = {
  themeColor: site.meta.themeColor,
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={googleSansFlex.variable}>
      <body>
        <Providers>
          <a
            href="#main-content"
            className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-brand px-6 py-3 font-bold text-on-brand transition-transform focus-visible:translate-y-0"
          >
            {site.a11y.skipToContent}
          </a>
          <FloatingShapes />
          <SiteNav />
          {children}
        </Providers>
      </body>
    </html>
  )
}
