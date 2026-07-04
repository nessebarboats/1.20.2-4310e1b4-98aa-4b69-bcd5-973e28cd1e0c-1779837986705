import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("test1")
    .select("*")
    .limit(3);

  return Response.json({
    data,
    error,
  });
}
