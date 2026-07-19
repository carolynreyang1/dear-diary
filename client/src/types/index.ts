export type AppState = 'journal' | 'reading' | 'results' | 'error'

export type JournalInputType = 'text' | 'image'

export interface TextJournalInput {
  type: 'text'
  text: string
}

export interface ImageJournalInput {
  type: 'image'
  file: File
  previewUrl: string
}

export type JournalInput = TextJournalInput | ImageJournalInput

export interface Accommodation {
  id: string
  name: string
  description: string
  price: string
  mood: string
}

export interface Listing {
  id: string
  name: string
  image: string
  price: string
  source: string
  url: string
  rating?: number
}

export interface JourneyResult {
  reflection: string
  destination: {
    name: string
    country: string
    region: string
    tagline: string
  }
  archetype: {
    name: string
    description: string
  }
  listings: Listing[]
  map: {
    latitude: number
    longitude: number
    placeName: string
  }
}
