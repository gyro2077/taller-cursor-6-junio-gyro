import { describe, expect, it } from "vitest";

import {
  buildChartCoordinates,
  filterPointsByRange,
} from "@/lib/markets/probability-chart-math";

const points = [
  { at: "2026-01-01T00:00:00.000Z", yesChance: 0.5 },
  { at: "2026-05-01T00:00:00.000Z", yesChance: 0.6 },
  { at: "2026-06-01T00:00:00.000Z", yesChance: 0.7 },
];

describe("filterPointsByRange", () => {
  it("keeps all points for the all range", () => {
    expect(filterPointsByRange(points, "all")).toHaveLength(3);
  });

  it("filters to recent points for 7d and 30d ranges", () => {
    const now = new Date("2026-06-06T12:00:00.000Z");

    expect(filterPointsByRange(points, "7d", now)).toHaveLength(1);
    expect(filterPointsByRange(points, "30d", now)).toHaveLength(1);
  });
});

describe("buildChartCoordinates", () => {
  it("builds a polyline for chart points", () => {
    const chart = buildChartCoordinates(points);

    expect(chart.polyline).toContain(",");
    expect(chart.minTime).toBeLessThan(chart.maxTime);
  });
});
