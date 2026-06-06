import { describe, expect, it } from "vitest";

import { isMarketBuyable } from "@/lib/markets/buyable";
import type { Market } from "@/lib/markets/types";

function makeMarket(overrides: Partial<Market> = {}): Market {
  return {
    id: "market-1",
    title: "Test market",
    description: "Description",
    status: "open",
    close_date: null,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("isMarketBuyable", () => {
  const now = new Date("2026-06-06T12:00:00.000Z");

  it("returns true for open markets without a close date", () => {
    expect(isMarketBuyable(makeMarket(), now)).toBe(true);
  });

  it("returns true for open markets with a future close date", () => {
    expect(
      isMarketBuyable(
        makeMarket({ close_date: "2026-12-31T00:00:00.000Z" }),
        now,
      ),
    ).toBe(true);
  });

  it("returns false for open markets with a past close date", () => {
    expect(
      isMarketBuyable(
        makeMarket({ close_date: "2026-01-01T00:00:00.000Z" }),
        now,
      ),
    ).toBe(false);
  });

  it("returns false for closed markets", () => {
    expect(isMarketBuyable(makeMarket({ status: "closed" }), now)).toBe(false);
  });

  it("returns false for resolved markets", () => {
    expect(isMarketBuyable(makeMarket({ status: "resolved" }), now)).toBe(
      false,
    );
  });
});
