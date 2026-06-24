import type { ID, ISODateTime } from "./common";

/**
 * Roles a user can hold. A single account may be BOTH buyer and seller, so the
 * UI must treat roles as a set, never an exclusive choice.
 */
export type UserRole = "ROLE_BUYER" | "ROLE_SELLER";

/** OAuth providers that can be linked to an account. */
export type AuthProvider = "EMAIL" | "GOOGLE" | "FACEBOOK";

export interface User {
  id: ID;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  roles: UserRole[];
  emailVerified: boolean;
  linkedProviders: AuthProvider[];
  createdAt: ISODateTime;
}

/** Lightweight seller info embedded in product/appointment payloads. */
export interface SellerSummary {
  id: ID;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
}
