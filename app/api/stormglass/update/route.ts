import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {

const apiKey = process.env.STORMGLASS_API_KEY;

if (!apiKey) {
  throw new Error("Missing STORMGLASS_API_KEY");
}

  const response = await fetch(
    `https://api.stormglass.io/v2/weather/point?lat=42.66001330172242&lng=27.74372845766975&params=waveHeight,windSpeed,airTemperature`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  const json = await response.json(); 

  // parse json...

  const { error } = await supabase
    .from("stormglass")
    .insert({
      wave_height: json.hours[0].waveHeight.noaa,
      wind_speed: json.hours[0].windSpeed.noaa,
      created_at: new Date().toISOString(),
    });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({
    success: true,
  });
}
