/**
 * Token storage abstraction for the JWT access + refresh token pair.
 *
 * The implementation is isolated behind this module so the storage mechanism
 * can be swapped later (e.g. to httpOnly cookies via a BFF) without touching
 * the API client or auth feature. Today it uses localStorage, which is the
 * pragmatic choice for a SPA consuming a separate Spring Boot API.
 *
 * NOTE: this stores *auth session tokens only*. Application/business data must
 * never be persisted in localStorage — it always comes from the API.
 */

const ACCESS_TOKEN_KEY = "terranova.accessToken";
const REFRESH_TOKEN_KEY = "terranova.refreshToken";

const isBrowser = typeof window !== "undefined";

export const tokenStorage = {
  getAccessToken(): string | null {
    if (!isBrowser) return null;
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    if (!isBrowser) return null;
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens(accessToken: string, refreshToken: string): void {
    if (!isBrowser) return;
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clear(): void {
    if (!isBrowser) return;
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
} as const;
