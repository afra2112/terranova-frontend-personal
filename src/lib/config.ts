/**
 * Centralized runtime configuration. Read environment variables here ONLY,
 * never scattered through the app, so there is a single place to audit config.
 *
 * NEXT_PUBLIC_API_URL must point at the Spring Boot REST API base, e.g.
 * "https://api.terranova.example/api". It falls back to a local default for
 * development convenience.
 */
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
  appName: "Terranova",
  /** Default page size for marketplace infinite scrolling. */
  defaultPageSize: 12,
} as const;

export type AppConfig = typeof config;
