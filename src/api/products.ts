import { http } from './http'

export interface AddProductPayload {
  title: string
}

export interface AddProductResponse {
  id: number
  title: string
}

/**
 * Per task: POST /products/add with { title: firstName + ' ' + lastName }.
 * dummyjson echoes the payload back with a fake id — that's enough
 * for our purposes, we only need the request to resolve successfully.
 */
export async function submitApplication(payload: AddProductPayload): Promise<AddProductResponse> {
  const { data } = await http.post<AddProductResponse>('/products/add', payload)
  return data
}
