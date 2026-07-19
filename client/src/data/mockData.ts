import type { JourneyResult } from '../types'
import hoshinoyaImage from '../assets/stays/hoshinoya-ryokan.jpg'
import sowakaImage from '../assets/stays/sowaka-machiya.jpg'
import aoyamaImage from '../assets/stays/aoyama-garden.jpg'

export const APP_COPY = {
  journal: {
    title: 'Dear Diary, Take Me Here',
    subtitle:
      'Paste what you wrote today. We will find somewhere that feels like your page.',
    placeholder:
      'Today I woke up before the sun and sat by the window for a long time. I am not sure what I am leaving behind, only that something needs to change…',
    submitLabel: 'Send my words somewhere',
    dividerLabel: 'or',
    upload: {
      title: 'Share a page from your journal',
      hint: 'Drop a screenshot, Notes page, journal photo, or conversation here',
      browseLabel: 'Choose from your device',
      supportedFormats: 'PNG · JPG · JPEG · HEIC',
      submitLabel: 'Send this page somewhere',
      removeLabel: 'Remove image',
      heicPreviewLabel: 'HEIC image ready to send',
      errorInvalidType: 'Please upload a PNG, JPG, JPEG, or HEIC image.',
    },
  },
  loading: {
    messages: [
      'Reading between the lines…',
      'Finding somewhere that fits…',
      'Packing your thoughts…',
      'Tracing the mood on a map…',
      'Listening to what you did not say…',
    ],
  },
  results: {
    writeAgainLabel: 'Write again',
    reflectionLabel: 'What we heard between the lines',
    destinationLabel: 'Your words point toward…',
    archetypeLabel: 'Traveler archetype',
    staysLabel: 'Somewhere to land',
    mapLabel: 'On the map',
    viewStayLabel: 'View stay',
  },
  error: {
    kicker: 'A page went missing',
    fallbackMessage:
      'Something went wrong while reading your journal. Please try again.',
    retryLabel: 'Write again',
  },
} as const

export const READING_DURATION_MS = 6500
export const LOADING_MESSAGE_INTERVAL_MS = 2200

export const MOCK_JOURNEY_RESULT: JourneyResult = {
  reflection:
    'Your words carry the quiet ache of transition — not grief exactly, but the tender space between who you were and who you are becoming. Your words seem to be searching for somewhere that honors slowness: mornings without agenda, rooms that feel like borrowed time, and landscapes patient enough to hold a question without demanding an answer.',
  destination: {
    name: 'Kyoto',
    country: 'Japan',
    region: 'Kansai',
    tagline: 'Where stillness meets ceremony',
  },
  archetype: {
    name: 'The Gentle Wanderer',
    description:
      'You travel not to escape, but to arrive — softly, deliberately, with room to breathe between moments. You seek places where beauty is understated and silence is considered a kind of hospitality.',
  },
  listings: [
    {
      id: 'hoshinoya',
      name: 'Hoshinoya Kyoto',
      image: hoshinoyaImage,
      price: 'From $420 / night',
      source: 'Demo · Booking.com',
      url: 'https://example.com/stays/hoshinoya-kyoto',
    },
    {
      id: 'sowaka',
      name: 'Sowaka',
      image: sowakaImage,
      price: 'From $280 / night',
      source: 'Demo · Airbnb',
      url: 'https://example.com/stays/sowaka',
    },
    {
      id: 'aoyama',
      name: 'Aoyama Tea House',
      image: aoyamaImage,
      price: 'From $145 / night',
      source: 'Demo · Hotels.com',
      url: 'https://example.com/stays/aoyama-tea-house',
    },
  ],
  map: {
    latitude: 35.0116,
    longitude: 135.7681,
    placeName: 'Kyoto, Japan',
  },
}
