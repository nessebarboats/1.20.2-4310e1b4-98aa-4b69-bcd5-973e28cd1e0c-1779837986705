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

const INITIAL_CENTER: [number, number] = [27.74370, 42.65982]; // [lng, lat] — Sofia, Bulgaria
const INITIAL_ZOOM = 14;
const INITIAL_PITCH = 60;
const INITIAL_BEARING = -20;

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
      pitch: INITIAL_PITCH,
      bearing: INITIAL_BEARING,
      antialias: true,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');

    map.on('load', () => {
      // 2. Add DEM (elevation) source for terrain
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });

      // 3. Enable 3D terrain
      map.setTerrain({ source: 'mapbox-dem', exaggeration });

      // 4. Sky layer for a realistic horizon
      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });

      // 5. 3D building extrusions
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
