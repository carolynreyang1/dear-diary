/**
 * Single source of truth for API configuration.
 *
 * VITE_API_BASE_URL: prefix for backend requests. Leave unset in dev to use
 * the Vite proxy in vite.config.ts (which forwards /api to localhost:8000).
 *
 * VITE_USE_MOCK_DATA: defaults to true (mock data) so the app keeps working
 * with no backend running. Set to "false" once the real backend is ready.
 */
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ''

export const USE_MOCK_DATA: boolean =
  import.meta.env.VITE_USE_MOCK_DATA !== 'false'
