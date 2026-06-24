import { QueryClient } from "@tanstack/react-query";

/**
 * Factory for the React Query client. A factory (not a singleton module
 * export) avoids sharing cache between requests on the server and lets each
 * browser session own its own client.
 *
 * Defaults are tuned for rural / low-bandwidth conditions:
 *  - generous staleTime to avoid redundant refetches
 *  - no refetch-on-focus (mobile users switch apps constantly)
 *  - limited retries so failures surface quickly instead of hanging
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
