import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ProbabilityChart } from "@/components/marketlab/probability-chart";
import type { MarketProbability } from "@/lib/markets/types";

const flatProbability: MarketProbability = {
  yesChance: 0.5,
  source: "neutral",
  chartMode: "current_balance",
  points: [
    { at: "2026-01-01T00:00:00.000Z", yesChance: 0.5 },
    { at: "2026-06-06T12:00:00.000Z", yesChance: 0.5 },
  ],
};

const historyProbability: MarketProbability = {
  yesChance: 0.7,
  source: "positions",
  chartMode: "history",
  points: [
    { at: "2026-01-01T00:00:00.000Z", yesChance: 0.6 },
    { at: "2026-02-01T00:00:00.000Z", yesChance: 0.7 },
  ],
};

describe("ProbabilityChart", () => {
  it("renders an svg chart with 0-100% axis labels", () => {
    const html = renderToStaticMarkup(
      <ProbabilityChart probability={flatProbability} />,
    );

    expect(html).toContain("<svg");
    expect(html).toContain("0%");
    expect(html).toContain("100%");
    expect(html).toContain("Current market balance (no price history)");
    expect(html).toContain("50%");
  });

  it("labels historical charts differently", () => {
    const html = renderToStaticMarkup(
      <ProbabilityChart probability={historyProbability} />,
    );

    expect(html).toContain("Yes probability over time");
    expect(html).toContain("<polyline");
  });
});
