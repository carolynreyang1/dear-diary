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

  hotel2Name: string
  hotel2Image: string
  hotel2Price: string
  hotel2Source: string
  hotel2Rating: number | null
  hotel2Url: string

  hotel3Name: string
  hotel3Image: string
  hotel3Price: string
  hotel3Source: string
  hotel3Rating: number | null
  hotel3Url: string

  message: string
}
