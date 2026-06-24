/**
 * Shared primitives used across the whole domain.
 *
 * These mirror the Spring Boot REST API contracts. They are intentionally
 * framework-agnostic: no React, no fetch, no UI concerns. Feature code and the
 * service layer both import from here so there is a single source of truth for
 * every DTO shape.
 */

export type ID = string;

/** ISO-8601 date string, e.g. "2026-01-30". */
export type ISODate = string;

/** ISO-8601 timestamp, e.g. "2026-01-30T14:30:00Z". */
export type ISODateTime = string;

/** Time of day in 24h "HH:mm" format, e.g. "14:30". */
export type TimeString = string;

/**
 * Standard error payload returned by the backend. The exact shape may evolve;
 * the service layer normalizes raw errors into this contract.
 */
export interface ApiError {
  status: number;
  message: string;
  /** Optional machine-readable code, e.g. "DUPLICATE_RESERVATION". */
  code?: string;
  /** Field-level validation errors keyed by field name. */
  fieldErrors?: Record<string, string>;
}

/**
 * Spring Data `Page<T>` shape, used by paginated list endpoints.
 * Marketplace listings rely on this for infinite scrolling.
 */
export interface Page<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

/** Common query params accepted by paginated endpoints. */
export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
}
