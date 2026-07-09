import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("test")
    .select("id, created_at, name")
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

export async function POST(req: Request) {
  const body = await req.json()

  const { data, error } = await supabase
    .from('test')
    .insert(body)

  return Response.json({ data, error })
}
