import type { Market, MarketStatus } from "@/lib/markets/types";

const STATUS_LABELS: Record<MarketStatus, string> = {
  open: "Open",
  closed: "Closed",
  resolved: "Resolved",
};

export function formatMarketStatus(status: string): string {
  if (status in STATUS_LABELS) {
    return STATUS_LABELS[status as MarketStatus];
  }

  return status;
}

export function formatCloseDate(closeDate: string | null): string {
  if (!closeDate) {
    return "No close date";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(closeDate));
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatMarketDescription(market: Market): string {
  return market.description.trim() || "No description provided.";
}

export function formatBalanceCents(balanceCents: number): string {
  const dollars = balanceCents / 100;

  return `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars)} fake`;
}
