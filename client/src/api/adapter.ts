import type { JourneyResult, Listing } from '../types'
import type { BackendReadingResponse } from './types'

/**
 * The single seam between the backend's wire format and the frontend's
 * JourneyResult domain type. If the backend response shape changes, this
 * is the only file (together with types.ts) that should need an edit —
 * every UI component only ever sees a JourneyResult.
 *
 * The backend doesn't return a destination breakdown or map coordinates
 * yet — those fields are marked as placeholders until it does.
 */
export function adaptReadingResponse(
  raw: BackendReadingResponse,
): JourneyResult {
  return {
    reflection: raw.message,
    destination: {
      name: raw.city,
      country: '', // placeholder — backend doesn't return this yet
      region: '', // placeholder — backend doesn't return this yet
      tagline: '', // placeholder — backend doesn't return this yet
    },
    archetype: {
      name: raw.archetype,
      description: raw.description,
    },
    listings: [
      toListing(
        'hotel-1',
        raw.hotel1Name,
        raw.hotel1Image,
        raw.hotel1Price,
        raw.hotel1Source,
        raw.hotel1Rating,
        raw.hotel1Url,
      ),
      toListing(
        'hotel-2',
        raw.hotel2Name,
        raw.hotel2Image,
        raw.hotel2Price,
        raw.hotel2Source,
        raw.hotel2Rating,
        raw.hotel2Url,
      ),
      toListing(
        'hotel-3',
        raw.hotel3Name,
        raw.hotel3Image,
        raw.hotel3Price,
        raw.hotel3Source,
        raw.hotel3Rating,
        raw.hotel3Url,
      ),
    ].filter((listing): listing is Listing => listing !== null),
    map: {
      latitude: 0, // placeholder — backend doesn't return coordinates yet
      longitude: 0, // placeholder — backend doesn't return coordinates yet
      placeName: raw.city,
    },
  }
}

/** Returns null (dropped from listings) when the hotel has no valid name — covers hotel2/hotel3 being absent, null, or empty. */
function toListing(
  id: string,
  name: string | null | undefined,
  image: string | null | undefined,
  price: string | null | undefined,
  source: string | null | undefined,
  rating: unknown,
  url: string | null | undefined,
): Listing | null {
  if (!name || name.trim() === '') {
    return null
  }

  return {
    id,
    name,
    image: image ?? '',
    price: price ?? '',
    source: source ?? '',
    url: url ?? '',
    rating: parseRating(rating),
  }
}

/** Accepts a finite number or a numeric string; anything else (missing, null, NaN, garbage) becomes "no rating" instead of crashing. */
function parseRating(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return undefined
}
