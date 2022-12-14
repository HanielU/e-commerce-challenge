import { SUPABASE_SECRET, SUPABASE_URL } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET);
