import type { ID, PageParams } from "@/shared/types";

/**
 * Centralized React Query key factory. Using a single factory keeps cache keys
 * consistent and makes targeted invalidation predictable across features.
 *
 * Convention: each domain exposes a root key plus granular helpers. Invalidate
 * with the broadest matching key, e.g. queryClient.invalidateQueries({
 * queryKey: queryKeys.products.all }).
 */
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  products: {
    all: ["products"] as const,
    list: (filters?: Record<string, unknown> & PageParams) =>
      ["products", "list", filters ?? {}] as const,
    detail: (id: ID) => ["products", "detail", id] as const,
  },
  favorites: {
    all: ["favorites"] as const,
    list: () => ["favorites", "list"] as const,
  },
  appointments: {
    all: ["appointments"] as const,
    byProduct: (productId: ID) =>
      ["appointments", "product", productId] as const,
    detail: (id: ID) => ["appointments", "detail", id] as const,
  },
  attendances: {
    all: ["attendances"] as const,
    mine: () => ["attendances", "mine"] as const,
    byAppointment: (appointmentId: ID) =>
      ["attendances", "appointment", appointmentId] as const,
  },
  notifications: {
    all: ["notifications"] as const,
  },
} as const;
