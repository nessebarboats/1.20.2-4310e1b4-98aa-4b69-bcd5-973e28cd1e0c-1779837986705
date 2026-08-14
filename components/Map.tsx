/*"use client";

import { useEffect, useRef } from "react";
//import { Map } from "maplibre-gl";
import { Map, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";



export default function WeatherMap() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new Map({
      container: mapContainer.current,
      style: "https://api.maptiler.com/maps/topo-v4/style.json?key=nYgctOP62wE84w5g1lpJ",
      center: [27.7437, 42.6600],
      zoom: 8,
    });
map.addControl(new NavigationControl());

   // map.addControl(new maplibregl.NavigationControl());

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "1000px",
        height: "100vh",
      }}
    />
  );
}

*/


/*"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
*/
/*mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;*/
//mapboxgl.accessToken = "pk.eyJ1IjoiaW50aWJnMSIsImEiOiJjbXJtYnp1MXEwMG90MndxeWNvczFjNWl3In0.Cu8z8cIJPYkvqDMRPyCTKQ";
/*
export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  
  useEffect(() => {
    if (!mapContainer.current) return;

const map = new mapboxgl.Map({
  container: mapContainer.current!,
  //style: "mapbox://styles/mapbox/satellite-streets-v12",
  style: "mapbox://styles/intibg1/cms4kp6x100wf01qz2v4sgdl8",
  center: [27.7437, 42.6598],
  zoom: 10,
});*/
/*
console.log("After creating map");

map.on("load", () => {
  console.log("MAP LOAD EVENT");
});*/
/*
map.on("style.load", () => {
  if (!map.getSource("stormglass")) {
    map.addSource("stormglass", {
      type: "geojson",
      data: YOUR_GEOJSON,
    });

    map.addLayer({
      id: "temperature",
      type: "circle",
      source: "stormglass",
      paint: {
        "circle-radius": 10,
        "circle-color": "#ff0000",
      },
    });
  }
});

*/




/*
    
map.on("style.load", async () => {

 const response = await fetch("/api/weather");
  const data = await response.json();

  console.log("Weather API:", data);

  mapRef.current = map;

map.addSource("stormglass", {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [27.7437, 42.6598]
        },
        properties: {
          temperature: 25
        }
      }
    ]
  }
});

  
/*  map.addSource("stormglass", {
    type: "geojson",
    data,
  });*/

/*  map.addLayer({
    id: "temperature",
    type: "circle",
    source: "stormglass",
    paint: {
      "circle-radius": 6,
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "temperature"],
        0, "#0000ff",
        15, "#00ff00",
        30, "#ff0000"
      ]
    }
  });*/
/*console.log(map.getSource("stormglass"));
    map.addLayer({
  id: "temperature",
  type: "circle",
  source: "stormglass",
  paint: {
    "circle-radius": 10,
    "circle-color": "#ff0000",
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff"
  }
});
  console.log(map.getLayer("temperature"));
  console.log(
  map.querySourceFeatures("stormglass")
);
});



map.on("error", (e) => {
  console.error("MAP ERROR", e);
});
    */

  
    /*

map.on("load", async () => {
  console.log("Map loaded");

  try {
    const response = await fetch("/api/weather");

    console.log("Status:", response.status);

    const text = await response.text();

    console.log("API response:", text);

    const data = JSON.parse(text);

    console.log("GeoJSON:", data);

    map.addSource("stormglass", {
      type: "geojson",
      data,
    });

    console.log("Source added");
  } catch (err) {
    console.error("Weather error:", err);
  }
}); 
    
    */
    
    /*
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [27.7437, 42.6598],
      zoom: 10,
      
    });

     map.on("load", async () => {
  const response = await fetch("/api/weather");
  const data = await response.json();

  console.log("Weather API:", data);

  map.addSource("stormglass", {
    type: "geojson",
    data,
  });
});
*/

  /*  

mapRef.current?.addSource("weather", {
    type: "geojson",
    data: {
"type":"FeatureCollection",
"features":[
{
"type":"Feature",
"geometry":{
"type":"Point",
"coordinates":[27.7437, 42.6598]
},
"properties":{
"temperature":24.1,
"waveHeight":1.3,
"windSpeed":12,
"windDirection":140
}
}
]
}
});

mapRef.current?.addLayer({
    id: "temperature",
    type: "heatmap",
    source: "weather",
    paint: {
        "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get","temperature"],
            0,0,
            35,1
        ]
    }
});*/



/*
map.on("load", async () => {
  const response = await fetch("/api/weather");
  const geojson = await response.json();

  map.addSource("weather", {
    type: "geojson",
    data: geojson,
  });

  map.addLayer({
    id: "temperature",
    type: "circle",
    source: "weather",
    paint: {
      "circle-radius": 6,
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "temperature"],
        0, "#0000ff",
        15, "#00ff00",
        30, "#ff0000"
      ]
    }
  });
});*/


    
    



    
/*


mapRef.current = map;

  map.on("load", () => {

    // Weather source
    map.addSource("weather", {
      type: "raster",
      tiles: [
        "https://api.maptiler.com/tiles/v4/tiles.json?key=nYgctOP62wE84w5g1lpJ"
      ],
      tileSize: 256,
    });

    // Weather layer

    
    map.addLayer({
      id: "weather-layer",
      type: "raster",
      source: "weather",
      paint: {
        "raster-opacity": 0.6,
      },
    });

  });*/
/*  mapRef.current = map;
    
fetch("/api/weather")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

map.addSource("stormglass", {
  type: "geojson",
  data: "/api/weather",
});*/
/*    map.on("load", async () => {
  const response = await fetch("/api/weather");
  const data = await response.json();

  console.log("Weather API:", data);

  map.addSource("stormglass", {
    type: "geojson",
    data,
  });
});

  mapRef.current = map;
    
map.on("load", async () => {
  map.addSource("stormglass", {
    type: "geojson",
    data: "/api/weather",
  });

  map.addLayer({
    id: "water-temperature",
    type: "circle",
    source: "stormglass",
    paint: {
      "circle-radius": 8,
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "waterTemperature"],
        0, "#0033ff",
        10, "#00ffff",
        20, "#00ff00",
        30, "#ff0000",
      ],
    },
  });
});*/

  /*  return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "1500px",
        height: "500px",
        borderRadius: "12px",
      }}
    />
  );


  


  }
  
*/


'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token via env var (see setup notes)
mapboxgl.accessToken = "pk.eyJ1IjoiaW50aWJnMSIsImEiOiJjbXJtYnp1MXEwMG90MndxeWNvczFjNWl3In0.Cu8z8cIJPYkvqDMRPyCTKQ";

export interface MapMarker {
  id: 225;
  longitude: 42.659820;
  latitude: 27.743707;
  label?: "LABEL";      // shown in the popup
  color?: "#0ea5e9";       // marker color, e.g. "#0ea5e9"
}

interface MapboxMapProps {
  markers: MapMarker[];
  center?: [42.659820, 27.743707]; // [lng, lat]
  zoom?: 5;
  style?: "mapbox://styles/mapbox/satellite-streets-v12"; // mapbox style url
  height?: 250;
  /** Show the temperature overlay on initial render */
  showTemperature?: true;
  /** Let the user toggle the temperature layer with a built-in button */
  temperatureToggle?: true;
}

const TEMP_SOURCE_ID = 'owm-temperature-source';
const TEMP_LAYER_ID = 'owm-temperature-layer';

export default function MapboxMap({
  markers,
  center,
  zoom = 3,
  style = 'mapbox://styles/mapbox/streets-v12',
  height = 480,
  showTemperature = false,
  temperatureToggle = true,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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



