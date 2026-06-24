import { apiClient } from "@/lib/api";
import type { User } from "@/shared/types";
import type {
  AuthResponse,
  LoginRequest,
  OAuthLoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
} from "../types";

/**
 * Auth service: the ONLY place auth endpoints are called. Components and hooks
 * depend on this module, never on axios directly. Every method is typed end to
 * end so the rest of the app stays thin.
 *
 * Endpoint paths mirror the Spring Boot API and can be adjusted in one place.
 */
export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/register",
      payload,
    );
    return data;
  },

  async verifyEmail(payload: VerifyEmailRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/verify",
      payload,
    );
    return data;
  },

  async resendVerification(email: string): Promise<void> {
    await apiClient.post("/auth/verify/resend", { email });
  },

  async oauthLogin(payload: OAuthLoginRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/oauth",
      payload,
    );
    return data;
  },

  async me(): Promise<User> {
    const { data } = await apiClient.get<User>("/auth/me");
    return data;
  },

  async logout(): Promise<void> {
    // Best-effort server-side invalidation; client clears tokens regardless.
    await apiClient.post("/auth/logout").catch(() => undefined);
  },
} as const;
