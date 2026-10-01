"use client";

import { LayoutGrid, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links: {
  to: string
  label: string
  icon: typeof Star
  end?: boolean
}[] = [
  { to: "/", label: "Me", icon: Star, end: true },
  { to: "/projects", label: "Projects", icon: LayoutGrid },
]

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-foreground/10 bg-background/80 py-1.5 pr-1.5 pl-2 shadow-lg shadow-black/5 backdrop-blur-sm"
      >
        {links.map(({ to, label, icon: Icon, end }) => {
          const isActive = end ? pathname === to : pathname.startsWith(to);
          return (
          <Link
            key={to}
            href={to}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                "flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:px-3",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="hidden min-[420px]:inline">{label}</span>
          </Link>
          );
        })}
      </nav>
    </header>
  )
}
