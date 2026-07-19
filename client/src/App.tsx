import { useCallback, useRef, useState } from 'react'
import { APP_COPY } from './data/mockData'
import { JournalEntry } from './components/JournalEntry'
import { ReadingScreen } from './components/ReadingScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { ErrorScreen } from './components/ErrorScreen'
import { submitJournalInput } from './services/journalService'
import type { AppState, JournalInput, JourneyResult } from './types'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [state, setState] = useState<AppState>('journal')
  const [pendingInput, setPendingInput] = useState<JournalInput | null>(null)
  const [result, setResult] = useState<JourneyResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const pendingRequestRef = useRef<Promise<JourneyResult> | null>(null)

  const handleSubmit = useCallback((input: JournalInput) => {
    setPendingInput(input)
    setError(null)
    // Kick off the request immediately so it runs alongside the reading
    // animation instead of only starting once that animation finishes.
    const request = submitJournalInput(input)
    // handleReadingComplete is the real handler for this rejection; this
    // just stops the browser from reporting it as unhandled in the
    // meantime, since the animation may take a few seconds to finish.
    request.catch(() => {})
    pendingRequestRef.current = request
    setState('reading')
  }, [])

  const handleReadingComplete = useCallback(async () => {
    try {
      const journeyResult = await pendingRequestRef.current
      if (!journeyResult) {
        throw new Error(APP_COPY.error.fallbackMessage)
      }
      setResult(journeyResult)
      setState('results')
    } catch (err) {
      setError(err instanceof Error ? err.message : APP_COPY.error.fallbackMessage)
      setState('error')
    } finally {
      pendingRequestRef.current = null
    }
  }, [])

  const handleWriteAgain = useCallback(() => {
    if (pendingInput?.type === 'image') {
      URL.revokeObjectURL(pendingInput.previewUrl)
    }
    setPendingInput(null)
    setResult(null)
    setError(null)
    setState('journal')
  }, [pendingInput])

  return (
    <div className="app" data-state={state}>
      <main className="app__main">
        {state === 'journal' && <JournalEntry onSubmit={handleSubmit} />}
        {state === 'reading' && (
          <ReadingScreen onComplete={handleReadingComplete} />
        )}
        {state === 'results' && result && (
          <ResultsScreen result={result} onWriteAgain={handleWriteAgain} />
        )}
        {state === 'error' && (
          <ErrorScreen
            message={error ?? APP_COPY.error.fallbackMessage}
            onRetry={handleWriteAgain}
          />
        )}
      </main>

      <footer className="app__footer">
        <img
          className="app__logo"
          src={logo}
          alt="Dear Diary, Take Me Here"
        />
      </footer>
    </div>
  )
}

export default App
