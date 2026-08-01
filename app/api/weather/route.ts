import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [27.9147, 43.2141] // Varna
        },
        properties: {
          temperature: 24,
          waveHeight: 1.8,
          windSpeed: 7,
          windDirection: 135
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [27.4678, 42.5048] // Burgas
        },
        properties: {
          temperature: 25,
          waveHeight: 1.2,
          windSpeed: 9,
          windDirection: 110
        }
      }
    ]
  });
}
