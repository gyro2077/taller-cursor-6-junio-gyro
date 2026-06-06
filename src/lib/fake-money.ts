export type ParseDollarResult =
  | { ok: true; cents: number }
  | { ok: false; error: string };

export type TradeSide = "yes" | "no";

const DOLLAR_INPUT_PATTERN = /^\d+(\.\d{1,2})?$/;

export function parseDollarInputToCents(input: string): ParseDollarResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, error: "Enter a fake dollar amount." };
  }

  if (!DOLLAR_INPUT_PATTERN.test(trimmed)) {
    return {
      ok: false,
      error: "Use a valid amount with up to two decimal places.",
    };
  }

  const [wholePart, fractionPart = ""] = trimmed.split(".");
  const wholeCents = Number(wholePart) * 100;
  const fractionCents = Number(fractionPart.padEnd(2, "0").slice(0, 2));
  const cents = wholeCents + fractionCents;

  if (!Number.isSafeInteger(cents) || cents <= 0) {
    return { ok: false, error: "Enter a positive fake dollar amount." };
  }

  return { ok: true, cents };
}

export function parseTradeSideInput(side: string): TradeSide | null {
  const normalized = side.trim().toLowerCase();

  if (normalized === "yes" || normalized === "no") {
    return normalized;
  }

  return null;
}

export function parseTradeSide(description: string): TradeSide | null {
  const normalized = description.toLowerCase();

  const hasYes = /\byes\b/.test(normalized);
  const hasNo = /\bno\b/.test(normalized);

  if (hasYes && !hasNo) {
    return "yes";
  }

  if (hasNo && !hasYes) {
    return "no";
  }

  return null;
}

export function formatShareCents(cents: number): string {
  const dollars = cents / 100;

  return `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars)} fake`;
}

export function computeTotalShareCents(
  yesSharesCents: number,
  noSharesCents: number,
): number {
  return yesSharesCents + noSharesCents;
}
