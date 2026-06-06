import { createClient } from "@supabase/supabase-js";

import { env } from "@/env";
import type { Database } from "@/lib/supabase/database.types";

export function isAdminSupabaseConfigured() {
  return Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
}

export function createAdminSupabaseClient() {
  if (!isAdminSupabaseConfigured()) {
    return null;
  }

  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL as string,
    env.SUPABASE_SERVICE_ROLE_KEY as string,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
