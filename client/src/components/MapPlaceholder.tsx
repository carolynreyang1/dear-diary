import './MapPlaceholder.css'

interface MapPlaceholderProps {
  placeName: string
  latitude: number
  longitude: number
}

export function MapPlaceholder({
  placeName,
  latitude,
  longitude,
}: MapPlaceholderProps) {
  return (
    <div className="map-placeholder" aria-label={`Map of ${placeName}`}>
      <div className="map-placeholder__frame">
        <div className="map-placeholder__grid" aria-hidden="true">
          <span className="map-placeholder__pin" />
        </div>
        <p className="map-placeholder__coords">
          {latitude.toFixed(2)}° N · {longitude.toFixed(2)}° E
        </p>
      </div>
      <p className="map-placeholder__place">{placeName}</p>
    </div>
  )
}
