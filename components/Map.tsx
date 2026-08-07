"use client";

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
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=nYgctOP62wE84w5g1lpJ`,
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
        width: "100%",
        height: "100vh",
      }}
    />
  );
}




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





