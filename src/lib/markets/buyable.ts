import type { Market } from "@/lib/markets/types";

export function isMarketBuyable(market: Market, now = new Date()): boolean {
  if (market.status !== "open") {
    return false;
  }

  if (!market.close_date) {
    return true;
  }

  return new Date(market.close_date) > now;
}
