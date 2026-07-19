import { useEffect, useState } from 'react'
import { APP_COPY } from '../data/mockData'
import type { JourneyResult } from '../types'
import { AccommodationCard } from './AccommodationCard'
import { Button } from './Button'
import { Label } from './Label'
import { MapPlaceholder } from './MapPlaceholder'
import './ResultsScreen.css'

interface ResultsScreenProps {
  result: JourneyResult
  onWriteAgain: () => void
}

export function ResultsScreen({ result, onWriteAgain }: ResultsScreenProps) {
  const copy = APP_COPY.results
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRevealed(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      className={`results ${revealed ? 'results--revealed' : ''}`}
      aria-label="Journey results"
    >
      <article className="results__block results__block--reflection">
        <Label>{copy.reflectionLabel}</Label>
        <p className="results__reflection">{result.reflection}</p>
      </article>

      <div className="results__divider results__divider--1" aria-hidden="true" />

      <header className="results__hero">
        <Label>{copy.destinationLabel}</Label>
        <h1 className="results__destination">
          <span className="results__destination-text">
            {result.destination.name}
          </span>
          <span className="results__country">{result.destination.country}</span>
        </h1>
        <p className="results__tagline">{result.destination.tagline}</p>
      </header>

      <article className="results__block results__block--archetype">
        <Label>{copy.archetypeLabel}</Label>
        <h2 className="results__archetype-name">{result.archetype.name}</h2>
        <p className="results__archetype-desc">
          {result.archetype.description}
        </p>
      </article>

      <div className="results__divider results__divider--2" aria-hidden="true" />

      <section className="results__stays">
        <Label>{copy.staysLabel}</Label>
        <div className="results__cards">
          {result.listings.map((listing, index) => (
            <AccommodationCard
              key={listing.id}
              listing={listing}
              index={index}
            />
          ))}
        </div>
      </section>

      <div className="results__divider results__divider--3" aria-hidden="true" />

      <section className="results__map-section">
        <Label>{copy.mapLabel}</Label>
        <MapPlaceholder mapHotels={result.mapHotels} />
      </section>

      <footer className="results__footer">
        <Button variant="secondary" onClick={onWriteAgain}>
          {copy.writeAgainLabel}
        </Button>
      </footer>
    </section>
  )
}
