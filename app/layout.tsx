import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Particles } from "@/components/ui/particles";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "sosauce — Android & Creative Developer",
    template: "%s — sosauce",
  },
  description: "sosauce developer",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎀</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body>
        <div className="relative min-h-screen w-full overflow-hidden">
          <Particles className="absolute inset-0" />
          <SiteNav />
          {children}
        </div>
      </body>
    </html>
  );
}
