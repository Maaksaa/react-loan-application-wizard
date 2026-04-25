import axios from 'axios'

/**
 * Centralised axios instance.
 *
 * Why a single instance instead of ad-hoc axios.get() calls:
 * - one place to configure baseURL, timeout, interceptors
 * - trivial to swap the host in tests or point to a staging API
 * - interceptors give us one choke point for auth headers and error logging
 *   when the real backend arrives
 */
export const http = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Placeholder for future cross-cutting concerns (auth token refresh, Sentry, etc.)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize network errors here later. For now just re-throw so
    // react-query sees it as a rejected query.
    return Promise.reject(error)
  },
)
