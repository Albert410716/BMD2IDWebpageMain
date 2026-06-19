// connects to our database and exports a supabase object

// FYI This setup is NOT production ready, just for demonstration purposes!
// DO NOT expose keys in your html or javascript files

import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { config } from "./config.js";

export const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
);