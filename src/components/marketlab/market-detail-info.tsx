import { MarketStatusBadge } from "@/components/marketlab/market-status-badge";
import { formatCloseDate, formatMarketDescription } from "@/lib/markets/format";
import type { Market } from "@/lib/markets/types";

export function MarketDetailInfo({ market }: { market: Market }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-card-foreground sm:text-3xl">
          {market.title}
        </h1>
        <MarketStatusBadge status={market.status} />
      </div>

      <p className="mt-4 text-base leading-7 text-muted-foreground">
        {formatMarketDescription(market)}
      </p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-foreground">Status</dt>
          <dd className="mt-1 text-sm text-muted-foreground">
            {market.status}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-foreground">Close date</dt>
          <dd className="mt-1 text-sm text-muted-foreground">
            {formatCloseDate(market.close_date)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
