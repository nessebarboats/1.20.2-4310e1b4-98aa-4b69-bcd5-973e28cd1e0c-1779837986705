import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  try {
    const apiKey = process.env.STORMGLASS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "STORMGLASS_API_KEY is missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.stormglass.io/v2/weather/point?lat=42.66001330172242&lng=27.74372845766975&params=waveHeight,windSpeed",
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    const stormglass = await response.json();

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


    
    console.log(stormglass);

    return NextResponse.json(stormglass);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
