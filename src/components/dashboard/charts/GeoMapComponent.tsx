import { ChartComponentProps } from '@/types/dashboard';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const GeoMapComponent = ({ width = 400, height = 300, title, style }: ChartComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with a temporary token - in production this should come from environment variables
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHMwbXB2NW0wMG51MmpxdDlwYnN0NXZpIn0.FhGjZQJqVK4C_D1ZD9Dn9A';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1.5,
    });

    // Add sample markers
    const sampleLocations = [
      { lng: -74.006, lat: 40.7128, name: "New York" },
      { lng: -0.1276, lat: 51.5074, name: "London" },
      { lng: 139.6917, lat: 35.6895, name: "Tokyo" }
    ];

    sampleLocations.forEach(location => {
      new mapboxgl.Marker({ color: "#6366F1" })
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-[#F1F0FB] to-white rounded-lg shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-4 text-[#1A1F2C]" style={style}>{title}</h3>}
      <div style={{ width: width - 32, height: height - (title ? 72 : 32) }}>
        <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      </div>
    </div>
  );
};