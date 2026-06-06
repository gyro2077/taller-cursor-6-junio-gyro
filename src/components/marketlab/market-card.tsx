import Link from "next/link";

import { MarketStatusBadge } from "@/components/marketlab/market-status-badge";
import { Button } from "@/components/ui/button";
import { formatCloseDate, formatMarketDescription } from "@/lib/markets/format";
import type { Market } from "@/lib/markets/types";

export function MarketCard({ market }: { market: Market }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold leading-snug text-card-foreground">
          {market.title}
        </h2>
        <MarketStatusBadge status={market.status} />
      </div>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
        {formatMarketDescription(market)}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Closes:</span>
        <span>{formatCloseDate(market.close_date)}</span>
      </div>

      <div className="mt-5">
        <Button asChild className="w-full sm:w-auto">
          <Link href={`/markets/${market.id}`}>View details</Link>
        </Button>
      </div>
    </article>
  );
}
