import Link from "next/link";

import { MarketStatusBadge } from "@/components/marketlab/market-status-badge";
import { Button } from "@/components/ui/button";
import { computeTotalShareCents, formatShareCents } from "@/lib/fake-money";
import { formatCloseDate } from "@/lib/markets/format";
import type { PositionWithMarket } from "@/lib/positions/types";

export function PositionCard({ position }: { position: PositionWithMarket }) {
  const { markets: market } = position;
  const totalSharesCents = computeTotalShareCents(
    position.yes_shares_cents,
    position.no_shares_cents,
  );

  return (
    <article
      className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
      data-slot="position-card"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-card-foreground">
          {market.title}
        </h2>
        <MarketStatusBadge status={market.status} />
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Closes:</span>{" "}
        {formatCloseDate(market.close_date)}
      </p>

      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">Yes shares</dt>
          <dd
            className="font-medium text-foreground tabular-nums"
            data-slot="yes-shares"
          >
            {formatShareCents(position.yes_shares_cents)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">No shares</dt>
          <dd
            className="font-medium text-foreground tabular-nums"
            data-slot="no-shares"
          >
            {formatShareCents(position.no_shares_cents)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Total shares</dt>
          <dd
            className="font-medium text-foreground tabular-nums"
            data-slot="total-shares"
          >
            {formatShareCents(totalSharesCents)}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={`/markets/${market.id}`} data-slot="view-market-link">
            View market
          </Link>
        </Button>
      </div>
    </article>
  );
}
