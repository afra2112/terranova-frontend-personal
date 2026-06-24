"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { setAuthFailureHandler, tokenStorage } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { User, UserRole } from "@/shared/types";
import { authService } from "../services/auth.service";
import type { AuthResponse } from "../types";

export interface AuthContextValue {
  user: User | null;
  /** True while the initial "who am I" check is resolving. */
  isLoading: boolean;
  isAuthenticated: boolean;
  isBuyer: boolean;
  isSeller: boolean;
  hasRole: (role: UserRole) => boolean;
  /** Persist a successful auth response (tokens + user) into app state. */
  setSession: (response: AuthResponse) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * AuthProvider owns the authenticated user state for the whole app.
 *
 * Strategy:
 *  - On mount, if a token exists, fetch the current user via React Query.
 *  - Feature flows (login/register/verify in Phase 2) call `setSession` to
 *    store tokens and seed the user into the cache.
 *  - A 401 that fails to refresh triggers a global logout via the API client's
 *    auth-failure handler.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState(false);

  // Tokens live in localStorage, only available after mount on the client.
  useEffect(() => {
    setHasToken(Boolean(tokenStorage.getAccessToken()));
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.me,
    enabled: hasToken,
    staleTime: 5 * 60_000,
    retry: false,
  });

  const setSession = useCallback(
    (response: AuthResponse) => {
      tokenStorage.setTokens(response.accessToken, response.refreshToken);
      setHasToken(true);
      queryClient.setQueryData(queryKeys.auth.me, response.user);
    },
    [queryClient],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    tokenStorage.clear();
    setHasToken(false);
    queryClient.setQueryData(queryKeys.auth.me, null);
    queryClient.clear();
  }, [queryClient]);

  // Wire the API client's refresh-failure escape hatch to a clean logout.
  useEffect(() => {
    setAuthFailureHandler(() => {
      tokenStorage.clear();
      setHasToken(false);
      queryClient.setQueryData(queryKeys.auth.me, null);
    });
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(() => {
    const current = user ?? null;
    const roles = current?.roles ?? [];
    return {
      user: current,
      isLoading: hasToken && isLoading,
      isAuthenticated: Boolean(current),
      isBuyer: roles.includes("ROLE_BUYER"),
      isSeller: roles.includes("ROLE_SELLER"),
      hasRole: (role) => roles.includes(role),
      setSession,
      logout,
    };
  }, [user, hasToken, isLoading, setSession, logout]);

  return <AuthContext value={value}>{children}</AuthContext>;
}
