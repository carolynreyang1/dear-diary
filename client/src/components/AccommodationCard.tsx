import type { Accommodation } from '../types'
import './AccommodationCard.css'

interface AccommodationCardProps {
  accommodation: Accommodation
  index: number
}

export function AccommodationCard({ accommodation, index }: AccommodationCardProps) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className="accommodation-card">
      <span className="accommodation-card__index" aria-hidden="true">
        {number}
      </span>
      <div className="accommodation-card__body">
        <p className="accommodation-card__mood">{accommodation.mood}</p>
        <h3 className="accommodation-card__name">{accommodation.name}</h3>
        <p className="accommodation-card__description">
          {accommodation.description}
        </p>
        <p className="accommodation-card__price">{accommodation.price}</p>
      </div>
    </article>
  )
}
