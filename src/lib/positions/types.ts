import type { Market } from "@/lib/markets/types";
import type { Database } from "@/lib/supabase/database.types";

export type Position = Database["public"]["Tables"]["positions"]["Row"];

export type PositionWithMarket = Position & {
  markets: Market;
};
