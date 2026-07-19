import { useCallback, useState } from 'react'
import { APP_COPY } from '../data/mockData'
import type { JournalInput } from '../types'
import { Button } from './Button'
import { JournalImageUpload } from './JournalImageUpload'
import './JournalEntry.css'

interface JournalEntryProps {
  onSubmit: (input: JournalInput) => void
}

export function JournalEntry({ onSubmit }: JournalEntryProps) {
  const [entry, setEntry] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const { title, subtitle, placeholder, submitLabel, dividerLabel, upload } =
    APP_COPY.journal

  const hasText = entry.trim().length > 0
  const hasImage = imageFile !== null
  const canSubmit = hasText || hasImage

  const handleImageChange = useCallback((file: File | null) => {
    setImageFile(file)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    if (hasImage && imageFile) {
      const previewUrl = URL.createObjectURL(imageFile)
      onSubmit({
        type: 'image',
        file: imageFile,
        previewUrl,
      })
      return
    }

    if (hasText) {
      onSubmit({ type: 'text', text: entry.trim() })
    }
  }

  const activeSubmitLabel = hasImage ? upload.submitLabel : submitLabel

  return (
    <section className="journal-entry" aria-label="Journal entry">
      <header className="journal-entry__header">
        <p className="journal-entry__kicker">A journal turned journey</p>
        <h1 className="journal-entry__title">{title}</h1>
        <p className="journal-entry__subtitle">{subtitle}</p>
      </header>

      <form className="journal-entry__form" onSubmit={handleSubmit}>
        <div className="journal-entry__notebook">
          <div className="journal-entry__binding" aria-hidden="true" />
          <div className="journal-entry__holes" aria-hidden="true" />
          <textarea
            className="journal-entry__textarea"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder={placeholder}
            rows={12}
            aria-label="Journal entry"
          />
        </div>

        <div className="journal-entry__divider" aria-hidden="true">
          <span className="journal-entry__divider-line" />
          <span className="journal-entry__divider-label">{dividerLabel}</span>
          <span className="journal-entry__divider-line" />
        </div>

        <JournalImageUpload onImageChange={handleImageChange} />

        <div className="journal-entry__actions">
          <Button type="submit" disabled={!canSubmit}>
            {activeSubmitLabel}
          </Button>
        </div>
      </form>
    </section>
  )
}
