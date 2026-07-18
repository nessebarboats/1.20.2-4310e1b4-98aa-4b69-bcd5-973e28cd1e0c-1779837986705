"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

/*mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;*/
mapboxgl.accessToken = "pk.eyJ1IjoiaW50aWJnMSIsImEiOiJjbXJtYnp1MXEwMG90MndxeWNvczFjNWl3In0.Cu8z8cIJPYkvqDMRPyCTKQ";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [27.7437, 42.6598],
      zoom: 10,
    });

    new mapboxgl.Marker()
      .setLngLat([27.7437, 42.6598])
      .addTo(map);

    return () => map.remove();
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

