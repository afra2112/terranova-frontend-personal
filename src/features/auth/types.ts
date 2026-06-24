import type { AuthProvider, User } from "@/shared/types";

/** Credentials for email/password login. */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Payload for standard email/password registration. */
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  /** Whether the account intends to sell. Buyers can upgrade later. */
  wantsToSell?: boolean;
}

/** Email verification via a code sent to the user's inbox (no magic links). */
export interface VerifyEmailRequest {
  email: string;
  code: string;
}

/** Token pair + user returned by login / register / refresh. */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/** Payload to log in or link an OAuth provider account. */
export interface OAuthLoginRequest {
  provider: Extract<AuthProvider, "GOOGLE" | "FACEBOOK">;
  /** Provider token / authorization code forwarded to the backend. */
  token: string;
}
