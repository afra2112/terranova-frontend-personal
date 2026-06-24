"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { useAuth } from "@/features/auth";
import { primaryNavItems, visibleNavItems } from "./nav-items";

/**
 * Mobile bottom tab bar. Bottom placement keeps primary actions within
 * thumb reach (the UX spec calls for bottom-friendly actions and 44px+ touch
 * targets). Hidden on desktop, where the header nav takes over.
 */
export function MobileBottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();

  const navItems = visibleNavItems(primaryNavItems, {
    isAuthenticated,
    roles: user?.roles ?? [],
  }).slice(0, 5);

  return (
    <nav
      className="sticky bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden"
      aria-label="Navegación principal"
    >
      <ul className="mx-auto flex w-full max-w-md items-stretch justify-around">
        {navItems.map((item) => {
          const active =
            item.href === routes.home
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-xs font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="leading-none">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
