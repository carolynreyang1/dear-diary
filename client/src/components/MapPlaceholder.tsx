import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { MapHotel } from '../types'
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png'
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'
import './MapPlaceholder.css'

// Vite doesn't resolve Leaflet's default icon URLs from CSS/relative paths,
// so the default marker renders broken. Point it at the bundled assets instead.
const defaultIcon = L.icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const SINGLE_HOTEL_ZOOM = 13

interface MapPlaceholderProps {
  mapHotels: MapHotel[]
}

export function MapPlaceholder({ mapHotels }: MapPlaceholderProps) {
  if (mapHotels.length === 0) {
    return (
      <div className="map-placeholder">
        <div className="map-placeholder__fallback" role="img" aria-label="Map unavailable for this destination">
          <p className="map-placeholder__fallback-text">
            Map unavailable for this destination.
          </p>
        </div>
      </div>
    )
  }

  const bounds = mapHotels.map(
    (hotel): [number, number] => [hotel.lat, hotel.lng],
  )
  const [firstLat, firstLng] = bounds[0]

  return (
    <div className="map-placeholder">
      <MapContainer
        key={mapHotels.map((hotel) => `${hotel.lat},${hotel.lng}`).join('|')}
        className="map-placeholder__map"
        center={[firstLat, firstLng]}
        zoom={SINGLE_HOTEL_ZOOM}
        bounds={bounds.length > 1 ? bounds : undefined}
        boundsOptions={{ padding: [32, 32] }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapHotels.map((hotel) => (
          <Marker
            key={`${hotel.name}-${hotel.lat}-${hotel.lng}`}
            position={[hotel.lat, hotel.lng]}
            icon={defaultIcon}
          >
            <Popup>{hotel.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
