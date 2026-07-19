import { APP_COPY } from '../data/mockData'
import type { Listing } from '../types'
import './AccommodationCard.css'

interface AccommodationCardProps {
  listing: Listing
  index: number
}

export function AccommodationCard({ listing, index }: AccommodationCardProps) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className="accommodation-card">
      <div className="accommodation-card__media">
        <img
          className="accommodation-card__image"
          src={listing.image}
          alt={listing.name}
          loading="lazy"
        />
        <span className="accommodation-card__index" aria-hidden="true">
          {number}
        </span>
      </div>
      <div className="accommodation-card__body">
        <span className="accommodation-card__source">{listing.source}</span>
        <h3 className="accommodation-card__name">{listing.name}</h3>
        <p className="accommodation-card__price">{listing.price}</p>
        <a
          className="accommodation-card__cta"
          href={listing.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {APP_COPY.results.viewStayLabel}
        </a>
      </div>
    </article>
  )
}
