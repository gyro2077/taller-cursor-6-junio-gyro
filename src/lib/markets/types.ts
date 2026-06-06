import type { Database } from "@/lib/supabase/database.types";

export type Market = Database["public"]["Tables"]["markets"]["Row"];

export type MarketStatus = "open" | "closed" | "resolved";

export type ProbabilityPoint = {
  at: string;
  yesChance: number;
};

export type MarketProbability = {
  yesChance: number;
  source: "positions" | "neutral";
  points: ProbabilityPoint[];
  chartMode: "history" | "current_balance";
};
