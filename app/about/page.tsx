"use client";
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// npm install mapbox-gl
// npm install -D @types/mapbox-gl

// 1. Set your Mapbox access token here (better: use an env var, e.g. process.env.NEXT_PUBLIC_MAPBOX_TOKEN)
mapboxgl.accessToken = 'pk.eyJ1IjoiaW50aWJnMSIsImEiOiJjbXJtYnp1MXEwMG90MndxeWNvczFjNWl3In0.Cu8z8cIJPYkvqDMRPyCTKQ';

const INITIAL_CENTER: [number, number] = [23.3219, 42.6977]; // [lng, lat] — Sofia, Bulgaria
const INITIAL_ZOOM = 14;
const INITIAL_PITCH = 60;
const INITIAL_BEARING = -20;

// Add/remove pins here — each needs coordinates, a title, and optional description
const LOCATIONS: { coords: [number, number]; title: string; description?: string }[] = [
  { coords: [23.3219, 42.6977], title: 'nessebarboats HQ', description: 'Main office' },
  { coords: [23.3300, 42.7050], title: 'Marina dock A', description: 'Boat pickup point' },
  { coords: [23.3150, 42.6900], title: 'Marina dock B', description: 'Boat pickup point' },
];

type WeatherData = { speedKn: number; directionDeg: number; tempC: number };

// Fetches current wind speed (knots), wind direction (degrees), and temperature (°C)
// for a coordinate. Open-Meteo is free and requires no API key.
async function fetchWeather(lng: number, lat: number): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m&wind_speed_unit=kn`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      tempC: data.current.temperature_2m,
      speedKn: data.current.wind_speed_10m,
      directionDeg: data.current.wind_direction_10m,
    };
  } catch {
    return null;
  }
}

// Returns a color for a temperature badge — blue (cold) through red (hot).
function tempColor(tempC: number): string {
  if (tempC <= 0) return '#3b82f6';
  if (tempC <= 10) return '#60a5fa';
  if (tempC <= 20) return '#facc15';
  if (tempC <= 28) return '#fb923c';
  return '#ef4444';
}

// Converts a compass degree reading into an 8-point direction label (e.g. "NE").
function degToCompass(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

// NOTE: no "export default" here — this is a local component used only within this file.
function Mapbox3DTerrain() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [exaggeration, setExaggeration] = useState(1.5);
  const [pitch, setPitch] = useState(INITIAL_PITCH);

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      pitch: 0, // start flat; we'll fly to the pitched view after fitting bounds
      bearing: INITIAL_BEARING,
      antialias: true,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');

    map.on('load', () => {
      console.warn('🗺️ MAP LOAD FIRED — about to add markers');

      // 1. Add pin markers + wind data FIRST, wrapped in try/catch, so this always
      // runs even if the terrain/building code below has an issue.
      try {
        const bounds = new mapboxgl.LngLatBounds();

        LOCATIONS.forEach((loc) => {
          const el = document.createElement('div');
          el.style.width = '22px';
          el.style.height = '22px';
          el.style.borderRadius = '50%';
          el.style.background = '#e63946';
          el.style.border = '3px solid #ffffff';
          el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.4)';
          el.style.cursor = 'pointer';

          // Small temperature badge, updated once weather data arrives
          const tempBadge = document.createElement('div');
          tempBadge.style.position = 'absolute';
          tempBadge.style.top = '-8px';
          tempBadge.style.right = '-8px';
          tempBadge.style.minWidth = '28px';
          tempBadge.style.height = '18px';
          tempBadge.style.padding = '0 4px';
          tempBadge.style.borderRadius = '9px';
          tempBadge.style.background = '#9ca3af';
          tempBadge.style.border = '2px solid #ffffff';
          tempBadge.style.color = '#fff';
          tempBadge.style.fontSize = '10px';
          tempBadge.style.fontWeight = '700';
          tempBadge.style.display = 'flex';
          tempBadge.style.alignItems = 'center';
          tempBadge.style.justifyContent = 'center';
          tempBadge.style.fontFamily = 'system-ui, sans-serif';
          tempBadge.textContent = '…';
          el.appendChild(tempBadge);

          const popup = new mapboxgl.Popup({ offset: 18 }).setHTML(
            `<strong>${loc.title}</strong>${loc.description ? `<br/>${loc.description}` : ''}<br/><em>Loading weather…</em>`
          );

          new mapboxgl.Marker({ element: el, anchor: 'center' })
            .setLngLat(loc.coords)
            .setPopup(popup)
            .addTo(map);

          console.log('Marker added:', loc.title, loc.coords);

          bounds.extend(loc.coords);

          fetchWeather(loc.coords[0], loc.coords[1]).then((weather) => {
            if (weather) {
              tempBadge.textContent = `${Math.round(weather.tempC)}°`;
              tempBadge.style.background = tempColor(weather.tempC);

              popup.setHTML(
                `<strong>${loc.title}</strong>${loc.description ? `<br/>${loc.description}` : ''}
                 <div style="margin-top:4px;">🌡️ ${weather.tempC.toFixed(1)}°C</div>
                 <div style="margin-top:2px;">💨 ${weather.speedKn.toFixed(1)} kn from ${degToCompass(weather.directionDeg)}</div>`
              );
            } else {
              tempBadge.textContent = '?';
              popup.setHTML(
                `<strong>${loc.title}</strong>${loc.description ? `<br/>${loc.description}` : ''}<br/><span style="color:#888;">Weather data unavailable</span>`
              );
            }
          });
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, { padding: 80, duration: 0 });
          map.once('idle', () => {
            map.easeTo({ pitch: INITIAL_PITCH, duration: 800 });
            setPitch(INITIAL_PITCH);
          });
        }
      } catch (err) {
        console.error('Error adding markers:', err);
      }

      // 2. Terrain, sky, and buildings — each independently wrapped so a failure
      // here can never block the markers above.
      try {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
        map.setTerrain({ source: 'mapbox-dem', exaggeration });
      } catch (err) {
        console.error('Error adding terrain:', err);
      }

      try {
        map.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 15,
          },
        });
      } catch (err) {
        console.error('Error adding sky layer:', err);
      }

      try {
        const layers = map.getStyle().layers;
        const labelLayerId = layers?.find(
          (l): l is mapboxgl.SymbolLayerSpecification =>
            l.type === 'symbol' && !!l.layout && 'text-field' in l.layout
        )?.id;

        map.addLayer(
          {
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 14,
            paint: {
              'fill-extrusion-color': '#d9d0c1',
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              'fill-extrusion-opacity': 0.85,
            },
          },
          labelLayerId
        );
      } catch (err) {
        console.error('Error adding 3D buildings:', err);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update terrain exaggeration when slider changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getSource('mapbox-dem')) return;
    map.setTerrain({ source: 'mapbox-dem', exaggeration });
  }, [exaggeration]);

  // Update pitch when slider changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.easeTo({ pitch, duration: 200 });
  }, [pitch]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 1,
          background: 'rgba(255,255,255,0.95)',
          padding: '12px 14px',
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          fontSize: 13,
          maxWidth: 260,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <strong>3D Terrain Controls</strong>

        <label style={{ display: 'block', marginTop: 8 }}>
          Terrain exaggeration: {exaggeration.toFixed(1)}x
          <input
            type="range"
            min={0}
            max={3}
            step={0.1}
            value={exaggeration}
            onChange={(e) => setExaggeration(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>

        <label style={{ display: 'block', marginTop: 8 }}>
          Pitch: {pitch}°
          <input
            type="range"
            min={0}
            max={85}
            step={1}
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>

        <small style={{ display: 'block', marginTop: 8, color: '#555' }}>
          Right-click-drag (or two-finger drag) to rotate/tilt manually.
        </small>
      </div>

      <div ref={mapContainerRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}

// This is the ONLY default export in the file — required for a Next.js page.
export default function About() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-between fancy-overlay">
      <Header />

      <div className="w-full flex flex-col items-center my-12">
        <section className="w-full p-6 container-narrow">
          <h1 className="text-4xl font-semibold leading-tight md:leading-tight max-w-xs sm:max-w-none md:text-6xl fancy-heading">
            About nessebarboats
          </h1>

          <p className="mt-6 md:text-xl">nessebarboats</p>

          <p className="mt-6 md:text-xl"></p>
        </section>

        <section className="w-full p-6 container-narrow">
          <Mapbox3DTerrain />
        </section>
      </div>

      <Footer />
    </div>
  );
}
