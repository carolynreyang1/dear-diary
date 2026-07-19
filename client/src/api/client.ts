import type { JournalInput } from '../types'
import { API_BASE_URL } from './config'
import type { BackendReadingResponse } from './types'

const READING_ENDPOINT = `${API_BASE_URL}/api/reading`

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number, options?: ErrorOptions) {
    super(message, options)
    this.name = 'ApiError'
    this.status = status
  }
}

/**
 * The only function in the app that makes a network call to the backend.
 * Returns the raw wire response — callers pass it through adaptReadingResponse
 * (adapter.ts) to get a JourneyResult.
 */
export async function fetchJourneyReading(
  input: JournalInput,
): Promise<BackendReadingResponse> {
  let response: Response

  try {
    response = await requestReading(input)
  } catch (cause) {
    throw new ApiError(
      'Could not reach the server. Check your connection and try again.',
      undefined,
      { cause },
    )
  }

  if (!response.ok) {
    throw new ApiError(
      `The server responded with an error (${response.status}).`,
      response.status,
    )
  }

  try {
    return (await response.json()) as BackendReadingResponse
  } catch (cause) {
    throw new ApiError('The server response could not be read.', response.status, {
      cause,
    })
  }
}

function requestReading(input: JournalInput): Promise<Response> {
  if (input.type === 'text') {
    return fetch(READING_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input.text }),
    })
  }

  // The backend does not accept images yet. This assumes a multipart body
  // with an `image` field on the same endpoint — confirm this once the
  // backend adds vision support, and adjust here if it differs.
  const formData = new FormData()
  formData.append('image', input.file)

  return fetch(READING_ENDPOINT, {
    method: 'POST',
    body: formData,
  })
}
