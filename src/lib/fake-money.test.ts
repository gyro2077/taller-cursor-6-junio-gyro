import { describe, expect, it } from "vitest";

import {
  computeTotalShareCents,
  formatShareCents,
  parseDollarInputToCents,
  parseTradeSide,
  parseTradeSideInput,
} from "@/lib/fake-money";

describe("parseDollarInputToCents", () => {
  it("accepts whole and decimal dollar amounts", () => {
    expect(parseDollarInputToCents("1")).toEqual({ ok: true, cents: 100 });
    expect(parseDollarInputToCents("1.50")).toEqual({ ok: true, cents: 150 });
    expect(parseDollarInputToCents("10.00")).toEqual({ ok: true, cents: 1000 });
  });

  it("rejects empty, zero, and invalid formats", () => {
    expect(parseDollarInputToCents("")).toEqual({
      ok: false,
      error: "Enter a fake dollar amount.",
    });
    expect(parseDollarInputToCents("0")).toEqual({
      ok: false,
      error: "Enter a positive fake dollar amount.",
    });
    expect(parseDollarInputToCents("1.234")).toEqual({
      ok: false,
      error: "Use a valid amount with up to two decimal places.",
    });
    expect(parseDollarInputToCents("-5")).toEqual({
      ok: false,
      error: "Use a valid amount with up to two decimal places.",
    });
    expect(parseDollarInputToCents("abc")).toEqual({
      ok: false,
      error: "Use a valid amount with up to two decimal places.",
    });
  });
});

describe("parseTradeSideInput", () => {
  it("accepts yes and no", () => {
    expect(parseTradeSideInput("yes")).toBe("yes");
    expect(parseTradeSideInput("NO")).toBe("no");
  });

  it("rejects invalid sides", () => {
    expect(parseTradeSideInput("maybe")).toBeNull();
    expect(parseTradeSideInput("")).toBeNull();
  });
});

describe("parseTradeSide", () => {
  it("parses ledger descriptions", () => {
    expect(parseTradeSide("Buy Yes shares")).toBe("yes");
    expect(parseTradeSide("Buy No shares")).toBe("no");
    expect(parseTradeSide("Starting balance")).toBeNull();
  });
});

describe("formatShareCents", () => {
  it("formats shares as fake currency", () => {
    expect(formatShareCents(1000)).toBe("$10.00 fake");
    expect(formatShareCents(0)).toBe("$0.00 fake");
  });
});

describe("computeTotalShareCents", () => {
  it("sums yes and no share cents", () => {
    expect(computeTotalShareCents(700, 300)).toBe(1000);
    expect(computeTotalShareCents(0, 500)).toBe(500);
  });
});
