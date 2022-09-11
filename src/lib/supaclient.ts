import { createClient } from "@supabase/supabase-js";

const supabaseUrl = <string>process.env.SUPABASE_URL;
// const supabaseAnonKey = <string>import.meta.env.VITE_SUPA_ANON;
const supabaseSecretKey = <string>process.env.SUPABASE_SECRET;

export const supabase = createClient(supabaseUrl, supabaseSecretKey);
