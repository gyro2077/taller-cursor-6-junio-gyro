import { getCurrentUser } from "@/lib/auth/queries";
import type { Profile } from "@/lib/profiles/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getProfileForUser(
  userId: string,
): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return data;
}

export async function getProfileForCurrentUser(): Promise<Profile | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return getProfileForUser(user.id);
}
