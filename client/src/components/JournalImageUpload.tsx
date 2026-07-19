import { useEffect, useId } from 'react'
import { APP_COPY } from '../data/mockData'
import { useImageUpload } from '../hooks/useImageUpload'
import { ACCEPTED_IMAGE_ACCEPT } from '../utils/imageUpload'
import './JournalImageUpload.css'

interface JournalImageUploadProps {
  onImageChange: (file: File | null) => void
}

export function JournalImageUpload({ onImageChange }: JournalImageUploadProps) {
  const copy = APP_COPY.journal.upload
  const inputId = useId()

  const {
    upload,
    isDragging,
    inputRef,
    clearUpload,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleInputChange,
    openFilePicker,
    formatFileSize,
  } = useImageUpload({
    onError: () => {
      /* invalid type — silently rejected; extend with toast when needed */
    },
  })

  useEffect(() => {
    onImageChange(upload?.file ?? null)
  }, [upload, onImageChange])

  if (upload) {
    return (
      <div className="journal-upload journal-upload--preview">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACCEPTED_IMAGE_ACCEPT}
          onChange={handleInputChange}
          className="journal-upload__input"
          tabIndex={-1}
        />

        <figure className="journal-upload__preview">
          <div className="journal-upload__tape journal-upload__tape--left" aria-hidden="true" />
          <div className="journal-upload__tape journal-upload__tape--right" aria-hidden="true" />

          {upload.previewUrl ? (
            <img
              src={upload.previewUrl}
              alt="Uploaded journal page preview"
              className="journal-upload__image"
            />
          ) : (
            <div className="journal-upload__heic-placeholder">
              <span className="journal-upload__heic-icon" aria-hidden="true">
                &#9998;
              </span>
              <p className="journal-upload__heic-label">{copy.heicPreviewLabel}</p>
              <p className="journal-upload__filename">{upload.file.name}</p>
            </div>
          )}

          <figcaption className="journal-upload__caption">
            <span className="journal-upload__file-name">{upload.file.name}</span>
            <span className="journal-upload__file-size">
              {formatFileSize(upload.file.size)}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          className="journal-upload__remove"
          onClick={clearUpload}
        >
          {copy.removeLabel}
        </button>
      </div>
    )
  }

  return (
    <div className="journal-upload">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={ACCEPTED_IMAGE_ACCEPT}
        onChange={handleInputChange}
        className="journal-upload__input"
        tabIndex={-1}
      />

      <div
        className={`journal-upload__dropzone ${isDragging ? 'journal-upload__dropzone--active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFilePicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openFilePicker()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={copy.title}
      >
        <div className="journal-upload__corner journal-upload__corner--tl" aria-hidden="true" />
        <div className="journal-upload__corner journal-upload__corner--tr" aria-hidden="true" />
        <div className="journal-upload__corner journal-upload__corner--bl" aria-hidden="true" />
        <div className="journal-upload__corner journal-upload__corner--br" aria-hidden="true" />

        <p className="journal-upload__title">{copy.title}</p>
        <p className="journal-upload__hint">{copy.hint}</p>

        <span className="journal-upload__browse">{copy.browseLabel}</span>
        <span className="journal-upload__formats">{copy.supportedFormats}</span>
      </div>
    </div>
  )
}
