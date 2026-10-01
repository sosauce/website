import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BlurOutUp from "@/components/smoothui/blur-out-up";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start px-4 pt-28 pb-16 text-left sm:px-6">
        <BlurOutUp
          className="text-4xl font-bold tracking-tight text-balance sm:text-5xl"
          triggerOnView
        >
          Page not found
        </BlurOutUp>
        <p className="max-w-2xl pt-3 text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "group mt-6 rounded-full px-6"
          )}
        >
          <ArrowLeft
            className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Back home
        </Link>
      </div>
    </div>
  );
}
