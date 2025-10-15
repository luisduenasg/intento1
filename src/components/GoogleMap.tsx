import React, { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface RecyclingCenter {
  id: number
  name: string
  lat: number
  lng: number
  materials: string[]
  phone: string
  address: string
  hours: string
}

interface GoogleMapProps {
  centers: RecyclingCenter[]
  selectedFilter: string
  onCenterSelect?: (center: RecyclingCenter) => void
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ centers, selectedFilter, onCenterSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])

  useEffect(() => {
    const initMap = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        console.warn('Google Maps API key not found')
        return
      }

      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places']
      })

      try {
        await loader.load()
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: -12.0464, lng: -77.0428 }, // Lima, Peru
            zoom: 12,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          })
          
          setMap(mapInstance)
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error)
      }
    }

    initMap()
  }, [])

  useEffect(() => {
    if (!map) return

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null))
    
    // Filter centers based on selected filter
    const filteredCenters = selectedFilter === 'all' 
      ? centers 
      : centers.filter(center => center.materials.includes(selectedFilter))

    // Create new markers
    const newMarkers = filteredCenters.map(center => {
      const marker = new google.maps.Marker({
        position: { lat: center.lat, lng: center.lng },
        map: map,
        title: center.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
              <path d="M12 16l3 3 6-6" stroke="#ffffff" stroke-width="2" fill="none"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32)
        }
      })

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${center.name}</h3>
            <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px;">${center.address}</p>
            <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px;">📞 ${center.phone}</p>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">🕒 ${center.hours}</p>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${center.materials.map(material => `
                <span style="background: #10b981; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px;">
                  ${material === 'plastic' ? 'Plástico' : 
                    material === 'paper' ? 'Papel' : 
                    material === 'glass' ? 'Vidrio' : 
                    material === 'electronic' ? 'Electrónico' : material}
                </span>
              `).join('')}
            </div>
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
        if (onCenterSelect) {
          onCenterSelect(center)
        }
      })

      return marker
    })

    setMarkers(newMarkers)
  }, [map, centers, selectedFilter, onCenterSelect])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-3xl"
      style={{ minHeight: '200px' }}
    />
  )
}