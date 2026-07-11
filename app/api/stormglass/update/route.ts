import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
 return NextResponse.json({
    success: true,
    message: "Stormglass API route is working",
  });
}
