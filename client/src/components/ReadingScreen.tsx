import { useEffect, useState } from 'react'
import {
  APP_COPY,
  LOADING_MESSAGE_INTERVAL_MS,
  READING_DURATION_MS,
} from '../data/mockData'
import './ReadingScreen.css'

interface ReadingScreenProps {
  onComplete: () => void
}

export function ReadingScreen({ onComplete }: ReadingScreenProps) {
  const messages = APP_COPY.loading.messages
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(onComplete, READING_DURATION_MS)
    return () => clearTimeout(timer)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length)
        setVisible(true)
      }, 550)
    }, LOADING_MESSAGE_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <section className="reading-screen" aria-live="polite" aria-busy="true">
      <div className="reading-screen__atmosphere" aria-hidden="true">
        <span className="reading-screen__mote" />
        <span className="reading-screen__mote" />
        <span className="reading-screen__mote" />
        <span className="reading-screen__mote" />
        <div className="reading-screen__vignette" />
      </div>
      <div className="reading-screen__inner">
        <p className="reading-screen__kicker">Reading…</p>
        <p
          className={`reading-screen__message ${visible ? 'reading-screen__message--visible' : ''}`}
        >
          {messages[index]}
        </p>
        <div className="reading-screen__rule" aria-hidden="true" />
      </div>
    </section>
  )
}
