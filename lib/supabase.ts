import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_Storage1_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_Storage1_SUPABASE_ANON_KEY!
);
