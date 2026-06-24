import type { ID } from "@/shared/types";

/**
 * Single source of truth for application routes. Build links via these helpers
 * instead of hardcoding strings, so route changes happen in one place.
 *
 * Route names follow the Spanish-language URLs defined in the UX spec.
 */
export const routes = {
  // Public
  home: "/",
  marketplace: "/productos",
  product: (id: ID) => `/producto/${id}`,
  login: "/login",
  register: "/register",
  verifyEmail: "/verificar",

  // Authenticated (buyer-facing)
  favorites: "/favoritos",
  myAppointments: "/mis-citas",

  // Dashboard (seller-facing + shared)
  dashboard: "/dashboard",
  dashboardProducts: "/dashboard/productos",
  dashboardAppointments: "/dashboard/citas",
  dashboardAttendances: "/dashboard/asistencias",
  dashboardProfile: "/dashboard/perfil",
} as const;

export type Routes = typeof routes;
