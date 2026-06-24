import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { config } from "@/lib/config";
import type { ApiError } from "@/shared/types";
import { tokenStorage } from "./token-storage";

/**
 * Centralized HTTP client for the Spring Boot REST API.
 *
 * Responsibilities:
 *  - Attach the JWT access token to every request.
 *  - Transparently refresh the access token on a 401 using the refresh token,
 *    queuing concurrent requests so a single refresh is performed.
 *  - Normalize backend errors into the `ApiError` contract.
 *
 * Components NEVER import axios directly. They go through feature services,
 * which use this client. This keeps the frontend "thin" and the API surface
 * fully typed and centralized.
 */

/** Endpoint used to exchange a refresh token for a new access token. */
const REFRESH_PATH = "/auth/refresh";

/** Called when refreshing fails — wired up by the auth layer to log the user out. */
let onAuthFailure: (() => void) | null = null;

export function setAuthFailureHandler(handler: () => void): void {
  onAuthFailure = handler;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 20_000,
});

// --- Request interceptor: attach access token -----------------------------
apiClient.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
  return request;
});

// --- Response interceptor: refresh-on-401 with request queueing ------------
let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

function flushQueue(token: string | null): void {
  pendingQueue.forEach((resolve) => resolve(token));
  pendingQueue = [];
}

/** Bare axios instance for the refresh call to avoid interceptor recursion. */
async function requestNewAccessToken(): Promise<string | null> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) return null;
  try {
    const { data } = await axios.post(
      `${config.apiUrl}${REFRESH_PATH}`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" } },
    );
    const accessToken: string = data.accessToken;
    const newRefreshToken: string = data.refreshToken ?? refreshToken;
    tokenStorage.setTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch {
    return null;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const status = error.response?.status;
    const isAuthEndpoint = original?.url?.includes("/auth/");

    if (status === 401 && original && !original._retry && !isAuthEndpoint) {
      original._retry = true;

      if (isRefreshing) {
        // Wait for the in-flight refresh, then retry with the new token.
        const token = await new Promise<string | null>((resolve) => {
          pendingQueue.push(resolve);
        });
        if (!token) return Promise.reject(normalizeError(error));
        original.headers.set("Authorization", `Bearer ${token}`);
        return apiClient(original);
      }

      isRefreshing = true;
      const newToken = await requestNewAccessToken();
      isRefreshing = false;
      flushQueue(newToken);

      if (!newToken) {
        tokenStorage.clear();
        onAuthFailure?.();
        return Promise.reject(normalizeError(error));
      }

      original.headers.set("Authorization", `Bearer ${newToken}`);
      return apiClient(original);
    }

    return Promise.reject(normalizeError(error));
  },
);

/** Convert any thrown value into the normalized `ApiError` contract. */
export function normalizeError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | Partial<ApiError & { errors?: Record<string, string> }>
      | undefined;
    return {
      status: error.response?.status ?? 0,
      message:
        data?.message ??
        error.message ??
        "Ocurrió un error inesperado. Inténtalo de nuevo.",
      code: data?.code,
      fieldErrors: data?.fieldErrors ?? data?.errors,
    };
  }
  return {
    status: 0,
    message: "Ocurrió un error inesperado. Inténtalo de nuevo.",
  };
}
