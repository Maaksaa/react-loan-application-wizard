import { useMutation } from '@tanstack/react-query'
import { submitApplication } from '@/api/products'

/**
 * Wrapping the submit call in useMutation gives us isPending/isError/isSuccess
 * states out of the box — no need to manage loading/error flags by hand.
 * Cleaner than a useState dance and consistent with how we handle the GET request.
 */
export function useSubmitApplication() {
  return useMutation({
    mutationFn: submitApplication,
  })
}
