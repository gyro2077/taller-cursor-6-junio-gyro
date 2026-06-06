import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MarketBuyPlaceholder } from "@/components/marketlab/market-buy-placeholder";
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

describe("MarketBuyPlaceholder", () => {
  it("shows buying unavailable for closed markets", () => {
    const html = renderToStaticMarkup(
      <MarketBuyPlaceholder market={makeMarket({ status: "closed" })} />,
    );

    expect(html).toContain("Buying unavailable");
    expect(html).toContain("closed or past its close date");
  });

  it("shows trading coming soon for open markets", () => {
    const html = renderToStaticMarkup(
      <MarketBuyPlaceholder market={makeMarket()} />,
    );

    expect(html).toContain("Trading coming soon");
  });
});
