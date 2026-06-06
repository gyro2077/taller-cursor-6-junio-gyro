import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MarketCard } from "@/components/marketlab/market-card";
import type { Market } from "@/lib/markets/types";

const market: Market = {
  id: "11111111-1111-1111-1111-111111111111",
  title: "Will it rain tomorrow?",
  description: "A fictional weather market.",
  status: "open",
  close_date: "2026-12-31T18:30:00.000Z",
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

describe("MarketCard", () => {
  it("renders title, status, close date, and details link", () => {
    const html = renderToStaticMarkup(<MarketCard market={market} />);

    expect(html).toContain("Will it rain tomorrow?");
    expect(html).toContain("Open");
    expect(html).toContain("Closes:");
    expect(html).toContain("View details");
    expect(html).toContain("/markets/11111111-1111-1111-1111-111111111111");
  });
});
