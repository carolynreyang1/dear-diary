import { useCallback, useState } from 'react'
import { JournalEntry } from './components/JournalEntry'
import { ReadingScreen } from './components/ReadingScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { submitJournalInput } from './services/journalService'
import type { AppState, JournalInput, JourneyResult } from './types'
import './App.css'

function App() {
  const [state, setState] = useState<AppState>('journal')
  const [pendingInput, setPendingInput] = useState<JournalInput | null>(null)
  const [result, setResult] = useState<JourneyResult | null>(null)

  const handleSubmit = useCallback((input: JournalInput) => {
    setPendingInput(input)
    setState('reading')
  }, [])

  const handleReadingComplete = useCallback(async () => {
    if (pendingInput) {
      const journeyResult = await submitJournalInput(pendingInput)
      setResult(journeyResult)
    }
    setState('results')
  }, [pendingInput])

  const handleWriteAgain = useCallback(() => {
    if (pendingInput?.type === 'image') {
      URL.revokeObjectURL(pendingInput.previewUrl)
    }
    setPendingInput(null)
    setResult(null)
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
      </main>

      <footer className="app__footer">
        <p>Dear Diary, Take Me Here</p>
      </footer>
    </div>
  )
}

export default App
