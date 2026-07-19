/**
 * Wire types for the backend's /api/reading endpoint.
 *
 * This mirrors the teammate's actual backend response: a flat shape with
 * three numbered hotel groups (hotel1..hotel3) instead of a listings array.
 * If the backend response shape changes again, update this file and
 * adapter.ts only; nothing outside src/api/ should need to know the wire
 * shape.
 *
 * `ratingN` is typed as `number | null` since the backend may not always
 * have a rating for a hotel — adapter.ts treats null/invalid values as
 * "no rating" rather than crashing.
 *
 * The hotel2 and hotel3 groups are optional/nullable because the backend
 * may return fewer than 3 hotels — adapter.ts drops any hotel group
 * without a valid name instead of rendering a placeholder card.
 *
 * hotelNLat/hotelNLng are nullable per hotel (a listing can be missing
 * coordinates even when it has a name) — adapter.ts only turns a hotel
 * into a map pin when name, lat, and lng are all present and valid.
 */
export interface BackendReadingResponse {
  description: string
  archetype: string
  city: string

  hotel1Name: string
  hotel1Image: string
  hotel1Price: string
  hotel1Source: string
  hotel1Rating: number | null
  hotel1Url: string
  hotel1Lat: number | null
  hotel1Lng: number | null

  hotel2Name?: string | null
  hotel2Image?: string | null
  hotel2Price?: string | null
  hotel2Source?: string | null
  hotel2Rating?: number | null
  hotel2Url?: string | null
  hotel2Lat?: number | null
  hotel2Lng?: number | null

  hotel3Name?: string | null
  hotel3Image?: string | null
  hotel3Price?: string | null
  hotel3Source?: string | null
  hotel3Rating?: number | null
  hotel3Url?: string | null
  hotel3Lat?: number | null
  hotel3Lng?: number | null

  message: string
}
