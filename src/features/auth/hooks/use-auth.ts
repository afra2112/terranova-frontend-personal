"use client";

import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "../context/auth-provider";

/**
 * Access the current auth session. Must be used within <AuthProvider>.
 * This is the single entry point components use to read user/roles and to
 * perform session actions.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
