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
}
}
