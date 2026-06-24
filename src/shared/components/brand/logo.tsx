import Link from "next/link";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

interface LogoProps {
  className?: string;
  /** Hide the wordmark and show only the mark (useful on tight mobile bars). */
  iconOnly?: boolean;
}

/**
 * Terranova wordmark. The sprout mark + earthy green communicate the rural /
 * agricultural identity defined in the Design DNA.
 */
export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <Link
      href={routes.home}
      className={cn(
        "flex items-center gap-2 font-semibold tracking-tight text-foreground",
        className,
      )}
      aria-label="Terranova, ir al inicio"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Sprout className="size-5" aria-hidden="true" />
      </span>
      {!iconOnly ? (
        <span className="text-lg leading-none">
          Terra<span className="text-primary">nova</span>
        </span>
      ) : null}
    </Link>
  );
}
