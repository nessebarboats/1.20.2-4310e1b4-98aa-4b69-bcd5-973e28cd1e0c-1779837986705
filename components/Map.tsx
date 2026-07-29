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
      zoom: 20,
      
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
interface WaveParticle {
    lng: number;
    lat: number;
    direction: number;
    height: number;
}
const particles: WaveParticle[] = [];

for (let i = 0; i < 1000; i++) {

    particles.push({

        lng: 27.7 + Math.random() * 0.5,
        lat: 42.5 + Math.random() * 0.5,

        direction: Math.random() * 360,

        height: 1 + Math.random() * 3

    });

}



Map.on("load", () => {

    const layer = new WaveLayer(map, particles);

    map.addLayer(layer);

});

