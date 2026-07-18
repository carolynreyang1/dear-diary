import type { JournalInput } from '../types'
import { MOCK_JOURNEY_RESULT } from '../data/mockData'
import type { JourneyResult } from '../types'

/**
 * Future backend entry point.
 * Today: returns mock data regardless of input type.
 * Later: POST text or multipart image to /api/journal/analyze
 */
export async function submitJournalInput(
  _input: JournalInput,
): Promise<JourneyResult> {
  await new Promise((resolve) => setTimeout(resolve, 0))
  return MOCK_JOURNEY_RESULT
}
