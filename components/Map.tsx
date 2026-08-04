"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

/*mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;*/
mapboxgl.accessToken = "pk.eyJ1IjoiaW50aWJnMSIsImEiOiJjbXJtYnp1MXEwMG90MndxeWNvczFjNWl3In0.Cu8z8cIJPYkvqDMRPyCTKQ";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [27.7437, 42.6598],
      zoom: 10,
      
    });


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


    
    

    new mapboxgl.Marker()
      .setLngLat([27.7437, 42.6598])
      .addTo(map);


    
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
});

  mapRef.current = map;
    map.on("load", async () => {
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
});

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
  






