import {
  Home,
  Store,
  Heart,
  CalendarCheck,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/lib/routes";
import type { UserRole } from "@/shared/types";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /**
   * Visibility rule:
   *  - "public": always visible
   *  - "auth": any authenticated user
   *  - a role: only users holding that role
   * The UI is role-aware: a user with both roles sees the union of items.
   */
  visibility: "public" | "auth" | UserRole;
}

/**
 * Primary navigation, shared by the desktop header and the mobile bottom bar.
 * Keeping one config means navigation stays consistent across breakpoints.
 */
export const primaryNavItems: NavItem[] = [
  { label: "Inicio", href: routes.home, icon: Home, visibility: "public" },
  {
    label: "Explorar",
    href: routes.marketplace,
    icon: Store,
    visibility: "public",
  },
  {
    label: "Favoritos",
    href: routes.favorites,
    icon: Heart,
    visibility: "ROLE_BUYER",
  },
  {
    label: "Mis citas",
    href: routes.myAppointments,
    icon: CalendarCheck,
    visibility: "ROLE_BUYER",
  },
  {
    label: "Panel",
    href: routes.dashboard,
    icon: LayoutDashboard,
    visibility: "ROLE_SELLER",
  },
];

interface Viewer {
  isAuthenticated: boolean;
  roles: UserRole[];
}

/** Filter nav items down to what the given viewer is allowed to see. */
export function visibleNavItems(items: NavItem[], viewer: Viewer): NavItem[] {
  return items.filter((item) => {
    if (item.visibility === "public") return true;
    if (item.visibility === "auth") return viewer.isAuthenticated;
    return viewer.roles.includes(item.visibility);
  });
}
