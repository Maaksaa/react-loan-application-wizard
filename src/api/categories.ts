import { http } from './http'

/**
 * dummyjson endpoint /products/category-list returns a flat array of strings:
 * ["beauty", "fragrances", ...]
 *
 * We map to {value, label} here so UI components don't do formatting work.
 * Capitalizing the label — dummyjson returns lowercase slugs.
 */
export interface CategoryOption {
  value: string
  label: string
}

export async function fetchCategories(): Promise<CategoryOption[]> {
  const { data } = await http.get<string[]>('/products/category-list')

  return data.map((slug) => ({
    value: slug,
    label: slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  }))
}
