import type { JourneyResult } from '../types'
import type { BackendReadingResponse } from './types'

/**
 * The single seam between the backend's wire format and the frontend's
 * JourneyResult domain type. If the backend response shape changes, this
 * is the only file (together with types.ts) that should need an edit —
 * every UI component only ever sees a JourneyResult.
 *
 * The current backend stub doesn't return a destination breakdown, map
 * coordinates, an archetype description, or listing names. The fields
 * below are marked as placeholders until the backend provides them.
 */
export function adaptReadingResponse(
  raw: BackendReadingResponse,
): JourneyResult {
  return {
    reflection: raw.reflection,
    destination: {
      name: raw.city,
      country: '', // placeholder — backend doesn't return this yet
      region: '', // placeholder — backend doesn't return this yet
      tagline: '', // placeholder — backend doesn't return this yet
    },
    archetype: {
      name: raw.archetype,
      description: '', // placeholder — backend doesn't return this yet
    },
    listings: raw.listings.map((listing, index) => ({
      id: `${raw.city}-listing-${index}`,
      name: listing.source, // placeholder — backend doesn't return a listing name yet
      image: listing.image,
      price: listing.price,
      source: listing.source,
      url: listing.url,
    })),
    map: {
      latitude: 0, // placeholder — backend doesn't return coordinates yet
      longitude: 0, // placeholder — backend doesn't return coordinates yet
      placeName: raw.city,
    },
  }
}
