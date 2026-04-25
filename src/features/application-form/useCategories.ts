import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '@/api/categories'

/**
 * Task requirement: "provide a way to reuse the API result".
 *
 * React Query solves this out of the box: the query is keyed by
 * ['categories'], so any component that calls this hook — on any
 * form step, now or later — gets the cached data instantly without
 * refetching. Combined with staleTime in queryClient config, the
 * endpoint is called at most once per 5 minutes per session.
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}
