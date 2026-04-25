import { QueryClient } from '@tanstack/react-query'

/**
 * Global query client.
 *
 * - staleTime 5 min: the categories endpoint from the task is effectively static,
 *   we don't want to refetch it on every navigation between form steps.
 * - refetchOnWindowFocus disabled: noisy for this kind of short-lived form flow.
 * - retry: 1 — single retry is a reasonable default, avoids loops on hard failures.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
