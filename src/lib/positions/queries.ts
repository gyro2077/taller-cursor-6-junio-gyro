import { getCurrentUser } from "@/lib/auth/queries";
import type { Position, PositionWithMarket } from "@/lib/positions/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getPositionForUserAndMarket(
  userId: string,
  marketId: string,
): Promise<Position | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("positions")
    .select("*")
    .eq("user_id", userId)
    .eq("market_id", marketId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch position: ${error.message}`);
  }

  return data;
}

export async function getPositionsForCurrentUser(): Promise<
  PositionWithMarket[] | null
> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("positions")
    .select("*, markets(*)")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch positions: ${error.message}`);
  }

  const positions = (data ?? []) as PositionWithMarket[];

  return positions.filter(
    (position) => position.yes_shares_cents + position.no_shares_cents > 0,
  );
}
