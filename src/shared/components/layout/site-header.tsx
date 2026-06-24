"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { Input } from "@/components/ui/input";
import { Logo } from "@/shared/components/brand/logo";
import { useAuth } from "@/features/auth";
import { primaryNavItems, visibleNavItems } from "./nav-items";
import { UserMenu } from "./user-menu";

/**
 * Top application bar. Mobile-first: compact and sticky, with search reachable
 * at all times (search is the marketplace's primary action). On desktop it
 * expands into horizontal navigation.
 */
export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  const [query, setQuery] = useState("");

  const navItems = visibleNavItems(primaryNavItems, {
    isAuthenticated,
    roles: user?.roles ?? [],
  });

  function onSearch(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(
      trimmed
        ? `${routes.marketplace}?q=${encodeURIComponent(trimmed)}`
        : routes.marketplace,
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4">
        <Logo className="shrink-0" />

        {/* Search: always visible, grows to fill available space */}
        <form onSubmit={onSearch} className="relative flex-1" role="search">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar fincas, tierras o ganado"
            aria-label="Buscar productos"
            className="h-11 pl-9"
          />
        </form>

        {/* Desktop horizontal nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navItems.map((item) => {
            const active =
              item.href === routes.home
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
