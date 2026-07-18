import type { JourneyResult } from '../types'

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
    reflectionLabel: 'Reflection',
    destinationLabel: 'Your destination',
    archetypeLabel: 'Traveler archetype',
    staysLabel: 'Places to stay',
    mapLabel: 'On the map',
  },
} as const

export const READING_DURATION_MS = 6500
export const LOADING_MESSAGE_INTERVAL_MS = 2200

export const MOCK_JOURNEY_RESULT: JourneyResult = {
  reflection:
    'Your words carry the quiet ache of transition — not grief exactly, but the tender space between who you were and who you are becoming. You need somewhere that honors slowness: mornings without agenda, rooms that feel like borrowed time, and landscapes patient enough to hold a question without demanding an answer.',
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
  accommodations: [
    {
      id: 'hoshinoya',
      name: 'Hoshinoya Kyoto',
      description:
        'A riverside retreat tucked into the hills of Arashiyama. Paper screens, tatami floors, and the sound of water outside your window.',
      price: 'From $420 / night',
      mood: 'Contemplative luxury',
    },
    {
      id: 'sowaka',
      name: 'Sowaka',
      description:
        'A restored machiya townhouse in Gion. Wooden beams, a private courtyard garden, and the hush of old Kyoto just beyond the gate.',
      price: 'From $280 / night',
      mood: 'Heritage intimacy',
    },
    {
      id: 'aoyama',
      name: 'Aoyama Tea House',
      description:
        'A small guesthouse near the Philosopher\'s Path. Shared morning tea, handwritten notes from the host, and bicycles for unhurried afternoons.',
      price: 'From $145 / night',
      mood: 'Quiet companionship',
    },
  ],
  map: {
    latitude: 35.0116,
    longitude: 135.7681,
    placeName: 'Kyoto, Japan',
  },
}
