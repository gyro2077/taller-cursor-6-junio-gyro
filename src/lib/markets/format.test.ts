import { describe, expect, it } from "vitest";

import {
  formatCloseDate,
  formatMarketStatus,
  formatPercent,
} from "@/lib/markets/format";

describe("formatMarketStatus", () => {
  it("formats known statuses", () => {
    expect(formatMarketStatus("open")).toBe("Open");
    expect(formatMarketStatus("closed")).toBe("Closed");
    expect(formatMarketStatus("resolved")).toBe("Resolved");
  });
});

describe("formatCloseDate", () => {
  it("returns a friendly label when close date is missing", () => {
    expect(formatCloseDate(null)).toBe("No close date");
  });

  it("formats a close date", () => {
    expect(formatCloseDate("2026-12-31T18:30:00.000Z")).toContain("2026");
  });
});

describe("formatPercent", () => {
  it("rounds to whole percentages", () => {
    expect(formatPercent(0.506)).toBe("51%");
    expect(formatPercent(0.5)).toBe("50%");
  });
});
