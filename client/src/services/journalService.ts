import { adaptReadingResponse } from '../api/adapter'
import { ApiError, fetchJourneyReading } from '../api/client'
import { USE_MOCK_DATA } from '../api/config'
import { MOCK_JOURNEY_RESULT } from '../data/mockData'
import type { JournalInput, JourneyResult } from '../types'

const MOCK_DELAY_MS = 0

/**
 * The only place the rest of the app talks to the backend.
 * Always resolves to a JourneyResult, or throws an ApiError with a
 * user-facing message.
 *
 * Uses mock data by default so the app works with no backend running.
 * Switch to the real backend by setting VITE_USE_MOCK_DATA=false (see
 * .env.example) — no code changes needed here.
 */
export async function submitJournalInput(
  input: JournalInput,
): Promise<JourneyResult> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
    return MOCK_JOURNEY_RESULT
  }

  try {
    const raw = await fetchJourneyReading(input)
    return adaptReadingResponse(raw)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Something went wrong while reading your journal.', undefined, {
      cause: error,
    })
  }
}
