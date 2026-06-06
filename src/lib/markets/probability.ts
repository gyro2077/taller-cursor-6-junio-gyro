import { parseTradeSide } from "@/lib/fake-money";
import type {
  Market,
  MarketProbability,
  ProbabilityPoint,
} from "@/lib/markets/types";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

/** 50% baseline when no aggregated Yes/No activity is available. */
export const NEUTRAL_YES_CHANCE = 0.5;

type PositionRow = {
  yes_shares_cents: number;
  no_shares_cents: number;
};

type LedgerTradeRow = {
  amount_cents: number;
  created_at: string;
  description: string;
  entry_type: string;
};

export function computeYesChanceFromTotals(
  yesTotal: number,
  noTotal: number,
): { yesChance: number; source: "positions" | "neutral" } {
  const total = yesTotal + noTotal;

  if (total <= 0) {
    return { yesChance: NEUTRAL_YES_CHANCE, source: "neutral" };
  }

  return { yesChance: yesTotal / total, source: "positions" };
}

export function buildHistoryPoints(
  trades: LedgerTradeRow[],
): ProbabilityPoint[] {
  let yesTotal = 0;
  let noTotal = 0;
  const points: ProbabilityPoint[] = [];

  for (const trade of trades) {
    if (trade.entry_type !== "trade") {
      continue;
    }

    const side = parseTradeSide(trade.description);
    const amount = Math.abs(trade.amount_cents);

    if (!side || amount <= 0) {
      continue;
    }

    if (side === "yes") {
      yesTotal += amount;
    } else {
      noTotal += amount;
    }

    const { yesChance } = computeYesChanceFromTotals(yesTotal, noTotal);
    points.push({ at: trade.created_at, yesChance });
  }

  return points;
}

export function buildFlatCurrentBalancePoints(
  market: Market,
  yesChance: number,
  now = new Date(),
): ProbabilityPoint[] {
  return [
    { at: market.created_at, yesChance },
    { at: now.toISOString(), yesChance },
  ];
}

export async function getMarketProbability(
  market: Market,
  now = new Date(),
): Promise<MarketProbability> {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    const points = buildFlatCurrentBalancePoints(
      market,
      NEUTRAL_YES_CHANCE,
      now,
    );

    return {
      yesChance: NEUTRAL_YES_CHANCE,
      source: "neutral",
      points,
      chartMode: "current_balance",
    };
  }

  const { data: positions, error: positionsError } = await admin
    .from("positions")
    .select("yes_shares_cents, no_shares_cents")
    .eq("market_id", market.id);

  if (positionsError) {
    const points = buildFlatCurrentBalancePoints(
      market,
      NEUTRAL_YES_CHANCE,
      now,
    );

    return {
      yesChance: NEUTRAL_YES_CHANCE,
      source: "neutral",
      points,
      chartMode: "current_balance",
    };
  }

  const positionRows = (positions ?? []) as PositionRow[];
  const yesTotal = positionRows.reduce(
    (sum, row) => sum + row.yes_shares_cents,
    0,
  );
  const noTotal = positionRows.reduce(
    (sum, row) => sum + row.no_shares_cents,
    0,
  );
  const { yesChance, source } = computeYesChanceFromTotals(yesTotal, noTotal);

  const { data: ledger, error: ledgerError } = await admin
    .from("ledger_entries")
    .select("created_at, amount_cents, entry_type, description")
    .eq("market_id", market.id)
    .eq("entry_type", "trade")
    .order("created_at", { ascending: true });

  if (ledgerError) {
    return {
      yesChance,
      source,
      points: buildFlatCurrentBalancePoints(market, yesChance, now),
      chartMode: "current_balance",
    };
  }

  const historyPoints = buildHistoryPoints((ledger ?? []) as LedgerTradeRow[]);

  if (historyPoints.length === 0) {
    return {
      yesChance,
      source,
      points: buildFlatCurrentBalancePoints(market, yesChance, now),
      chartMode: "current_balance",
    };
  }

  const lastPoint = historyPoints.at(-1);
  if (!lastPoint || Math.abs(lastPoint.yesChance - yesChance) > 0.0001) {
    historyPoints.push({ at: now.toISOString(), yesChance });
  }

  return {
    yesChance,
    source,
    points: historyPoints,
    chartMode: "history",
  };
}
