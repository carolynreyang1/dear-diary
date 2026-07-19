/**
 * Wire types for the backend's /api/reading endpoint.
 *
 * These mirror server/main.py's Pydantic models today. That endpoint is
 * still a stub — once the real backend (vision LLM read, destination
 * pick, Stay22 listings) is wired up, its response will likely change.
 * When it does, update this file and adapter.ts only; nothing outside
 * src/api/ should need to know the wire shape.
 */
export interface BackendListing {
  image: string
  price: string
  source: string
  url: string
}

export interface BackendReadingResponse {
  archetype: string
  city: string
  reflection: string
  listings: BackendListing[]
}
