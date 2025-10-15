import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix para los íconos de los marcadores en Vite/React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

interface RecyclingCenter {
  id: number
  name: string
  lat: number
  lng: number
  address: string
}

interface LeafletMapProps {
  centers: RecyclingCenter[]
}

export const LeafletMap: React.FC<LeafletMapProps> = ({ centers }) => {
  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    })
  }, [])

  return (
    <MapContainer
      center={[-12.0464, -77.0428]}
      zoom={12}
      style={{ height: '100%', width: '100%', minHeight: 200, borderRadius: '1.5rem' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {centers.map(center => (
        <Marker key={center.id} position={[center.lat, center.lng]}>
          <Popup>
            <strong>{center.name}</strong><br />
            {center.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}