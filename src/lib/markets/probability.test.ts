import { describe, expect, it } from "vitest";

import {
  buildFlatCurrentBalancePoints,
  buildHistoryPoints,
  computeYesChanceFromTotals,
  NEUTRAL_YES_CHANCE,
  parseTradeSide,
} from "@/lib/markets/probability";
import type { Market } from "@/lib/markets/types";

const market: Market = {
  id: "market-1",
  title: "Test",
  description: "Desc",
  status: "open",
  close_date: null,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

describe("computeYesChanceFromTotals", () => {
  it("computes yes chance from aggregate positions", () => {
    expect(computeYesChanceFromTotals(7000, 3000)).toEqual({
      yesChance: 0.7,
      source: "positions",
    });
  });

  it("uses neutral baseline when totals are empty", () => {
    expect(computeYesChanceFromTotals(0, 0)).toEqual({
      yesChance: NEUTRAL_YES_CHANCE,
      source: "neutral",
    });
  });
});

describe("parseTradeSide", () => {
  it("detects yes and no descriptions", () => {
    expect(parseTradeSide("Buy Yes shares")).toBe("yes");
    expect(parseTradeSide("Buy No shares")).toBe("no");
    expect(parseTradeSide("Starting balance")).toBeNull();
  });
});

describe("buildHistoryPoints", () => {
  it("reconstructs yes chance over time from ledger trades", () => {
    const points = buildHistoryPoints([
      {
        created_at: "2026-01-02T00:00:00.000Z",
        amount_cents: 1000,
        entry_type: "trade",
        description: "Buy Yes shares",
      },
      {
        created_at: "2026-01-03T00:00:00.000Z",
        amount_cents: 1000,
        entry_type: "trade",
        description: "Buy No shares",
      },
    ]);

    expect(points).toHaveLength(2);
    expect(points[0]?.yesChance).toBe(1);
    expect(points[1]?.yesChance).toBe(0.5);
  });
});

describe("buildFlatCurrentBalancePoints", () => {
  it("creates a flat current-state line", () => {
    const now = new Date("2026-06-06T12:00:00.000Z");
    const points = buildFlatCurrentBalancePoints(market, 0.5, now);

    expect(points).toHaveLength(2);
    expect(points[0]?.at).toBe(market.created_at);
    expect(points[0]?.yesChance).toBe(0.5);
    expect(points[1]?.yesChance).toBe(0.5);
  });
});
