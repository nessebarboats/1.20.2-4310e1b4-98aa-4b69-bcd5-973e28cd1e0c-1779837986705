import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("test8")
    .select("id, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({
    success: true,
    data,
  });
}
