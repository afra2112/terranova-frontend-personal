import type { ID, ISODateTime } from "./common";
import type { SellerSummary } from "./user";

/** Categories of listing the platform currently supports. */
export type ProductType = "LAND" | "FARM" | "CATTLE";

/**
 * Product lifecycle. Allowed transitions (enforced by the backend):
 *   DRAFT -> PUBLISHED
 *   PUBLISHED -> SOLD
 *   PUBLISHED -> ARCHIVED
 */
export type ProductStatus = "DRAFT" | "PUBLISHED" | "SOLD" | "ARCHIVED";

export interface ProductImage {
  id: ID;
  url: string;
  /** Lower order renders first; the lowest-order image is the cover. */
  order: number;
}

export interface ProductLocation {
  /** Human-readable label shown on cards, e.g. "Antioquia, Colombia". */
  label: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

/** Compact representation used in marketplace grids and lists. */
export interface ProductSummary {
  id: ID;
  title: string;
  type: ProductType;
  status: ProductStatus;
  price: number;
  currency: string;
  location: ProductLocation;
  coverImageUrl?: string;
  favorited?: boolean;
}

/** Full product payload used on the detail page and seller dashboard. */
export interface Product extends ProductSummary {
  description: string;
  images: ProductImage[];
  seller: SellerSummary;
  /** Type-specific attributes (area, head count, etc.) kept open-ended. */
  attributes?: Record<string, string | number | boolean>;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}
