import { createClient } from "@supabase/supabase-js";

const supabaseKey = "sb_publishable_Yb_ATE88F0Pq9j6UP8XzrQ_mYj76TJh";

const supabaseUrl = "https://qgkvufqgfepnjqpoekle.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey);

//  Publishable key ✔️ (THIS is what we need)
// Secret key ❌ (DO NOT use in React)
