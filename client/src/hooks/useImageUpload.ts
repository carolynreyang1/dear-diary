import { useCallback, useEffect, useRef, useState } from 'react'
import {
  formatFileSize,
  isAcceptedImageFile,
  isHeicFile,
} from '../utils/imageUpload'

export interface ImageUploadState {
  file: File
  previewUrl: string | null
  isHeic: boolean
}

interface UseImageUploadOptions {
  onError?: (message: string) => void
}

export function useImageUpload({ onError }: UseImageUploadOptions = {}) {
  const [upload, setUpload] = useState<ImageUploadState | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const revokePreview = useCallback((previewUrl: string | null) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
  }, [])

  const clearUpload = useCallback(() => {
    setUpload((current) => {
      if (current) revokePreview(current.previewUrl)
      return null
    })
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [revokePreview])

  const processFile = useCallback(
    (file: File) => {
      if (!isAcceptedImageFile(file)) {
        onError?.('Please upload a PNG, JPG, JPEG, or HEIC image.')
        return
      }

      setUpload((current) => {
        if (current) revokePreview(current.previewUrl)

        const heic = isHeicFile(file)
        const previewUrl = heic ? null : URL.createObjectURL(file)

        return { file, previewUrl, isHeic: heic }
      })
    },
    [onError, revokePreview],
  )

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === e.target) {
      setIsDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
    },
    [processFile],
  )

  const openFilePicker = useCallback(() => {
    inputRef.current?.click()
  }, [])

  useEffect(() => {
    return () => {
      if (upload?.previewUrl) {
        revokePreview(upload.previewUrl)
      }
    }
  }, [upload, revokePreview])

  return {
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
  }
}
