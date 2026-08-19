'use client'; 

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token via env var (see setup notes)
mapboxgl.accessToken = "pk.eyJ1IjoiaW50aWJnMSIsImEiOiJjbXJtYnp1MXEwMG90MndxeWNvczFjNWl3In0.Cu8z8cIJPYkvqDMRPyCTKQ";
export interface MapMarker {
  id: number;
  longitude: number;   
  latitude: number;   
  label?: string;
  color?: string;
}

interface WindPoint {
  name?: string;
  lngLat: [number, number];
  direction: number; // degrees, 0 = North, meteorological convention
  speed: number;      // mph or your preferred unit
}

type MapboxStyle = 'mapbox://styles/mapbox/satellite-v9';
interface MapboxMapProps {
  markers: MapMarker[];
  center?: [42.659820, 27.743707]; // [lng, lat]
  zoom?: number;
  style?: MapboxStyle;// mapbox style url
  height?: number;
  /** Show the temperature overlay on initial render */
  showTemperature?: boolean;
  /** Let the user toggle the temperature layer with a built-in button */
  temperatureToggle?: boolean;
  projection?: string;

  // Wind layer additions
  showWind?: boolean;              // whether wind layer is visible by default
  windToggle?: boolean;            // whether to show a UI toggle button for wind
  windData?: WindPoint[];          // per-location wind data
}



const TEMP_SOURCE_ID = 'owm-temperature-source';
const TEMP_LAYER_ID = 'owm-temperature-layer';



export default function MapboxMap({
  markers,
  center,
  zoom = 3,
  style = 'mapbox://styles/mapbox/satellite-v9',
  height = 480,
  showTemperature = false,
  temperatureToggle = true,
  projection = 'globe',
  showWind = true,
  windToggle = true,
  windData = [],
}: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<mapboxgl.Marker[]>([]);
  const [tempVisible, setTempVisible] = useState(showTemperature);
  const [styleLoaded, setStyleLoaded] = useState(false);

  // Initialize the map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const defaultCenter: [number, number] =
      center ?? (markers.length
        ? [markers[0].longitude, markers[0].latitude]
        : [0, 20]);

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style,
      center: defaultCenter, 
      zoom,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapRef.current.on('load', () => setStyleLoaded(true));

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
    
  }, []);

  // Add the temperature raster source/layer once the style has loaded
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleLoaded) return;
    if (map.getSource(TEMP_SOURCE_ID)) return;

    const owmKey = "9169f3e37eeb3e102f720fe31461b87e";
    if (!owmKey) {
      console.warn('NEXT_PUBLIC_OPENWEATHER_API_KEY is not set; temperature layer skipped.');
      return;
    }

    map.addSource(TEMP_SOURCE_ID, {
      type: 'raster',
      tiles: [
        `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${owmKey}`,
      ],
      tileSize: 256,
      attribution: '© OpenWeatherMap',
    });

    map.addLayer({
      id: TEMP_LAYER_ID,
      type: 'raster',
      source: TEMP_SOURCE_ID,
      paint: { 'raster-opacity': 0.7 },
      layout: { visibility: tempVisible ? 'visible' : 'none' },
    });
    
  }, [styleLoaded]);

  // Toggle temperature layer visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleLoaded || !map.getLayer(TEMP_LAYER_ID)) return;
    map.setLayoutProperty(TEMP_LAYER_ID, 'visibility', tempVisible ? 'visible' : 'none');
  }, [tempVisible, styleLoaded]);

  // Sync markers whenever the list changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markerRefs.current.forEach((m) => m.remove());
    markerRefs.current = [];

    if (!markers.length) return;

    const bounds = new mapboxgl.LngLatBounds();

    markers.forEach((m) => {
      const marker = new mapboxgl.Marker({ color: m.color ?? '#e11d48' })
        .setLngLat([m.longitude, m.latitude]);

      if (m.label) {
        marker.setPopup(new mapboxgl.Popup({ offset: 24 }).setText(m.label));
      }

      marker.addTo(map);
      markerRefs.current.push(marker);
      bounds.extend([m.longitude, m.latitude]);
    });

    // Fit the map to show all markers if there's more than one
    if (markers.length > 1) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 12, duration: 0 });
    }
  }, [markers]);

useEffect(() => {
  if (!mapRef.current || !showWind) return;

  const markers: mapboxgl.Marker[] = [];

  windData.forEach(({ lngLat, direction, speed }) => {
    const el = document.createElement('div');
    el.style.width = '24px';
    el.style.height = '24px';
    el.style.transform = `rotate(${direction}deg)`;
    el.innerHTML = `
      <svg viewBox="0 0 24 24" fill="#2563eb">
        <path d="M12 2L4 20l8-4 8 4z"/>
      </svg>
    `;
    el.title = `${speed} mph`;

    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat(lngLat)
      .addTo(mapRef.current!);

    markers.push(marker);
  });

  return () => markers.forEach((m) => m.remove());
}, [showWind, windData]);
  
  return (
    <div style={{ position: 'relative', width: '100%', height }}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden' }}
      />
      {temperatureToggle && (
        <button
          onClick={() => setTempVisible((v) => !v)}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1,
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid #d1d5db',
            background: tempVisible ? '#0ea5e9' : '#fff',
            color: tempVisible ? '#fff' : '#111827',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          }}
        >
          {tempVisible ? 'Hide' : 'Show'} Temperature
        </button>
      )}
    </div>
  );
}
