import { useMutation } from '@tanstack/react-query'
import { submitApplication } from '@/api/products'

/**
 * Wrapping the submit call in useMutation gives us isPending/isError/isSuccess
 * states out of the box — no need to manage loading/error flags by hand.
 * Cleaner than a useState dance and consistent with how we handle the GET request.
 *
 * networkMode: 'always' — by default TanStack Query pauses mutations when
 * navigator.onLine === false, leaving the user staring at an indefinite
 * "Submitting…" state. For a one-shot form like this, it's clearer UX to
 * let the request fire, fail on the axios 10s timeout, and surface a real
 * error the user can act on (retry / check connection).
 */
export function useSubmitApplication() {
  return useMutation({
    mutationFn: submitApplication,
    networkMode: 'always',
  })
}
