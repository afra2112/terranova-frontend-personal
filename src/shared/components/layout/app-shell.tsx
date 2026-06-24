import { SiteHeader } from "./site-header";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { SiteFooter } from "./site-footer";

/**
 * Standard public/app chrome: sticky header, scrollable main content, desktop
 * footer, and a mobile bottom nav. Feature route groups wrap their pages with
 * this shell. Dashboard routes will later provide their own shell variant.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
